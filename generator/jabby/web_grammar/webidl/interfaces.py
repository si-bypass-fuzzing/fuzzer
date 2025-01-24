"""
Representations of main WebIDL entities:
interface, callback interface, interface mixin, namespace
"""

from typing import Iterator, List, Tuple, Union, Optional, Self, Sequence
from . import types, var, operation, entities
from ..js import types as js_types
from ..js import js


# Union of all possible members of an WebIDL interface
type Member = Union[
    var.Attribute,
    var.Constant,
    operation.Operation,
    operation.Callback,
    operation.SpecialProperty,
]


class Interface(js.Class):
    """WebIDL interface
    A WebIDL interface is a collection of members, including attributes, constants, and operations.
    It can also inherit from another interface, and can be partial.

    This class uses the KeyComparable and DictSerializable mixins.
    Therefore, it must implement the key() and to_dict() methods.
    """

    def __init__(
        self,
        name: str,
        constructors: Sequence[operation.Constructor],
        members: Sequence[Member],
        inheritance: str | js.Class = "Object",
        partial: bool = False,
        html_tag: None | str = None,
        ext_attrs: None | List[types.ExtendedAttribute] = None,
    ):
        super().__init__(name, constructors, members, inheritance)
        self.partial = partial
        self.html_tag = html_tag
        self.ext_attrs = ext_attrs if ext_attrs is not None else []
        self.includes: List["Mixin" | Self] = []

    def add_mixin(self, mixin: "Mixin") -> None:
        """Add a mixin to the interface

        Args:
            mixin (Mixin): Mixin interface included in this interface
        """
        self.includes.append(mixin)

    def add_partial(self, partial: "Self") -> None:
        """Add a partial interface to the interface

        Args:
            partial (Self): Partial interface of this interface
        """
        assert partial.partial is True
        assert partial.name == self.name
        self.includes.append(partial)

    def set_html_tag(self, tag: str) -> None:
        """Assign a HTML tag to this interface"""
        self.html_tag = tag

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}"
        # if self.inheritance is not None:
        #     key += f"<-{self.inheritance}"
        # if self.partial:
        #     key += "_part"
        # key += f"({','.join([m.key() for m in self.members])})"
        # key += f"({','.join([i.key() for i in self.includes])})"
        return key

    def hash_key(self) -> tuple:
        return (32, self.name)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "partial": self.partial,
            "html": self.html_tag,
            "ext_attrs": [ea.to_dict() for ea in self.ext_attrs],
            "includes": [i.to_dict() for i in self.includes],
        }

    def get_members(self, inherited: bool = True) -> Iterator[js.Member]:
        """Get all members of the interface,
        including those from included mixins and partial interfaces

        Yields:
            Iterator[IDLMember]: iterator over all members
        """
        for member in self.members:
            yield member
        for include in self.includes:
            if isinstance(include, Mixin):
                for member in include.members:
                    yield member
            else:
                for member in include.get_members():
                    yield member
        if (
            inherited == True
            and self.inheritance is not None
            and isinstance(self.inheritance, js.Class)
        ):
            for member in self.inheritance.get_members(inherited=inherited):
                if not isinstance(member, operation.Constructor):
                    yield member

    def replace_typedefs(self, typedefs: dict[str, entities.Typedef]) -> None:
        """Replace all typedefs in the interface members"""
        for constructor in self.constructors:
            assert isinstance(constructor, operation.Constructor)
            constructor.replace_typedefs(typedefs)
        for member in self.members:
            if (
                isinstance(member, operation.Operation)
                or isinstance(member, operation.Callback)
                or isinstance(member, operation.SpecialProperty)
            ):
                member.replace_typedefs(typedefs)
            elif isinstance(member, var.Attribute) or isinstance(member, var.Constant):
                if (
                    isinstance(member.var_type, js_types.ObjectType)
                    and member.var_type.class_name in typedefs
                ):
                    hints = member.var_type.hint_dict
                    member.var_type = typedefs[member.var_type.class_name].idl_type
                    member.var_type.hint_dict = hints
            else:
                raise Exception("Unreachable")
        for include in self.includes:
            include.replace_typedefs(typedefs)

    @staticmethod
    def member_from_webidl2js_dict(data: dict) -> Member:
        """Deserializes a member entity from webidl2js dict
        Chooses the correct class based on the "type" field in the dict.

        Args:
            data (dict): webidl2js JSON dict

        Raises:
            ValueError: if the "type" field is unknown

        Returns:
            IDLMember: member instance
        """
        match data["type"]:
            case "attribute":
                return var.Attribute.from_webidl2js_dict(data)
            case "operation":
                return operation.Operation.from_webidl2js_dict(data)
            case "callback":
                return operation.Callback.from_webidl2js_dict(data)
            case "const":
                return var.Constant.from_webidl2js_dict(data)
            case "iterable":
                return operation.SpecialProperty.from_webidl2js_dict(data)
            case "maplike":
                return operation.SpecialProperty.from_webidl2js_dict(data)
            case "setlike":
                return operation.SpecialProperty.from_webidl2js_dict(data)
            case _:
                raise ValueError(f"Unknown type: {data['type']}")

    @staticmethod
    def constructors_and_members_from_webidl2js(
        data: dict,
    ) -> Tuple[List[operation.Constructor], List[Member]]:
        """Deserializes constructors and members from webidl2js dict
        Constructors are located in the members list with all other members of an interface
        We save them seperately, thus this method returns them in a seperate list
        """
        constructors: List[operation.Constructor] = []
        members: List[Member] = []

        for member in data["members"]:
            if member["type"] == "constructor":
                constructors.append(operation.Constructor.from_webidl2js_dict(member))
            else:
                members.append(Interface.member_from_webidl2js_dict(member))
        return constructors, members

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Interface":
        """Deserialize from webidl2js dict

        Args:
            data (dict): interface JSON dict

        Returns:
            Self: Interface instance
        """
        assert data["type"] == "interface"
        constructors, members = Interface.constructors_and_members_from_webidl2js(data)
        return Interface(
            data["name"],
            constructors,
            members,
            data.get("inheritance", None),
            data["partial"],
            None,
            [
                types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class CallbackInterface(Interface):
    """A WebIDL callback interface
    Used for callback functions in WebIDL
    It consists of similar members as an interface"""

    # No need to override __init__ as it's the same as Interface

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "CallbackInterface":
        """Deserialize from webidl2js dict

        Args:
            data (dict): callback interface JSON dict

        Returns:
            Self: callbackInterface instance
        """
        assert data["type"] == "callback interface"
        constructors, members = Interface.constructors_and_members_from_webidl2js(data)
        return CallbackInterface(
            data["name"],
            constructors,
            members,
            data.get("inheritance", None),
            data.get("partial", False),
            None,
            [
                types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Mixin(Interface):
    """WebIDL interface mixin
    A mixin can be included in another interface, and can be partial"""

    def __init__(
        self,
        name: str,
        constructors: Sequence[operation.Constructor],
        members: Sequence[Member],
        partial: bool = False,
        ext_attrs: None | List[types.ExtendedAttribute] = None,
    ):
        super().__init__(
            name, constructors, members, partial=partial, ext_attrs=ext_attrs
        )

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Mixin":
        """Deserialize from webidl2js dict

        Args:
            data (dict): mixin JSON dict

        Returns:
            Self: Mixin instance
        """
        assert data["type"] == "interface mixin"
        assert data.get("inheritance", None) is None
        constructors, members = Interface.constructors_and_members_from_webidl2js(data)
        return Mixin(
            data["name"],
            constructors,
            members,
            data.get("partial", False),
            [
                types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )


class Namespace(Interface):
    """WebIDL namespace
    A namespace is a collection of members, including attributes, constants, and operations.
    It can also be partial
    In JS a namespace behaves like a class with only static members"""

    def __init__(
        self,
        name: str,
        constructors: Sequence[operation.Constructor],
        members: Sequence[Member],
        partial: bool = False,
        ext_attrs: None | List[types.ExtendedAttribute] = None,
    ):
        super().__init__(
            name, constructors, members, partial=partial, ext_attrs=ext_attrs
        )

    @staticmethod
    def from_webidl2js_dict(data: dict) -> "Namespace":
        """Deserialize from webidl2js dict

        Args:
            data (dict): namespace JSON dict

        Returns:
            Self: Namespace instance
        """
        assert data["type"] == "namespace"
        assert data.get("inheritance", None) is None
        constructors, members = Interface.constructors_and_members_from_webidl2js(data)
        return Namespace(
            data["name"],
            constructors,
            members,
            data.get("partial", False),
            [
                types.ExtendedAttribute.from_webidl2js_dict(ea)
                for ea in data.get("extAttrs", [])
            ],
        )
