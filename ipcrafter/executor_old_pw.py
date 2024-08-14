"""Executor for Chrome v99"""

import asyncio
import logging
from playwright.async_api import (
    async_playwright,
    Browser,
    BrowserContext,
    ConsoleMessage,
    Page,
    Locator,
    Frame,
    Playwright,
    ElementHandle,
    Error as PlaywrightError,
)
from playwright.async_api._context_manager import PlaywrightContextManager

from typing import Callable
from .jabby.generator.url import URLScope
from .jabby.generator.magic import MAGIC
from timeit import default_timer as timer
from datetime import timedelta
import os
from .shm import CoverageCollector, SHM_NAME, SHM_SIZE
import secrets
import psutil
import os
import subprocess
import requests
import time

TIMEOUT: int = 5
HEADLESS: bool = True
start: float


"""
const { firefox } = require('playwright');
(async () => {
    let ff_path = "/home/jn/git/gecko-dev/obj-tf-release/dist/firefox/firefox";
    const server = await firefox.launchServer({ headless: false, executablePath: ff_path , devtools: true});
    console.log(server.wsEndpoint());
})();
"""

dms = None

class DMSException(Exception):
    pass

class DeadMansSwitch:
    def __init__(self, timeout):
        self.timeout = timeout
        self.last_signal_time = time.time()
        self.loop = asyncio.get_event_loop()
        self.monitor_task = None

    async def start(self):
        self.monitor_task = asyncio.ensure_future(self._monitor())

    def signal(self):
        self.last_signal_time = time.time()

    async def _monitor(self):
        while True:
            await asyncio.sleep(1)  # check every second
            if time.time() - self.last_signal_time > self.timeout:
                await self._handle_timeout()

    async def _handle_timeout(self):
        # kill_chrome_processes()
        logging.error("DMS")
        raise DMSException("Dead man's switch triggered: loop has not sent a signal for the specified timeout period.")

class BrowserProcess:
    def __init__(self, path:str, headless:bool, log_dir, pipe):

        log_file = os.path.join(log_dir, "chromium.log")

        self.cmd = [ f"{path}","--disable-popup-blocking","--no-first-run",
        "--enable-logging=stderr", "--v=1","--log-level=0","--site-per-process",
        "--password-store=basic","--use-mock-keychain","--no-service-autorun","--export-tagged-pdf","--hide-scrollbars","--mute-audio",
        "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
        "--disable-prompt-on-repost","--disable-sync","--force-color-profile=srgb","--metrics-recording-only","--disable-breakpad","--disable-client-side-phishing-detection",
        "--disable-component-extensions-with-background-pages","--disable-default-apps","--disable-extensions",
        "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,MediaRouter,AcceptCHFrame,AutoExpandDetailsElement",
        "--allow-pre-commit-input","--disable-hang-monitor","--disable-background-timer-throttling","--disable-backgrounding-occluded-windows",
        "--enable-automation","--no-startup-window"
        f"--user-data-dir=/tmp/chromium-{secrets.token_hex(6)}","--remote-debugging-port=9222", "--disable-gpu", "--auto-open-devtools-for-tabs "]
        if headless:
            self.cmd += ['--headless']
        # self.cmd += [f">{log_file}", "2>&1"]

        options = dict()
        # options['env'] = self.env

        logging.info(" ".join(self.cmd))

        self.proc = subprocess.Popen(  # type: ignore
            self.cmd, stdout=pipe, stderr=pipe, **options, )

        time.sleep(1)

    def cdp_endpoint(self):
        # resp = requests.get("http://127.0.0.1:9222")
        # data = resp.json()
        # return data["webSocketDebuggerUrl"]
        return "http://127.0.0.1:9222"

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self.proc.kill()
        # kill_chrome_processes()

