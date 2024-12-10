import asyncio
import json
import os
import shutil
import logging
from typing import Callable

from . import executor

NUM_REPRO_STEPS = 12

class Reproducer():

    def __init__(self, server_dir: str = "repro", crash_dir: str = "crash", log_dir: str = "logs"):
        self.server_dir = server_dir
        self.crash_dir = crash_dir
        self.log_dir = log_dir
        self.input_id : int  = 0
        self.min : int = 0
        self.max : int = 0

        self.origin_dirs: list[str] = [f"origin-{i}" for i in range(1, 3)]

        os.makedirs(self.server_dir, exist_ok=True)
        for origin_dir in self.origin_dirs:
            os.makedirs(os.path.join(self.server_dir, origin_dir), exist_ok=True)
        os.makedirs(self.log_dir, exist_ok=True)
        os.makedirs(self.crash_dir, exist_ok=True)

    def run(
        self,
        browser_type: str,
        remote: bool,
        browser_path: str,
        log_dir: str,
        generate_callback: Callable[[], int],
        prune_callback: Callable[[bool], None],
        crash_callback: Callable[[list[dict]], None],
    ) -> None:
        asyncio.run(
            executor.fuzz(
                browser_type,
                remote,
                browser_path,
                log_dir,
                generate_callback,
                prune_callback,
                crash_callback,
                collect_coverage=False,
                num_iterations=NUM_REPRO_STEPS,
                browse_seeds=True,
            )
        )

    def reproduce(self, src_dir: str, browser: str, remote: bool, browser_path: str) -> None:
        logging.warn(f"Reproduce called with src_dir={src_dir}, browser={browser}, remote={remote}, browser_path={browser_path}")
        # get the min and max input id from the src_dir
        files = os.listdir(os.path.join(src_dir, "origin-1"))
        files = sorted(filter(lambda x: x.startswith("input-") and x.endswith(".html"), files))
        self.min = int(files[0].split('_')[0].split('-')[1])
        self.max = int(files[-1].split('_')[0].split('-')[1])

        self.input_id = self.min - 1

        # backup the sw.js files to sw-{max}.js
        for origin_dir in self.origin_dirs:
            shutil.copy2(os.path.join(src_dir, origin_dir, "sw.js"), os.path.join(src_dir, origin_dir, f"sw-{self.max}.js"))

        def generate() -> int:
            self.input_id += 1
            # copy the input file to the working dir
            for origin_dir in self.origin_dirs:
                for page_number in range(1,3):
                    shutil.copy2(os.path.join(src_dir, origin_dir, f"input-{self.input_id}_page-{page_number}.html"), os.path.join(self.server_dir, origin_dir, f"input-{self.input_id}_page-{page_number}.html"))
                # copy the sw.js file to the working dir
                shutil.copy2(os.path.join(src_dir, origin_dir, f"sw-{self.input_id}.js"), os.path.join(self.server_dir, origin_dir, "sw.js"))
                shutil.copy2(os.path.join(src_dir, origin_dir, f"seed.html"), os.path.join(self.server_dir, origin_dir, "seed.html"))

            return self.input_id

        def prune(is_crash: bool) -> None:
            pass

        def save_crash(logs: list[dict]) -> None:
            os.makedirs(os.path.join(self.crash_dir, str(self.input_id)), exist_ok=True)
            with open(
                os.path.join(self.crash_dir, str(self.input_id), "logs.json"), "w"
            ) as f:
                json.dump(logs, f)

            shutil.copytree(
                self.log_dir,
                os.path.join(self.crash_dir, str(self.input_id), "logs"),
                dirs_exist_ok=True,
            )

        self.run(browser, remote, browser_path, self.log_dir, generate, prune, save_crash)
