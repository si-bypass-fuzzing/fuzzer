"""
JS global functions and attributes
"""

from typing import List
from . import js, types
from .types import ANY, BOOLEAN, INT, FLOAT, OBJECT, STRING, UINT, UNDEFINED


# TODO: needs error handling for NaN
GLOBAL_FUNCTIONS: List[js.Function] = [
    js.Function(
        "eval",
        [js.Parameter(STRING(), "value")],
        js.Return(ANY()),
    ),
    js.Function("isFinite", [js.Parameter(ANY(), "value")], js.Return(BOOLEAN())),
    js.Function("isNaN", [js.Parameter(ANY(), "value")], js.Return(BOOLEAN())),
    js.Function("parseFloat", [js.Parameter(STRING(), "value")], js.Return(FLOAT())),
    js.Function(
        "parseInt",
        [
            js.Parameter(STRING(), "value"),
            js.Parameter(UINT(), "radix"),
        ],
        js.Return(INT()),
    ),
    js.Function(
        "decodeURI", [js.Parameter(STRING(), "encodedURI")], js.Return(STRING())
    ),
    js.Function(
        "decodeURIComponent",
        [js.Parameter(STRING(), "encodedURI")],
        js.Return(STRING()),
    ),
    js.Function("encodeURI", [js.Parameter(STRING(), "uri")], js.Return(STRING())),
    js.Function(
        "encodeURIComponent",
        [js.Parameter(STRING(), "uriComponent")],
        js.Return(STRING()),
    ),
    js.Function("escape", [js.Parameter(STRING(), "str")], js.Return(STRING())),
    js.Function("unescape", [js.Parameter(STRING(), "str")], js.Return(STRING())),
    js.Function("Boolean", [js.Parameter(ANY(), "value")], js.Return(BOOLEAN())),
    js.Function("Number", [js.Parameter(ANY(), "value")], js.Return(INT())),
    js.Function("String", [js.Parameter(ANY(), "value")], js.Return(STRING())),
]

VALUE_PROPERTIES: List[js.Constant] = [
    js.Constant(types.ObjectType("Window"), "globalThis"),
    js.Constant(INT(), "Infinity"),
    js.Constant(OBJECT(), "NaN"),
    js.Constant(UNDEFINED(), "undefined"),
]

EXPORTS_FUNCTIONS = GLOBAL_FUNCTIONS
EXPORTS_CONSTANTS = VALUE_PROPERTIES
