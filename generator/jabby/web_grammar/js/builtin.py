"""
Grammar of JavaScript Standard built-in objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

objects not included:
- Error subclasses
- Math
- Date
- RegExp
- FinalizationRegistry
- Reflect & Proxy
- Intl
"""

from typing import Dict
from . import (
    fundamental_types,
    global_functions,
    js,
    array_types,
    primitive_types,
    structured_types,
)

type StdTypes = js.Class | js.Function | js.Constant


def get_builtin_classes() -> Dict[str, js.Class]:
    """Get JS standard library classes"""
    result: Dict[str, js.Class] = {}
    for obj in array_types.EXPORTS_CLASSES:
        if isinstance(obj, js.Class):
            result[obj.name] = obj
    for obj in fundamental_types.EXPORTS_CLASSES:
        if isinstance(obj, js.Class):
            result[obj.name] = obj
    for obj in primitive_types.EXPORTS_CLASSES:
        if isinstance(obj, js.Class):
            result[obj.name] = obj
    for obj in structured_types.EXPORTS_CLASSES:
        if isinstance(obj, js.Class):
            result[obj.name] = obj

    return result


def get_builtin_functions() -> Dict[str, js.Function]:
    """Get JS standard library functions"""
    result: Dict[str, js.Function] = {}
    for obj in global_functions.EXPORTS_FUNCTIONS:
        if isinstance(obj, js.Function):
            result[obj.name] = obj

    return result


def get_builtin_constants() -> Dict[str, js.Constant]:
    """Get JS standard library constants"""
    result: Dict[str, js.Constant] = {}
    for obj in global_functions.EXPORTS_CONSTANTS:
        if isinstance(obj, js.Constant):
            result[obj.name] = obj

    return result
