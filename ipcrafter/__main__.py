import argparse
from .fuzzer import IPCFuzzer, PyppeteerFuzzer
from .evaluator import FuzzoriginEvaluator
from .reproducer import Reproducer

# from profilehooks import profile


# @profile(stdout=False, filename='baseline.prof')
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
        choices=["chrome", "firefox", "chrome-69", "chrome-99", "webkit"],
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
        "-c",
        "--crash-dir",
        help="path to directory to store inputs that lead to crashes",
        type=str,
        default="./crash",
    )
    parser.add_argument(
        "-l",
        "--log-dir",
        help="path to directory to store browser logs",
        type=str,
        default="./logs",
    )
    parser.add_argument(
        "-o",
        "--grammar-output",
        help="path to write the grammar to",
        type=str,
        required=False,
    )
    parser.add_argument(
        "-n"
        "--num-iterations",
        help="number of iterations to run",
        type=int,
        default=None,
        dest="num_iterations"
    )
    parser.add_argument("--reproduce", help="reproduce a crash", type=str, metavar="CRASH_DIR", default=None)
    parser.add_argument("-t", "--coverage", help="enable coverage", action="store_true")
    parser.add_argument("-f", "--fuzzer", help="fuzzer to use", type=str, default="ipcrafter")
    parser.add_argument(
        "path", metavar="PATH", help="path/url to the browser", type=str
    )

    args = parser.parse_args()

    match args.fuzzer:
        case "ipcrafter":
            if args.reproduce is not None:
                reproducer = Reproducer(server_dir=args.server_dir, log_dir=args.log_dir, crash_dir=args.crash_dir)
                reproducer.reproduce(args.reproduce, args.browser, args.remote, args.path)
            else:
                if args.browser == "chrome-69":
                    fuzzer = PyppeteerFuzzer( args.webidl_dir, args.mdn_dir, server_dir=args.server_dir, log_dir=args.log_dir, crash_dir=args.crash_dir, grammar_output_path=args.grammar_output)
                    fuzzer.fuzz(args.path, None)
                else:
                    fuzzer = IPCFuzzer(args.browser, args.webidl_dir, args.mdn_dir, server_dir=args.server_dir, log_dir=args.log_dir, crash_dir=args.crash_dir, grammar_output_path=args.grammar_output)
                    fuzzer.fuzz(args.browser, args.remote, args.path, args.coverage, args.num_iterations)
        case "fuzzorigin":
            runner = FuzzoriginEvaluator(args.browser, True, args.server_dir, args.log_dir, args.crash_dir)
            runner.fuzz(args.browser, args.remote, args.path, args.coverage, None)


if __name__ == "__main__":
    main()
