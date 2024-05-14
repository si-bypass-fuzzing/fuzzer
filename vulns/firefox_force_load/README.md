# Site Isolation Bypass in Firefox

- TLDR: a compromised renderer process can force a victim page to be loaded in the compromised renderer process instead of an isolated process. Thus the attacker has access to cookies, fetch requests etc.
    - detectable by the leak sanitizer or the process sanitizer
- tested in Firefox 121 & 128 (gecko-dev master be29044bb9265c8e84bf67bf79f351998318e060)
    - reproducible in optimised builds with(-out) ASAN
    - not reproducible in debug builds, attacker renderer crashes

## Steps to reproduce
- start servers: `ATTACKER=vulns/firefox_force_load/attacker VICTIM=vulns/firefox_force_load/victim tmuxp load server_session.yml`
- open seed page and attacker page (in [firefox directory](./firefox-ipc-fuzzing)): `./mach run http://127.0.0.2:8080/seed http://127.0.0.1:8080/attacker.html`
    - delete profile before repeating: `rm -rf release/tmp/profile-default/`