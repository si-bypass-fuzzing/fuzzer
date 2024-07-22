from .fuzzer import Fuzzer

import os
from .fuzzers.fuzzorigin.src.script.testcase_generator import TestcaseGenerator as FuzzoriginTestcaseGenerator
from .fuzzers.fuzzorigin.src.script.testcase import Testcase

class FuzzoriginRunner(Fuzzer):
    def __init__(self, browser: str, different_ips:bool=False,server_dir: str="server", crash_dir: str="crash", log_dir: str="logs"):
        self.browser = browser
       
        self.server_dir: str = server_dir
        self.crash_dir: str = crash_dir
        self.log_dir: str = log_dir

        os.makedirs(self.log_dir, exist_ok=True)

        self.input_id: int = 0
        self.different_ips = different_ips
        self.origins:int = 2
        self.pages:int = 2
        self.testcase_generator = FuzzoriginTestcaseGenerator(origins=self.origins, pages=self.pages)

    def get_name_prefix(self, input_id: int) -> str:
        return f"input_{input_id}"
    
    def get_name(self, input_id: int, origin: int, page: int) -> str:
        return f"{self.get_name_prefix(input_id)}_{origin}_{page}.html"
    
    def get_path(self, input_id: int, origin: int, page: int) -> str:
        return os.path.join(self.server_dir, self.get_name(input_id, origin, page))


    def fuzz(self, browser: str, remote: bool, browser_path: str, collect_coverage: bool, num_iterations: int | None) -> None:
        
        def generate() -> int:
            self.input_id += 1
            testcase:Testcase = self.testcase_generator.generate(self.get_name_prefix(self.input_id))
            for origin in range(self.testcase_generator.origins):
                for page in range(self.testcase_generator.pages):
                    with open(self.get_path(self.input_id, origin,page), "w") as f:
                        f.write(testcase.get(origin, page).to_string(debug=True))

            return self.input_id
        
        def prune(browser_logs: bool) -> None:
            start_id = self.input_id - 10
            if start_id > 0:
                for origin_id in range(self.origins):
                    for page_id in range(self.pages):
                        filename = self.get_path(start_id, origin_id, page_id)
                        if os.path.exists(filename):
                            os.remove(filename)
                        else:
                            print(f"File {filename} does not exist")

            if browser_logs:
                for filename in os.listdir(self.log_dir):
                    if not filename == ".placeholder":
                        os.remove(os.path.join(self.log_dir, filename))

        def crash_callback(logs: list[dict]) -> None:
            pass

        super().run(browser, remote, browser_path, self.log_dir, generate, prune, crash_callback, collect_coverage, num_iterations)