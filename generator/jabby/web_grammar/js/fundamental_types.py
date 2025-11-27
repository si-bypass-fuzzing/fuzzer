"""
Representations of fundamental JS classes
"""

from typing import List
from . import js, types
from .types import UNDEFINED, ANY, BOOLEAN, INT, STRING, OBJECT, FUNCTION, UINT

FUNDAMENTAL_OBJECTS: List[js.Class] = [
    js.Class(
        "Object",
        [
            js.Constructor([js.Parameter(ANY(), "value")]),
        ],
        [
            js.Function(
                "assign",
                [
                    js.Parameter(OBJECT(), "target"),
                    js.Parameter(OBJECT(), "source", optional=True, variadic=True),
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "create",
                [
                    js.Parameter(OBJECT(), "proto"),
                    js.Parameter(
                        ANY(), "propertiesObject", optional=True
                    ),  # hint propertiesObject
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "defineProperties",
                [
                    js.Parameter(OBJECT(), "obj"),
                    js.Parameter(ANY(), "props"),  # hint propertiesObject
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "defineProperty",
                [
                    js.Parameter(OBJECT(), "obj"),
                    js.Parameter(STRING(), "prop"),
                    js.Parameter(
                        types.PseudoType(
                            "Iterable", [types.PseudoType("Tuple", [STRING(), ANY()])]
                        ),
                        "descriptor",
                    ),  # hint PropertyDescriptor
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "entries",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(
                    types.PseudoType(
                        "Iterable", [types.PseudoType("Tuple", [STRING(), ANY()])]
                    )
                ),
                special="static",
            ),
            js.Function(
                "freeze",  # FIXME: hint: returns FrozenArray
                [js.Parameter(OBJECT(), "obj")],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "fromEntries",
                [
                    js.Parameter(
                        types.PseudoType(
                            "Iterable", [types.PseudoType("Tuple", [STRING(), ANY()])]
                        ),
                        "iterable",
                    )
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "getOwnPropertyDescriptor",
                [js.Parameter(OBJECT(), "obj"), js.Parameter(STRING(), "prop")],
                js.Return(types.PseudoType("Tuple", [STRING(), ANY()]), nullable=True),
                special="static",
            ),
            js.Function(
                "getOwnPropertyDescriptors",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "getOwnPropertyNames",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(types.PseudoType("Iterable", [STRING()])),
                special="static",
            ),
            js.Function(
                "getOwnPropertySymbols",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(
                    types.PseudoType("Iterable", [STRING()])
                ),  # FIXME change to symbol
                special="static",
            ),
            js.Function(
                "getPrototypeOf",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "groupBy",
                [
                    js.Parameter(types.PseudoType("Iterable", [ANY()]), "items"),
                    js.Callback(
                        "callbackFn",
                        [js.Parameter(ANY(), "element"), js.Parameter(INT(), "index")],
                        js.Return(STRING()),
                    ),
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "hasOwn",
                [js.Parameter(OBJECT(), "obj"), js.Parameter(STRING(), "prop")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "hasOwnProperty", [js.Parameter(STRING(), "prop")], js.Return(BOOLEAN())
            ),
            js.Function(
                "is",
                [js.Parameter(ANY(), "value1"), js.Parameter(ANY(), "value2")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isExtensible",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isFrozen",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "isPrototypeOf", [js.Parameter(OBJECT(), "obj")], js.Return(BOOLEAN())
            ),
            js.Function(
                "isSealed",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(BOOLEAN()),
                special="static",
            ),
            js.Function(
                "keys",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(types.PseudoType("Iterable", [STRING()])),
                special="static",
            ),
            js.Function(
                "preventExtensions",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "propertyIsEnumerable",
                [js.Parameter(STRING(), "prop")],
                js.Return(BOOLEAN()),
            ),
            js.Function(
                "seal",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(OBJECT()),
                special="static",
            ),
            js.Function(
                "setPrototypeOf",
                [
                    js.Parameter(OBJECT(), "obj"),
                    js.Parameter(OBJECT(), "prototype", nullable=True),
                ],
                js.Return(OBJECT()),
                special="static",
            ),
            # skipped toLocaleString()
            js.Function("toString", [], js.Return(STRING())),
            js.Function("valueOf", [], js.Return(INT())),  # FIXME should be primitive
            js.Function(
                "values",
                [js.Parameter(OBJECT(), "obj")],
                js.Return(types.PseudoType("Iterable", [ANY()])),
                special="static",
            ),
        ],
    ),
    js.Class(
        "Function",
        [
            js.Constructor(
                [
                    js.Parameter(STRING(), "arg", variadic=True, optional=True),
                    js.Parameter(STRING(), "functionBody"),
                ]
            ),
        ],
        [
            js.Attribute(UINT(), "length", readonly=True),
            js.Attribute(STRING(), "name", readonly=True),
            js.Attribute(OBJECT(), "prototype", readonly=False),
            js.Function(
                "apply",
                [
                    js.Parameter(OBJECT(), "thisArg", nullable=True),
                    js.Parameter(
                        types.PseudoType("Iterable", [ANY()]),
                        "argsArray",
                        nullable=True,
                        optional=True,
                    ),
                ],
                js.Return(ANY()),
            ),
            js.Function(
                "bind",
                [
                    js.Parameter(OBJECT(), "thisArg", nullable=True),
                    js.Parameter(ANY(), "arg", variadic=True, optional=True),
                ],
                js.Return(FUNCTION()),
            ),
            js.Function(
                "call",
                [
                    js.Parameter(OBJECT(), "thisArg", nullable=True),
                    js.Parameter(ANY(), "arg", variadic=True, optional=True),
                ],
                js.Return(ANY()),
            ),
            js.Function("toString", [], js.Return(STRING())),
        ],
        inheritance="Object",
    ),
    # hints for Symbol properties asyncIterator, hasInstance, isConcatSpreadable,
    # iterator, match, matchAll, replace, search, species, split, toPrimitive,
    # toStringTag, unscopables would be nice
    js.Class(
        "Symbol",
        [
            js.Constructor(
                [js.Parameter(STRING(), "description", optional=True)],
                new_forbidden=True,
            ),
        ],
        [
            js.Function(
                "for",
                [js.Parameter(STRING(), "key")],
                js.Return(types.ObjectType("Symbol")),
                special="static",
            ),
            js.Function(
                "keyFor",
                [js.Parameter(types.ObjectType("Symbol"), "sym")],
                js.Return(STRING()),
                special="static",
            ),
        ],
        inheritance="Function",
    ),
]

ERROR: js.Class = js.Class(
    "Error",
    [
        js.Constructor(
            [
                js.Parameter(STRING(), "message"),
                js.Parameter(
                    OBJECT().hint({"dict": {"cause": STRING()}}),
                    "options",
                    optional=True,
                ),
                js.Parameter(STRING(), "fileName", optional=True),
                js.Parameter(INT(), "lineNumber", optional=True),
            ]
        )
    ],
    [],
    inheritance="Function",
)

WEAK_REF: js.Class = js.Class(
    "WeakRef",
    [
        js.Constructor([js.Parameter(OBJECT(), "target")], new_required=True),
    ],
    [
        js.Function("deref", [], js.Return(OBJECT())),
    ],
    inheritance="Function",
)

PROMISE: js.Class = js.Class(
    "Promise",
    [
        js.Constructor(
            [
                js.Callback(
                    "executor",
                    [
                        js.Callback(
                            "resolve",
                            [js.Parameter(ANY().hint({"generic": "V"}), "value")],
                            js.Return(UNDEFINED()),
                        ),
                        js.Callback(
                            "reject",
                            [js.Parameter(ANY().hint({"generic": "E"}), "reason")],
                            js.Return(UNDEFINED()),
                        ),
                    ],
                    js.Return(ANY()),
                )
            ],
            new_required=True,
        ).hint({"generic": ("V", "E")}),
    ],
    [
        js.Function(
            "all",
            [
                js.Parameter(
                    types.PseudoType("Iterable", [types.ObjectType("Promise")]),
                    "iterable",
                )
            ],
            js.Return(types.ObjectType("Promise")),
            special="static",
        ),
        js.Function(
            "allSettled",
            [
                js.Parameter(
                    types.PseudoType("Iterable", [types.ObjectType("Promise")]),
                    "iterable",
                )
            ],
            js.Return(types.ObjectType("Promise")),
            special="static",
        ),
        js.Function(
            "any",
            [
                js.Parameter(
                    types.PseudoType("Iterable", [types.ObjectType("Promise")]),
                    "iterable",
                )
            ],
            js.Return(types.ObjectType("Promise")),
            special="static",
        ),
        js.Function(
            "catch",
            [
                js.Callback(
                    "onRejected", [js.Parameter(ANY(), "reason")], js.Return(ANY())
                )
            ],
            js.Return(types.ObjectType("Promise")),
        ),
        js.Function(
            "finally",
            [js.Callback("onFinally", [], js.Return(ANY()))],
            js.Return(types.ObjectType("Promise")),
        ),
        js.Function(
            "race",
            [
                js.Parameter(
                    types.PseudoType("Iterable", [types.ObjectType("Promise")]),
                    "iterable",
                )
            ],
            js.Return(types.ObjectType("Promise")),
        ),
        js.Function(
            "reject",
            [js.Parameter(ANY().hint({"generic": "E"}), "reason")],
            js.Return(types.ObjectType("Promise")),
            special="static",
        ),
        js.Function(
            "resolve",
            [js.Parameter(ANY().hint({"generic": "V"}), "value")],
            js.Return(types.ObjectType("Promise").hint({"generic": "V"})),
            special="static",
        ),
        js.Function(
            "then",
            [
                js.Callback(
                    "onFulfilled",
                    [js.Parameter(ANY().hint({"generic": "V"}), "value")],
                    js.Return(ANY()),
                ),
                js.Callback(
                    "onRejected",
                    [js.Parameter(ANY().hint({"generic": "E"}), "reason")],
                    js.Return(ANY()),
                    optional=True,
                ),
            ],
            js.Return(types.ObjectType("Promise")),
        ),
        js.Function(
            "withResolvers", [], js.Return(OBJECT()), special="static"
        ),  # {'promise': Promise, 'resolve': function, 'reject': function}
    ],
    inheritance="Function",
)

EXPORTS_CLASSES: List[js.Class] = FUNDAMENTAL_OBJECTS + [WEAK_REF, PROMISE]
