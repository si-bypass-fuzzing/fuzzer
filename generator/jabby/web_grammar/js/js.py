"""
Representation of basic JS semantics (Classes, Functions)
"""

from typing import Dict, List, Self, Tuple, Union, Optional, Iterator, Sequence
from typing_extensions import Hashable
from ...util import KeyComparable, DictSerializable
from . import types


class Var(KeyComparable, DictSerializable):
    """Base class for all JS variables. Not supposed to be used directly."""

    def __init__(
        self,
        var_type: types.Type,
        nullable: bool = False,
    ):
        self.var_type = var_type
        self.nullable = nullable

    def key(self) -> str:
        return f"Var_{self.var_type}{'?' if self.nullable else ''}"

    def hash_key(self) -> tuple:
        return (5, self.var_type.hash_key(), self.nullable)

    def to_dict(self) -> dict:
        return {
            "type": f"{self.__class__.__name__}",
            "var_type": self.var_type.to_dict(),
            "nullable": self.nullable,
        }


class NamedVar(Var):
    """Base class for all named JS variables. Not supposed to be used directly."""

    def __init__(
        self,
        var_type: types.Type,
        name: str,
        nullable: bool = False,
    ):
        super().__init__(var_type, nullable)
        self.name = name

    def key(self) -> str:
        return f"NamedVar_{self.var_type}{'?' if self.nullable else ''}_{self.name}"

    def hash_key(self) -> tuple:
        return (6, self.var_type.hash_key(), self.nullable, self.name)

    def to_dict(self) -> dict:
        return super().to_dict() | {"name": self.name}


class Parameter(NamedVar):
    """JS parameter argument"""

    def __init__(
        self,
        var_type: types.Type,
        name: str,
        nullable: bool = False,
        optional: bool = False,
        variadic: bool = False,
    ):
        super().__init__(var_type, name, nullable)
        self.optional = optional
        self.variadic = variadic

    def key(self) -> str:
        key = f"Parameter_{self.var_type}{'?' if self.nullable else ''}_{self.name}"
        if self.optional:
            key += "_opt"
        if self.variadic:
            key += "_var"
        return key

    def hash_key(self) -> tuple:
        return (7, self.var_type.hash_key(), self.nullable, self.name, self.optional, self.variadic)

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "optional": self.optional,
            "variadic": self.variadic,
        }


class Attribute(NamedVar):
    """JS class attribute"""

    def __init__(
        self,
        var_type: types.Type,
        name: str,
        nullable: bool = False,
        special: str = "",
        readonly: bool = False,
    ):
        super().__init__(var_type, name, nullable)

        self.special = special
        self._readonly = readonly

    def key(self) -> str:
        key = f"Attribute_{self.var_type}{'?' if self.nullable else ''}_{self.name}"
        if self.special:
            key += "_" + self.special
        if self._readonly:
            key += "_ro"
        return key

    def hash_key(self) -> tuple:
        return (8, self.var_type.hash_key(), self.nullable, self.name, self.special, self._readonly)

    def to_dict(self) -> dict:
        return super().to_dict() | {"special": self.special, "readonly": self._readonly}

    def is_readonly(self) -> bool:
        """Check if the attribute is readonly"""
        return self._readonly


class Constant(NamedVar):
    """WebIDL interface constant"""

    def __init__(
        self,
        var_type: types.Type,
        name: str,
    ):
        super().__init__(var_type, name, nullable=False)

    def key(self) -> str:
        key = f"Constant_{self.var_type}_{self.name}"
        return key

    def hash_key(self) -> tuple:
        return (9, self.var_type.hash_key(), self.name)

    def to_dict(self) -> dict:
        return super().to_dict()

    def is_readonly(self) -> bool:
        """Check if the attribute is readonly"""
        return True


class Return(Var):
    """JS function return value"""

    # no need to override __init__ as it's the same as Var

    def key(self) -> str:
        return f"Return_{self.var_type}{'?' if self.nullable else ''}"

    def hash_key(self) -> tuple:
        return (10, self.var_type.hash_key(), self.nullable)

    def to_dict(self) -> dict:
        return super().to_dict()


class Function(KeyComparable, DictSerializable):
    """
    JS function
    Has a name, arguments and a return type
    """

    def __init__(
        self,
        name: str,
        arguments: Sequence["Parameter|Callback"],
        ret: Return,
        special: str = "",
    ):
        self.name = name
        self.arguments = arguments
        self.ret = ret
        self.special = special

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}"
        # if self.special != "":
        #     key += f"_{self.special}_"
        # key += f"({','.join([argument.key() for argument in self.arguments])})->{self.ret.key()}"
        return key

    def hash_key(self) -> tuple:
        return (11, self.name)

    def to_dict(self) -> dict:
        return {
            "type": f"{type(self).__name__}",
            "name": self.name,
            "arguments": [arg.to_dict() for arg in self.arguments],
            "ret": self.ret.to_dict(),
            "special": self.special,
        }


