"""
Manages URL scope
"""

import random
import secrets
from typing import Callable


class URLScope:
    """
    Represents the URL of the generated page and manages a scope of reachable URLs
    """

    port = 8080
    num_origins = 2
    num_pages = 2
    prob_special_uri = 0.2

    SIMPLE_SPECIAL_URIS = ["about:blank", "data:blank", "data:text/html,foo", "data:text/plain,foo"]

    def __init__(self, origing_id: int, page_id: int, input_id: int):
        self.origing_id = origing_id
        self.page_id = page_id
        self.input_id = input_id

    @staticmethod
    def to_ip(origin_id: int) -> str:
        """Converts an origin_id to an IP string"""
        return f"127.0.0.{origin_id}"

    @staticmethod
    def to_host(origin_id: int) -> str:
        """Converts an origin_id to a host string"""
        return f"{URLScope.to_ip(origin_id)}:{URLScope.port}"

    @staticmethod
    def to_origin(origin_id: int) -> str:
        """Converts an origin_id to an origin URL"""
        return f"http://{URLScope.to_host(origin_id)}"

    @staticmethod
    def to_url(origin_id: int, page_id: int, input_id: int) -> str:
        """Converts origin_id and page_id to a URL string"""
        return f"{URLScope.to_origin(origin_id)}/input-{input_id}_page-{page_id}.html"

    def get_ip(self) -> str:
        """Get the IP string of this URL scope"""
        return self.to_ip(self.origing_id)

    def get_host(self) -> str:
        """Get the host string of this URL scope"""
        return self.to_host(self.origing_id)

    def get_origin(self) -> str:
        """Get the origin URL of this URL scope"""
        return self.to_origin(self.origing_id)

    def get_url(self) -> str:
        """Get the URL string of this URL scope"""
        return self.to_url(self.origing_id, self.page_id, self.input_id)

    def rand_url(self, complex_url_builder: Callable[[],str]) -> str:
        """Generate a new random URL"""
        if random.random() < URLScope.prob_special_uri:
            if random.random() < 0.5:
                return f"'{random.choice(self.SIMPLE_SPECIAL_URIS)}'"
            return complex_url_builder()
        return self.rand_http_url(True)

    def rand_http_url(self,hash:bool) -> str:
        """Generate a new random HTTP URL"""
        origin = random.randint(1, URLScope.num_origins)
        page = random.randint(1, URLScope.num_pages)
        if hash:
            return f"'{self.to_url(origin, page, self.input_id)}#{secrets.token_hex(4)}'"
        return f"'{self.to_url(origin, page, self.input_id)}'"

    def set_input_id(self, input_id: int) -> None:
        """Set the input_id of this URL scope"""
        self.input_id = input_id
