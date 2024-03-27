import asyncio
from playwright.async_api import (
    async_playwright,
    Playwright,
    Browser,
    BrowserContext,
    ConsoleMessage,
    Page,
    Locator,
    Frame,
)

from typing import Callable
from .generator.jabby.generator.url import URLScope

TIMEOUT = 3


async def exec_remote_chrome(
    cdp_url: str, generate_callback: Callable[[], int]
) -> None:
    async with async_playwright() as p:
        async with await p.chromium.connect_over_cdp(cdp_url) as browser:
            await exec(browser, generate_callback)


async def exec_remote_firefox(
    ws_url: str, generate_callback: Callable[[], int]
) -> None:
    async with async_playwright() as p:
        async with await p.firefox.connect(ws_url) as browser:
            await exec(browser, generate_callback)


async def exec_local_chrome(
    chrome_path: str, generate_callback: Callable[[], int]
) -> None:
    async with async_playwright() as p:
        async with await p.chromium.launch(executable_path=chrome_path) as browser:
            await exec(browser, generate_callback)


async def exec_local_firefox(
    firefox_path: str, generate_callback: Callable[[], int]
) -> None:
    async with async_playwright() as p:
        async with await p.firefox.launch(executable_path=firefox_path,headless=False) as browser:
            await exec(browser, generate_callback)

async def visit_seeds(context: BrowserContext) -> None:
    for origin_id in range(1, 3):
        url = URLScope.to_origin(origin_id) + "/seed.html"
        page = await context.new_page()
        await page.goto(url)

async def exec(browser: Browser, generate_callback: Callable[[], int]) -> None:
    async with await browser.new_context() as context:
        await visit_seeds(context)

        while True:
            input_id = generate_callback()
            url = URLScope.to_url(1, 1, input_id)
            logs = await execute(context, url)
            print(logs)

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
        pass

    fut = cleanup(context)
    try:
        await asyncio.wait_for(fut, timeout=TIMEOUT)
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
