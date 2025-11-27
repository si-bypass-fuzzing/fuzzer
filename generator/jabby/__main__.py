"""
Entry point to jabby
Currently only parses WebIDL JSON files
"""

import argparse
import os
import logging

from .web_grammar.html import mapping
from .web_grammar import grammar as web_grammar
from .generator import builder
from .web_grammar.js import js

# from profilehooks import profile


# @profile(stdout=False, filename='baseline.prof')
def main():
    """Main method for generator package
    Parses WebIDL JSON file(s) and writes JSON representation of the grammar to a file
    """
    parser = argparse.ArgumentParser(description="Generate HTML/JS from WebIDL")
    sources = parser.add_mutually_exclusive_group(required=True)
    sources.add_argument("-f", "--file", help="input file", type=str)
    sources.add_argument("-d", "--dir", help="input directory", type=str)
    parser.add_argument("-o", "--output", help="output file", type=str, required=True)
    parser.add_argument(
        "--mdn",
        help="path to MDN docs directory",
        type=str,
        default="./mdn",
    )
    args = parser.parse_args()

    grammar: web_grammar.Grammar = web_grammar.Grammar()
    if args.file:
        logging.info("Parsing WebIDL file to create grammar")
        grammar.parse_file(args.file)
    elif args.dir:
        logging.info("Parsing WebIDL files to create grammar")
        for root, _, files in os.walk(args.dir):
            for file in files:
                if file.endswith(".json"):
                    grammar.parse_file(os.path.join(root, file))
    else:
        parser.print_help()
        return
    logging.info("Finished parsing WebIDL files to create grammar")

    logging.info("Finalizing grammar")
    grammar.finalize()
    grammar.enhance_html_grammar(args.mdn)
    logging.info("Finished finalizing grammar")

    logging.info(f"Writing grammar to {args.output}")
    grammar.write(args.output)

    # Check for missing HTML tags
    for iface in grammar.interfaces:
        if (
            iface.startswith("HTML")
            and iface.endswith("Element")
            and not iface in mapping.WEBIDL_TO_TAG
        ):
            logging.warning(f"Missing tag for {iface}")

    js_builder: builder.JSBuilder = builder.JSBuilder(
        "chrome", grammar, False, 1, 1, 1, 0, "Window"
    )

    # create a fetch call
    window = grammar.find_interface("Window")
    fetch = [
        member
        for member in window.get_members()
        if isinstance(member, js.Function) and member.name == "fetch"
    ][0]
    js_builder.create_api_call(window, fetch)

    # create an XMLHttpRequest and call open and send
    xhr = grammar.find_interface("XMLHttpRequest")
    opn = [
        member
        for member in xhr.get_members()
        if isinstance(member, js.Function) and member.name == "open"
    ][0]
    send = [
        member
        for member in xhr.get_members()
        if isinstance(member, js.Function) and member.name == "send"
    ][0]
    js_builder.create_api_call(xhr, opn)
    js_builder.create_api_call(xhr, send)

    # create an iframe and set the src and sandbox attribute
    iframe = grammar.find_interface("HTMLIFrameElement")
    src = [
        member
        for member in iframe.get_members()
        if isinstance(member, js.Attribute) and member.name == "src"
    ][0]
    js_builder.create_attribute_assignment(iframe, src)
    sandbox = [
        member
        for member in iframe.get_members()
        if isinstance(member, js.Attribute) and member.name == "sandbox"
    ][0]
    js_builder.create_attribute_assignment(iframe, sandbox)

    print(js_builder.lower(False))


if __name__ == "__main__":
    main()