class Constructor(types.KeyComparable, types.DictSerializable):
    """WebIDL constructor operation
    Initializes an object of an interface"""

    def __init__(
        self,
        arguments: Sequence["Parameter|Callback"],
        new_required: bool = False,
        new_forbidden: bool = False,
    ):
        self.arguments = arguments
        self.new_required = new_required
        self.new_forbidden = new_forbidden
        self.hint_dict: types.HintDict = types.HintDict()

    def key(self) -> str:
        return (
            f"Constructor({','.join([argument.key() for argument in self.arguments])})"
        )

    def hash_key(self) -> tuple:
        return (12, tuple([arg.hash_key() for arg in self.arguments]))

    def to_dict(self) -> dict:
        return {
            "type": f"{type(self).__name__}",
            "arguments": [arg.to_dict() for arg in self.arguments],
            "new_required": self.new_required,
            "new_forbidden": self.new_forbidden,
            "hints": self.hint_dict.to_dict(),
        }

    def hint(self, new_hint: Dict[str, str | Tuple[str, str]]) -> Self:
        self.hint_dict.add_hints(new_hint)
        return self


class Callback(Function):
    """WebIDL callback operation"""

    def __init__(
        self,
        name: str,
        arguments: Sequence["Parameter|Callback"],
        ret: Return,
        optional: bool = False,
    ):
        super().__init__(name, arguments, ret, "")
        self.optional = optional

    def to_dict(self) -> dict:
        return super().to_dict() | {
            "optional": self.optional,
        }

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}"  # {'?' if self.optional else ''}"
        # if self.special != "":
        #     key += f"_{self.special}_"
        # key += f"({','.join([argument.key() for argument in self.arguments])})->{self.ret.key()}"
        return key

    def hash_key(self) -> tuple:
        return (13, self.name)


class SpecialProperty(KeyComparable, DictSerializable):
    """Special property of a JS class
    (async) iterator/generator, etc."""

    TYPES = ["iterator", "generator", "maplike", "setlike"]

    def __init__(
        self,
        property_type: str,
        var_types: List[types.Type],
        is_async: bool = False,
    ):
        assert property_type in self.TYPES
        self.property_type = property_type
        self.var_types = var_types
        self.is_async = is_async

    def key(self) -> str:
        return f"SpecialProperty_{self.property_type}_({','.join([var_type.key() for var_type in self.var_types])}){'_async' if self.is_async else ''}"

    def hash_key(self) -> tuple:
        return (14, self.property_type, tuple([var_type.hash_key() for var_type in self.var_types]), self.is_async)

    def to_dict(self) -> dict:
        return {
            "type": f"{type(self).__name__}",
            "property_type": self.property_type,
            "var_types": [var_type.to_dict() for var_type in self.var_types],
            "is_async": self.is_async,
        }


# Union of all possible members of an JS class interface
type Member = Union[
    Attribute,
    Constant,
    Function,
    SpecialProperty,
]


class Class(KeyComparable, DictSerializable):
    """JS class"""

    def __init__(
        self,
        name: str,
        constructors: Sequence[Constructor],
        members: Sequence[Member],
        inheritance: Optional["str|Class"] = None,
    ):
        self.name = name
        self.constructors = constructors
        self.members = members
        self.inheritance = inheritance

    def key(self) -> str:
        key = f"{type(self).__name__}_{self.name}"
        # if self.inheritance is not None:
        #     key += f"<-{self.inheritance}"
        # key += f"({','.join([m.key() for m in self.members])})"
        return key

    def hash_key(self) -> tuple:
        return (15, self.name)

    def serialized_inheritance(self) -> str | None:
        if isinstance(self.inheritance, Class):
            return self.inheritance.name
        return self.inheritance

    def to_dict(self) -> dict:
        return {
            "type": f"{type(self).__name__}",
            "name": self.name,
            "constructors": [c.to_dict() for c in self.constructors],
            "members": [m.to_dict() for m in self.members],
            "inheritance": self.serialized_inheritance(),
        }

    def get_members(self, inherited: bool = True) -> Iterator[Member]:
        """Get all members of the interface,
        including those from included mixins and partial interfaces

        Yields:
            Iterator[Member]: iterator over all members
        """
        for member in self.members:
            yield member
        if (
            inherited == True
            and self.inheritance is not None
            and isinstance(self.inheritance, Class)
        ):
            for member in self.inheritance.get_members(inherited=inherited):
                if not isinstance(member, Constructor):
                    yield member

    def link_parent(self, parent: "Class") -> None:
        """Adds a reference to the parent class"""
        self.inheritance = parent

    def iter_lineage(self) -> Iterator["Class"]:
        yield self

        if self.inheritance is not None:
            assert isinstance(self.inheritance, Class)
            yield from self.inheritance.iter_lineage()

    def inherits(self, potential_parent: "Class|str") -> bool:
        """Check if potential_parent appears in the inheritance chain of this class"""
        # if self.inheritance is None:
        #     return False

        # # has_parent should only be invoked after the inheritance has been linked
        # assert isinstance(self.inheritance, Class)
        # if isinstance(potential_parent, str):
        #     if self.inheritance.name == potential_parent:
        #         return True
        #     return self.inheritance.inherits(potential_parent)
        # elif isinstance(potential_parent, Class):
        #     if self.inheritance == potential_parent:
        #         return True
        #     return self.inheritance.inherits(potential_parent)
        other = potential_parent.name if isinstance(potential_parent, Class) else potential_parent
        for parent in self.iter_lineage():
            if parent.name == other:
                return True
        return False