def kill_chrome_processes():
    logging.error("kill_chrome_processes")
    os.system("pkill -9 chrome")
    # pkill -9 xvfb-run; pkill -9 Xvfb; 

    current_process = psutil.Process()
    children = current_process.children(recursive=True)
    logging.error(f"Waiting for {len(children)} children")
    psutil.wait_procs(children, timeout=3)


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
    
    
class BrowserContextWrapper():
    def __init__(self, context: BrowserContext, browser_type: str):
        self.context = context
        self.browser_type = browser_type

    async def __aenter__(self) -> BrowserContext:
        return self.context
    
    async def __aexit__(self, type, value, traceback):
        try:
            await asyncio.wait_for(self.context.close(), timeout=TIMEOUT * 0.25)
        except asyncio.TimeoutError as e:
            logging.error("BrowserContextWrapper exit timeout")
            kill_chrome_processes()
            try:
                await asyncio.wait_for(self.context.close(), timeout=TIMEOUT * 0.25)
            except asyncio.TimeoutError:
                raise Exception("BrowserContextWrapper exit timeout")
            

class PlaywrightContextWrapper():
    def __init__(self, context: PlaywrightContextManager, browser_type: str):
        self.context = context
        self.browser_type = browser_type

    async def __aenter__(self) -> Playwright:
        return await self.context.__aenter__()
    
    async def __aexit__(self, type, value, traceback):
        try:
            await asyncio.wait_for(self.context.__aexit__(self, type, value, traceback), timeout=TIMEOUT * 0.25)
        except asyncio.TimeoutError as e:
            logging.error("PlaywrightContextWrapper exit timeout")
            kill_chrome_processes()
            try:
                await asyncio.wait_for(self.context.__aexit__(self, type, value, traceback), timeout=TIMEOUT * 0.25)
            except asyncio.TimeoutError:
                raise Exception("PlaywrightContextWrapper exit timeout")


async def fuzz(
    browser_type: str,
    remote: bool,
    browser_path: str,
    log_dir: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    collect_coverage: bool,
    num_iterations: int | None,
):
    # os.environ["PWDEBUG"] = "1"
    # os.environ["DEBUG"] = "pw:browser"
    os.environ["ASAN_OPTIONS"] = (
        f"log_path={os.path.join(log_dir, f'asan.log')}:detect_odr_violation=1:abort_on_error=1:disable_coredump=0:unmap_shadow_on_exit=1"
    )

    collect_coverage = False
    if collect_coverage:
        os.environ["SHM_ID"] = SHM_NAME

    global start
    start = timer()

    global dms
    dms = DeadMansSwitch(180)
    dms.start()

    ctr: Ctr

    if num_iterations is not None:
        ctr = MaxCtr(num_iterations)
    else:
        ctr = ResetCtr()

    
    cov: CoverageCollector|None = CoverageCollector() if collect_coverage else None
    while ctr.check():
        try:
            with open(os.path.join(log_dir, f"browser-{ctr.i}.log"), "w") as browser_out:
                with BrowserProcess(browser_path,HEADLESS,log_dir, browser_out) as browser_process:
                    try:
                        async with PlaywrightContextWrapper(async_playwright(), browser_type) as p:
                            fut = p.chromium.connect_over_cdp(browser_process.cdp_endpoint())
                            async with await fut as browser:
                                await exec_loop(
                                    browser,
                                    browser_type,
                                    log_dir,
                                    generate_callback,
                                    prune_callback,
                                    crash_callback,
                                    ctr,
                                    cov
                                )
                    except PlaywrightError as e:
                        logging.exception(e)
        except Exception as e:
            # generic catch for playwright runtime errors
            print(e)
            logging.exception(e)
        prune_callback(True)
        kill_chrome_processes()



async def visit_seeds(context: BrowserContext) -> None:
    for origin_id in range(1, 3):
        url = URLScope.to_origin(origin_id) + "/seed"
        page = await context.new_page()
        await page.goto(url)


