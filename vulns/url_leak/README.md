# Cross-site leak of URLs

- TLDR: the browser process leaks the URL of site A to the renderer of site B if A navigates by assigning to `window.location`

## Reproduction
- server: `ATTACKER=vulns/url_leak/attacker VICTIM=vulns/url_leak/victim tmuxp load server_session.yml`
- browser: `MOZ_LOG="uxss_logger:5" ./mach run http://127.0.0.1:8080/attacker.html http://127.0.0.2:8080/victim.html`

## Analysis
```
jdrescher@geryon:~/fuzzer/vulns/url_leak$ ./msgreader.py "\&\x008\x00"
msg start: PContentMsgStart, msg id: 38
```

- firefox/release/ipc/ipdl/_ipdlheaders/mozilla/dom/PContent.h
- message type for id 38: `Msg_NotifyVisited__ID`
- IPC message: `Msg_NotifyVisited`
- sent by function `PContentParent::SendNotifyVisited` in PContentParent.cpp
    - sends a message with the uri with target `MSG_ROUTING_CONTROL`
    - which leads to a broadcast (ipc/chromium/src/chrome/common/ipc_message.h)
    ```cpp
    enum SpecialRoutingIDs {
        // indicates that we don't have a routing ID yet.
        MSG_ROUTING_NONE = kint32min,

        // indicates a general message not sent to a particular tab.
        MSG_ROUTING_CONTROL = kint32max
    };
    ```
