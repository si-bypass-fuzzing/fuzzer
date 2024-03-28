import argparse
from .fuzzer import Fuzzer


def main():
    parser = argparse.ArgumentParser(description="Fuzz Firefox/Chromium")
    parser.add_argument(
        "-w", "--webidl-dir", help="path to directory with WebIDL JSON files", type=str
    )
    parser.add_argument(
        "-m",
        "--mdn-dir",
        help="path to MDN docs directory",
        type=str,
        default="./generator/mdn",
    )
    parser.add_argument(
        "-b",
        "--browser",
        help="browser to fuzz",
        type=str,
        choices=["chrome", "firefox"],
    )
    parser.add_argument(
        "-r", "--remote", help="use remote browser", action="store_true"
    )
    parser.add_argument(
        "-s",
        "--server-dir",
        help="path to directory to store generated files",
        type=str,
        default="./server",
    )
    parser.add_argument(
        "path", metavar="PATH", help="path/url to the browser", type=str
    )
    args = parser.parse_args()

    fuzzer = Fuzzer(args.browser, args.webidl_dir, args.mdn_dir, args.server_dir)
    fuzzer.fuzz(args.browser, args.remote, args.path)


if __name__ == "__main__":
    main()
