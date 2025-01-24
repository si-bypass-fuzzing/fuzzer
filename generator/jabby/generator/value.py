"""
Module for generating values for primitive JS variables
"""

import logging
import random
import secrets
from typing import Any, Callable, Sequence

from ..web_grammar.webidl import types as webidl_types
from ..web_grammar.js import types as js_types, js
from ..util import KeyComparable
from .url import URLScope
from .magic import MAGIC


class Signature(KeyComparable):
    """Representation of a JS function signature"""

    def __init__(self, arguments: Sequence[js.Parameter | js.Callback], ret: js.Return):
        self.arguments = arguments
        self.ret = ret

    def key(self):
        return f"Signature({','.join([arg.key() for arg in self.arguments])})->{self.ret.key()}"

    def hash_key(self) -> tuple:
        return (37, tuple([arg.hash_key() for arg in self.arguments]), self.ret.hash_key())


def weighted_rand_executor(weighted_list: list[tuple[int, Callable[[], str]]]) -> str:
    """Takes a list of tuples (weight, callable) and executes a random callable
    The probability of a callable being executed is proportional to its weight
    Returns the result of the executed callable"""
    total_weight = sum(weight for weight, _ in weighted_list)
    rand = random.randint(1, total_weight)
    for weight, callable in weighted_list:
        rand -= weight
        if rand <= 0:
            return callable()
    raise ValueError("weighted_rand_executor: invalid weighted list")


# TODO create longer CSPs by chaining multiple directives
def generate_csp(url_scope: URLScope) -> str:
    """Generates a random Content Security Policy string
    Chooses a random directive and a random source for the directive
    as documented in https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    """

    # For each group of directives there are: a list of directives, a list of sources,
    # and a function (generate_...) to generate a csp from that group

    sources: list[str] = [
        "'*'",
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "'none'",
        "'strict-dynamic'",
        "'unsafe-hashes'",
        "'wasm-unsafe-eval'",
        "'nonce-deadbeef'",
        "'inline-speculation-rules'",
    ]
    scheme_sources: list[str] = ["data:", "mediastream:", "blob:", "filesystem:"]
    # TODO "ws:" url

    fetch_directives: list[str] = [
        "default-src",
        "child-src",
        "connect-src",
        "font-src",
        "frame-src",
        "img-src",
        "manifest-src",
        "media-src",
        "object-src",
        "prefetch-src",
        "script-src",
        "script-src-elem",
        "script-src-attr",
        "style-src",
        "style-src-elem",
        "style-src-attr",
        "worker-src",
    ]

    def generate_fetch_directive() -> str:
        value = random.choice(sources + scheme_sources + [f"'{url_scope.get_host()}'"])
        return f"{random.choice(fetch_directives)} {value};"

    navigation_directives: list[str] = [
        "form-action",
        "frame-ancestors",
        "navigate-to",
        "report-uri",
        "base-uri",
    ]  # report-to is not supported in HTML elements

    def generate_navigation_directive() -> str:
        value = random.choice(sources + [f"'{url_scope.get_host()}'"])
        return f"{random.choice(navigation_directives)} {value};"

    sandbox_dicretives: list[str] = ["sandbox"]
    sandbox_values: list[str] = [
        "allow-downloads",
        "allow-downloads-without-user-activation",
        "allow-forms",
        "allow-modals",
        "allow-orientation-lock",
        "allow-pointer-lock",
        "allow-popups",
        "allow-popups-to-escape-sandbox",
        "allow-presentation",
        "allow-same-origin",
        "allow-scripts",
        "allow-storage-access-by-user-activation",
        "allow-top-navigation",
        "allow-top-navigation-by-user-activation",
        "allow-top-navigation-to-custom-protocols",
    ]

    def generate_sandbox_directive() -> str:
        return f"{sandbox_dicretives[0]} {random.choice(sandbox_values)};"

    other_directives: list[str] = [
        "block-all-mixed-content",
        "require-trusted-types-for: 'script'",
        "upgrade-insecure-requests",
    ]

    def generate_other_directive() -> str:
        return f"{random.choice(other_directives)};"

    trusted_types_directives: list[str] = ["trusted-types"]
    trusted_types_values: list[str] = [
        "",
        "'none'",
        "'foo'",
        "'foo' 'allow-duplicates'",
    ]

    def generate_trusted_types_directive() -> str:
        return f"{trusted_types_directives[0]} {random.choice(trusted_types_values)};"

    plugin_types_directives: list[str] = ["plugin-types"]

    def generate_plugin_types_directive() -> str:
        return f"{plugin_types_directives[0]} {generate_mime_type()};"

    referrer_directives: list[str] = ["referrer"]
    referrer_values: list[str] = [
        '"no-referrer"',
        '"none-when-downgrade"',
        '"origin"',
        '"origin-when-cross-origin"',
        '"unsafe-url"',
    ]

    def generate_referrer_directive() -> str:
        return f"{referrer_directives[0]} {random.choice(referrer_values)};"

    result = weighted_rand_executor(
        [
            (len(fetch_directives), generate_fetch_directive),
            (len(navigation_directives), generate_navigation_directive),
            (len(sandbox_dicretives), generate_sandbox_directive),
            (len(other_directives), generate_other_directive),
            (len(trusted_types_directives), generate_trusted_types_directive),
            (len(plugin_types_directives), generate_plugin_types_directive),
            (len(referrer_directives), generate_referrer_directive),
        ]
    )
    return result


