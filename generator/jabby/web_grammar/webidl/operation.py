"""
WebIDL operations of interfaces such as constructors, methods and iterables
"""

from typing import List, Sequence
from . import var, entities
from . import types as webidl_types
from ..js import types as js_types
from ..js import js


class Operation(js.Function):
    """
    WebIDL operation
    Has a name, arguments and a return type
    """

    def __init__(
        self,
        name: str,
        arguments: Sequence["var.Argument | Callback"],
        ret: var.Return,
        special: str = "",
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        assert special in [
            "",
            "getter",
            "setter",
            "deleter",
            "static",
            "stringifier",
            "legacycaller",
        ]
        super().__init__(name, arguments, ret, special)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}"
        # if self.special != "":
        #     key += f"_{self.special}_"
        # key += f"({','.join([argument.key() for argument in self.arguments])})->{self.ret.key()}"
        return key

    def hash_key(self) -> tuple:
        return (28, self.name)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    def replace_typedefs(self, typedefs: dict[str, entities.Typedef]) -> None:
        for argument in self.arguments:
            if isinstance(argument, var.Argument) and isinstance(argument.var_type, js_types.ObjectType) and argument.var_type.class_name in typedefs:
                hints = argument.var_type.hint_dict
                argument.var_type = typedefs[argument.var_type.class_name].idl_type
                argument.var_type.hint_dict = hints
            if isinstance(argument, Callback):
                argument.replace_typedefs(typedefs)
        if isinstance(self.ret.var_type, js_types.ObjectType) and self.ret.var_type.class_name in typedefs:
            hints = self.ret.var_type.hint_dict
            self.ret.var_type = typedefs[self.ret.var_type.class_name].idl_type
            self.ret.var_type.hint_dict = hints



    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Operation":
        """Deserialize from webidl2js dict

        Args:
            data (dict): operation JSON dict

        Returns:
            Self: Operation instance
        """
        assert data["type"] == "operation"
        assert len(data.get("parent", {})) == 0
        arguments = []
        for argument in data["arguments"]:
            arguments.append(var.Argument.from_webidl2js_dict(argument))

        ret: var.Return
        if data["special"] == "stringifier":
            ret = var.Return(webidl_types.PrimitiveType("string", "DOMString"))
        else:
            ret = var.Return.from_webidl2js_dict(data["idlType"])

        return Operation(
            data["name"],
            arguments,
            ret,
            data.get("special", ""),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )
