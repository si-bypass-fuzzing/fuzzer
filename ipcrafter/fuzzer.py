import asyncio
import json
import os
import shutil

from .jabby.web_grammar.grammar import Grammar
from .jabby.generator.generator import Generator
from . import executor

PRUNE:bool = True


class Fuzzer:
    def __init__(
        self,
        browser: str,
        webidl_path: str,
        mdn_path: str,
        server_dir: str,
        crash_dir: str,
        grammar_output_path: str|None = None,
    ):
        self.browser = browser
        self.grammar: Grammar = Grammar()
        self.grammar.parse_dir(webidl_path)
        self.grammar.finalize()
        self.grammar.enhance_html_grammar(mdn_path)
        if grammar_output_path is not None:
            # self.grammar.write(grammar_output_path)
            pass
        self.generator: Generator = Generator(browser, self.grammar, server_dir)
        self.server_dir: str = server_dir
        self.crash_dir: str = crash_dir

        self.input_id: int = 0

    def fuzz(self, browser: str, remote: bool, browser_path: str, num_iterations:int|None):

        self.generator.create_output_dirs()
        self.generator.generate_seed_pages()

        def generate() -> int:
            self.input_id += 1
            self.generator.generate_input(self.input_id)
            return self.input_id

        def prune() -> None:
            if PRUNE:
                self.generator.prune(self.input_id)

            if browser == "firefox":
                for filename in os.listdir():
                    if filename.startswith("firefox.log"):
                        os.remove(filename)

        def save_crash(logs: list[dict]) -> None:
            os.makedirs(self.crash_dir, exist_ok=True)
            shutil.copytree(self.server_dir, os.path.join(self.crash_dir, str(self.input_id)), dirs_exist_ok=True)
            with open(
                os.path.join(self.crash_dir, str(self.input_id), "logs.json"), "w"
            ) as f:
                json.dump(logs, f)

            if browser == "firefox":
                for filename in os.listdir():
                    if filename.startswith("firefox.log"):
                        shutil.copy(filename, os.path.join(self.crash_dir, str(self.input_id), filename))

        asyncio.run(
            executor.fuzz(browser, remote, browser_path, generate, prune, save_crash, num_iterations)
        )
