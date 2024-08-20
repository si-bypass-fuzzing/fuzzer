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