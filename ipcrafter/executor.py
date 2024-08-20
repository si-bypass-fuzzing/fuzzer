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
from .util import *


TIMEOUT: int = 3
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


    
def kill_chrome_processes():
    os.system("killall -s 9 'playwright.sh'; killall -s 9 chrome; find /tmp -type f -name 'playwright*' -delete 2>/dev/null")

def kill_firefox_processes():
    os.system("killall -s 9 'playwright.sh'; killall -s 9 node; find /tmp -type f -name 'playwright*' -delete 2>/dev/null")
    
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
            if self.browser_type == "chrome":
                kill_chrome_processes()
            elif self.browser_type == "firefox":
                kill_firefox_processes()
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
            if self.browser_type == "chrome":
                kill_chrome_processes()
            elif self.browser_type == "firefox":
                kill_firefox_processes()
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

    if collect_coverage:
        os.environ["SHM_ID"] = SHM_NAME
    if browser_type == "firefox":
        os.environ["MOZ_LOG"] = "uxss_logger:5"
        os.environ["MOZ_LOG_FILE"] = os.path.join(log_dir, "firefox.log")
        # os.environ["MOZ_IPC_MESSAGE_LOG"] = "1"
    elif browser_type == "chrome":
        os.environ["CHROME_LOG_FILE"] = os.path.join(log_dir, "chrome.log")

    global start
    start = timer()

    ctr: Ctr

    if num_iterations is not None:
        ctr = MaxCtr(num_iterations)
    else:
        ctr = ResetCtr()

    
    cov: CoverageCollector|None = CoverageCollector() if collect_coverage else None

    stat_collector: JSStatCollector = JSStatCollector()

    while ctr.check():
        try:
            try:
                async with PlaywrightContextWrapper(async_playwright(), browser_type) as p:
                    if remote:
                        if browser_type == "chrome":
                            fut = p.chromium.connect_over_cdp(browser_path)
                        else:  # browser == "firefox"
                            fut = p.firefox.connect(browser_path)
                    else:
                        if browser_type == "chrome":
                            fut = p.chromium.launch(
                                executable_path=browser_path,
                                headless=HEADLESS,
                                chromium_sandbox=True,
                                args=[
                                    "--enable-logging",
                                    "--log-level=0",
                                    "--site-per-process",
                                ],
                                ignore_default_args=['--disable-background-networking', '--disable-ipc-flooding-protection', '--disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess', '--disable-renderer-backgrounding']
                            )
                        else:  # browser == "firefox"
                            fut = p.firefox.launch(
                                executable_path=browser_path,
                                headless=HEADLESS,
                            )

                    async with await fut as browser:
                        await exec_loop(
                            browser,
                            browser_type,
                            log_dir,
                            generate_callback,
                            prune_callback,
                            crash_callback,
                            ctr,
                            cov,
                            stat_collector
                        )
            except PlaywrightError as e:
                logging.error(e)
        except Exception as e:
            # generic catch for playwright runtime errors
            logging.error(e)
        prune_callback(True)
        if browser_type == "chrome":
            kill_chrome_processes()
        elif browser_type == "firefox":
            kill_firefox_processes()


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
    stat_collector: JSStatCollector
) -> None:

    async with BrowserContextWrapper(await browser.new_context(), browser_type) as context:
        we_handler: WebErrorHandler = WebErrorHandler()

        context.on("weberror", we_handler.handle)

        await visit_seeds(context)
        logging.info("Visited seeds")

        console_handler: ConsoleHandler = ConsoleHandler()

        while ctr.step():
            input_id = generate_callback()

            logging.info(f"Input: {input_id}")

            try:

                attacker_url = URLScope.to_url(1, 1, input_id)
                victim_url = URLScope.to_url(2, 1, input_id)
                await execute(context, attacker_url, victim_url, console_handler)

            except Exception as e:
                # these should be executed even if the browser crashes
                if coverage is not None:
                    coverage.write_coverage(input_id)
                logs = console_handler.get_logs()
                if len(logs) == 0:
                    raise PlaywrightError("Empty logs, context probably hangs")
                logging.debug(logs)
                if check_logs(browser_type, logs, log_dir, stat_collector):
                    crash_callback(logs)
                    raise PlaywrightError("UXSS detected")
                raise e

            if coverage is not None:
                coverage.write_coverage(input_id)

            logs = console_handler.get_logs()
            if len(logs) == 0:
                raise PlaywrightError("Empty logs, context probably hangs")
            logging.debug(logs)
            if check_logs(browser_type, logs, log_dir, stat_collector):
                crash_callback(logs)
                raise PlaywrightError("UXSS detected")

            prune_callback(False)

            current: float = timer()
            logging.info(f"Iteration: {ctr.value()}")
            logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
            logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")
            logging.info(stat_collector.log())

async def cleanup(context: BrowserContext) -> None:
    """Close all pages except the first two."""
    idx = 2
    while idx < len(context.pages):
        await context.pages[idx].close()


async def execute(
    context: BrowserContext, attacker_url: str, victim_url: str, console_handler: ConsoleHandler
) -> None:
    console_handler.clear()
    context.on("console", console_handler.handle)

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
        await iframe.get_by_text("foo").first.click()
        for button in await iframe.get_by_role("button").all():
            await button.click()

    buttons: list[Locator] = await page.get_by_role("button").all()
    for button in buttons:
        await button.click()

    fencedframes = await page.locator("fencedframe").all()
    for frame in fencedframes:
        await frame.click()

    links = await page.locator("a").all()
    for link in links:
        await link.click()


def check_logs(browser_type:str, logs: list[dict], log_dir: str, stat_collector: JSStatCollector) -> bool:
    assert browser_type in ["firefox", "chrome"]
    for log in logs:
        if "[UXSS]" in log["text"]:
            if general_false_positive_filter(log["text"]):
                continue

            if browser_type == "firefox" and firefox_false_positive_filter(log["text"]):
                continue
            elif browser_type == "chrome" and chrome_false_positive_filter(log["text"]):
                continue

            logging.info(log["text"])
            write_cause(log["text"], log_dir)
            return True
        if "JS_EXCEPTION" in log['text']:
            logging.error(log['text'])
            stat_collector.track_except("")
        if "JS_FINALLY" in log['text']:
            stat_collector.track_stmt()

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
                    if browser_type == "firefox" and firefox_false_positive_filter(line):
                        continue
                    elif browser_type == "chrome" and chrome_false_positive_filter(line):
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

def firefox_false_positive_filter(log: str) -> bool:
    if "D/uxss_logger" in log:
        idx:int = log.find(MAGIC)
        if idx < 1:
            return True
        if log[idx - 1] in ["#", "?", "/"]:
            # filter out known leak of visited URLs to all renderers
            return True
        if log[idx-1] in ["'", '"', "`"]:
            # filter out leaks of victim pages due to missing CORB
            return True            
    return False

def write_cause(cause:str, log_dir:str):
    with open(os.path.join(log_dir, "cause.txt"), "w") as f:
        f.write(cause)