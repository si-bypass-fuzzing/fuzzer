"""
Representations of WebIDL  dictionary, enum, typedef, and includes.
"""

from typing import Iterator, List, Optional, Self
from . import var, types as webidl_types
from ..js import types as js_types

class Typedef(webidl_types.KeyComparable, webidl_types.DictSerializable):
    """WebIDL typedef
    A typedef is a type alias"""

    def __init__(
        self,
        name: str,
        idl_type: js_types.Type,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        self.name = name
        self.idl_type = idl_type
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"Typedef({self.name},{self.idl_type.key()})"

    def hash_key(self) -> tuple:
        return (33, self.name, self.idl_type.hash_key())

    def to_dict(self) -> dict:
        return {
            "type": "Typedef",
            "name": self.name,
            "idlType": self.idl_type.to_dict(),
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Typedef":
        """Deserialize from webidl2js dict

        Args:
            data (dict): typedef JSON dict

        Returns:
            Self: typedef instance
        """
        assert data["type"] == "typedef"
        return Typedef(
            data["name"],
            webidl_types.idltype_from_webidl2js_dict(data["idlType"]),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )

class Dictionary(webidl_types.KeyComparable, webidl_types.DictSerializable):
    """WebIDL dictionary
    A dictionary is a collection of dictionary members.
    It can also inherit from another dictionary, and can be partial
    """

    def __init__(
        self,
        name: str,
        members: List[var.DictMember],
        inheritance: Optional["str|Dictionary"] = None,
        partial: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        self.name = name
        self.members = members
        self.inheritance = inheritance
        self.partial = partial
        self.ext_attrs = ext_attrs if ext_attrs is not None else []
        self.includes: List[Self] = []

    def add_partial(self, partial: Self) -> None:
        """Add a partial dictionary to the dictionary

        Args:
            partial (Self): Partial dictionary of this dictionary
        """
        assert partial.partial is True
        assert partial.name == self.name
        self.includes.append(partial)

    def get_members(self) -> Iterator[var.DictMember]:
        """Get all members of the dictionary,
        including those from included partial dictionaries

        Yields:
            Iterator[var.DictMember]: iterator over all members
        """
        for member in self.members:
            yield member
        for include in self.includes:
            for member in include.get_members():
                yield member
        if self.inheritance is not None and isinstance(self.inheritance, Dictionary):
            for member in self.inheritance.get_members():
                yield member

    def replace_typedefs(self, typedefs: dict[str, Typedef]) -> None:
        """Replace all typedefs in the interface members"""
        for member in self.members:
            if isinstance(member.var_type, js_types.ObjectType) and member.var_type.class_name in typedefs:
                hints = member.var_type.hint_dict
                member.var_type = typedefs[member.var_type.class_name].idl_type
                member.var_type.hint_dict = hints
        for include in self.includes:
            include.replace_typedefs(typedefs)

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Dictionary":
        """Deserialize from webidl2js dict

        Args:
            data (dict): dictionary JSON dict

        Returns:
            Self: Dictionary instance
        """
        assert data["type"] == "dictionary"
        members = []
        for member in data["members"]:
            members.append(var.DictMember.from_webidl2js_dict(member))
        return Dictionary(
            data["name"],
            members,
            data.get("inheritance", None),
            data.get("partial", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )

    def key(self) -> str:
        key = f"Dictionary_{self.name}"
        # if self.inheritance is not None:
        #     key += f"<-{self.inheritance}"
        # if self.partial:
        #     key += "_part"
        # key += f"({','.join([m.key() for m in self.members])})"
        # key += f"({','.join([i.key() for i in self.includes])})"
        return key

    def hash_key(self) -> tuple:
        return (34, self.name)

    def to_dict(self) -> dict:
        return {
            "type": "Dictionary",
            "name": self.name,
            "members": [m.to_dict() for m in self.members],
            "inheritance": self.serialized_inheritance(),
            "partial": self.partial,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
            "includes": [i.to_dict() for i in self.includes],
        }

    def link_parent(self, parent: Self) -> None:
        """Link the parent dictionary to the dictionary

        Args:
            parent (Self): Parent dictionary
        """
        self.inheritance = parent

    def serialized_inheritance(self) -> str | None:
        if isinstance(self.inheritance, Dictionary):
            return self.inheritance.name
        return self.inheritance


class Enum(webidl_types.KeyComparable, webidl_types.DictSerializable):
    """WebIDL enum
    An enum is a collection of values"""

    def __init__(
        self,
        name: str,
        values: List[var.EnumValue],
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        self.name = name
        self.values = values
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Enum":
        """Deserialize from webidl2js dict

        Args:
            data (dict): enum JSON dict

        Returns:
            Self: Enum instance
        """
        assert data["type"] == "enum"
        values = []
        for value in data["values"]:
            values.append(var.EnumValue.from_webidl2js_dict(value))
        return Enum(
            data["name"],
            values,
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )

    def key(self) -> str:
        return f"Enum_{self.name}"  # ({','.join([v.key() for v in self.values])})"

    def hash_key(self) -> tuple:
        return (35, self.name)

    def to_dict(self) -> dict:
        return {
            "type": "Enum",
            "name": self.name,
            "values": [v.to_dict() for v in self.values],
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }





class Include(webidl_types.KeyComparable, webidl_types.DictSerializable):
    """WebIDL includes
    An include is used to import a mixin"""

    def __init__(
        self,
        target: str,
        includes: str,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        self.target = target
        self.includes = includes
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Include":
        """Deserialize from webidl2js dict

        Args:
            data (dict): includes JSON dict

        Returns:
            Self: Include instance
        """
        assert data["type"] == "includes"
        return Include(
            data["target"],
            data["includes"],
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )

    def key(self) -> str:
        return f"Include({self.target},{self.includes})"

    def hash_key(self) -> tuple:
        return (36, self.target, self.includes)

    def to_dict(self) -> dict:
        return {
            "type": "Include",
            "target": self.target,
            "includes": self.includes,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }
