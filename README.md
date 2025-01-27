# IPCrafter - A Browser IPC fuzzer to discover site isolation bypass vulnerabilities

## Repository Structure
- `ipcrafter/`: The fuzzer written in Python
- `data/`: Results of the coverage measurements
- `docker/`: Dockerfile to run the fuzzer with several instances
- `eval`: Dockerfiles to evaluate the fuzzer on old versions of the browsers with known vulnerabilities, also contains the results of the evaluation
- `generator/`: Module of the fuzzer that generates the fuzzer inputs
- `tmuxp/`: tmuxp files to start the fuzzer and the servers
- `vulns/`: The vulnerabilities found by the fuzzer

## Other repositories
- [chromium](https://github.com/si-bypass-fuzzing/chromium) patched Chromium with fuzzer bindings in branches `patch/current`, `patch/69`, and `patch/99`.
- [gecko-dev](https://github.com/si-bypass-fuzzing/gecko-dev) patched Firefox with fuzzer bindings in branche `patch/125`
- [webidl.js](https://github.com/si-bypass-fuzzing/webidl2.js) patched WebIDL parser, used to convert `.idl` files to json
- [fuzzorigin](https://github.com/si-bypass-fuzzing/fuzzorigin) UXSS fuzzer by Kim et al., patched to run in our evaluation environment

## Running the fuzzer
1. Compile the browsers and place them at `browsers` directory
2. The fuzzer depends on python3.12, install it if not already installed
3. Install the dependencies `python3.12 -m venv .venv && source .venv/bin/activate && pip3.12 install -r requirements.txt`
4. Convert the `.idl` files to `.json` files using the `webidl2json` tool
  - `cd generator/webidl2json && npm install && node parse.js ./idl/chrome ./json/chrome`
5. Run the fuzzer `source .venv/bin/activate && python3.12 -m ipcrafter -w ./generator/webidl2json/json/chrome -m ./generator/mdn -b chrome -s ./server -o ./chromium.json -t ./browsers/chrome-ipc-fuzzing/src/out/Coverage/chrome`

Since the fuzzer also requires 2 web servers, we provide tmuxp files to start the fuzzer and the servers: `tmuxp load tmuxp/chrome_fuzzer_session.yml`
