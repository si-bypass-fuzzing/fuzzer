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
    Error as PlaywrightError,
)

from typing import Callable
from .jabby.generator.url import URLScope
from timeit import default_timer as timer
from datetime import timedelta
import os

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



async def fuzz(
    browser_type: str,
    remote: bool,
    browser_path: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[list[dict]], None],
    num_iterations: int | None,
):
    # os.environ["PWDEBUG"] = "1"
    # os.environ["DEBUG"] = "pw:browser"

    if browser_type == "firefox":
        os.environ["MOZ_LOG"] = "ipc_logger:5"
        os.environ["MOZ_LOG_FILE"] = "firefox.log"

    global start
    start = timer()

    ctr: Ctr

    if num_iterations is not None:
        ctr = MaxCtr(num_iterations)
    else:
        ctr = Ctr()

    while ctr.check():
        try:
            async with async_playwright() as p:
                if remote:
                    if browser_type == "chrome":
                        fut = p.chromium.connect_over_cdp(browser_path)
                    else:  # browser == "firefox"
                        fut = p.firefox.connect(browser_path)
                else:
                    if browser_type == "chrome":
                        fut = p.chromium.launch(
                            executable_path=browser_path, headless=HEADLESS
                        )
                    else:  # browser == "firefox"
                        fut = p.firefox.launch(
                            executable_path=browser_path, headless=HEADLESS
                        )

                async with await fut as browser:
                    await exec_loop(
                        browser, generate_callback, prune_callback, crash_callback, ctr
                    )
        except PlaywrightError as e:
            logging.error(e)
        prune_callback(True)


async def visit_seeds(context: BrowserContext) -> None:
    for origin_id in range(1, 3):
        url = URLScope.to_origin(origin_id) + "/seed.html"
        page = await context.new_page()
        await page.goto(url)


async def exec_loop(
    browser: Browser,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[bool], None],
    crash_callback: Callable[[ list[dict]], None],
    ctr: Ctr,
) -> None:
    async with await browser.new_context() as context:
        context.on("weberror", lambda e: logging.warning(e.error))

        await visit_seeds(context)
        logging.info("Visited seeds")

        while ctr.step():
            input_id = generate_callback()

            logging.info(f"Input: {input_id}")

            url = URLScope.to_url(1, 1, input_id)
            logs = await execute(context, url)

            if len(logs) == 0:
                raise PlaywrightError("Empty logs, context probably hangs")
            print(logs)
            if check_logs(logs):
                crash_callback(logs)
                raise PlaywrightError("UXSS detected")


            prune_callback(False)

            current:float = timer()
            logging.info(f"Iteration: {ctr.value()}")
            logging.info(f"Time elapsed: {timedelta(seconds=current-start)}")
            logging.info(f"Average time: {(current - start) / ctr.value():.2f} seconds")



async def cleanup(context: BrowserContext) -> None:
    """Close all pages except the first two."""
    idx = 2
    while idx < len(context.pages):
        await context.pages[idx].close()


async def execute(context: BrowserContext, url: str) -> list[dict]:
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

    fut = visit_page(context, url)
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


async def visit_page(context: BrowserContext, url: str) -> None:
    page = await context.new_page()
    await page.goto(url)

    idx = 2
    while idx < len(context.pages):
        await click_everything(context.pages[idx])


async def click_everything(page: Page) -> None:
    iframes: list[Frame] = page.frames
    for iframe in iframes:
        await iframe.get_by_text("foo").click()
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


def check_logs(logs: list[dict]) -> bool:
    for log in logs:
        if "[UXSS]" in log["text"]:
            logging.info(log["text"])
            return True

    for filename in os.listdir():
        if filename.startswith("firefox.log"):
            with open(filename, "r") as f:
                for line in f:
                    if "[UXSS]" in line:
                        logging.info(line)
                        return True
    return False
