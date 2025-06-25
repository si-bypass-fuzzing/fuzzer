"""Executor for WebKitGTK"""

import subprocess
import logging
import shutil
import signal
import sys
from typing import Any, Callable, Coroutine, Awaitable, Optional
from .jabby.generator.url import URLScope
from .jabby.generator.magic import MAGIC
from timeit import default_timer as timer
from datetime import timedelta
from selenium import webdriver
from selenium.webdriver.webkitgtk.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
import io
import random
import time
from pathlib import Path
import os
from time import sleep

from .util import Ctr, MaxCtr, ResetCtr

WEBKIT_PATH = os.path.join(os.getcwd(), "browsers", "webkit-ipc-fuzzing")
WEBKIT_BINARY_PATH = "/app/webkit/WebKitBuild/GTK/Debug/bin/MiniBrowser" # this is the path inside the flatpak container
WEBDRIVER_PORT  = 9222

TIMEOUT: int = 3
HEADLESS: bool = True
start: float

class WebDriverProcess:
    def __init__(self, log_path):
        self.process = None
        self.cmd = ["/usr/bin/python3", "Tools/Scripts/run-webdriver", "--debug", "--gtk", "--port", f"{WEBDRIVER_PORT}"]
        if HEADLESS:
            self.cmd.insert(0, "xvfb-run") # Safari does not support headless mode
        self.log_path = log_path
        self.logfile = open(self.log_path, "w")

    def __enter__(self):
        self._launch()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._close()

    def _launch(self):
        logging.info("Launching webdriver process %s %s", self.cmd, WEBKIT_PATH)
        self.process = subprocess.Popen(self.cmd, stdout=self.logfile, stderr=self.logfile, cwd=WEBKIT_PATH, text=True, env={"WEBKIT_DEBUG": "IPCFuzzer"} )
        # logging.info("WebDriver process launched with PID: %s", self.process.pid)
        # input("Press Enter to continue...")
        # self.debug()

    def _close(self):
        if self.process is not None:
            logging.info("Killing WebDriver process with PID: %s", self.process.pid)
            self.process.kill()
            try:
                self.process.wait(1)
            except TimeoutError:
                logging.error("TimeoutError while waiting for process to exit")
                pass

            os.system("killall -9 WebKitWebDriver")
            os.system("killall -9 Xvfb")
            os.system("killall -9 xvfb-run")

            self.process.kill()
            try:
                self.process.wait(1)
            except TimeoutError:
                logging.error("TimeoutError while waiting for process to exit")
                pass

            self.process = None
            self.logfile.close()
            # print(os.system("ps -e"))
            # sleep(2)

    def logs(self):
        with open(self.log_path, "r") as logfile:
            yield from logfile.readlines()

    def debug(self):
        for line in self.logs():
            logging.info(line.strip())

def selenium_logging():
    logger = logging.getLogger('selenium')
    logger.setLevel(logging.DEBUG)
    handler = logging.FileHandler("selenium.log")
    logger.addHandler(handler)

    logging.getLogger('selenium.webdriver.remote').setLevel(logging.DEBUG)
    logging.getLogger('selenium.webdriver.common').setLevel(logging.DEBUG)

class SeleniumWrapper:
    def __init__(self):
        self.driver = None

    def __enter__(self):
        self._launch()
        return self.driver

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._close()

    def _launch(self):
        # cap = DesiredCapabilities().WEBKITGTK.copy()
        options = Options()
        options.binary_location = WEBKIT_BINARY_PATH
        options.add_argument("--automation")
        options.add_argument("--features=+SiteIsolation")
        options.add_argument("--enable-write-console-messages-to-stdout=1")
        self.driver = webdriver.Remote(command_executor=f"http://127.0.0.1:{WEBDRIVER_PORT}", options=options)

    def _close(self):
        if self.driver:
            logging.info("Closing Selenium driver")
            self.driver.quit()
        self.driver = None


def kill_webkit_processes():
    pass

