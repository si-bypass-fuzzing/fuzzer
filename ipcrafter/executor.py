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

TIMEOUT = 3

"""
const { firefox } = require('playwright');
(async () => {
    let ff_path = "/home/jn/git/gecko-dev/obj-tf-release/dist/firefox/firefox";
    const server = await firefox.launchServer({ headless: false, executablePath: ff_path , devtools: true});
    console.log(server.wsEndpoint());
})();
"""


async def fuzz(
    browser_type: str,
    remote: bool,
    browser_path: str,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[int], None],
    crash_callback: Callable[[int, list[dict]], None],
):
    while True:
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
                            executable_path=browser_path, headless=False
                        )
                    else:  # browser == "firefox"
                        fut = p.firefox.launch(
                            executable_path=browser_path, headless=False
                        )

                async with await fut as browser:
                    await exec(
                        browser, generate_callback, prune_callback, crash_callback
                    )
        except PlaywrightError as e:
            logging.error(e)


async def visit_seeds(context: BrowserContext) -> None:
    for origin_id in range(1, 3):
        url = URLScope.to_origin(origin_id) + "/seed.html"
        page = await context.new_page()
        await page.goto(url)


async def exec(
    browser: Browser,
    generate_callback: Callable[[], int],
    prune_callback: Callable[[int], None],
    crash_callback: Callable[[int, list[dict]], None],
) -> None:
    async with await browser.new_context() as context:

        context.on("weberror", lambda e: logging.warning(e.error))

        await visit_seeds(context)
        logging.info("Visited seeds")

        while True:
            input_id = generate_callback()
            url = URLScope.to_url(1, 1, input_id)
            logs = await execute(context, url)

            if len(logs) == 0:
                raise PlaywrightError("Empty logs, context probably hangs")
            if check_logs(logs):
                crash_callback(input_id, logs)
            print(logs)

            prune_callback(input_id)


async def cleanup(context: BrowserContext) -> None:
    """Close all pages except the first two."""
    idx = 2
    while idx < len(context.pages):
        await context.pages[idx].close()


async def execute(context: BrowserContext, url: str) -> list[dict]:

    logs: list[dict] = []

    def on_console(msg: ConsoleMessage):
        """Copy the message but convert the args to json values if possible."""
        msg_copy = {
            "location": msg.location,
            "text": msg.text,
            "type": msg.type,
            "args": [],
        }
        for arg in msg.args:
            try:
                msg_copy["args"].append(arg.json_value())
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
        await asyncio.wait_for(fut, timeout=TIMEOUT*0.5)
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
    return False
