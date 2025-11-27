import os
import random

from .url import URLScope
from .builder import JSBuilder, SWBuilder
from ..web_grammar.grammar import Grammar
from .sanitizer import Sanitizer

NUM_INSTRUCTIONS: int = 20
RENDERER_CHECK_FLAG = "0xfffffffffffffeff"

class Generator:
    def __init__(self, browser: str, grammar: Grammar, output_dir: str):
        self.browser = browser
        self.grammar = grammar
        self.output_dir = output_dir

        self.num_hosts: int = 2
        self.num_pages: int = 2
        self.compromised_origin_id: int = 1

        self.builders: dict[tuple[int, int], JSBuilder] = {}
        self.sw_builders: dict[int, SWBuilder] = {}

        for origin_id in range(1, self.num_hosts + 1):
            compromised: bool = origin_id == self.compromised_origin_id
            for page_id in range(1, self.num_pages + 1):
                self.builders[(origin_id, page_id)] = JSBuilder(
                    browser, self.grammar, compromised, origin_id, page_id, 1, 0, "Window"
                )
            self.sw_builders[origin_id] = SWBuilder(
                browser, self.grammar, compromised, origin_id, 1
            )

    def generate_seed_pages(
        self,
    ):
        pass
        for origin_id in range(1, self.num_hosts + 1):
            compromised: bool = origin_id == self.compromised_origin_id
            sanitizer = Sanitizer(self.browser, URLScope(origin_id, 1, 1))
            html = "<html>\n<head>\n"
            if compromised:
                if self.browser == "firefox":
                    html += f"<script>IPCFuzzer.deactivate_renderer_checks({RENDERER_CHECK_FLAG});\nIPCFuzzer.activate_leak_sanitizer();</script>"
                else:
                    html += f"<script>IPCFuzzer.deactivate_renderer_checks();\nIPCFuzzer.activate_leak_sanitizer();</script>"
            html += "</head>\n<body>\n"
            html += "<script>navigator.serviceWorker.register('/sw.js').then((reg) => {reg.update();}).catch((e) => {});</script>\n"
            html += "<script>\n"
            for inst in sanitizer.seed(not compromised):
                html += inst.lower(False)
            html += "</script>\n</body>\n</html>"

            with open(self.get_seed_filename(origin_id), "w") as f:
                f.write(html)

    def get_input_filename(self, origin_id: int, page_id: int, input_id: int):
        return os.path.join(
            self.output_dir, f"origin-{origin_id}/input-{input_id}_page-{page_id}.html"
        )

    def get_sw_filename(self, origin_id: int, input_id: int|None = None):
        if input_id is None:
            return os.path.join(self.output_dir, f"origin-{origin_id}/sw.js")
        return os.path.join(self.output_dir, f"origin-{origin_id}/sw-{input_id}.js")

    def get_seed_filename(self, origin_id: int):
        return os.path.join(self.output_dir, f"origin-{origin_id}/seed.html")

    def create_output_dirs(self):
        os.makedirs(self.output_dir, exist_ok=True)
        for origin_id in range(1, self.num_hosts + 1):
            os.makedirs(
                os.path.join(self.output_dir, f"origin-{origin_id}"), exist_ok=True
            )

    def generate_input(self, input_id: int):
        for (origin_id, page_id), builder in self.builders.items():
            builder.set_input_id(input_id)
            builder.generate_rand_instructions(NUM_INSTRUCTIONS)
            with open(self.get_input_filename(origin_id, page_id, input_id), "w") as f:
                f.write(builder.lower(True, True, True))
            builder.clear()

        for origin_id, sw_builder in self.sw_builders.items():
            # rename old service worker
            old_sw_filename = self.get_sw_filename(origin_id)
            if input_id > 1 and os.path.exists(old_sw_filename):
                os.rename(old_sw_filename, self.get_sw_filename(origin_id, input_id - 1))

            # build new service worker
            sw_builder.set_input_id(input_id)
            with open(self.get_sw_filename(origin_id), "w") as f:
                f.write(sw_builder.generate_script())
            sw_builder.clear()

    def prune(self, current_id: int) -> None:
        current_id -= 10
        if current_id > 0:
            for origin_id in range(1, self.num_hosts + 1):
                for page_id in range(1, self.num_pages + 1):
                    filename = self.get_input_filename(origin_id, page_id, current_id)
                    if os.path.exists(filename):
                        os.remove(filename)
                    else:
                        print(f"File {filename} does not exist")
                filename = self.get_sw_filename(origin_id, current_id)
                if os.path.exists(filename):
                    os.remove(filename)
