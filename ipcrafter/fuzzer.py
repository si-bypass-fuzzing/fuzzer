import asyncio
import json
import os
import shutil

from .generator.jabby.web_grammar.grammar import Grammar
from .generator.jabby.generator.generator import Generator
from . import executor
from .generator.jabby.generator.url import URLScope


class Fuzzer:
    def __init__(
        self,
        browser: str,
        webidl_path: str,
        mdn_path: str,
        server_dir: str,
        crash_dir: str,
    ):
        self.browser = browser
        self.grammar: Grammar = Grammar()
        self.grammar.parse_dir(webidl_path)
        self.grammar.finalize()
        self.grammar.enhance_html_grammar(mdn_path)
        self.generator: Generator = Generator(browser, self.grammar, server_dir)
        self.server_dir: str = server_dir
        self.crash_dir: str = crash_dir

        self.input_id: int = 0

    def fuzz(self, browser: str, remote: bool, browser_path: str):

        self.generator.create_output_dirs()
        self.generator.generate_seed_pages()

        def generate() -> int:
            self.input_id += 1
            self.generator.generate_input(self.input_id)
            return self.input_id

        def prune(current_id: int) -> None:
            self.generator.prune(current_id)

        def save_crash(input_id: int, logs: list[dict]) -> None:
            os.makedirs(self.crash_dir, exist_ok=True)
            shutil.copy2(self.server_dir, os.path.join(self.crash_dir, str(input_id)))
            with open(
                os.path.join(self.crash_dir, str(input_id), "logs.json"), "w"
            ) as f:
                json.dump(logs, f)

        asyncio.run(
            executor.fuzz(browser, remote, browser_path, generate, prune, save_crash)
        )