def fuzz(
    browser_path: str,
    log_dir: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    num_iterations: int | None,
    browse_seeds: bool = True,
):
    global start
    start = timer()

    ctr: Ctr

    if num_iterations is not None:
        ctr = MaxCtr(num_iterations)
    else:
        ctr = ResetCtr()

    while ctr.check():
        try:
            browser_out = os.path.join(log_dir, f"browser-{ctr.i}.log")
            with WebDriverProcess(browser_out) as driver_process:
                sleep(2)
                logging.info("connecting to webdriver")
                with SeleniumWrapper() as driver:
                    logging.info("webdriver connected")
                    exec_loop(driver, driver_process, log_dir, generate_callback, prune_callback, crash_callback, ctr, browse_seeds)
        except Exception as e:
            logging.exception(e)
        prune_callback(True)

def visit_seeds(driver) -> None:
    for origin_id in range(1,3):
        url = URLScope.to_origin(origin_id) + "/seed"
        driver.switch_to.new_window('tab')
        driver.get(url)

def exec_loop(
        driver,
        driver_process,
        log_dir: str,
        generate_callback: Callable[[], int],
        prune_callback: Callable[[bool], None],
        crash_callback: Callable[[list[dict]], None],
        ctr: Ctr,
        browse_seeds: bool = True,
    ) -> None:
    logging.info("exec-loop")
    driver.command_executor.set_timeout(3)

    global start
    if browse_seeds:
        visit_seeds(driver)
        logging.info("Visited seeds")

    while ctr.step():
        input_id = generate_callback()

        logging.info(f"Input: {input_id}")

        attacker_url = URLScope.to_url(1, 1, input_id)
        victim_url = URLScope.to_url(2, 1, input_id)
        execute(driver, attacker_url, victim_url)

        logs = [log for log in driver_process.logs()]

        if len(logs) == 0:
            raise Exception("Empty logs, context probably hangs")
        # logging.info(logs)
        if check_logs(logs, log_dir):
            crash_callback(logs)
            raise Exception("UXSS detected")

        prune_callback(False)

        current: float = timer()
        logging.info(f"Iteration: {ctr.value()}")
        logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
        logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")

def cleanup(driver) -> None:
    """Close all pages except the first two."""
    logging.info("cleanup")
    while len(driver.window_handles) > 3:
        try:
            driver.switch_to.window(driver.window_handles[-1])
            driver.close()
        except Exception as e:
            # if isinstance(e,DMSException):
            #     raise e
            pass
    driver.switch_to.window(driver.window_handles[-1])


def execute(driver, attacker_url:str, victim_url:str):
    logging.info("execute")
    open_page(driver, victim_url)
    visit_page(driver, attacker_url)
    cleanup(driver)

def open_page(driver, url:str) -> None:
    logging.info("open_page")
    driver.switch_to.new_window('tab')
    driver.get(url)

def visit_page(driver, url: str) -> None:
    logging.info("visit_page")
    driver.switch_to.new_window('tab')
    driver.get(url)

    idx = 3
    while idx < len(driver.window_handles):
        driver.switch_to.window(driver.window_handles[idx])
        click_everything(driver)
        idx += 1

def click_everything(driver, recur: bool = False) -> None:
    logging.info("click_everything")
    for button in driver.find_elements(By.TAG_NAME, 'button'):
        button.click()
    for link in driver.find_elements(By.TAG_NAME, 'a'):
        link.click()
    for iframe in driver.find_elements(By.TAG_NAME, 'iframe'):
        driver.switch_to.frame(iframe)
        click_everything(driver, True)
    if not recur:
        driver.switch_to.default_content()

def check_logs(logs: list[str], log_dir:str) -> bool:
    logging.info("check_logs")
    for log in logs:
        if "[UXSS]" in log:
            if general_false_positive_filter(log):
                continue

            if webkit_false_positive_filter(log):
                continue

            logging.info(log)
            write_cause(log, log_dir)
            return True
    return False

def general_false_positive_filter(log: str) -> bool:
    idx: int = log.find("[UXSS]")
    if idx > 0 and log[idx - 1] in ["'", '"', "`"]:
        return True
    return False

def webkit_false_positive_filter(log: str) -> bool:
    return False

def write_cause(cause:str, log_dir:str):
    with open(os.path.join(log_dir, "cause.txt"), "w") as f:
        f.write(cause)
