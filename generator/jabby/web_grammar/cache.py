from .webidl import interfaces, entities, operation, types as webidl_types, var
from .js import builtin, js, types as js_types
from ..util import DictSerializable, ListSet

class GeneratorCache:
    def __init__(self):
        self.instantiable_callees: ListSet[str] = ListSet()
        self.generator_cache: dict[str, ListSet[tuple[js.Class, js.Member]]] = {}
        self.static_func_cache: dict[str, ListSet[tuple[js.Class, js.Function]]] = {}
