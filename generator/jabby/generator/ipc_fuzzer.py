import random
from typing import Callable
from .instruction import StringInstruction
from .url import URLScope


class IPCFuzzer:
    def __init__(self, browser: str, url_scope: URLScope):
        assert browser in ["chrome", "firefox", "webkit"]
        self.browser = browser
        self.url_scope = url_scope

    def rand_mutation(
        self, complex_url_builder: Callable[[], str]
    ) -> StringInstruction:
        if self.browser == "chrome":
            method = random.choice(
                [
                    "mutate_url",
                    "mutate_url_replace_host",
                    # "mutate_origin",
                    "mutate_origin_replace_host",
                    "mutate_site_for_cookies",
                    "mutate_site_for_cookies_replace_host",
                    "mutate_schemeful_site",
                    "mutate_schemeful_site_replace_host",
                    "mutate_storage_key",
                    "mutate_storage_key_replace_host",
                ]
            )
        else:
            method = random.choice(
                [
                    "mutate_url",
                    "mutate_url_replace_host",
                    "mutate_origin",
                    "mutate_origin_replace_host",
                ]
            )

        if method.endswith("replace_host"):
            return StringInstruction(
                f"IPCFuzzer.{method}({self.url_scope.rand_http_url(False)});"
            )
        else:
            return StringInstruction(
                f"IPCFuzzer.{method}({self.url_scope.rand_url(complex_url_builder)});"
            )