class Constructor(js.Constructor):
    """WebIDL constructor operation
    Initializes an object of an interface"""

    def __init__(
        self,
        arguments: Sequence["var.Argument | Callback"],
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(arguments)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        return f"IDLConstructor({','.join([argument.key() for argument in self.arguments])})"

    def hash_key(self) -> tuple:
        return (29, tuple([argument.hash_key() for argument in self.arguments]))

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    def replace_typedefs(self, typedefs: dict[str, entities.Typedef]) -> None:
        for argument in self.arguments:
            if isinstance(argument, var.Argument) and isinstance(argument.var_type, js_types.ObjectType) and argument.var_type.class_name in typedefs:
                hints = argument.var_type.hint_dict
                argument.var_type = typedefs[argument.var_type.class_name].idl_type
                argument.var_type.hint_dict = hints
            if isinstance(argument, Callback):
                argument.replace_typedefs(typedefs)

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Constructor":
        """Deserialize from webidl2js dict

        Args:
            data (dict): constructor JSON dict

        Returns:
            Self: Constructor instance
        """
        assert data["type"] == "constructor"
        assert len(data.get("parent", {})) == 0
        arguments = []
        for argument in data["arguments"]:
            arguments.append(var.Argument.from_webidl2js_dict(argument))
        return Constructor(
            arguments,
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Callback(js.Callback):
    """WebIDL callback operation"""

    def __init__(
        self,
        name: str,
        arguments: Sequence["var.Argument | Callback"],
        ret: var.Return,
        optional: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        super().__init__(name, arguments, ret, optional)
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Callback":
        """Deserialize from webidl2js dict

        Args:
            data (dict): callback JSON dict

        Returns:
            Self: Callback instance
        """
        assert data["type"] == "callback"
        arguments = []
        for argument in data["arguments"]:
            arguments.append(var.Argument.from_webidl2js_dict(argument))
        return Callback(
            data["name"],
            arguments,
            var.Return.from_webidl2js_dict(data["idlType"]),
            data.get("optional", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}{'?' if self.optional else ''}"
        # if self.special != "":
        #     key += f"_{self.special}_"
        # key += f"({','.join([argument.key() for argument in self.arguments])})->{self.ret.key()}"
        return key

    def hash_key(self) -> tuple:
        return (30, self.name, self.optional)

    def replace_typedefs(self, typedefs: dict[str, entities.Typedef]) -> None:
        for argument in self.arguments:
            if isinstance(argument, var.Argument) and isinstance(argument.var_type, js_types.ObjectType) and argument.var_type.class_name in typedefs:
                hints = argument.var_type.hint_dict
                argument.var_type = typedefs[argument.var_type.class_name].idl_type
                argument.var_type.hint_dict = hints
            if isinstance(argument, Callback):
                argument.replace_typedefs(typedefs)
        if isinstance(self.ret.var_type, js_types.ObjectType) and self.ret.var_type.class_name in typedefs:
            hints = self.ret.var_type.hint_dict
            self.ret.var_type = typedefs[self.ret.var_type.class_name].idl_type
            self.ret.var_type.hint_dict = hints


class SpecialProperty(js.SpecialProperty):
    """WebIDL special declaration
    Used for maplike, setlike and iterable"""

    TYPES = ["maplike", "setlike", "iterable", "iterator"]

    def __init__(
        self,
        property_type: str,
        var_types: List[js_types.Type],
        arguments: None | List[var.Argument] = None,
        readonly: bool = False,
        is_async: bool = False,
        ext_attrs: None | List[webidl_types.ExtendedAttribute] = None,
    ):
        assert property_type in self.TYPES
        if property_type == "iterable":
            property_type = "iterator"  # map to JS std iterator name
        super().__init__(property_type, var_types, is_async)
        self.arguments = arguments if arguments is not None else []
        self.readonly = readonly
        self.ext_attrs = ext_attrs if ext_attrs is not None else []

    def key(self) -> str:
        key = (
            f"IDLSpecialProperty_{self.property_type}"
            # + f"({','.join([argument.key() for argument in self.arguments])})"
            # + f"->{[var_type.key() for var_type in self.var_types]}"
        )
        if self.readonly:
            key += "_ro"
        if self.is_async:
            key += "_async"
        return key

    def hash_key(self) -> tuple:
        return (31, self.property_type, self.readonly, self.is_async)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "arguments": [arg.to_dict() for arg in self.arguments],
            "readonly": self.readonly,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
        }

    def replace_typedefs(self, typedefs: dict[str, entities.Typedef]) -> None:
        for argument in self.arguments:
            if isinstance(argument, var.Argument) and isinstance(argument.var_type, js_types.ObjectType) and argument.var_type.class_name in typedefs:
                hints = argument.var_type.hint_dict
                argument.var_type = typedefs[argument.var_type.class_name].idl_type
                argument.var_type.hint_dict = hints

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "SpecialProperty":
        """Deserialize from webidl2js dict

        Args:
            data (dict): member JSON dict

        Returns:
            Self: SpecialDeclaration instance
        """
        assert data["type"] in SpecialProperty.TYPES
        assert len(data.get("parent", {})) == 0
        webidl_types_list = []
        for idl_type in data["idlType"]:
            webidl_types_list.append(webidl_types.idltype_from_webidl2js_dict(idl_type))
        arguments = []
        for argument in data.get("arguments", []):
            arguments.append(var.Argument.from_webidl2js_dict(argument))
        return SpecialProperty(
            data["type"],
            webidl_types_list,
            arguments,
            data.get("readonly", False),
            data.get("async", False),
            [
                webidl_types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )
