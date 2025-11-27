"""
Classes that represent WebIDL variables, such as arguments, attributes, constants, etc.
"""

from typing import List, Any
from . import types as webidl_types
from ..js import types as js_types
from ..js import js
from ...util import KeyComparable, DictSerializable


class Var(js.Var):
    """Base class for all variables in WebIDL. Not supposed to be used directly."""

    def __init__(
        self,
        var_type: js_types.Type,
        nullable: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, nullable)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"IDLVar_{self.var_type}{'?' if self.nullable else ''}"

    def hash_key(self) -> tuple:
        return (21, self.var_type.hash_key(), self.nullable)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }


class NamedVar(js.NamedVar):
    """Base class for all named variables in WebIDL. Not supposed to be used directly."""

    def __init__(
        self,
        var_type: js_types.Type,
        name: str,
        nullable: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, name, nullable)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"IDLNamedVar_{self.var_type}{'?' if self.nullable else ''}_{self.name}"

    def hash_key(self) -> tuple:
        return (22, self.var_type.hash_key(), self.nullable, self.name)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs]
        }


class Argument(js.Parameter):
    """WebIDL function argument"""

    def __init__(
        self,
        var_type: js_types.Type,
        name: str,
        nullable: bool = False,
        default: None | webidl_types.DefaultValue = None,
        optional: bool = False,
        variadic: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, name, nullable, optional, variadic)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []
        self.default = default

    def key(self) -> str:
        key = f"IDLArgument_{self.var_type}{'?' if self.nullable else ''}_{self.name}"
        if self.optional:
            key += "_opt"
        if self.variadic:
            key += "_var"
        if self.default is not None:
            key += str(self.default)
        return key

    def hash_key(self) -> tuple:
        return (23, self.var_type.hash_key(), self.nullable, self.name, self.optional, self.variadic)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "default": self.default.to_dict() if self.default is not None else None,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Argument":
        """Deserialize from webidl2js dict

        Args:
            data (dict): argument JSON dict

        Returns:
            Self: Argument instance
        """
        assert len(data.get("parent", {})) == 0

        default: None | webidl_types.DefaultValue = None
        if data["default"] is not None:
            default = webidl_types.DefaultValue.from_webidl2js_dict(data["default"])

        return Argument(
            webidl_types.idltype_from_webidl2js_dict(data["idlType"]),
            data["name"],
            data["idlType"].get("nullable", False),
            default,
            data.get("optional", False),
            data.get("variadic", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Attribute(js.Attribute):
    """WebIDL interface attribute"""

    def __init__(
        self,
        var_type: js_types.Type,
        name: str,
        nullable: bool = False,
        special: str = "",
        readonly: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        assert special in ["", "static", "stringifier", "inherit"]
        super().__init__(var_type, name, nullable, special, readonly)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        key = f"IDLAttribute_{self.var_type}{'?' if self.nullable else ''}_{self.name}"
        if self.special:
            key += "_" + self.special
        if self._readonly:
            key += "_ro"
        return key

    def hash_key(self) -> tuple:
        return (24, self.var_type.hash_key(), self.nullable, self.name, self.special, self._readonly)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "special": self.special,
            "readonly": self._readonly,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    def is_readonly(self) -> bool:
        """Check if the attribute is readonly
        WebIDL allows to overwrite the readonly property via the ExtendedAttributes Replacable and PutForwards
        Thus, this function checks for these attributes, too.
        """
        if self.is_put_forwards():
            return False
        if "Replaceable" in [ea.name for ea in self.ext_attrs]:
            return False
        return self._readonly

    def is_put_forwards(self) -> bool:
        """Check if the attribute has the PutForwards extended attribute"""
        return "PutForwards" in [ea.name for ea in self.ext_attrs]

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Attribute":
        """Deserialize from webidl2js dict

        Args:
            data (dict): attribute JSON dict

        Returns:
            Self: Attribute instance
        """
        assert data["type"] == "attribute"
        assert len(data.get("parent", {})) == 0
        return Attribute(
            webidl_types.idltype_from_webidl2js_dict(data["idlType"]),
            data["name"],
            data["idlType"].get("nullable", False),
            data.get("special", ""),
            data.get("readonly", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Constant(js.Constant):
    """WebIDL interface constant"""

    def __init__(
        self,
        var_type: js_types.Type,
        name: str,
        value: webidl_types.DefaultValue | None = None,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, name)
        self.value = value
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        key = f"IDLConstant_{self.var_type}_{self.name}:{self.value}"
        return key

    def hash_key(self) -> tuple:
        return (25, self.var_type.hash_key(), self.name, self.value)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "value": self.value.to_dict() if self.value is not None else None,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Constant":
        """Deserialize from webidl2js dict

        Args:
            data (dict): const JSON dict

        Returns:
            Self: Constant instance
        """
        assert data["type"] == "const"
        assert len(data.get("parent", {})) == 0
        value: webidl_types.DefaultValue = (
            webidl_types.DefaultValue.from_webidl2js_dict(data["value"])
        )
        return Constant(
            webidl_types.idltype_from_webidl2js_dict(data["idlType"]),
            data["name"],
            value,
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Return(js.Return):
    """WebIDL function return value"""

    def __init__(
        self,
        var_type: js_types.Type,
        nullable: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, nullable)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"IDLReturn_{self.var_type}{'?' if self.nullable else ''}"

    def hash_key(self) -> tuple:
        return (26, self.var_type.hash_key(), self.nullable)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Return":
        """Deserialize from webidl2js dict

        Args:
            data (dict): return JSON dict

        Returns:
            Self: Return instance
        """
        assert data["type"] == "return-type"
        return Return(
            webidl_types.idltype_from_webidl2js_dict(data),
            data.get("nullable", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class DictMember(NamedVar):
    """WebIDL dictionary member"""

    def __init__(
        self,
        var_type: js_types.Type,
        name: str,
        nullable: bool = False,
        required: bool = False,
        default: None | webidl_types.DefaultValue = None,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(var_type, name, nullable, ext_attrs)
        self.required = required
        self.default = default

    def key(self) -> str:
        key = f"DictMember_{self.var_type}"
        if self.nullable:
            key += "?"
        if self.required:
            key += "!"
        key += f"_{self.name}"
        if self.default is not None:
            key += f"_{self.default}"
        return key

    def hash_key(self) -> tuple:
        return (27, self.var_type.hash_key(), self.nullable, self.required, self.name, self.default)

    def to_dict(self) -> dict:
        return {
            "type": "DictMember",
            "name": self.name,
            "idlType": self.var_type.to_dict(),
            "nullable": self.nullable,
            "required": self.required,
            "default": self.default.to_dict() if self.default is not None else None,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "DictMember":
        """Deserialize from webidl2js dict

        Args:
            data (dict): field JSON dict

        Returns:
            Self: DictMember instance
        """
        assert data["type"] == "field"
        default: None | webidl_types.DefaultValue = None
        if data.get("default", None) is not None:
            default = webidl_types.DefaultValue.from_webidl2js_dict(data["default"])
        return DictMember(
            webidl_types.idltype_from_webidl2js_dict(data["idlType"]),
            data["name"],
            data["idlType"].get("nullable", False),
            data.get("required", False),
            default,
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class EnumValue(KeyComparable, DictSerializable):
    """WebIDL enum value"""

    def __init__(self, value: Any):
        self.value = value

    def key(self) -> str:
        return f"EnumValue_{self.value}"

    def to_dict(self) -> dict:
        return {
            "type": "EnumValue",
            "value": self.value,
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "EnumValue":
        """Deserialize from webidl2js dict

        Args:
            data (dict): enum-value JSON dict

        Returns:
            Self: EnumValue instance
        """
        assert data["type"] == "enum-value"
        return EnumValue(data["value"])