def generate_permission_policy(url_scope: URLScope) -> str:
    """Generates a random Permission Policy string
    Chooses a random directive and a random source for the directive"""
    directives: list[str] = [
        "accelerometer",
        "ambient-light-sensor",
        "autoplay",
        "battery",
        "bluetooth",
        "browsing-topics",
        "camera",
        "display-capture",
        "document-domain",
        "encrypted-media",
        "execution-while-not-rendered",
        "execution-while-out-of-viewport",
        "fullscreen",
        "gamepad",
        "geolocation",
        "gyroscope",
        "hid",
        "identity-credentials-get",
        "idle-detection",
        "local-fonts",
        "magnetometer",
        "microphone",
        "midi",
        "otp-credentials",
        "payment",
        "picture-in-picture",
        "publickey-credentials-get",
        "screen-wake-lock",
        "serial",
        "speaker-selection",
        "storage-access",
        "usb",
        "web-share",
        "window-management",
        "xr-spatial-tracking",
    ]
    values: list[str] = [
        "*",
        "()",
        f'("{url_scope.get_host()}")',
        "self",
        "src",
        f'(self "{url_scope.get_host()}")',
        f'(src "{url_scope.get_host()}")',
    ]
    return f"{random.choice(directives)}={random.choice(values)}"


def generate_mime_type() -> str:
    """Returns a random MIME type"""
    # TODO this list is not exhaustive, should it be extended?
    mime_types = [
        "application/json",
        "application/xml",
        "text/html",
        "text/css",
        "application/octet-stream",
        "image/png",
        "image/jpeg",
        "video/mp4",
        "audio/mpeg",
        "text/plain",
    ]
    return random.choice(mime_types)


def generate_headers(url_scope: URLScope) -> str:
    """Generates random HTTP headers
    The returned string is a JS array of arrays, where each inner array represents a header
    It can be inserted into JS code as is"""
    # TODO hese should be interesting: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
    return f"[]" #['Host','{url_scope.get_host()}']


def generate_meta_content(url_scope: URLScope) -> str:
    """Generates random value for the content attribute of the HTML meta tag"""
    # https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attributes
    match random.randint(0, 3):
        case 0:  # refresh
            return "'3;url={url_scope.generate_url()}'"
        case 1:  # content-type
            return "'text/html; charset=utf-8'"
        case 2:  # csp
            return f"'{generate_csp(url_scope)}'"
        case 3:  # x-ua-compatible
            return "'IE=edge'"
        case _:
            raise ValueError("generate_meta_content: invalid random number")


