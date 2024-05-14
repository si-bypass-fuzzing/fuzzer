# Cross-site leak of URLs

- TLDR: the browser process leaks the URL of site A to the renderer of site B if A navigates by assigning to `window.location`

## Reproduction
- server: `ATTACKER=vulns/url_leak/attacker VICTIM=vulns/url_leak/victim tmuxp load server_session.yml`
- browser: `MOZ_LOG="uxss_logger:5" ./mach run http://127.0.0.1:8080/attacker.html http://127.0.0.2:8080/victim.html`
