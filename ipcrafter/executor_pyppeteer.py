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
import psutil
import time

from .util import Ctr, MaxCtr, ResetCtr, DMSException, DeadMansSwitch


TIMEOUT: int = 3
HEADLESS: bool = True
start: float

launcher = None

pyppeteer.DEBUG = True

dms = None



class PatchedLauncher(Launcher):
    async def patched_launch(self, pipe) -> Browser:  # noqa: C901
        """Start chrome process and return `Browser` object."""
        logging.info("patched_launch")
        self.chromeClosed = False
        self.connection: Optional[Connection] = None

        options = dict()
        options['env'] = self.env

        self.proc = subprocess.Popen(  # type: ignore
            self.cmd, stdout=pipe, stderr=pipe, **options, )

        def _close_process(*args: Any, **kwargs: Any) -> None:
            self._loop.run_until_complete(self.close_process)

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
        browser = await asyncio.wait_for(Browser.create(self.connection, [], self.ignoreHTTPSErrors, self.defaultViewport, self.proc,
                                       self.close_process), timeout=TIMEOUT)
        await asyncio.wait_for(self.ensureInitialPage(browser), timeout=TIMEOUT)
        return browser
    
    async def close_process(self) -> None:
        logging.info("close_process")
        if not self.chromeClosed:
            try:
                await asyncio.wait_for(super().killChrome(), timeout=1)
            except Exception as e:
                if isinstance(e,DMSException):
                    raise e
                pass
        try:
            # self.proc.kill()
            kill_chrome_processes()
            # try:
            #     proc.wait(timeout=1)
            # except subprocess.TimeoutExpired:
            #     pass
            # self.proc.wait()
        except Exception as e:
            if isinstance(e,DMSException):
                raise e

async def patched_launch(pipe, options: dict|None = None, **kwargs: Any) -> Browser:
    logging.info("global patched_launch")
    global launcher
    launcher = PatchedLauncher(options, **kwargs)# type: ignore
    return await launcher.patched_launch(pipe) 




def kill_chrome_processes():
    logging.error("kill_chrome_processes")
    os.system("pkill -9 chrome")

    current_process = psutil.Process()
    children = current_process.children(recursive=True)
    logging.error(f"Waiting for {len(children)} children")
    psutil.wait_procs(children, timeout=3)

class PyppeteerBrowserWrapper():
    def __init__(self, browser:Browser, log_dir:str):
        self.browser = browser

    async def __aenter__(self) -> Browser:
        logging.info("enter")
        return self.browser

    async def __aexit__(self, type, value, traceback):
        logging.info("exit")
        try:
            await asyncio.wait_for(self.browser.close(), timeout=TIMEOUT * 0.25)
        except asyncio.TimeoutError as e:
            logging.error("PyppeteerBrowserWrapper exit timeout")
            kill_chrome_processes()
            try:
                await asyncio.wait_for(self.browser.close(), timeout=TIMEOUT * 0.25)
            except asyncio.TimeoutError:
                raise Exception("PyppeteerBrowserWrapper exit timeout")
        except Exception as e:
            if isinstance(e,DMSException):
                raise e
            else:
                kill_chrome_processes()

async def fuzz(
    browser_path: str,
    log_dir: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    num_iterations: int | None,
    browse_seeds: bool = True,
):
    os.environ["CHROME_LOG_FILE"] = os.path.join(log_dir, "chrome.log")

    global start
    start = timer()

    global dms
    dms = DeadMansSwitch(180)
    await dms.start()

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
                async with PyppeteerBrowserWrapper(await asyncio.wait_for(fut, timeout=TIMEOUT), log_dir) as browser:
                    await exec_loop(
                        browser,
                        log_dir,
                        generate_callback,
                        prune_callback,
                        crash_callback,
                        ctr,
                        browser_out,
                        browse_seeds=browse_seeds,
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
        browse_seeds: bool = True,
    ) -> None:
    logging.info("exec-loop")

    if browse_seeds:
        await asyncio.wait_for(visit_seeds(browser), timeout=TIMEOUT)
        logging.info("Visited seeds")

    global dms

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

        if dms is not None:
            dms.signal()

        current: float = timer()
        logging.info(f"Iteration: {ctr.value()}")
        logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
        logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")

async def cleanup(browser: Browser) -> None:
    """Close all pages except the first two."""
    logging.info("cleanup")
    idx = 3
    while idx < len(await browser.pages()):
        try:
            pages = await browser.pages()
            await pages[idx].close()
        except Exception as e:
            if isinstance(e,DMSException):
                raise e
            pass

async def execute(browser:Browser, attacker_url:str, victim_url:str)->list[dict]:
    logging.info("execute")
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
    except Exception as e:
        if isinstance(e,DMSException):
            raise e
        logging.exception(e)

    fut = cleanup(browser)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT * 0.5)
    except asyncio.TimeoutError:
        pass

    return logs

async def open_page(browser: Browser, url:str, console_handler: Callable[[ConsoleMessage], None]) -> None:
    logging.info("open_page")
    page = await browser.newPage()
    page.on("console", console_handler)
    await page.goto(url)

async def visit_page(browser: Browser, url: str, console_handler: Callable[[ConsoleMessage], None]) -> None:
    logging.info("visit_page")
    page = await browser.newPage()
    page.on("console", console_handler)
    await page.goto(url)

    idx = 3
    while idx < len(await browser.pages()):
        pages = await browser.pages()
        await click_everything(pages[idx])
        idx += 1
        
async def click_everything(page: Page) -> None:
    logging.info("click_everything")
    await page.bringToFront()
    if page.mainFrame is not None:
        try:
            await page.mainFrame.click('.button')
        except Exception as e:
            if isinstance(e,DMSException):
                raise e
            pass
        try:
            await page.mainFrame.click('.a')
        except Exception as e:
            if isinstance(e,DMSException):
                raise e
            pass
        for frame in page.mainFrame.childFrames:
            try:
                await frame.click('.button')
            except Exception as e:
                if isinstance(e,DMSException):
                    raise e
                pass
            try:
                await frame.click('.a')
            except Exception as e:
                if isinstance(e,DMSException):
                    raise e
                pass

def check_logs(logs: list[dict], buf, log_dir:str) -> bool:
    logging.info("check_logs")
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
                    if general_false_positive_filter(line):
                        continue
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