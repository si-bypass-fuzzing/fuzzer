"""
Keeps track of the variables and their types in the current JS scope
"""

import random
import itertools
from typing import Iterator, List, Sequence, Tuple
from ..web_grammar.js import types as js_types, js
from ..web_grammar import grammar as web_grammar
from . import value

# TODO: add scope of function objects


class Scope:
    """
    State of exisiting variables and their types
    """

    def __init__(self, var_prefix: str = "var", func_prefix:str="func", outer_scope: "Scope|None" = None):
        self.scoped_prefix: str = var_prefix  # prefix of the created variable names
        self.var_ctr: int = 0  # incremented for each new variable
        # list of existing variables and their types
        self.vars: dict[str, js_types.Type] = {}
        self.func_prefix: str = func_prefix  # prefix of the created function object names
        self.func_ctr: int = 0  # incremented for each new function object
        # list of existing function objects and their signatures
        self.funcs: dict[str, value.Signature] = {}
        self.modified_vars: List[str] = (
            []
        )  # track objects that have been modified, to invoke sanitizer on them
        self.permanent_vars: dict[str, js_types.Type] = {}
        self.outer_scope: "Scope|None" = outer_scope

    def create_var_identifier(self, var_type: js_types.Type) -> str:
        """
        Create a new identifier and register its type
        """
        identifier = f"{self.scoped_prefix}{self.var_ctr}"
        self.vars[identifier] = var_type
        self.var_ctr += 1
        self.mark_modified(identifier)
        return identifier

    def get_matching_var(
        self, target_type: js_types.Type, grammar: web_grammar.Grammar
    ) -> str | None:
        """
        Get an existing identifier with matching type
        """

        def matches(var_type: js_types.Type, target_type: js_types.Type) -> bool:
            if var_type.matches(target_type):
                return True
            if (
                isinstance(var_type, js_types.ObjectType)
                and isinstance(target_type, js_types.ObjectType)
                and grammar.is_lineage(
                    var_type.class_name, target_type.class_name
                )
            ):
                return True
            return False

        for var, var_type in self.vars.items():
            # TODO: improve type matching, e.g. if several are possible, choose the best
            if matches(var_type, target_type):
                self.mark_modified(var)
                return var
        for var, var_type in self.permanent_vars.items():
            # TODO: improve type matching, e.g. if several are possible, choose the best
            if matches(var_type, target_type):
                self.vars[var] = self.permanent_vars[
                    var
                ]  # copy to vars to make the use of this variable in the scope explicit
                self.mark_modified(var)
                return var
        if self.outer_scope is not None:
            return self.outer_scope.get_matching_var(target_type, grammar)
        return None

    def add_var(self, var: str, var_type: js_types.Type) -> None:
        """
        Add an existing identifier with matching type
        """
        self.vars[var] = var_type

    def add_permanent_var(self, var: str, var_type: js_types.Type) -> None:
        """
        Add an existing identifier with matching type
        """
        self.permanent_vars[var] = var_type

    def len(self) -> int:
        """
        Get the number of variables
        """
        return len(self.vars) + (
            len(self.outer_scope.vars) if self.outer_scope is not None else 0
        )

    def create_func_identifier(self, signature: value.Signature) -> str:
        """
        Create a new function object and register its signature
        """
        identifier = f"{self.func_prefix}{self.func_ctr}"
        self.funcs[identifier] = signature
        self.func_ctr += 1
        return identifier

    def get_matching_func(self, signature: value.Signature) -> str | None:
        """
        Get an existing function object with matching signature
        """
        for identifier, signature in self.funcs.items():
            if signature == signature:
                return identifier
        if self.outer_scope is not None:
            return self.outer_scope.get_matching_func(signature)
        return None

    def add_func(self, identifier: str, signature: value.Signature) -> None:
        """
        Add an existing function object with matching signature
        """
        self.funcs[identifier] = signature

    def reset_modified_vars(self) -> None:
        """
        Reset the list of modified variables
        """
        self.modified_vars = []

    def mark_modified(self, var: str) -> None:
        """
        Mark a variable as modified
        """
        self.modified_vars.append(var)

    def iter_modified_vars(self) -> Iterator[Tuple[str, js_types.Type]]:
        """
        Get the list of modified variables
        """
        for var in self.modified_vars:
            if var in self.vars:
                yield var, self.vars[var]
            # else:
            #     yield var, self.permanent_vars[var]

    def iter_vars(self) -> Iterator[Tuple[str, js_types.Type]]:
        """
        Get the list of variables
        """
        for var, var_type in self.vars.items():
            yield var, var_type
        for var, var_type in self.permanent_vars.items():
            yield var, var_type
        if self.outer_scope is not None:
            yield from self.outer_scope.iter_vars()

    def clear(self) -> None:
        """
        Clear the scope
        """
        self.vars = {}
        self.funcs = {}
        self.var_ctr = 0
        self.func_ctr = 0
        self.modified_vars = []

    def get_rand_object_var(self) -> tuple[str, js_types.ObjectType]:
        """
        Get a random variable from the scope
        """
        if self.outer_scope is not None:
            return random.choice(
                [
                    (var, var_type)
                    for var, var_type in itertools.chain(
                        self.vars.items(), self.outer_scope.vars.items()
                    )
                    if isinstance(var_type, js_types.ObjectType)
                ]
            )
        else:
            return random.choice(
                [
                    (var, var_type)
                    for var, var_type in self.vars.items()
                    if isinstance(var_type, js_types.ObjectType)
                ]
            )
