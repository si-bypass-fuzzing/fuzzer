"""
Represents a JS instruction, can be lowered to a string of JS code.
An instruction is a single line of JS code
"""

from .statement import Statement
from ..web_grammar.js import js, types as js_types


class Instruction(Statement):
    """Abstract class to group all single line instructions
    If a retvar is set, the instruction is an expression and the result is assigned to the retvar
    """

    def __init__(self, retvar: str | None = None):
        self.retvar = retvar


class UnaryOperation(Instruction):
    """JS unary operation instruction"""

    OPERATORS = ["++", "--", "!", "-"]

    def __init__(self, operator: str, operand: str, retvar: str | None = None):
        super().__init__(retvar)
        self.operator = operator
        self.operand = operand

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)
        if self.retvar is None:
            return "\t" * intend + f"{self.operator}{self.operand};\n"
        return "\t" * intend + f"var {self.retvar} = {self.operator}{self.operand};\n"


class BinaryOperation(Instruction):
    """JS binary operation instruction"""

    OPERATORS = ["+", "-", "*", "/", "==", "!=", "%", "<", "<=", "&&", "||", "+="]

    def __init__(self, operator: str, left: str, right: str, retvar: str | None = None):
        super().__init__(retvar)
        self.operator = operator
        self.left = left
        self.right = right

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)
        if self.retvar is None:
            return "\t" * intend + f"{self.left} {self.operator} {self.right};\n"
        return (
            "\t" * intend
            + f"var {self.retvar} = {self.left} {self.operator} {self.right};\n"
        )


class Assignment(Instruction):
    """Assign a value to a variable"""

    def __init__(self, retvar: str, value: str, use_await: bool = False, new_var: bool = True):
        super().__init__(retvar)
        self.value = value
        self.use_await = use_await
        self.new_var = new_var

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)
        return (
            "\t" * intend
            + (f"var " if self.new_var == True else "")
            + f"{self.retvar} = {'await ' if self.use_await else ''}{self.value};\n"
        )


class FunctionCall(Instruction):
    """JS function call instruction"""

    def __init__(
        self,
        func: js.Function,
        args: list[str],
        retvar: str | None = None,
        use_await: bool = True,
    ):
        super().__init__(retvar)
        self.func = func
        self.args = args
        self.use_await = use_await

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        assert self.func.name != ""
        if guard:
            return self.lower_guarded(intend)

        if self.retvar is None:
            return (
                "\t" * intend
                + f"{'await ' if self.use_await else ''}{self.func.name}({','.join(self.args)});\n"
            )
        return (
            "\t" * intend
            + f"var {self.retvar} = {'await ' if self.use_await else ''}{self.func.name}({','.join(self.args)});\n"
        )


class StaticFunctionCall(FunctionCall):
    """JS static function call instruction"""

    def __init__(
        self,
        cls: js.Class,
        func: js.Function,
        args: list[str],
        retvar: str | None = None,
        use_await: bool = True,
    ):
        super().__init__(func, args, retvar, use_await)
        self.cls = cls

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        assert self.func.name != ""
        if guard:
            return self.lower_guarded(intend)

        if self.retvar is None:
            return (
                "\t" * intend
                + f"{'await ' if self.use_await else ''}{self.cls.name}.{self.func.name}({','.join(self.args)});\n"
            )
        return (
            "\t" * intend
            + f"var {self.retvar} = {'await ' if self.use_await else ''}{self.cls.name}.{self.func.name}({','.join(self.args)});\n"
        )


class MemberFunctionCall(FunctionCall):
    """JS member function call instruction"""

    def __init__(
        self,
        obj: str,
        func: js.Function,
        args: list[str],
        retvar: str | None = None,
        use_await: bool = True,
    ):
        super().__init__(func, args, retvar, use_await)
        self.obj = obj

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        func_name: str = self.func.name
        if func_name == "":
            if self.func.special == "stringifier":
                func_name = "toString"
        # assert func_name != ""

        if guard:
            return self.lower_guarded(intend)

        if self.retvar is None:
            return (
                "\t" * intend
                + f"{'await ' if self.use_await else ''}{self.obj}.{func_name}({','.join(self.args)});\n"
            )
        return (
            "\t" * intend
            + f"var {self.retvar} = {'await ' if self.use_await else ''}{self.obj}.{func_name}({','.join(self.args)});\n"
        )


class MemberAccess(Instruction):
    """JS member access instruction"""

    def __init__(self, obj: str, member: str, retvar: str):
        super().__init__(retvar)
        self.obj = obj
        self.member = member

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)
        return "\t" * intend + f"var {self.retvar} = {self.obj}.{self.member};\n"


class ConstructorCall(Instruction):
    """JS constructor call instruction"""

    def __init__(
        self, cls: js.Class, args: list[str], retvar: str, use_new: bool = True
    ):
        super().__init__(retvar)
        self.cls = cls
        self.args = args
        self.use_new = use_new

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)

        if self.use_new:
            if self.retvar is None:
                return "\t" * intend + f"new {self.cls.name}({','.join(self.args)});\n"
            return (
                "\t" * intend
                + f"var {self.retvar} = new {self.cls.name}({','.join(self.args)});\n"
            )
        else:
            if self.retvar is None:
                return "\t" * intend + f"{self.cls.name}({','.join(self.args)});\n"
            return (
                "\t" * intend
                + f"var {self.retvar} = {self.cls.name}({','.join(self.args)});\n"
            )


class StringInstruction(Instruction):
    """JS instruction created from a string"""

    def __init__(self, content: str):
        super().__init__(None)
        self.content = content

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        if guard:
            return self.lower_guarded(intend)
        return "\t" * intend + self.content + "\n"

class ReturnInstruction(Instruction):
    """JS return instruction"""

    def __init__(self, value: str):
        super().__init__(None)
        self.value = value

    def lower(self, guard: bool = False, intend: int = 0) -> str:
        return "\t" * intend + f"return {self.value};\n"