async def exec_loop(
    browser: Browser,
    browser_type: str,
    log_dir: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    ctr: Ctr,
    coverage: CoverageCollector|None,
) -> None:

    async with BrowserContextWrapper(await browser.new_context(), browser_type) as context:
        context.on("weberror", lambda e: logging.warning(e.error))

        await visit_seeds(context)
        logging.info("Visited seeds")

        while ctr.step():
            input_id = generate_callback()

            logging.info(f"Input: {input_id}")

            attacker_url = URLScope.to_url(1, 1, input_id)
            victim_url = URLScope.to_url(2, 1, input_id)
            logs = await execute(context, attacker_url, victim_url)

            if coverage is not None:
                coverage.write_coverage(input_id)

            if len(logs) == 0 and len(os.listdir(log_dir)) == 0:
                raise PlaywrightError("Empty logs, context probably hangs")
            logging.debug(logs)
            if check_logs(browser_type, logs, log_dir):
                crash_callback(logs)
                raise PlaywrightError("UXSS detected")

            prune_callback(False)

            dms.signal()

            current: float = timer()
            logging.info(f"Iteration: {ctr.value()}")
            logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
            logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")
        # playwright timeout error here, probably cannot destroy context

async def cleanup(context: BrowserContext) -> None:
    """Close all pages except the first two."""
    idx = 2
    while idx < len(context.pages):
        await context.pages[idx].close()


async def execute(
    context: BrowserContext, attacker_url: str, victim_url: str
) -> list[dict]:
    logs: list[dict] = []

    async def on_console(msg: ConsoleMessage):
        """Copy the message but convert the args to json values if possible."""
        msg_copy = {
            "location": msg.location,
            "text": msg.text,
            "type": msg.type,
            "args": [],
        }
        for arg in msg.args:
            try:
                msg_copy["args"].append(await arg.json_value())
            except:
                pass
        logs.append(msg_copy)

    context.on("console", on_console)

    fut = open_page(context, victim_url)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT * 0.5)
    except asyncio.TimeoutError:
        logging.warning("Testcase Timeout")

    fut = visit_page(context, attacker_url)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT)
    except asyncio.TimeoutError:
        logging.warning("Testcase Timeout")

    fut = cleanup(context)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT * 0.5)
    except asyncio.TimeoutError:
        pass

    return logs


async def open_page(context: BrowserContext, url: str) -> None:
    page = await context.new_page()
    await page.goto(url)


async def visit_page(context: BrowserContext, url: str) -> None:
    page = await context.new_page()
    await page.goto(url)

    idx = 2
    while idx < len(context.pages):
        await click_everything(context.pages[idx])
        idx += 1


async def click_everything(page: Page) -> None:
    iframes: list[Frame] = page.frames
    for iframe in iframes:
        texts = await iframe.query_selector_all('text="foo"')
        if len(texts) > 0:
            await texts[0].click()
        for button in await iframe.query_selector_all("button"):
            await button.click()

    buttons: list[ElementHandle] = await page.query_selector_all("button")
    for button in buttons:
        await button.click()

    links = await page.query_selector_all("a")
    for link in links:
        await link.click()


def check_logs(browser_type:str, logs: list[dict], log_dir: str) -> bool:
    assert browser_type in ["firefox", "chrome"]
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

    # TODO: similar filter for chrome

def general_false_positive_filter(log: str) -> bool:
    idx: int = log.find("[UXSS]")
    if idx > 0 and log[idx - 1] in ["'", '"', "`"]:
        return True
    return False

def chrome_false_positive_filter(log: str) -> bool:
    if "http\\x00\\x00\\x00\\x00(\\x00\\x00\\x00 \\x00\\x00\\x008bf18cb9455f4a8e8fa93d14ab5ebb5d" in log:
        return True
    return False


def write_cause(cause:str, log_dir:str):
    with open(os.path.join(log_dir, "cause.txt"), "w") as f:
        f.write(cause)