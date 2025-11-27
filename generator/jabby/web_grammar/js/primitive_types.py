"""
Representations of JS stc type classes
"""

from typing import List
from . import js, types
from .types import ANY, BOOLEAN, INT, FLOAT, STRING, BIGINT, UINT

STD_TYPES: List[js.Class] = [
    js.Class(
        "Boolean",
        [js.Constructor([js.Parameter(ANY(), "value")], new_required=True)],
        [],
        inheritance="Function",
    ),
    js.Class(
        "Number",
        [
            js.Constructor([js.Parameter(ANY(), "value")], new_required=True),
        ],
        [
            js.Constant(INT(), "EPSILON"),
            js.Constant(INT(), "MAX_SAFE_INTEGER"),
            js.Constant(INT(), "MAX_VALUE"),
            js.Constant(INT(), "MIN_SAFE_INTEGER"),
            js.Constant(INT(), "MIN_VALUE"),
            js.Constant(INT(), "NaN"),  # TODO hint, what is NaN?
            js.Constant(INT(), "NEGATIVE_INFINITY"),
            js.Constant(INT(), "POSITIVE_INFINITY"),
            js.Function(
                "isFinite",
                [js.Parameter(ANY(), "value")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isInteger",
                [js.Parameter(ANY(), "value")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isNaN",
                [js.Parameter(ANY(), "value")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isSafeInteger",
                [js.Parameter(ANY(), "testValue")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "parseFloat",
                [js.Parameter(STRING(), "string")],
                js.Return(FLOAT()),
                special="static",
            ),
            js.Function(
                "parseInt",
                [
                    js.Parameter(STRING(), "string"),
                    js.Parameter(INT(), "radix", optional=True),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "toExponential",
                [js.Parameter(INT(), "fractionDigits", optional=True)],
                js.Return(STRING()),
            ),
            js.Function(
                "toFixed",
                [js.Parameter(INT(), "digits", optional=True)],
                js.Return(STRING()),
            ),
            # skipped toLocaleString()
            js.Function(
                "toPrecision",
                [js.Parameter(INT(), "precision", optional=True)],
                js.Return(STRING()),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "BigInt",
        [
            js.Constructor(
                [js.Parameter(INT(), "value")],
                new_forbidden=True,  # normally str, int, bool
            ),
        ],
        [
            js.Function(
                "asIntN",
                [js.Parameter(INT(), "bits"), js.Parameter(BIGINT(), "bigint")],
                js.Return(BIGINT()),
                special="static",
            ),
            js.Function(
                "asUintN",
                [js.Parameter(INT(), "bits"), js.Parameter(BIGINT(), "bigint")],
                js.Return(BIGINT()),
                special="static",
            ),
        ],
        inheritance="Function",
    ),
    # skipped Math https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
    # skipped Date https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    js.Class(
        "String",
        [
            js.Constructor([js.Parameter(ANY(), "thing")], new_forbidden=True),
        ],
        [
            js.SpecialProperty("iterator", [STRING()]),
            js.Attribute(UINT(), "length", readonly=True),
            js.Function(
                "at",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(STRING()),
            ),
            js.Function(
                "charAt",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(STRING()),
            ),
            js.Function(
                "charCodeAt",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(INT()),
            ),
            js.Function(
                "codePointAt",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(INT()),
            ),
            js.Function(
                "concat",
                [js.Parameter(STRING(), "str", variadic=True)],
                js.Return(STRING()),
            ),
            js.Function(
                "endsWith",
                [
                    js.Parameter(STRING(), "searchString"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "endPosition", optional=True
                    ),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "fromCharCode",
                [js.Parameter(INT(), "num", variadic=True)],
                js.Return(STRING()),
                special="static",
            ),
            js.Function(
                "fromCodePoint",
                [js.Parameter(INT(), "codePoint", variadic=True)],
                js.Return(STRING()),
                special="static",
            ),
            js.Function(
                "includes",
                [
                    js.Parameter(STRING(), "searchString"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "position", optional=True
                    ),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "indexOf",
                [
                    js.Parameter(STRING(), "searchString"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "position", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            js.Function("isWellFormed", [], js.Return(BOOLEAN())),
            js.Function(
                "lastIndexOf",
                [
                    js.Parameter(STRING(), "searchString"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "position", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            # skipped localeCompare()
            # skipped match()
            # skipped matchAll()
            js.Function(
                "normalize",
                [
                    js.Parameter(
                        STRING().hint({"argument": ["NFC", "NFD", "NFKC", "NFKD"]}),
                        "form",
                        optional=True,
                    )
                ],
                js.Return(STRING()),
            ),
            js.Function(
                "padEnd",
                [
                    js.Parameter(INT(), "targetLength"),
                    js.Parameter(STRING(), "padString", optional=True),
                ],
                js.Return(STRING()),
            ),
            js.Function(
                "padStart",
                [
                    js.Parameter(INT(), "targetLength"),
                    js.Parameter(STRING(), "padString", optional=True),
                ],
                js.Return(STRING()),
            ),
            # js.Function( # TODO uses strange `${}` syntax, how to handle?
            #     "raw",
            #     [
            #         js.Parameter(OBJECT, "strings"),
            #         js.Parameter(ANY(), "sub", variadic=True),
            #     ],
            #     js.Return(STRING()),
            #     special="static",
            # ),
            js.Function("repeat", [js.Parameter(INT(), "count")], js.Return(STRING())),
            js.Function(
                "replace",
                [
                    js.Parameter(STRING(), "pattern"),
                    js.Parameter(STRING(), "replacement"),
                ],
                js.Return(STRING()),
            ),
            js.Function(
                "replaceAll",
                [
                    js.Parameter(STRING(), "pattern"),
                    js.Parameter(STRING(), "replacement"),
                ],
                js.Return(STRING()),
            ),
            # skipped search()
            js.Function(
                "slice",
                [
                    js.Parameter(INT().hint({"index": "length"}), "indexStart"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "indexEnd", optional=True
                    ),
                ],
                js.Return(STRING()),
            ),
            js.Function(
                "split",
                [
                    js.Parameter(STRING(), "separator"),
                    js.Parameter(UINT(), "limit", optional=True),
                ],
                js.Return(types.PseudoType("Iterable", [STRING()])),
            ),
            js.Function(
                "startsWith",
                [
                    js.Parameter(STRING(), "searchString"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "position", optional=True
                    ),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "substring",
                [
                    js.Parameter(INT().hint({"index": "length"}), "indexStart"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "indexEnd", optional=True
                    ),
                ],
                js.Return(STRING()),
            ),
            # skipped toLocaleLowerCase() and toLocaleUpperCase()
            js.Function(
                "toLowerCase",
                [],
                js.Return(STRING()),
            ),
            js.Function("toUpperCase", [], js.Return(STRING())),
            js.Function(
                "toWellFormed",
                [],
                js.Return(STRING()),
            ),
            js.Function(
                "trim",
                [],
                js.Return(STRING()),
            ),
            js.Function(
                "trimEnd",
                [],
                js.Return(STRING()),
            ),
            js.Function(
                "trimStart",
                [],
                js.Return(STRING()),
            ),
        ],
        inheritance="Function",
    ),
    # skipped RegExp https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
]

EXPORTS_CLASSES = STD_TYPES
