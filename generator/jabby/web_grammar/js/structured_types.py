"""
Representation of JS structured types
"""

from typing import List
from . import js, types
from .types import UNDEFINED, ANY, BOOLEAN, INT, STRING, OBJECT

KEYED_COLLECTIONS: List[js.Class] = [
    js.Class(
        "Map",
        [
            js.Constructor(
                [
                    js.Parameter(
                        types.PseudoType(
                            "Iterable",
                            [
                                types.PseudoType(
                                    "Tuple",
                                    [
                                        ANY().hint({"generic": "K"}),
                                        ANY().hint({"generic": "V"}),
                                    ],
                                )
                            ],
                        ),
                        "iterable",
                        optional=True,
                    )
                ],
                new_required=True,
            ).hint({"generic": ("K", "V")}),
        ],
        [
            js.Attribute(INT(), "size", readonly=True),
            js.SpecialProperty(
                "iterator", [ANY().hint({"generic": "K"}), ANY().hint({"generic": "V"})]
            ),  # for..of
            js.Function("clear", [], js.Return(UNDEFINED())),
            js.Function(
                "delete",
                [js.Parameter(ANY().hint({"generic": "K"}), "key")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "entries",
                [],
                js.Return(
                    types.PseudoType(
                        "Iterable",
                        [
                            types.PseudoType(
                                "Tuple",
                                [
                                    ANY().hint({"generic": "K"}),
                                    ANY().hint({"generic": "V"}),
                                ],
                            )
                        ],
                    )
                ),
            ),
            js.Function(
                "forEach",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "K"}), "value"),
                            js.Parameter(ANY().hint({"generic": "V"}), "key"),
                            js.Parameter(
                                types.ObjectType("Map").hint({"generic": ("K", "V")}),
                                "map",
                            ),
                        ],
                        js.Return(UNDEFINED()),
                    )
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "get",
                [js.Parameter(ANY().hint({"generic": "K"}), "key")],
                js.Return(ANY().hint({"generic": "V"})),
            ),
            js.Function(
                "groupBy",
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [ANY().hint({"generic": "V"})]),
                        "items",
                    ),
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "V"}), "element"),
                            js.Parameter(INT().hint({"index": "length"}), "index"),
                        ],
                        js.Return(ANY().hint({"generic": "K"})),
                    ),
                ],
                js.Return(types.ObjectType("Map").hint({"generic": ("K", "V")})),
                special="static",
            ),
            js.Function(
                "has",
                [js.Parameter(ANY().hint({"generic": "K"}), "key")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "keys",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "K"})])),
            ),
            js.Function(
                "set",
                [
                    js.Parameter(ANY().hint({"generic": "K"}), "key"),
                    js.Parameter(ANY().hint({"generic": "V"}), "value"),
                ],
                js.Return(types.ObjectType("Map").hint({"generic": ("K", "V")})),
            ),
            js.Function(
                "values",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "V"})])),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "Set",
        [
            js.Constructor(
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [ANY().hint({"generic": "V"})]),
                        "iterable",
                        nullable=True,
                        optional=True,
                    )
                ],
                new_required=True,
            ).hint({"generic": "V"}),
        ],
        [
            js.Attribute(INT(), "size", readonly=True),
            js.SpecialProperty("iterator", [ANY().hint({"generic": "V"})]),  # for..of
            js.Function(
                "add",
                [js.Parameter(ANY().hint({"generic": "V"}), "value")],
                js.Return(types.ObjectType("Set").hint({"generic": "V"})),
            ),
            js.Function("clear", [], js.Return(UNDEFINED())),
            js.Function(
                "delete",
                [js.Parameter(ANY().hint({"generic": "V"}), "value")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "difference",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(types.ObjectType("Set")),
            ),
            js.Function(
                "entries",
                [],
                js.Return(
                    types.PseudoType(
                        "Iterable",
                        [
                            types.PseudoType(
                                "Tuple",
                                [
                                    ANY().hint({"generic": "K"}),
                                    ANY().hint({"generic": "V"}),
                                ],
                            )
                        ],
                    )
                ),
            ),
            js.Function(
                "forEach",
                [
                    js.Callback(
                        "callbackFn",
                        [
                            js.Parameter(ANY().hint({"generic": "V"}), "value"),
                            js.Parameter(ANY().hint({"generic": "K"}), "key"),
                            js.Parameter(
                                types.ObjectType("Set").hint({"generic": "V"}), "set"
                            ),
                        ],
                        js.Return(UNDEFINED()),
                    ),
                    js.Parameter(OBJECT(), "thisArg", optional=True),
                ],
                js.Return(UNDEFINED()),
            ),
            js.Function(
                "has",
                [js.Parameter(ANY().hint({"generic": "V"}), "value")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "intersection",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(types.ObjectType("Set")),
            ),
            js.Function(
                "isDisjointFrom",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "isSubsetOf",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "isSupersetOf",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "keys",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "K"})])),
            ),
            js.Function(
                "symmetricDifference",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(types.ObjectType("Set")),
            ),
            js.Function(
                "union",
                [js.Parameter(types.PseudoType("SetLike"), "other")],
                js.Return(types.ObjectType("Set")),
            ),
            js.Function(
                "values",
                [],
                js.Return(types.PseudoType("Iterable", [ANY().hint({"generic": "V"})])),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "WeakMap",
        [
            js.Constructor(
                [
                    js.Parameter(
                        types.PseudoType(
                            "Iterable",
                            [
                                types.PseudoType(
                                    "Tuple",
                                    [
                                        OBJECT().hint({"generic": "K"}),
                                        OBJECT().hint({"generic": "V"}),
                                    ],
                                )
                            ],
                        ),
                        "iterable",
                        optional=True,
                    )
                ],
                new_required=True,
            ).hint({"generic": ("K", "V")}),
        ],
        [
            js.Function(
                "delete",
                [js.Parameter(OBJECT().hint({"generic": "K"}), "key")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "get",
                [js.Parameter(OBJECT().hint({"generic": "K"}), "key")],
                js.Return(OBJECT()),
            ),
            js.Function(
                "has",
                [js.Parameter(OBJECT().hint({"generic": "K"}), "key")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "set",
                [
                    js.Parameter(OBJECT().hint({"generic": "K"}), "key"),
                    js.Parameter(OBJECT().hint({"generic": "V"}), "value"),
                ],
                js.Return(types.ObjectType("WeakMap").hint({"generic": ("K", "V")})),
            ),
        ],
        inheritance="Function",
    ),
    js.Class(
        "WeakSet",
        [
            js.Constructor(
                [
                    js.Parameter(
                        types.PseudoType("Iterable", [OBJECT().hint({"generic": "V"})]),
                        "iterable",
                        optional=True,
                    )
                ],
                new_required=True,
            ).hint({"generic": "V"}),
        ],
        [
            js.Function(
                "add",
                [js.Parameter(OBJECT().hint({"generic": "V"}), "value")],
                js.Return(types.ObjectType("WeakSet").hint({"generic": "V"})),
            ),
            js.Function(
                "delete",
                [js.Parameter(OBJECT().hint({"generic": "V"}), "value")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "has",
                [js.Parameter(OBJECT().hint({"generic": "V"}), "value")],
                js.Return(BOOLEAN()),
            ),
        ],
        inheritance="Function",
    ),
]

STRUCTURED_DATA: List[js.Class] = [
    js.Class(
        "Atomics",
        [],
        [
            js.Function(
                "add",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "and",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "compareExchange",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "expectedValue"),
                    js.Parameter(INT(), "replacementValue"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "exchange",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "isLockFree",
                [js.Parameter(INT(), "size")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "load",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "notify",
                [
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "count"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "or",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "store",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "sub",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
            js.Function(
                "wait",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(INT(), "timeout", optional=True),
                ],
                js.Return(STRING()),  # "ok", "not-equal", "timed-out"
                special="static",
            ),
            js.Function(
                "waitAsync",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                    js.Parameter(INT(), "timeout", optional=True),
                ],
                js.Return(OBJECT()),
                special="static",
            ),  # {'async': bool, 'value': str|Promise<str>}
            js.Function(
                "xor",
                [
                    js.Parameter(types.ObjectType("TypedArray"), "typedArray"),
                    js.Parameter(INT().hint({"index": "length"}), "index"),
                    js.Parameter(INT(), "value"),
                ],
                js.Return(INT()),
                special="static",
            ),
        ],
        inheritance="Object",
    ),
    js.Class(
        "JSON",
        [],
        [
            js.Function(
                "parse",
                [
                    js.Parameter(STRING(), "text"),
                    js.Callback(
                        "reviver",
                        [js.Parameter(ANY(), "key"), js.Parameter(ANY(), "value")],
                        js.Return(ANY()),
                        optional=True,
                    ),
                ],
                js.Return(ANY()),  # Object, Array, string, number, boolean, or null
                special="static",
            ),
            js.Function(
                "stringify",
                [
                    js.Parameter(ANY(), "value"),
                    js.Callback(
                        "replacer",
                        [js.Parameter(ANY(), "key"), js.Parameter(ANY(), "value")],
                        js.Return(ANY()),
                        optional=True,
                    ),
                    js.Parameter(STRING(), "space", optional=True),
                ],
                js.Return(STRING()),
                special="static",
            ),
        ],
        inheritance="Object",
    ),
]

EXPORTS_CLASSES = KEYED_COLLECTIONS + STRUCTURED_DATA
