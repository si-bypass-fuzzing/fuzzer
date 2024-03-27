import asyncio

from .generator.jabby.web_grammar.grammar import Grammar
from .generator.jabby.generator.generator import Generator
from . import executor
from .generator.jabby.generator.url import URLScope


class Fuzzer:
    def __init__(self, webidl_path: str, mdn_path: str, server_dir: str):
        self.grammar: Grammar = Grammar()
        self.grammar.parse_dir(webidl_path)
        self.grammar.finalize()
        self.grammar.enhance_html_grammar(mdn_path)
        self.generator: Generator = Generator(self.grammar, server_dir)

        self.input_id: int = 0

    def fuzz(self, browser: str, remote: bool, browser_path: str):

        self.generator.create_output_dirs()
        self.generator.generate_seed_pages()

        def generate() -> int:
            self.input_id += 1
            self.generator.generate_input(self.input_id)
            return self.input_id

        async def exec() -> None:
            if remote:
                if browser == "chrome":
                    await executor.exec_remote_chrome(browser_path, generate)
                elif browser == "firefox":
                    await executor.exec_remote_firefox(browser_path, generate)
                else:
                    raise Exception("Invalid browser")
            else:
                if browser == "chrome":
                    await executor.exec_local_chrome(browser_path, generate)
                elif browser == "firefox":
                    await executor.exec_local_firefox(browser_path, generate)
                else:
                    raise Exception("Invalid browser")

        asyncio.run(exec())
