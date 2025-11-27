"""
Helper classes
"""

import json
from typing import TypeVar, Iterable, Iterator, Hashable
import logging
import random
from typing_extensions import SupportsIndex


class KeyComparable:
    """
    Mixin class that provides comparison methods for objects that have a key() method
    IMPORTANT: The key() method must be implemented by the class that uses this mixin
    """

    def key(self) -> str:
        """key method, must be implemented by the class that uses this mixin
        should return a unique string that represents the object

        Raises:
            NotImplementedError: method must be overridden

        Returns:
            str: unique string that represents the object
        """
        raise NotImplementedError

    def hash_key(self) -> tuple:
        raise NotImplementedError

    def __hash__(self) -> int:
        return hash(self.hash_key())

    def __lt__(self, other) -> bool:
        return self.key() < other.key()

    def __le__(self, other) -> bool:
        return self.key() <= other.key()

    def __gt__(self, other) -> bool:
        return self.key() > other.key()

    def __ge__(self, other) -> bool:
        return self.key() >= other.key()

    def __eq__(self, other) -> bool:
        if not isinstance(other, type(self)):
            return False
        return self.hash_key() == other.hash_key()

    def __ne__(self, other) -> bool:
        return not self.__eq__(other)


class DictSerializable:
    """
    Mixin class that provides serialization methods for objects that have a to_dict() method
    IMPORTANT: The to_dict() method must be implemented by the class that uses this mixin
    """

    def to_dict(self) -> dict:
        """to_dict method, must be implemented by the class that uses this mixin
        should return a dictionary representation of the object

        Raises:
            NotImplementedError: method must be overridden

        Returns:
            dict: dictionary representation of the object
        """
        raise NotImplementedError

    # def __repr__(self) -> str:
    #     return str(self.to_dict())

    def __str__(self) -> str:
        return str(self.to_dict())

    def to_json(self) -> str:
        """JSON string representation of the object

        Returns:
            str: JSON string
        """
        return json.dumps(self.to_dict(), indent=4)


T = TypeVar("T")


class ListSet[T]:
    """
    https://stackoverflow.com/a/77414585/23469969
    """

    def __init__(self, *args, idx_of: dict[T, int] | None = None):
        self.__l: list[T] = list(*args)
        if idx_of:
            self.__idx_of: dict[T, int] = idx_of.copy()
        else:
            self.__idx_of: dict[T, int] = {item: i for (i, item) in enumerate(self.__l)}

    def add(self, item:T) -> None:
        if item not in self.__idx_of:
            self.__l.append(item)
            self.__idx_of[item] = len(self) - 1

    def append(self, item:T) -> None:
        """
        append and += always append to the internal list,
        but remove and pop from other than the end
        can change the internal list's order.
        """
        self.add(item)

    def extend(self, items:Iterable[T]) -> None:
        for item in items:
            self.add(item)

    def copy(self) -> "ListSet[T]":
        """Return a shallow copy of the ListSet."""
        return ListSet(self, idx_of=self.__idx_of)

    def get_list(self) -> list[T]:
        return self.__l

    def __iadd__(self, items) -> "ListSet[T]":
        """self += items"""
        for item in items:
            self.add(item)
        return self

    def remove(self, element)-> None:
        """
        Remove an element from a set; it must be a member.

        If the element is not a member, raise a KeyError.
        """
        try:
            position = self.__idx_of.pop(element)
        except KeyError:
            # raise (KeyError(element))
            # logging.exception(e)
            return

        last_item = self.__l.pop()
        if position != len(self):
            self.__l[position] = last_item
            self.__idx_of[last_item] = position

    def pop(self, i: SupportsIndex = -1) -> T:
        """Remove by internal list position."""
        item = self.__l[i]
        self.remove(item)
        return item

    def __contains__(self, item) -> bool:
        return item in self.__idx_of

    def _str_body(self) -> str:
        return ", ".join(repr(item) for item in self)

    def __repr__(self) -> str:
        return "ListSet([" + self._str_body() + "])"

    def __str__(self) -> str:
        if self:
            return "{" + self._str_body() + "}"
        else:
            return "ListSet()"

    def __iter__(self):
        for item in self.__l:
            yield item

    def __len__(self):
        return len(self.__l)

    def rand_iter(self) ->Iterator[T]:
        """
        Randomly iterate over the elements of the ListSet
        """
        l = self.__l.copy()
        random.shuffle(l)
        for item in l:
            yield item

    def rand_choice(self) -> T:
        """
        Randomly choose an element from the ListSet
        """
        return random.choice(self.__l)
