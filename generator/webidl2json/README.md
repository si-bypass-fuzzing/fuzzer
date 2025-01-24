# webidl2json

[parse.js](./parse.js) parses .idl files and writes the AST to a JSON file for further processing.
It can parse single files `node parse.js example.idl` or all files from a directory `node parse.js example_dir output_dir`
Internally the [W3C webidl parser](https://github.com/w3c/webidl2.js/) is used.

For the semantics of the WebIDL entities, see the [W3C webidl parser](https://github.com/w3c/webidl2.js/README.md) and the [WebIDL Standard](https://webidl.spec.whatwg.org/).

## Installation
TODO

## Example
```bash
node parse.js ./idl/firefox ./json/firefox
```
