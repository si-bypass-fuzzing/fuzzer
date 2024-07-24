"""Executor for Chrome v69"""

import asyncio
import subprocess
import atexit
import logging
import shutil
import signal
import sys
from typing import Any, Callable, Coroutine, Awaitable, Optional
from .jabby.generator.url import URLScope
from .jabby.generator.magic import MAGIC
from timeit import default_timer as timer
from datetime import timedelta
import os
import pyppeteer
from pyppeteer import launch
from pyppeteer.browser import Browser
from pyppeteer.page import Page, ConsoleMessage
from pyppeteer.launcher import Launcher, get_ws_endpoint
from pyppeteer.connection import Connection
import io
import random

TIMEOUT: int = 3
HEADLESS: bool = True
start: float

class PatchedLauncher(Launcher):
    async def patched_launch(self, pipe) -> Browser:  # noqa: C901
        """Start chrome process and return `Browser` object."""
        self.chromeClosed = False
        self.connection: Optional[Connection] = None

        options = dict()
        options['env'] = self.env

        self.proc = subprocess.Popen(  # type: ignore
            self.cmd, stdout=pipe, stderr=pipe, **options, )

        def _close_process(*args: Any, **kwargs: Any) -> None:
            if not self.chromeClosed:
                self._loop.run_until_complete(self.killChrome())

        # don't forget to close browser process
        if self.autoClose:
            atexit.register(_close_process)
        if self.handleSIGINT:
            signal.signal(signal.SIGINT, _close_process)
        if self.handleSIGTERM:
            signal.signal(signal.SIGTERM, _close_process)
        if not sys.platform.startswith('win'):
            # SIGHUP is not defined on windows
            if self.handleSIGHUP:
                signal.signal(signal.SIGHUP, _close_process)

        connectionDelay = self.slowMo
        self.browserWSEndpoint = get_ws_endpoint(self.url)
        logging.getLogger('pyppeeter').info(f'Browser listening on: {self.browserWSEndpoint}')
        self.connection = Connection(self.browserWSEndpoint, self._loop, connectionDelay, )
        browser = await Browser.create(self.connection, [], self.ignoreHTTPSErrors, self.defaultViewport, self.proc,
                                       self.killChrome)
        await self.ensureInitialPage(browser)
        return browser

async def patched_launch(pipe, options: dict = None, **kwargs: Any) -> Browser:
    return await PatchedLauncher(options, **kwargs).patched_launch(pipe)


class Ctr:
    def __init__(self):
        self.i: int = 0

    def step(self) -> bool:
        self.i += 1
        return True

    def check(self) -> bool:
        return True

    def value(self) -> int:
        return self.i

class MaxCtr(Ctr):
    def __init__(self, max: int):
        super().__init__()
        self.max: int = max

    def step(self) -> bool:
        self.i += 1
        return self.i < self.max

    def check(self) -> bool:
        return self.i < self.max
    
class ResetCtr(Ctr):
    def __init__(self, interval:int = 100):
        super().__init__()
        self.interval:int = interval

    def step(self) -> bool:
        self.i += 1
        return self.i % self.interval != 0

    def check(self) -> bool:
        return True

def kill_chrome_processes():
    os.system("killall -s 9 node; killall -s 9 chrome")

class PyppeteerBrowserWrapper():
    def __init__(self, browser:Browser, log_dir:str):
        self.browser = browser

    async def __aenter__(self) -> Browser:
        return self.browser

    async def __aexit__(self, type, value, traceback):
        try:
            await asyncio.wait_for(self.browser.close(), timeout=TIMEOUT * 0.25)
        except asyncio.TimeoutError as e:
            logging.error("PyppeteerBrowserWrapper exit timeout")
            kill_chrome_processes()
            try:
                await asyncio.wait_for(self.browser.close(), timeout=TIMEOUT * 0.25)
            except asyncio.TimeoutError:
                raise Exception("PyppeteerBrowserWrapper exit timeout")

async def fuzz(
    browser_path: str,
    log_dir: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    num_iterations: int | None,
):
    os.environ["CHROME_LOG_FILE"] = os.path.join(log_dir, "chrome.log")

    global start
    start = timer()

    ctr: Ctr

    if num_iterations is not None:
        ctr = MaxCtr(num_iterations)
    else:
        ctr = ResetCtr()

    while ctr.check():
        try:
            with open(os.path.join(log_dir, f"browser-{ctr.i}.log"), "w") as browser_out:
                fut = patched_launch(
                    browser_out,
                    {'headless': HEADLESS,
                    'executablePath': browser_path,
                    'args': ['--site-per-process', '--enable-logging', '--log-level=0'], # , '--enable-logging=stderr'
                    'logLevel': 0,
                    'ignoreDefaultArgs': ['--disable-features=site-per-process'],
                    },
                )
                async with PyppeteerBrowserWrapper(await asyncio.wait_for(fut, timeout=TIMEOUT*0.25), log_dir) as browser:
                    await exec_loop(
                        browser,
                        log_dir,
                        generate_callback,
                        prune_callback,
                        crash_callback,
                        ctr,
                        browser_out
                    )
        except Exception as e:
            logging.exception(e)
        prune_callback(True)
        kill_chrome_processes()

