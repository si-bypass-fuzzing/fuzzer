"""
Representation of basic JS types
"""

import json
from typing import Dict, List, Self, Tuple, Any
from ...util import KeyComparable, DictSerializable

ARRAY_BUFFER_VIEWS: list[str] = [
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "BigInt64Array",
    "BigUint64Array",
    "Float32Array",
    "Float64Array",
    "DataView",
]

# these typemappings are implicitly defined by the WebIDL spec,
# we must keep them in mind during type matching and value generation
TYPE_MAP: dict[str, list[str]] = {
    "ArrayBufferView": ARRAY_BUFFER_VIEWS,
    "BufferSource": ["ArrayBuffer"] + ARRAY_BUFFER_VIEWS,
    "AllowSharedBufferSource": ["ArrayBuffer", "SharedArrayBuffer", "Buffer"]
    + ARRAY_BUFFER_VIEWS,
    "Iterable": ["Array", "Iterable"],
    "SetLike": ["Set", "Map"],
}


class HintDict(DictSerializable):
    def __init__(self):
        self.hints: Dict[str, Any] = {}

    def to_dict(self) -> dict:
        return self.get()

    def get(self) -> Dict[str, Any]:
        return self.hints

    def add_hints(self, hints: Dict[str, Any]) -> None:
        for k, v in hints.items():
            if isinstance(v, dict):
                cleaned = {}
                for key, value in v.items():
                    if isinstance(value, Type):
                        cleaned[key] = value.to_dict()
                    else:
                        cleaned[key] = value
                self.hints[k] = cleaned
            else:
                self.hints[k] = v


class Type(KeyComparable, DictSerializable):
    """Base class for all types

    Hints allow to add additional information to generate semantically correct values
    Valid hints:
    - "index": "<lenght property/function>"
      - when generating a number for an index, emit code in the form "<rand number> % <length>"
    - "generic": "<generic type>" | ("generic type", "other generic type")
      - used to track  inner values of an generic
    - "number": "<number type>"
      - tracks specific number type (int8, uint8, ...)
      - in TypedArray "T" is used to represent the type of the child class
    - "keyword": ["<possbile value>",...]
      - used to track possible values for a keyword
    - "mod": <target value> | ("param property", <target value>)
      - the property of the parameter must be divisible by target value
      - if this applies to a parameter, the "param property" is omitted
      - relevant for TypedArray
    - "dict": {"attribute": type, ...}
      - hints that this parameter is a dictionary with the given attributes

    """

    def __init__(self):
        self.hint_dict: HintDict = HintDict()

    def to_dict(self) -> dict:
        return {
            "type": f"{type(self).__name__}",
            "hints": self.hint_dict.to_dict(),
        }

    def matches(self, other: "Type") -> bool:
        """
        Check if the type matches another type. Returns True if a variable of this type can be used as a parameter of the other type
        """
        raise NotImplementedError

    def hint(self, new_hint: Dict[str, Any]) -> Self:
        self.hint_dict.add_hints(new_hint)
        return self

    def get_hints(self) -> Dict[str, Any]:
        return self.hint_dict.get()


class PrimitiveType(Type):
    """Represents a primitive type in JavaScript"""

    def __init__(self, primitive: str):
        super().__init__()
        assert primitive in [
            "string",
            "number",
            "boolean",
            "null",
            "undefined",
            "bigint",
            "symbol",
        ]
        self.primitive = primitive

    def key(self) -> str:
        return f"{type(self).__name__}_{self.primitive}"

    def hash_key(self) -> tuple:
        return (1, self.primitive)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "primitive": self.primitive,
        }

    def matches(self, other: "Type") -> bool:
        if isinstance(other, AnyType):
            return True
        if isinstance(other, PrimitiveType):
            return self.primitive == other.primitive
        if isinstance(other, UnionType):
            return any([self.matches(t) for t in other.types])
        return False


class ObjectType(Type):
    """Represents an object type (instantiation of a class) in JavaScript"""

    def __init__(self, class_name: str, inners: List[Type] | None = None):
        super().__init__()
        self.class_name = class_name
        self.inners = inners if inners is not None else []

    def key(self) -> str:
        return f"{type(self).__name__}_{self.class_name}"

    def hash_key(self) -> tuple:
        return (2, self.class_name, tuple([t.hash_key() for t in self.inners]))

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "class_name": self.class_name,
            "inners": [inner.to_dict() for inner in self.inners],
        }

    def matches(self, other: "Type") -> bool:

        # we always await a promise and thus can use the inner type directly
        if self.class_name == "Promise":
            return self.inners[0].matches(other)

        if isinstance(other, AnyType):
            return True
        if isinstance(other, PrimitiveType):
            return other.primitive == self.class_name.lower()
        if isinstance(other, UnionType):
            return any([self.matches(t) for t in other.types])
        if isinstance(other, ObjectType):
            if self.class_name == other.class_name:
                return self.inners_match(other)

            if other.class_name in TYPE_MAP:
                return self.class_name in TYPE_MAP[other.class_name] and (
                    self.inners_match(other)
                    if other.class_name in ["Iterable", "SetLike"]
                    else True
                )

        return False

    def inners_match(self, other: "ObjectType") -> bool:
        if len(self.inners) == 0 and len(other.inners) == 0:
            return True
        if len(self.inners) == len(other.inners):
            return all(
                [
                    self.inners[i].matches(other.inners[i])
                    for i in range(len(self.inners))
                ]
            )
        return False


class AnyType(Type):
    """Helper class to represent a value that can have any type"""

    def key(self) -> str:
        return "Any"

    def hash_key(self) -> tuple:
        return (3,None)

    def matches(self, other: "Type") -> bool:
        if isinstance(other, AnyType):
            return True
        return False


class UnionType(Type):
    def __init__(self, types: List[Type]):
        super().__init__()
        self.types = types

    def key(self) -> str:
        return f"{type(self).__name__}_{'_'.join([t.key() for t in self.types])}"

    def hash_key(self) -> tuple:
        return (4, tuple([t.hash_key() for t in self.types]))

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "types": [t.to_dict() for t in self.types],
        }

    def matches(self, other: "Type") -> bool:
        if isinstance(other, AnyType):
            return True
        if isinstance(other, UnionType):
            return all([t.matches(other) for t in self.types])
        return False


class PseudoType(ObjectType):
    """Helper class to represent placeholder types e.g. Iterable or Buffer"""

    TYPES = [
        "Buffer",
        "SetLike",
        "Iterable",
        "Tuple",
    ]

    def __init__(self, name: str, inners: List[Type] | None = None):
        assert name in self.TYPES
        super().__init__(name, inners=inners)


# shorthand for repeating standard types
def UNDEFINED() -> PrimitiveType:
    return PrimitiveType("undefined")


def ANY() -> AnyType:
    return AnyType()


def INT() -> PrimitiveType:
    return PrimitiveType("number")


def UINT() -> PrimitiveType:
    return PrimitiveType("number").hint({"number": "uint"})


def FLOAT() -> PrimitiveType:
    return PrimitiveType("number")


def BOOLEAN() -> PrimitiveType:
    return PrimitiveType("boolean")


def STRING() -> PrimitiveType:
    return PrimitiveType("string")


def OBJECT() -> ObjectType:
    return ObjectType("Object")


def FUNCTION() -> ObjectType:
    return ObjectType("Function")


def ARRAY() -> ObjectType:
    return ObjectType("Array")


def BIGINT() -> ObjectType:
    return ObjectType("BigInt")
