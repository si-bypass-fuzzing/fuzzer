# Are your Sites Truly Isolated? Automatically Detecting Logic Bugs in Site Isolation Implementations

This repository contains the fuzzer described in the paper: "IPCrafter", a browser IPC fuzzer to discover site isolation bypass vulnerabilities. The fuzzer utilizes WebIDL definitions to generate HTML/JS inputs utilizing the browser JS API. The browser is instrumented with Playwright to simulate user interactions.
We patched Chrome and Firefox to add our Site Isolation bypass bug oracles and the IPC fuzzer component that mutates IPC messages sent by the renderer process. The patched browsers are located in other repositories as listed below.

## Repository Structure
- `ipcrafter/`: The fuzzer written in Python
- `data/`: Results of the coverage measurements
- `docker/`: Dockerfile to run the fuzzer with several instances
- `eval`: Dockerfiles to evaluate the fuzzer on old versions of the browsers with known vulnerabilities, also contains the results of the evaluation
- `generator/`: Module of the fuzzer that generates the fuzzer inputs
- `tmuxp/`: tmuxp files to start the fuzzer and the servers
- `vulns/`: The vulnerabilities found by the fuzzer
- `server/`: The webserver hosting the fuzzer inputs

## Other repositories
- [chromium](https://github.com/si-bypass-fuzzing/chromium) patched Chromium with sanitizers and fuzzer bindings in branches `ipc-fuzzer/current` and `patch/...`.
- [gecko-dev](https://github.com/si-bypass-fuzzing/gecko-dev) patched Firefox with sanitizers and fuzzer bindings in branch `patch/125`
- [webidl.js](https://github.com/si-bypass-fuzzing/webidl2.js) patched WebIDL parser, used to convert `.idl` files to json
- [fuzzorigin](https://github.com/si-bypass-fuzzing/fuzzorigin) UXSS fuzzer by Kim et al., patched to run in our evaluation environment

## Running the fuzzer
1. Compile the browsers and place them at `browsers` directory
    - [how to build chrome](https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md)
    - we provide Docker containers to compile and run old browser revisions
2. The fuzzer depends on python3.12, install it if not already installed
3. Install the dependencies `python3.12 -m venv .venv && source .venv/bin/activate && pip3.12 install -r requirements.txt`
4. Convert the `.idl` files to `.json` files using the `webidl2json` tool
  - `cd generator/webidl2json && npm install && node parse.js ./idl/chrome ./json/chrome`
5. Run the fuzzer `source .venv/bin/activate && python3.12 -m ipcrafter -w ./generator/webidl2json/json/chrome -m ./generator/mdn -b chrome -s ./server -o ./chromium.json -t ./browsers/chrome-ipc-fuzzing/src/out/Coverage/chrome`

Since the fuzzer also requires 2 web servers, we provide tmuxp files to start the fuzzer and the servers: `tmuxp load tmuxp/chrome_fuzzer_session.yml`
