"""
Representations of arrays and indexed collections in JavaScript.
(Array, Int8Array, ...)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#indexed_collections
"""

from typing import List
from . import js, types
from .types import (
    UNDEFINED,
    ANY,
    BOOLEAN,
    INT,
    FLOAT,
    STRING,
    OBJECT,
    BIGINT,
    ARRAY,
    UINT,
)

MODUL = {
    "ArrayBuffer": 1,
    "SharedArrayBuffer": 1,
    "DataView": 1,
    "Int8Array": 8,
    "Uint8Array": 8,
    "Uint8ClampedArray": 8,
    "Int16Array": 16,
    "Uint16Array": 16,
    "Int32Array": 32,
    "Uint32Array": 32,
    "Float32Array": 32,
    "Float64Array": 64,
    "BigInt64Array": 64,
    "BigUint64Array": 64,
}

ARRAY_TYPES: List[js.Class] = [
    js.Class(
        "Array",
        [
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [js.Parameter(ANY().hint({"generic": "E"}), "element", variadic=True)]
            ).hint({"generic": "E"}),
        ],
        [
            js.SpecialProperty("iterator", [ANY().hint({"generic": "E"})]),
            js.Attribute(UINT(), "length", readonly=True),
            js.Function(
                "at",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(ANY().hint({"generic": "E"})),
            ),
            js.Function(
                "concat",
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [ANY().hint({"generic": "E"})]),
                        "value",
                        variadic=True,
                    )
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "copyWithin",
                [
                    js.Parameter(INT().hint({"index": "length"}), "target"),
                    js.Parameter(INT().hint({"index": "length"}), "start"),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "entries",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "E"})])),
            ),
            js.Function(
                "every",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "fill",
                [
                    js.Parameter(ANY().hint({"generic": "E"}), "value"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "start", optional=True
                    ),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "filter",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "find",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ANY().hint({"generic": "E"})),
            ),
            js.Function(
                "findIndex",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "findLast",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ANY().hint({"generic": "E"})),
            ),
            js.Function(
                "findLastIndex",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "flat",
                [js.Parameter(INT(), "depth", optional=True)],
                js.Return(ARRAY()),
            ),
            js.Function(
                "flatMap",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY(), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY(), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ARRAY()),
            ),
            js.Function(
                "forEach",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "from",
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [ANY().hint({"generic": "E"})]),
                        "arrayLike",
                    ),
                    js.Callback(
                        "mapFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                        ],
                        js.Return(ANY().hint({"generic": "F"})),
                        optional=True,
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "F"})),
            ),
            # js.Function(
            #     "fromAsync",
            #     [
            #         js.Parameter(Iterable(ANY()), "arrayLike"), # hint AsyncIterable
            #         js.Callback(
            #             "mapFn",
            #             [js.Parameter(ANY(), "element"), js.Parameter(INT(), "index")], # hint await
            #             js.Return(ANY()),
            #             optional=True,
            #         ),
            #         js.Parameter(OBJECT(), "thisArg", optional=True),
            #     ],
            #     js.Return(ARRAY()),
            # ),
            js.Function(
                "includes",
                [
                    js.Parameter(ANY().hint({"generic": "E"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "indexOf",
                [
                    js.Parameter(ANY().hint({"generic": "E"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "isArray",
                [js.Parameter(ANY(), "arg")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "join",
                [js.Parameter(STRING(), "separator", optional=True)],
                js.Return(STRING()),
            ),
            js.Function(
                "keys",
                [],
                js.Return(types.PseudoType("Iterable", [INT()])),
            ),
            js.Function(
                "lastIndexOf",
                [
                    js.Parameter(ANY().hint({"generic": "E"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "map",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(ANY().hint({"generic": "F"})),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "F"})),
            ),
            js.Function(
                "of",
                [js.Parameter(ANY().hint({"generic": "E"}), "element", variadic=True)],
                js.Return(ARRAY().hint({"generic": "E"})),
                special="static",
            ),
            js.Function(
                "pop",
                [],
                js.Return(ANY().hint({"generic": "E"})),
            ),
            js.Function(
                "push",
                [js.Parameter(ANY().hint({"generic": "E"}), "element", variadic=True)],
                js.Return(INT()),
            ),
            js.Function(
                "reduce",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY(), "accumulator"),
                            js.Parameter(ANY().hint({"generic": "E"}), "currentValue"),
                            js.Parameter(INT(), "currentIndex"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(ANY()),
                    ),
                    js.Parameter(ANY(), "initialValue", optional=True),
                ],
                js.Return(ANY()),
            ),
            js.Function(
                "reduceRight",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY(), "accumulator"),
                            js.Parameter(ANY().hint({"generic": "E"}), "currentValue"),
                            js.Parameter(INT(), "currentIndex"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(ANY()),
                    ),
                    js.Parameter(ANY(), "initialValue", optional=True),
                ],
                js.Return(ANY()),
            ),
            js.Function(
                "reverse",
                [],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "shift",
                [],
                js.Return(ANY().hint({"generic": "E"})),
            ),
            js.Function(
                "slice",
                [
                    js.Parameter(INT().hint({"index": "length"}), "start"),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "some",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(ARRAY().hint({"generic": "E"}), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "sort",
                [
                    js.Callback(
                        "compareFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "a"),
                            js.Parameter(ANY().hint({"generic": "E"}), "b"),
                        ],
                        js.Return(INT()),
                        optional=True,
                    ),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "splice",
                [
                    js.Parameter(INT().hint({"index": "length"}), "start"),
                    js.Parameter(INT(), "deleteCount", optional=True),
                    js.Parameter(
                        ANY().hint({"generic": "E"}),
                        "item",
                        variadic=True,
                        optional=True,
                    ),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            # skipped toLocaleString()
            js.Function("toReversed", [], js.Return(ARRAY().hint({"generic": "E"}))),
            js.Function(
                "toSorted",
                [
                    js.Callback(
                        "compareFn",
                        [
                            js.Parameter(ANY().hint({"generic": "E"}), "a"),
                            js.Parameter(ANY().hint({"generic": "E"}), "b"),
                        ],
                        js.Return(INT()),
                        optional=True,
                    ),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "toSpliced",
                [
                    js.Parameter(INT().hint({"index": "length"}), "start"),
                    js.Parameter(INT(), "deleteCount", optional=True),
                    js.Parameter(
                        ANY().hint({"generic": "E"}),
                        "item",
                        variadic=True,
                        optional=True,
                    ),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
            js.Function(
                "unshift",
                [js.Parameter(ANY().hint({"generic": "E"}), "element", variadic=True)],
                js.Return(INT()),
            ),
            js.Function(
                "values",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "E"})])),
            ),
            js.Function(
                "with",
                [
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(ANY().hint({"generic": "E"}), "element"),
                ],
                js.Return(ARRAY().hint({"generic": "E"})),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(  # TODO assign mod and offset hints
        "TypedArray",
        [],
        [
            js.SpecialProperty("iterator", [INT().hint({"number": "T"})]),
            js.Attribute(types.ObjectType("ArrayBuffer"), "buffer", readonly=True),
            js.Attribute(UINT(), "byteLength", readonly=True),
            js.Attribute(UINT(), "byteOffset", readonly=True),
            js.Attribute(UINT(), "length", readonly=True),
            js.Function(
                "at",
                [js.Parameter(INT().hint({"index": "length"}), "index")],
                js.Return(INT().hint({"number": "T"})),
            ),
            js.Function(
                "copyWithin",
                [
                    js.Parameter(INT().hint({"index": "length"}), "target"),
                    js.Parameter(INT().hint({"index": "length"}), "start"),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "entries",
                [],
                js.Return(types.PseudoType("Iterable", [INT().hint({"number": "T"})])),
            ),
            js.Function(
                "every",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "fill",
                [
                    js.Parameter(INT().hint({"number": "T"}), "value"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "start", optional=True
                    ),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "filter",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(types.ObjectType("TypedArray"), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "find",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT().hint({"number": "T"})),
            ),
            js.Function(
                "findIndex",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "findLast",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT().hint({"number": "T"})),
            ),
            js.Function(
                "findLastIndex",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "forEach",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(UNDEFINED()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "from",
                [
                    js.Parameter(types.PseudoType("Iterable", [INT()]), "arrayLike"),
                    js.Callback(
                        "mapFn",
                        [js.Parameter(INT(), "element"), js.Parameter(INT(), "index")],
                        js.Return(INT().hint({"number": "T"})),
                        optional=True,
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
                special="static",
            ),
            js.Function(
                "includes",
                [
                    js.Parameter(INT().hint({"number": "T"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "indexOf",
                [
                    js.Parameter(INT().hint({"number": "T"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "join",
                [js.Parameter(STRING(), "separator", optional=True)],
                js.Return(STRING()),
            ),
            js.Function(
                "keys",
                [],
                js.Return(types.PseudoType("Iterable", [INT()])),
            ),
            js.Function(
                "lastIndexOf",
                [
                    js.Parameter(INT().hint({"number": "T"}), "searchElement"),
                    js.Parameter(
                        INT().hint({"index": "length"}), "fromIndex", optional=True
                    ),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "map",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(types.ObjectType("TypedArray"), "array"),
                        ],
                        js.Return(INT().hint({"number": "T"})),
                    ),
                    js.Parameter(INT(), "thisArg", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "of",
                [js.Parameter(INT().hint({"number": "T"}), "element", variadic=True)],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
                special="static",
            ),
            js.Function(
                "reduce",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT(), "accumulator"),
                            js.Parameter(INT().hint({"number": "T"}), "currentValue"),
                            js.Parameter(INT(), "currentIndex"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(INT()),
                    ),
                    js.Parameter(INT(), "initialValue", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "reduceRight",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT(), "accumulator"),
                            js.Parameter(INT().hint({"number": "T"}), "currentValue"),
                            js.Parameter(INT(), "currentIndex"),
                            js.Parameter(
                                types.ObjectType("TypedArray").hint({"number": "T"}),
                                "array",
                            ),
                        ],
                        js.Return(INT()),
                    ),
                    js.Parameter(INT(), "initialValue", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "reverse",
                [],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "set",
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [INT().hint({"number": "T"})]),
                        "array",
                    ),
                    js.Parameter(
                        INT().hint({"index": "length"}), "targetOffset", optional=True
                    ),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "set",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedarray"),
                    js.Parameter(INT(), "targetOffset", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "slice",
                [
                    js.Parameter(
                        INT().hint({"index": "length"}), "start", optional=True
                    ),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray")),
            ),
            js.Function(
                "some",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "element"),
                            js.Parameter(INT(), "index"),
                            js.Parameter(types.ObjectType("TypedArray"), "array"),
                        ],
                        js.Return(BOOLEAN()),
                    ),
                    js.Parameter(INT(), "thisArg", optional=True),
                ],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "sort",
                [
                    js.Callback(
                        "compareFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "a"),
                            js.Parameter(INT().hint({"number": "T"}), "b"),
                        ],
                        js.Return(INT()),
                        optional=True,
                    ),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "subarray",
                [
                    js.Parameter(
                        INT().hint({"index": "length"}), "begin", optional=True
                    ),
                    js.Parameter(INT().hint({"index": "length"}), "end", optional=True),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            # skipped toLocaleString()
            js.Function(
                "toReversed",
                [],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "toSorted",
                [
                    js.Callback(
                        "compareFn",
                        [
                            js.Parameter(INT().hint({"number": "T"}), "a"),
                            js.Parameter(INT().hint({"number": "T"}), "b"),
                        ],
                        js.Return(INT()),
                        optional=True,
                    ),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
            js.Function(
                "values",
                [],
                js.Return(types.PseudoType("Iterable", [INT().hint({"number": "T"})])),
            ),
            js.Function(
                "with",
                [
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT().hint({"number": "T"}), "element"),
                ],
                js.Return(types.ObjectType("TypedArray").hint({"number": "T"})),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "Int8Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 8)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 8}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Uint8Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 8)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 8}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Uint8ClampedArray",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 8)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 8}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Int16Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 16)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 16}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Uint16Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 16)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 16}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Int32Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 32)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 32}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Uint32Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 32)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 32}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "BigInt64Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 64)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 64}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "BigUint64Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 64)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 64}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Float32Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 32)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 32}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
    js.Class(
        "Float64Array",
        [
            js.Constructor([], new_required=True),
            js.Constructor([js.Parameter(UINT(), "length")]),
            js.Constructor(
                [
                    js.Parameter(
                        types.ObjectType("ArrayBuffer").hint({"mod": ("length", 64)}),
                        "buffer",
                    ),
                    js.Parameter(INT().hint({"mod": 64}), "byteOffset", optional=True),
                    js.Parameter(INT(), "length", optional=True),
                ]
            ),
            js.Constructor(
                [js.Parameter(types.PseudoType("Iterable", [INT()]), "array")]
            ),  # array or iterator
            js.Constructor(
                [js.Parameter(types.ObjectType("TypedArray"), "typedarray")]
            ),
        ],
        [],
        inheritance="TypedArray",
    ),
]

STRUCTURED_DATA: List[js.Class] = [
    js.Class(
        "ArrayBuffer",
        [
            js.Constructor(
                [
                    js.Parameter(UINT(), "length"),
                    js.Parameter(
                        OBJECT().hint({"dict": {"maxByteLength": INT()}}),
                        "options",
                        optional=True,
                    ),
                ],
                new_required=True,
            ),
        ],
        [
            js.Attribute(INT(), "byteLength", readonly=True),
            js.Attribute(BOOLEAN(), "detached", readonly=True),
            js.Attribute(INT(), "maxByteLength", readonly=True),
            js.Attribute(BOOLEAN(), "resizable", readonly=True),
            js.Function(
                "isView",
                [js.Parameter(ANY(), "arg")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "resize", [js.Parameter(UINT(), "newSize")], js.Return(UNDEFINED())
            ),
            js.Function(
                "slice",
                [
                    js.Parameter(
                        INT().hint({"index": "byteLength"}), "start", optional=True
                    ),
                    js.Parameter(
                        INT().hint({"index": "byteLength"}), "end", optional=True
                    ),
                ],
                js.Return(types.ObjectType("ArrayBuffer")),
            ),
            js.Function(
                "transfer",
                [js.Parameter(UINT(), "newByteLength")],
                js.Return(types.ObjectType("ArrayBuffer")),
            ),
            js.Function(
                "transferToFixedLength",
                [js.Parameter(UINT(), "newByteLength")],
                js.Return(types.ObjectType("ArrayBuffer")),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "SharedArrayBuffer",
        [
            js.Constructor(
                [
                    js.Parameter(UINT(), "length"),
                    js.Parameter(
                        OBJECT().hint({"dict": {"maxByteLength": INT()}}),
                        "options",
                        optional=True,
                    ),
                ],
                new_required=True,
            ),
        ],
        [
            js.Attribute(INT(), "byteLength", readonly=True),
            js.Attribute(BOOLEAN(), "growable", readonly=True),
            js.Attribute(INT(), "maxByteLength", readonly=True),
            js.Function(
                "grow", [js.Parameter(UINT(), "newLength")], js.Return(UNDEFINED())
            ),
            js.Function(
                "slice",
                [
                    js.Parameter(
                        INT().hint({"index": "byteLength"}), "start", optional=True
                    ),
                    js.Parameter(
                        INT().hint({"index": "byteLength"}), "end", optional=True
                    ),
                ],
                js.Return(types.ObjectType("SharedArrayBuffer")),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "DataView",
        [
            js.Constructor(
                [
                    js.Parameter(types.PseudoType("Buffer"), "buffer"),
                    js.Parameter(UINT(), "byteOffset", optional=True),
                    js.Parameter(UINT(), "byteLength", optional=True),
                ],
                new_required=True,
            ),
        ],
        [
            js.Attribute(types.PseudoType("Buffer"), "buffer", readonly=True),
            js.Attribute(INT(), "byteLength", readonly=True),
            js.Attribute(INT(), "byteOffset", readonly=True),
            js.Function(
                "getBigInt64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(BIGINT()),
            ),
            js.Function(
                "getBigUint64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(BIGINT()),
            ),
            js.Function(
                "getFloat32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(FLOAT()),
            ),
            js.Function(
                "getFloat64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(FLOAT()),
            ),
            js.Function(
                "getInt16",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "getInt32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "getInt8",
                [js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset")],
                js.Return(INT()),
            ),
            js.Function(
                "getUint16",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "getUint32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(INT()),
            ),
            js.Function(
                "getUint8",
                [js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset")],
                js.Return(INT()),
            ),
            js.Function(
                "setBigInt64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BIGINT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setBigUint64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(BIGINT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setFloat32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(FLOAT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setFloat64",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(FLOAT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setInt16",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setInt32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setInt8",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setUint16",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setUint32",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(BOOLEAN(), "littleEndian", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "setUint8",
                [
                    js.Parameter(INT().hint({"index": "byteLength"}), "byteOffset"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(UNDEFINED()),
            ),
        ],
        inheritance="Function",
    ),
]

EXPORTS_CLASSES: List[js.Class] = ARRAY_TYPES + STRUCTURED_DATA
