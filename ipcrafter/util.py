import asyncio
import time
import logging
from typing import Callable

class WebErrorHandler:
    THRESHOLD = 100

    def __init__(self):
        self.num = 0

    def handle(self, web_error):
        self.num += 1
        if self.num > WebErrorHandler.THRESHOLD:
            raise Exception("Weberrors exceeded threshold")

class ConsoleHandler:
    def __init__(self):
        self.logs: list[dict] = []

    def handle(self, msg):
        self.logs.append(
            {
                "location": msg.location,
                "text": msg.text,
                "type": msg.type,
            }
        )

    def get_logs(self) -> list[dict]:
        return self.logs

    def clear(self):
        self.logs = []

class JSStatCollector:
    def __init__(self):
        self.exceptions: dict[str,int] = {}
        self.num_stmts: int = 0
        self.num_excepts: int = 0

    def track_stmt(self):
        self.num_stmts += 1

    def track_except(self, except_type):
        self.num_excepts += 1
        # self.exceptions[except_type] = self.exceptions.get(except_type, 0) + 1

    def log(self):
        return f"excepts: {self.num_excepts} stmts: {self.num_stmts}"

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

class DMSException(Exception):
    pass

class DeadMansSwitch:
    def __init__(self, timeout, kill: Callable[[], None] | None = None):
        self.timeout = timeout
        self.last_signal_time = time.time()
        self.loop = asyncio.get_event_loop()
        self.monitor_task = None
        self.kill = kill

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
        if self.kill:
            self.kill()
        logging.error("DMS")
        raise DMSException("Dead man's switch triggered: loop has not sent a signal for the specified timeout period.")

class URLGenerator:
    def __init__(self, to_origin: Callable[[int], str], to_url: Callable[[int,int,int], str]):
        self.to_origin = to_origin
        self.to_url = to_url

    def get_origin(self, origin_id: int) -> str:
        return self.to_origin(origin_id)

    def get_url(self, origin_id: int, page_id: int, input_id: int) -> str:
        return self.to_url(origin_id, page_id, input_id)
