"""
Represents JS statements, can be lowered to a string of JS code
"""

from typing import List


class Statement:
    """Base class for all generated JS statements"""

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        """Lower the statement to a string of JS code

        Args:
            guard (bool, optional): If set to True, wraps statements in try-catch blocks. Defaults to True.
            intend (int, optional): Intendation depth of the statement. Defaults to 0.

        Returns:
            str: JS code
        """
        raise NotImplementedError

    def lower_guarded(self, intend: int = 0) -> str:
        """Lower the statement to a string of JS code wrapped in try-catch blocks.
        Helper function to be used by children classes.
        """
        return (
            "\t" * intend
            + "try {\n"
            + self.lower(False, intend + 1)
            + "\t" * intend
            + "} catch (e) {console.log('JS_EXCEPTION',e);}\n"
            + "finally {console.log('JS_FINALLY');}\n"
        )


class ReadValue(Statement):
    """JS read access to a variable"""

    def __init__(self, var: str):
        self.var = var

    def lower(self) -> str:
        return self.var


class Block(Statement):
    """JS block statement"""

    def __init__(self, statements: List[Statement] | None = None):
        self.statements = statements if statements is not None else []

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = "\t" * intend + "{\n"
        ret += "\n".join(
            [statement.lower(guard, intend + 1) for statement in self.statements]
        )
        ret += "\t" * intend + "}\n"
        return ret

    def lower_loop(self, guard: bool, intend: int) -> str:
        """Lower the block to a string of JS code without whitespace at the beginning"""
        ret = "{\n"
        ret += "\n".join(
            [statement.lower(guard, intend + 1) for statement in self.statements]
        )
        ret += "\t" * intend + "}\n"
        return ret

    def lower_if(self, guard: bool, intend: int) -> str:
        """Lower the block to a string of JS code with whitespace at the beginning and end"""
        ret = "{\n"
        ret += "\n".join(
            [statement.lower(guard, intend + 1) for statement in self.statements]
        )
        ret += "\t" * intend + "}"
        return ret

    def lower_else(self, guard: bool, intend: int) -> str:
        """Lower the block to a string of JS code with whitespace at the beginning"""
        return self.lower_if(guard, intend) + "\n"

    def append(self, statement: Statement):
        """Append a statement to the block"""
        self.statements.append(statement)


class IfElse(Statement):
    """JS branch statement with if-else condition"""

    def __init__(self, condition: ReadValue, if_block: Block, else_block: Block):
        self.condition = condition
        self.if_block = if_block
        self.else_block = else_block

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = (
            "\t" * intend
            + f"if ({self.condition.lower()}) "
            + self.if_block.lower_if(guard, intend)
        )
        ret += "\t" * intend + "else " + self.else_block.lower_else(guard, intend)
        return ret


class WhileLoop(Statement):
    """JS while loop statement"""

    def __init__(self, condition: str, loop_block: Block):
        self.condition = condition
        self.loop_block = loop_block

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = (
            "\t" * intend
            + f"while ({self.condition.lower()}) "
            + self.loop_block.lower_loop(guard, intend)
        )
        return ret


class ForLoop(Statement):
    """JS for(let i=0; i<x; i++) loop statement"""

    def __init__(self, var: str, comp: str, loop_block: Block):
        self.var = var
        self.comp = comp
        self.loop_block = loop_block

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = (
            "\t" * intend
            + f"for (let {self.var} = 0; {self.var} < {self.comp}; {self.var}++) "
            + self.loop_block.lower_loop(guard, intend)
        )
        return ret


class IteratorLoop(Statement):
    """JS loop statement for iterating over an array"""

    def __init__(
        self, var: str, iter_var: str, loop_block: Block, loop_type: str = "in"
    ):
        assert loop_type in ["in", "of"]
        self.var = var
        self.iter_var = iter_var
        self.loop_block = loop_block
        self.loop_type = loop_type

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = (
            "\t" * intend
            + f"for ({self.var} {self.loop_type} {self.iter_var}) "
            + self.loop_block.lower_loop(guard, intend)
        )
        return ret


class TryCatch(Statement):
    """JS try-catch statement"""

    def __init__(self, try_block: Block, catch_block: Block):
        self.try_block = try_block
        self.catch_block = catch_block

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = "\t" * intend + "try " + self.try_block.lower_if(guard, intend)
        ret += "\t" * intend + "catch (e) " + self.catch_block.lower_else(guard, intend)
        return ret


class Function(Statement):
    """JS function declaration"""

    # TODO async
    def __init__(self, name: str, args: List[str], body: Block):
        self.name = name
        self.args = args
        self.body = body

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = (
            f"async function {self.name}({','.join(self.args)}) "
            + self.body.lower_else(guard, intend)
        )
        return ret


class AnonymousFunction(Statement):
    """JS anonymous function declaration"""

    def __init__(self, args: List[str], body: Block):
        self.args = args
        self.body = body

    def lower(self, guard: bool = True, intend: int = 0) -> str:
        ret = f"function({','.join(self.args)}) " + self.body.lower_else(guard, intend)
        return ret