async def visit_seeds(browser:Browser) -> None:
    for origin_id in range(1,3):
        url = URLScope.to_origin(origin_id) + "/seed"
        page = await browser.newPage()
        await page.goto(url)

async def exec_loop(
        browser:Browser,
        log_dir: str,
        generate_callback: Callable[[], int],
        prune_callback: Callable[[bool], None],
        crash_callback: Callable[[list[dict]], None],
        ctr: Ctr,
        browser_logs,
    ) -> None:

    await visit_seeds(browser)
    logging.info("Visited seeds")

    while ctr.step():
        input_id = generate_callback()

        logging.info(f"Input: {input_id}")

        attacker_url = URLScope.to_url(1, 1, input_id)
        victim_url = URLScope.to_url(2, 1, input_id)
        logs = await execute(browser, attacker_url, victim_url)

        if len(logs) == 0:
            raise Exception("Empty logs, context probably hangs")
        logging.debug(logs)
        if check_logs(logs, browser_logs, log_dir):
            crash_callback(logs)
            raise Exception("UXSS detected")

        prune_callback(False)

        current: float = timer()
        logging.info(f"Iteration: {ctr.value()}")
        logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
        logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")

async def cleanup(browser: Browser) -> None:
    """Close all pages except the first two."""
    idx = 2
    while idx < len(await browser.pages()):
        pages = await browser.pages()
        await pages[idx].close()

async def execute(browser:Browser, attacker_url:str, victim_url:str)->list[dict]:
    logs: list[dict] = []

    def on_console(msg: ConsoleMessage) -> None:
        """Copy the message but convert the args to json values if possible."""
        
        msg_copy = {
            "text": msg.text,
            "type": msg.type,
        }
        logs.append(msg_copy)

    fut = open_page(browser, victim_url, on_console)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT * 0.5)
    except asyncio.TimeoutError:
        logging.warning("Testcase Timeout")

    fut = visit_page(browser, attacker_url, on_console)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT)
    except asyncio.TimeoutError:
        logging.warning("Testcase Timeout")

    fut = cleanup(browser)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT * 0.5)
    except asyncio.TimeoutError:
        pass

    return logs

async def open_page(browser: Browser, url:str, console_handler: Callable[[ConsoleMessage], None]) -> None:
    page = await browser.newPage()
    page.on("console", console_handler)
    await page.goto(url)

async def visit_page(browser: Browser, url: str, console_handler: Callable[[ConsoleMessage], None]) -> None:
    page = await browser.newPage()
    page.on("console", console_handler)
    await page.goto(url)

    idx = 2
    while idx < len(await browser.pages()):
        pages = await browser.pages()
        await click_everything(pages[idx])
        idx += 1
        
async def click_everything(page: Page) -> None:
    await page.bringToFront()
    if page.mainFrame is not None:
        try:
            await page.mainFrame.click('.button')
        except:
            pass
        try:
            await page.mainFrame.click('.a')
        except:
            pass
        for frame in page.mainFrame.childFrames:
            try:
                await frame.click('.button')
            except:
                pass
            try:
                await frame.click('.a')
            except:
                pass

def check_logs(logs: list[dict], buf, log_dir:str) -> bool:
    for log in logs:
        if "[UXSS]" in log["text"]:
            if general_false_positive_filter(log["text"]):
                continue

            if chrome_false_positive_filter(log["text"]):
                continue

            logging.info(log["text"])
            write_cause(log["text"], log_dir)
            return True

    for filename in os.listdir(log_dir):
        if filename.startswith("asan.log"):
            with open(os.path.join(log_dir, filename), "r") as f:
                lines = f.readlines()
                if "SEGV on unknown address 0x000000000000 " in lines[1]:
                    # skip MOZ_CRASH crashes invoked by the browser on invalid ipc messages
                    # also skip nullpointer dereferences
                    os.remove(os.path.join(log_dir, filename))
                    continue
            logging.info("ASAN detected a bug")
            write_cause("ASAN", log_dir)
            return True
        with open(os.path.join(log_dir, filename), "r") as f:
            for line in f.readlines():
                if "[UXSS]" in line:
                    if chrome_false_positive_filter(line):
                        continue

                    logging.info(line)
                    write_cause(line, log_dir)
                    return True
    return False

def general_false_positive_filter(log: str) -> bool:
    idx: int = log.find("[UXSS]")
    if idx > 0 and log[idx - 1] in ["'", '"', "`"]:
        return True
    return False

def chrome_false_positive_filter(log: str) -> bool:
    return False

def write_cause(cause:str, log_dir:str):
    with open(os.path.join(log_dir, "cause.txt"), "w") as f:
        f.write(cause)