def generate_string(
    var: js.NamedVar,
    url_scope: URLScope,
    complex_url_builder: Callable[[], str],
    gen_magic_string: bool,
    callee: str | None = None,
) -> str:
    """Generates a random string for a JS variable
    If the type of the variable has a hint for a specific keyword, that keyword is chosen
    If the variable name matches a specific pattern (e.g. src), a matching string is generated
    """
    name = var.name
    # fetch additional metadate from IDL definition if available
    # idl_type: str | None = None
    # ext_attrs: list[webidl_types.ExtendedAttribute] | None = None
    # if isinstance(var.var_type, webidl_types.IDLPrimitiveType):
    #     idl_type = var.var_type.idl_type
    #     ext_attrs = var.var_type.ext_attrs

    # for keyword types, choose a random keyword
    if "keyword" in var.var_type.hint_dict.hints:
        keyword = random.choice(var.var_type.hint_dict.hints["keyword"])
        return f"'{keyword}'"

    # generate matching strings for certain variable names
    lower_name = name.lower()
    if any([keyword in lower_name for keyword in ["url", "uri"]]) or lower_name in [
        "href",
        "referrer",
        "ping",
        "src",
        "cite",
        "formaction",
        "action",
        "srcset",
    ]:
        return url_scope.rand_url(complex_url_builder)
    if lower_name == "method":
        return f'\'{random.choice(["GET", "POST", "HEAD", "PUT", "DELETE", "PATCH"])}\''
    if lower_name == "mime" or lower_name == "contenttype" or "mimetype" in lower_name:
        return f"'{generate_mime_type()}'"
    if lower_name in ["target", "formtarget"]:
        return f'\'{random.choice(["_blank", "_self", "_parent", "_top", "_unfencedTop"])}\''
    if lower_name == "csp":
        return f"'{generate_csp(url_scope)}'"
    if lower_name == "allow":
        return f"'{generate_permission_policy(url_scope)}'"
    if lower_name == "headers":
        return generate_headers(url_scope)
    if lower_name == "content":
        return generate_meta_content(url_scope)
    if lower_name == "charset":
        return "'utf-8'"
    if "color" in lower_name:
        return "'red'"
    if lower_name in ["width", "height"]:
        return f"'{random.randint(0, 100)}'"
    if lower_name == "scheme":
        return "'http'"
    if lower_name == "srcdoc":
        return "'<html></html>'"  # TODO generate inner HTML
    if lower_name == "class":
        return "'foo'"
    if lower_name == "id":
        return f"'{secrets.token_hex(2)}'"
    if lower_name == "as":
        keyword = random.choice(
            [
                "audio",
                "document",
                "embed",
                "fetch",
                "font",
                "image",
                "object",
                "script",
                "style",
                "track",
                "video",
                "worker",
            ]
        )
        f"'{keyword}'"
    if lower_name == "rel":
        # attributes that did not seem interesting are commented out
        keyword = random.choice(
            [
                "alternate",
                # "author",
                # "bookmark",
                "canonical",
                "dns-prefetch",
                "external",
                # "help",
                "icon",
                # "license",
                "manifest",
                # "me",
                "modulepreload",
                # "next",
                # "nofollow",
                "noopener",
                "noreferrer",
                "opener",
                "pingback",
                "preconnect",
                "prefetch",
                "preload",
                "prerender",
                # "prev",
                # "privacy-policy",
                # "search",
                "stylesheet",
                # "tag",
                # "terms-of-service",
            ]
        )
        return f"'{keyword}'"

    # TODO: for input.type return 'submit' for all others return mimetype

    if random.random() < 0.5:
        return url_scope.rand_url(complex_url_builder)

    if gen_magic_string:
        return f"'{MAGIC}'"
    else:
        return "'foo'"


def generate_number(var: js.NamedVar, callee: str | None = None) -> str:
    """Generates a random number literal for a JS variable
    If the type of the variable has a hint for a specific number type, that type is chosen
    If the variable name matches a specific pattern (e.g. radix), a matching number is generated
    If the variable is an index, this function ensures that the index is within the bounds of the callee
    """
    name = var.name
    # fetch additional metadate from IDL definition if available
    idl_type: str | None = None
    ext_attrs: list[webidl_types.ExtendedAttribute] | None = None
    if isinstance(var.var_type, webidl_types.PrimitiveType):
        idl_type = var.var_type.idl_type
        ext_attrs = var.var_type.ext_attrs
        # TODO process clamped, EnforceRange

    if "index" in var.var_type.hint_dict.hints:
        assert callee is not None
        return f"{random.randint(0, 100)} % {callee}.{var.var_type.hint_dict.hints['index']}"
    if name == "radix":
        return random.choice(["2", "8", "10", "16"])

    if var.var_type.hint_dict.hints.get("number", None) == "uint":
        return f"{random.randint(0, 100)}"

    # TODO: process hints["number"] for generic number types (T)

    return f"{random.randint(-100, 100)}"


def generate_bigint(var: js.NamedVar, callee: str | None = None) -> str:
    """Generates a random bigint literal for a JS variable"""
    # int_value = int(generate_number(var, callee))
    return f"{random.randint(-65535,65535)}n"


def generate_primitive_value(
    var: js.NamedVar,
    url_scope: URLScope,
    complex_url_builder: Callable[[], str],
    gen_magic_string: bool,
    callee: str | None,
) -> Any:
    """Generates a random value for a primitive JS variable"""

    assert isinstance(var.var_type, js_types.PrimitiveType)
    primitive = var.var_type

    match primitive.primitive:
        case "string":
            return generate_string(
                var,
                url_scope,
                complex_url_builder,
                gen_magic_string,
                callee,
            )
        case "number":
            return generate_number(var, callee)
        case "boolean":
            return str(bool(random.randint(0, 1))).lower()
        case "null":
            return "null"
        case "undefined":
            return "undefined"
        case "bigint":
            return generate_bigint(var, callee)
        case "symbol":
            return "'foo'"  # TODO
        case _:
            raise ValueError(f"Unknown primitive type: {primitive.primitive}")
