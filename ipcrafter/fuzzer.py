import asyncio
import json
import os
import shutil
import logging
from typing import Callable

from .jabby.web_grammar.grammar import Grammar
from .jabby.generator.generator import Generator
from . import executor

from . import executor_old_pw, executor_pyppeteer
from .util import URLGenerator

PRUNE: bool = True


class Fuzzer:
    def fuzz(
        self,
        browser: str,
        remote: bool,
        browser_path: str,
        collect_coverage: bool,
        num_iterations: int | None,
    ) -> None:
        raise NotImplementedError

    def run(
        self,
        browser_type: str,
        remote: bool,
        browser_path: str,
        log_dir: str,
        generate_callback: Callable[[], int],
        prune_callback: Callable[[bool], None],
        crash_callback: Callable[[list[dict]], None],
        collect_coverage: bool,
        num_iterations: int | None,
        browse_seeds: bool,
        url_generator: URLGenerator|None
    ) -> None:
        if browser_type == "chrome-99":
            asyncio.run(
                executor_old_pw.fuzz(
                    "chrome",
                    remote,
                    browser_path,
                    log_dir,
                    generate_callback,
                    prune_callback,
                    crash_callback,
                    collect_coverage,
                    num_iterations,
                    browse_seeds,
                )
            )
        else:
            asyncio.run(
                executor.fuzz(
                    browser_type,
                    remote,
                    browser_path,
                    log_dir,
                    generate_callback,
                    prune_callback,
                    crash_callback,
                    collect_coverage,
                    num_iterations,
                    browse_seeds,
                    url_generator
                )
            )


class IPCFuzzer(Fuzzer):
    def __init__(
        self,
        browser: str,
        webidl_path: str,
        mdn_path: str,
        server_dir: str = "server",
        crash_dir: str = "crash",
        log_dir: str = "logs",
        grammar_output_path: str | None = None,
    ):
        self.browser = browser
        self.grammar: Grammar = Grammar()
        self.grammar.parse_dir(webidl_path)
        self.grammar.finalize()
        self.grammar.enhance_html_grammar(mdn_path)
        if grammar_output_path is not None:
            logging.info("Write grammar to %s", grammar_output_path)
            self.grammar.write(grammar_output_path)
        self.generator: Generator = Generator("chrome" if browser == "chrome-99" else browser, self.grammar, server_dir)
        self.server_dir: str = server_dir
        self.crash_dir: str = crash_dir
        self.log_dir: str = log_dir

        os.makedirs(self.log_dir, exist_ok=True)

        self.input_id: int = 0

    def fuzz(
        self,
        browser: str,
        remote: bool,
        browser_path: str,
        collect_coverage: bool,
        num_iterations: int | None,
        browse_seeds: bool = True,
    ) -> None:

        self.generator.create_output_dirs()
        self.generator.generate_seed_pages()

        def generate() -> int:
            self.input_id += 1
            self.generator.generate_input(self.input_id)
            return self.input_id

        def prune(browser_logs: bool) -> None:
            if PRUNE:
                self.generator.prune(self.input_id)

            if browser_logs:
                for filename in os.listdir(self.log_dir):
                    if not filename == ".placeholder":
                        os.remove(os.path.join(self.log_dir, filename))

        def save_crash(logs: list[dict]) -> None:
            os.makedirs(self.crash_dir, exist_ok=True)
            shutil.copytree(
                self.server_dir,
                os.path.join(self.crash_dir, str(self.input_id)),
                dirs_exist_ok=True,
            )
            with open(
                os.path.join(self.crash_dir, str(self.input_id), "logs.json"), "w"
            ) as f:
                json.dump(logs, f)

            shutil.copytree(
                self.log_dir,
                os.path.join(self.crash_dir, str(self.input_id), "logs"),
                dirs_exist_ok=True,
            )

        super().run(
            browser,
            remote,
            browser_path,
            self.log_dir,
            generate,
            prune,
            save_crash,
            collect_coverage,
            num_iterations,
            browse_seeds,
            None
        )

class PyppeteerFuzzer():
    def __init__(
        self,
        webidl_path: str,
        mdn_path: str,
        server_dir: str = "server",
        crash_dir: str = "crash",
        log_dir: str = "logs",
        grammar_output_path: str | None = None,
    ):
        from . import executor_pyppeteer
        self.browser = "chrome"
        self.grammar: Grammar = Grammar()
        self.grammar.parse_dir(webidl_path)
        self.grammar.finalize()
        self.grammar.enhance_html_grammar(mdn_path)
        if grammar_output_path is not None:
            logging.info("Write grammar to %s", grammar_output_path)
            self.grammar.write(grammar_output_path)
        self.generator: Generator = Generator(self.browser, self.grammar, server_dir)
        self.server_dir: str = server_dir
        self.crash_dir: str = crash_dir
        self.log_dir: str = log_dir

        os.makedirs(self.log_dir, exist_ok=True)

        self.input_id: int = 0

    def fuzz(self,
        browser_path: str,
        num_iterations: int | None,
        browse_seeds: bool = True,
    ) -> None:
        self.generator.create_output_dirs()
        self.generator.generate_seed_pages()

        def generate() -> int:
            self.input_id += 1
            self.generator.generate_input(self.input_id)
            return self.input_id

        def prune(browser_logs: bool) -> None:
            if PRUNE:
                self.generator.prune(self.input_id)

            if browser_logs:
                for filename in os.listdir(self.log_dir):
                    if not filename == ".placeholder":
                        os.remove(os.path.join(self.log_dir, filename))

        def save_crash(logs: list[dict]) -> None:
            os.makedirs(self.crash_dir, exist_ok=True)
            shutil.copytree(
                self.server_dir,
                os.path.join(self.crash_dir, str(self.input_id)),
                dirs_exist_ok=True,
            )
            with open(
                os.path.join(self.crash_dir, str(self.input_id), "logs.json"), "w"
            ) as f:
                json.dump(logs, f)

            shutil.copytree(
                self.log_dir,
                os.path.join(self.crash_dir, str(self.input_id), "logs"),
                dirs_exist_ok=True,
            )

        self.run(
            browser_path,
            self.log_dir,
            generate,
            prune,
            save_crash,
            num_iterations,
            browse_seeds
        )

    def run(
        self,
        browser_path: str,
        log_dir: str,
        generate_callback: Callable[[], int],
        prune_callback: Callable[[bool], None],
        crash_callback: Callable[[list[dict]], None],
        num_iterations: int | None,
        browse_seeds: bool,
    ) -> None:
        asyncio.run(
            executor_pyppeteer.fuzz(
                browser_path,
                log_dir,
                generate_callback,
                prune_callback,
                crash_callback,
                num_iterations,
                browse_seeds
            ),
            debug=True
        )
