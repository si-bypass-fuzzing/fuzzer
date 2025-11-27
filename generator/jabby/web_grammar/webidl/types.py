"""
Implementation of WebIDL types and extended attributes
"""

from typing import List, Dict, Any

from ...util import KeyComparable, DictSerializable
from ..js import types as js_types


NUMBER_TYPES = [
    "byte",
    "octet",
    "short",
    "unsigned short",
    "long",
    "unsigned long",
    "long long",
    "unsigned long long",
    "float",
    "unrestricted float",
    "double",
    "unrestricted double",
]

STRING_TYPES = ["DOMString", "USVString", "ByteString"]

BUFFER_TYPES = [
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
]


class PrimitiveType(js_types.PrimitiveType):
    """Basic WebIDL type class
    Uses the KeyComparable and DictSerializable mixins
    """

    def __init__(
        self,
        primitive: str,
        idl_type: str,
        ext_attrs: None | List["ExtendedAttribute"] = None,
    ):
        super().__init__(primitive)
        self.idl_type = idl_type
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"{type(self).__name__}_{self.primitive}_{self.idl_type}"

    def hash_key(self) -> tuple:
        return (16, self.primitive, self.idl_type)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "idl_type": self.idl_type,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }


class AnyType(js_types.AnyType):
    def __init__(self, ext_attrs: None | List["ExtendedAttribute"] = None):
        super().__init__()
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"{type(self).__name__}"

    def hash_key(self) -> tuple:
        return (16,None)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }


class Union(js_types.UnionType):
    """Implementation of a WebIDL union type"""

    def __init__(
        self,
        idl_types: List[js_types.Type],
        ext_attrs: None | List["ExtendedAttribute"] = None,
    ):
        assert len(idl_types) > 1
        super().__init__(idl_types)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Union":
        """Deserialize from webidl2js dict

        Args:
            data (dict): idlType JSON dict

        Returns:
            Self: Union instance
        """
        assert data["union"] is True
        assert isinstance(data["idlType"], list)
        idl_types = []
        for idl_type in data["idlType"]:
            idl_types.append(idltype_from_webidl2js_dict(idl_type))
        return Union(
            idl_types,
            [
                ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class InterfaceType(js_types.ObjectType):
    """WebIDL interface type
    -> type representing an object that implements a WebIDL interface"""

    def __init__(
        self,
        interface: str,
        inners: List[js_types.Type] | None = None,
        ext_attrs: None | List["ExtendedAttribute"] = None,
    ):
        super().__init__(interface, inners)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"InterfaceType_{self.class_name}"

    def hash_key(self) -> tuple:
        return (17, self.class_name)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }


def generic_idltype_from_webidl2js_dict(data: dict) -> js_types.Type:

    idl_types = data["idlType"]
    assert isinstance(idl_types, list) and len(idl_types) > 0

    match data["generic"]:

        case "Promise":
            return InterfaceType(
                "Promise",
                [idltype_from_webidl2js_dict(idl_types[0])],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "sequence":
            return InterfaceType(
                "Array",
                [idltype_from_webidl2js_dict(idl_types[0])],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "record":
            return InterfaceType(
                "Map",
                [idltype_from_webidl2js_dict(idl_type) for idl_type in idl_types],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "FrozenArray":
            return InterfaceType(
                "FrozenArray",
                [idltype_from_webidl2js_dict(idl_types[0])],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "ObservableArray":
            return InterfaceType(
                "Array",
                [idltype_from_webidl2js_dict(idl_types[0])],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "ObservableSet":
            return InterfaceType(
                "Set",
                [idltype_from_webidl2js_dict(idl_types[0])],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "ObservableMap":
            return InterfaceType(
                "Map",
                [idltype_from_webidl2js_dict(idl_type) for idl_type in idl_types],
                [
                    ExtendedAttribute.from_webidl2js_dict(ea)
                    for ea in data.get("extAttrs", [])
                ],
            )
        case "":
            raise ValueError("Not a generic type")
        case _:
            raise ValueError(f"Unknown generic type: {data['generic']}")


def idltype_from_webidl2js_dict(data: dict) -> js_types.Type:
    """Deserialize any IDLType from a webidl2js dict
    Automatically detects the type of IDLType and returns the appropriate instance

    Args:
        data (dict): webidl2js JSON dict

    Returns:
        IDLType: IDLType child instance
    """

    assert not (
        data["generic"] != "" and data["union"] is True
    )  # i dont expect a generic union

    if data["generic"] != "":
        return generic_idltype_from_webidl2js_dict(data)
    if data["union"] is True:
        return Union.from_webidl2js_dict(data)

    assert isinstance(data["idlType"], str) and data["idlType"] != ""

    extended_attributes = [
        ExtendedAttribute.from_webidl2js_dict(ea) for ea in data.get("extAttrs", [])
    ]

    if data["idlType"] in NUMBER_TYPES:
        return PrimitiveType("number", data["idlType"], extended_attributes)
    if data["idlType"] == "boolean":
        return PrimitiveType("boolean", "", extended_attributes)
    if data["idlType"] == "undefined":
        return PrimitiveType("undefined", "", extended_attributes)
    if data["idlType"] == "any":
        return AnyType(extended_attributes)
    if data["idlType"] == "BigInt":
        return InterfaceType("BigInt", ext_attrs=extended_attributes)

    if data["idlType"] in STRING_TYPES:
        return PrimitiveType("string", data["idlType"], extended_attributes)

    if data["idlType"] in BUFFER_TYPES:
        return InterfaceType(data["idlType"], ext_attrs=extended_attributes)

    # assume that the type is an interface
    return InterfaceType(data["idlType"], ext_attrs=extended_attributes)


class ExtendedArgument(KeyComparable, DictSerializable):
    """Class for arguments of WebIDl extended attributes
    This is a separate class to prevent circular references between ExtendedAttribute and Argument
    """

    def __init__(
        self,
        idl_type: js_types.Type,
        name: str,
        nullable: bool = False,
        default: Any | None = None,
        optional: bool = False,
        variadic: bool = False,
        ext_attrs: None | List["ExtendedAttribute"] = None,
    ):
        self.idl_type = idl_type
        self.nullable = nullable
        self.ext_attrs = ext_attrs if ext_attrs is not None else []
        self.name = name
        self.default = default
        self.optional = optional
        self.variadic = variadic

    def key(self) -> str:
        key = f"ExtendedArgument_{self.idl_type}{'?' if self.nullable else ''}_{self.name}"
        if self.optional:
            key += "_opt"
        if self.variadic:
            key += "_var"
        if self.default is not None:
            key += str(self.default)
        return key

    def hash_key(self) -> tuple:
        return (18, self.idl_type, self.nullable, self.name, self.optional, self.variadic)

    def to_dict(self) -> dict:
        return {
            "type": "ExtendedArgument",
            "name": self.name,
            "idlType": self.idl_type.to_dict(),
            "nullable": self.nullable,
            "default": self.default,
            "optional": self.optional,
            "variadic": self.variadic,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "ExtendedArgument":
        """Deserialize from webidl2js dict

        Args:
            data (dict): idlType JSON dict

        Returns:
            Self: ExtendedArgument instance
        """
        return ExtendedArgument(
            idltype_from_webidl2js_dict(data["idlType"]),
            data["name"],
            data["idlType"].get("nullable", False),
            data.get("default", None),
            data.get("optional", False),
            data.get("variadic", False),
            [
                ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class ExtendedAttribute(KeyComparable, DictSerializable):
    """Class for WebIDL extended attributes
    Holds additional information about WebIDL objects"""

    def __init__(
        self,
        name: str,
        arguments: List["ExtendedArgument"],
        rhs: None | Dict[str, str],
    ):
        self.name = name
        self.arguments = arguments
        self.rhs = rhs if rhs is not None else {}

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "ExtendedAttribute":
        """Deserialize from webidl2js dict

        Args:
            data (dict): idlType JSON dict

        Returns:
            Self: ExtendedAttribute instance
        """
        assert data["type"] == "extended-attribute"
        assert len(data.get("parent", {})) == 0
        return ExtendedAttribute(
            data["name"],
            [
                ExtendedArgument.from_webidl2js_dict(arg)
                for arg in data.get("arguments", [])
            ],
            data.get("rhs", None),
        )

    def key(self) -> str:
        return (
            f"ExtendedAttribute_{self.name}"
            + f"({','.join([arg.key() for arg in self.arguments])})"
            + str(self.rhs)
        )

    def hash_key(self) -> tuple:
        return (19, self.name, tuple(arg.hash_key() for arg in self.arguments), self.rhs)

    def to_dict(self) -> dict:
        return {
            "type": "ExtendedAttribute",
            "name": self.name,
            "arguments": [arg.to_dict() for arg in self.arguments],
            "rhs": self.rhs,
        }


class DefaultValue(KeyComparable, DictSerializable):
    """Class for default values of WebIDL arguments, dicts and consts"""

    TYPES = [
        "string",
        "number",
        "boolean",
        "null",
        "Infinity",
        "NaN",
        "sequence",
        "dictionary",
    ]

    def __init__(self, default_type: str, value: str | bool | List | None):
        assert default_type in self.TYPES

        if default_type == "Infinity":
            assert value in ["+Infinity", "-Infinity"]
        if default_type == "boolean":
            assert isinstance(value, bool)
        if default_type == "sequence":
            assert isinstance(value, list) and len(value) == 0
        self.value = value
        self.default_type = default_type

    def key(self) -> str:
        return f"DefaultValue_{self.value}_{self.default_type}"

    def hash_key(self) -> tuple:
        return (20, self.value, self.default_type)

    def to_dict(self) -> dict:
        return {
            "type": "DefaultValue",
            "value": self.value,
            "default_type": self.default_type,
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "DefaultValue":
        """Deserialize from webidl2js dict

        Args:
            data (dict): default JSON dict

        Returns:
            Self: DefaultValue instance
        """
        assert isinstance(data, dict)
        default_type: str = data["type"]
        value: str | bool | List | None = None

        if default_type == "Infinity":
            value = "-Infinity" if data["negative"] else "+Infinity"
        elif default_type == "sequence":
            value = []
        elif default_type in ["dictionary", "null"]:
            value = None
        else:
            value = data["value"]

        return DefaultValue(default_type, value)
