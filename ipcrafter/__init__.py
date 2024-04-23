"""
IPCrafter - A fuzzer for site isolation bypass vulnerabilities in web browsers
"""

import logging
import sys
import random

# random.seed(42)


class CustomFormatter(logging.Formatter):
    """
    Coloured log formatter
    """

    grey = "\x1b[38;20m"
    yellow = "\x1b[33;20m"
    red = "\x1b[31;20m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    format_str = (
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s (%(filename)s:%(lineno)d)"
    )

    FORMATS = {
        logging.DEBUG: grey + format_str + reset,
        logging.INFO: grey + format_str + reset,
        logging.WARNING: yellow + format_str + reset,
        logging.ERROR: red + format_str + reset,
        logging.CRITICAL: bold_red + format_str + reset,
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


custom_formatter = CustomFormatter()
sh = logging.StreamHandler(sys.stdout)
sh.setFormatter(custom_formatter)

logging.basicConfig(
    level=logging.INFO,
    handlers=[
        # logging.FileHandler("grammar.log"),
        sh
    ],
)
