"""
Builds JS code by generating instructions and lowering them to strings.
The generated code is in static-single-assignment form, meaning that each variable is assigned exactly once.
"""

import logging
import random
from typing import Any, Iterator, List, Sequence
import urllib.parse
import secrets

from .ipc_fuzzer import IPCFuzzer
from .sanitizer import Sanitizer
from ..web_grammar.webidl import types as types
from .scope import Scope
from .url import URLScope
from . import instruction, statement, value
from ..exception import ValueGenerationError, GrammarLookupError
from ..web_grammar.grammar import Grammar
from ..web_grammar.js import js, types as js_types
from ..web_grammar.webidl import interfaces, entities, var as webidl_var
from ..web_grammar.html.mapping import TAG_HIERARCHY, TAG_TO_WEBIDL
from ..web_grammar.js.types import TYPE_MAP
from ..util import ListSet
from .magic import MAGIC

PROB_NONE = 0.1
PROB_NAV = 0.2
PROB_IPC_FUZZER = 0.2
RECYCLING_FACTOR = 20  # was 10
NUM_INSTRUCTIONS = 20
MAX_DOC_RECURSION = 1
MAX_OBJ_RECURSION = 2
RENDERER_CHECK_FLAG = "0xfffffffffffffeff"
TOKEN_LENGTH = 4

# TODO: other interesting HTML tags
NAV_INTERFACES: list[str] = [
    "Window",
    "Location",
    "Navigator",
    "History",
    "XMLHttpRequest",
    "HTMLIFrameElement",
    "HTMLAnchorElement",
    "HTMLFormElement",
    # "PushManager",
    "WebSocket",
    # "EventSource",
    # "HTMLLinkElement",
    # "HTMLMetaElement",  # TODO which attributes?
]

# TODO nav events
NAV_MEMBERS: set[str] = {
    "open",
    "href",
    "location",
    "host",
    "assign",
    "reload",
    "replace",
    # "sendBeacon",
    "back",
    "forward",
    "navigate",
    "traverseTo",
    "updateCurrentEntry",
    "go",
    "pushState",
    "replaceState",
    "withCredentials",
    "send",
    "setRequestHeader",
    "src",
    "sandbox",
    "srcdoc",
    "target",
    "method",
    "submit",
    "requestSubmit",
    # "subscribe",
    # "register",
    "url",
    # "rel",
    # "as",
    "action"
}

SRC_ATTRIBUTES: set[str] = {"src", "href", "action"}


class JSBuilder:
    """
    Builds JS code by generating instructions and lowering them to strings,
    keeps track of the current scope of variables and URL scope.
    """

    def __init__(
        self,
        browser: str,
        grammar: Grammar,
        compromised: bool,
        origin_id: int,
        page_id: int,
        input_id: int,
        recursion_level: int,
        api_scope: str,  # Window or ServiceWorker
        scope: Scope | None = None,
        url_scope: URLScope | None = None,
        event_listener_map: dict[str, str] | None = None,
    ):
        self.browser = browser
        self.grammar = grammar  # JS & WebIDL grammar
        self.compromised = compromised
        self.origin_id = origin_id
        self.page_id = page_id
        self.input_id = input_id
        self.recursion_level = recursion_level
        self.scope = Scope() if scope is None else scope  # current scope of variables
        # URL scope, tracks exisiting URLs and generates new ones
        self.url_scope = (
            URLScope(origin_id, page_id, input_id) if url_scope is None else url_scope
        )
        self.ipc_fuzzer = IPCFuzzer(browser, self.url_scope)
        self.sanitizer = Sanitizer(browser, self.url_scope)
        self.statements: List[statement.Statement] = []  # generated statements
        self.api_scope = api_scope

        if browser == "chrome" and "Navigation" in self.grammar.interfaces:
            NAV_INTERFACES.append("Navigation")

        self.add_global_objects_to_scope()
        self.add_builtin_functions_to_scope()
        if api_scope == "Window":
            self.add_html_elements_to_scope()

        # self.uninstantiable_callees: set[str] = set()
        if event_listener_map is None:
            self.event_listener_map: dict[str, str] = self.build_event_listener_map()
        else:
            self.event_listener_map = event_listener_map

        # if api_scope == "Window":
        #     import ipdb; ipdb.set_trace()

    def lower(
        self, guard: bool = True, func_scoped: bool = False, html: bool = False
    ) -> str:
        """Lowers the generated statements to a string of JS code
        Creates an async function and wraps the statements in it

        Args:
            guard (bool, optional): If set to True, wraps statements in try-catch blocks. Defaults to True.

        Returns:
            str: JS code
        """
        if html == True:
            func_scoped = True

        ret = ""
        if html == True:
            ret += "<html>\n<head>"
            if self.compromised:
                if self.browser == "firefox":
                    ret += f"\n<script>IPCFuzzer.deactivate_renderer_checks({RENDERER_CHECK_FLAG});\nIPCFuzzer.activate_leak_sanitizer();</script>\n"
                else:
                    ret += f"\n<script>IPCFuzzer.deactivate_renderer_checks();\nIPCFuzzer.activate_leak_sanitizer();</script>\n"
            ret += "<script>navigator.serviceWorker.register('/sw.js').then((reg) => {reg.update();}).catch((e) => {});</script>\n"
            ret += (
                "<script>"
                + self.sanitizer.sanitizer_declaration().lower()
                + self.sanitizer.iframe_sanitizer_declaration().lower()
                + self.sanitizer.window_sanitizer_declaration().lower()
                + "</script>\n"
            )
            ret += f"</head>\n<body>\n<h1>{secrets.token_hex(TOKEN_LENGTH)}</h1><p>foo</p>{MAGIC if not self.compromised else ''}\n<script>\n"
        if func_scoped == True:
            ret += "async function foo() {\n"
        ret += "".join([statement.lower(guard, 1) for statement in self.statements])
        if func_scoped == True:
            ret += "}\nfoo();\n"
        if html == True:
            ret += "</script>\n</body>\n</html>"
        return ret

    def add_statement(self, statement: statement.Statement) -> None:
        """Add a statement to the list of generated statements"""
        self.statements.append(statement)

    def add_statements(self, statements: List[statement.Statement]) -> None:
        """Appends a list of statements to the list of generated statements"""
        self.statements.extend(statements)

    def add_properties_to_scope(self, cls: js.Class, access_path: str) -> None:
        """Add properties of an visible object, accessible via access_path, to the scope"""
        for member in cls.get_members():
            if isinstance(cls, interfaces.Interface) and not self.grammar.check_member_exposed_ext_attr(member): # type: ignore
                continue
            if isinstance(member, js.Attribute):
                self.scope.add_permanent_var(
                    f"{access_path}.{member.name}", member.var_type
                )
            elif isinstance(member, js.Constant):
                self.scope.add_permanent_var(member.name, member.var_type)

    def add_global_objects_to_scope(self) -> None:
        """Populates the script scope with the visible browser objects and their properties such as window, document, etc."""
        for varname, constant in self.grammar.js_builtin_constants.items():
            self.scope.add_permanent_var(varname, constant.var_type)

        if self.api_scope == "Window":
            self.scope.add_permanent_var("window", types.InterfaceType("Window"))
            window = self.grammar.interfaces["Window"]
            self.add_properties_to_scope(window, "window")
        elif self.api_scope == "ServiceWorker":
            self.scope.add_permanent_var(
                "self", js_types.ObjectType("ServiceWorkerGlobalScope")
            )
            sw_scope = self.grammar.interfaces["ServiceWorkerGlobalScope"]
            self.add_properties_to_scope(sw_scope, "self")

        for namespace in self.grammar.iter_visible_namespaces(self.api_scope):
            self.scope.add_permanent_var(
                namespace.name, js_types.ObjectType(namespace.name)
            )

    def add_builtin_functions_to_scope(self) -> None:
        """Populates the script scope with the JS builtin functions such as eval"""
        for func in self.grammar.js_builtin_functions.values():
            self.scope.add_func(func.name, value.Signature(func.arguments, func.ret))

    def add_html_elements_to_scope(self) -> None:
        """Adds the two HTML elements head and body which are pregenerated by the builder to the script scope"""
        assert self.api_scope == "Window"
        self.scope.add_permanent_var(
            "document.head", js_types.ObjectType("HTMLHeadElement")
        )
        self.scope.add_permanent_var(
            "document.body", js_types.ObjectType("HTMLBodyElement")
        )

    def generate_value(self, var: js.NamedVar, callee: str | None) -> str:
        """
        Generate a new value for a given variable. Processes type and name to create a fitting value.
        Assigns the value to a new identifier and returns the identifier.
        If additional instructions are needed to create the value, they are added to the list of generated statements.

        Args:
            var (js.NamedVar): The variable to generate a value for

        Returns:
            str: Identifier of the generated value
        """
        if var.nullable == True and random.random() < PROB_NONE:
            return "null"

        if isinstance(var.var_type, js_types.PrimitiveType):
            identifier = self.scope.create_var_identifier(var.var_type)
            self.add_statement(
                instruction.Assignment(
                    identifier,
                    value.generate_primitive_value(
                        var,
                        self.url_scope,
                        self.rand_complex_url,
                        not self.compromised,
                        callee,
                    ),
                )
            )
        elif isinstance(var.var_type, js_types.ObjectType):
            try:
                identifier = self.generate_object(var.var_type, var)
            except GrammarLookupError as e:
                if var.nullable == True:
                    return "null"
                raise e
        else:
            # TODO: implement generation logic for other types (ANY)
            return "''"

        return identifier

    def generate_dictionary(self, dictionary: entities.Dictionary) -> str:
        """Processes a dictionary definition from the WebIDL grammar and generates a fitting object
        The object is created using the {} notation to create an object from key-value pairs.
        Returns the identifier of the created object."""
        identifier = self.scope.create_var_identifier(
            js_types.ObjectType(dictionary.name)
        )
        value = "{"
        for member in dictionary.members:
            if member.required == False and random.random() < PROB_NONE:
                continue
            try:
                param = self.scope.get_matching_var(member.var_type, self.grammar)
                if param is None:
                    param = self.generate_value(
                        js.NamedVar(member.var_type, member.name), None
                    )
                value += f"{member.name}: {param}, "
            except (ValueGenerationError, GrammarLookupError) as e:
                if member.required:
                    raise e
        value += "}"
        self.add_statement(instruction.Assignment(identifier, value))
        return identifier

    def generate_enum(self, enum: entities.Enum) -> str:
        """Processes an enum definition from the WebIDL grammar
        and returns the identifier of an variable that has been assigned a random value from the enum
        """
        identifier = self.scope.create_var_identifier(js_types.ObjectType(enum.name))
        self.add_statement(
            instruction.Assignment(identifier, f"'{random.choice(enum.values).value}'")
        )
        return identifier

    def construct_object(self, obj_type: js_types.ObjectType, cls: js.Class) -> str:
        """Creates a new JS object by calling a constructor from the class and returns the identifier of the created object"""
        # TODO assign type hints from obj_type to the type of the generated object in the scope

        # search for constructors & call one
        if len(cls.constructors) > 0:
            idxs = list(range(len(cls.constructors)))
            random.shuffle(idxs)
            for idx in idxs:
                constructor: js.Constructor = cls.constructors[idx]
                try:
                    return self.call_constructor(cls, constructor)
                except (ValueError, GrammarLookupError):
                    continue
        raise ValueGenerationError(f"Could not find a constructor for class {cls.name}")

    def obtain_object_from_scope(self, obj_type: js_types.ObjectType) -> str:
        """Searches for a variable in the scope that matches the given object type and returns its identifier
        Also checks all members/funtions of objects in the scope and if a match is found, creates a member access or function call
        """
        vars: list[tuple[str, js_types.Type]] = list(self.scope.iter_vars())
        random.shuffle(vars)
        for varname, vartype in vars:
            if isinstance(vartype, js_types.ObjectType):
                try:
                    for member in self.grammar.find_class(
                        vartype.class_name
                    ).get_members():
                        if isinstance(member, js.Attribute):
                            if self.grammar.is_match(member.var_type, obj_type):
                                # found a matching attribute, create a member access
                                identifier = self.scope.create_var_identifier(obj_type)
                                self.add_statement(
                                    instruction.Assignment(
                                        identifier, f"{varname}.{member.name}"
                                    )
                                )
                                return identifier
                        elif isinstance(member, js.Function):
                            if self.grammar.is_match(member.ret.var_type, obj_type):
                                # found a matching function return, create a function call
                                identifier = self.scope.create_var_identifier(obj_type)
                                param_vars = self.get_parameters(member, varname)
                                self.add_statement(
                                    instruction.MemberFunctionCall(
                                        varname, member, param_vars, identifier
                                    )
                                )
                                return identifier
                except (ValueGenerationError, GrammarLookupError):
                    pass
        raise ValueGenerationError(
            f"Could not find an attribute or function in scope that returns {obj_type}"
        )

    def obtain_object_from_static_function(self, obj_type: js_types.ObjectType) -> str:
        """Searches for a static function of a class in the scope that returns the given object type,
        if  a match is found, creates a static function call and returns the identifier of the created object.
        """
        for cls, func in self.grammar.rand_iter_static_funcs_by_return(self.api_scope, obj_type):
                        try:
                            identifier = self.scope.create_var_identifier(obj_type)
                            param_vars = self.get_parameters(func, cls.name)
                            self.add_statement(
                                instruction.StaticFunctionCall(
                                    cls, func, param_vars, identifier
                                )
                            )
                            return identifier
                        except (ValueGenerationError, GrammarLookupError):
                            self.grammar.remove_static_func_from_cache(obj_type, cls, func)
                            continue
        raise ValueGenerationError(
            f"Could not find a static function in scope that returns {obj_type}"
        )

    def obtain_object_from_newly_generated_object(
        self, obj_type: js_types.ObjectType, recursion: int
    ) -> str:
        """Generates a new object to call one of its member functions to obtain an object of obj_type"""
        # The case, where an object can only be created by another object that we have to construct first,
        # did not occur yet. Therefore, this function is not implemented.

        for cls, member in self.grammar.rand_iter_potential_generators(self.api_scope, obj_type):
            try:
                other_identifier = self.generate_class_object(
                    obj_type, cls, recursion + 1
                )
                match type(member):
                    case js.Function:
                        assert isinstance(member, js.Function)
                        identifier = self.scope.create_var_identifier(obj_type)
                        param_vars = self.get_parameters(member, other_identifier)
                        self.add_statement(
                            instruction.MemberFunctionCall(
                                other_identifier, member, param_vars, identifier
                            )
                        )
                        return identifier
                    case js.Attribute:
                        assert isinstance(member, js.Attribute)
                        identifier = self.scope.create_var_identifier(obj_type)
                        self.add_statement(
                            instruction.Assignment(
                                identifier, f"{other_identifier}.{member.name}"
                            )
                        )
                        return identifier
                    case _:
                        raise ValueGenerationError(f"Unknown member type {member}")
            except ValueGenerationError:
                self.grammar.remove_generator_from_cache(obj_type, cls, member)
                pass

        raise ValueGenerationError(
            f"Could not instantiate another class to obtain {obj_type} from"
        )

    def generate_class_object(
        self, obj_type: js_types.ObjectType, cls: js.Class, recursion: int
    ) -> str:
        """Generates an object of the given class and returns the identifier of the created object.
        If the class is the intrface of an HTML element, an HTML is created and added to the DOM.
        Otherwise, a new object is created by calling a constructor of the class, obtained from the scope or a static function.
        """
        if (
            self.api_scope == "Window"
            and isinstance(cls, interfaces.Interface)
            and cls.html_tag is not None
        ):
            return self.generate_html_element(cls)

        try:
            return self.construct_object(obj_type, cls)
        except ValueGenerationError:
            pass

        try:
            return self.obtain_object_from_scope(obj_type)
        except ValueGenerationError:
            pass

        try:
            return self.obtain_object_from_static_function(obj_type)
        except ValueGenerationError:
            pass

        if recursion < MAX_OBJ_RECURSION:
            try:
                return self.obtain_object_from_newly_generated_object(
                    obj_type, recursion
                )
            except ValueGenerationError:
                pass
            except NotImplementedError:
                pass

        self.grammar.mark_uninstantiable(self.api_scope, obj_type.class_name)

        raise ValueGenerationError(
            f"Could not find a way to create an object of type {cls.name}"
        )

    def generate_callback(self, callback: js.Callback) -> str:
        sig: value.Signature = value.Signature(callback.arguments, callback.ret)
        identifier: str | None = self.scope.get_matching_func(sig)
        if identifier is not None:
            return identifier
        return self.generate_function(sig)

    def generate_object(
        self, obj_type: js_types.ObjectType, var: js.NamedVar | None
    ) -> str:
        """Generates an object of the given type and returns the identifier of the created object.
        Uses specific generation logic for EventHandler, HeadersInit, and Headers.
        Primite types are created by generating a random value.
        Otherwise, looks up the class, dictionary, or enum in the grammar and calls the fitting generation function.
        If the type was created via a WebIDL typedef, the type is resolved and the generation function is called again.
        """
        definition: js.Class | entities.Dictionary | entities.Enum | None = None

        # TODO: add shorthand definitions for arrays,
        # catch special cases
        match obj_type.class_name:
            case "EventHandler":
                return self.generate_event_handler(var)
            case "EventListener":
                return self.generate_event_listener()
            case "VoidFunction":
                sig: value.Signature = value.Signature(
                    [], js.Return(js_types.UNDEFINED())
                )
                identifier: str | None = self.scope.get_matching_func(sig)
                if identifier is not None:
                    return identifier
                return self.generate_function(sig)
            case "HeadersInit":
                return value.generate_headers(self.url_scope)
            case "object":
                return "{}"
            case "Blob":
                return self.generate_blob()
            case _:
                pass  # fallthrough

        if obj_type.class_name in [
            "String",
            "DOMString",
            "USVString",
            "ByteString",
            "UTF8String",
            "JSString",
        ]:
            if var is None:
                var = js.NamedVar(obj_type, "placeholder")
            return value.generate_string(
                var,
                self.url_scope,
                self.rand_complex_url,
                not self.compromised,
            )

        if obj_type.class_name in TYPE_MAP:
            alias_obj_type = js_types.ObjectType(
                random.choice(TYPE_MAP[obj_type.class_name])
            )
            alias_obj_type.hint_dict = obj_type.hint_dict
            return self.generate_object(
                alias_obj_type, js.NamedVar(alias_obj_type, "placeholder")
            )

        try:
            # lookup class
            definition = self.grammar.find_instantiatable(obj_type.class_name)
        except GrammarLookupError as e:
            if obj_type.class_name in self.grammar.callbacks:
                return self.generate_callback(
                    self.grammar.callbacks[obj_type.class_name]
                )
            raise e

        # if a definition was found, call the fitting generation function
        match type(definition):
            case js.Class:
                assert isinstance(definition, js.Class)
                return self.generate_class_object(obj_type, definition, 0)
            case entities.Dictionary:
                assert isinstance(definition, entities.Dictionary)
                return self.generate_dictionary(definition)
            case entities.Enum:
                assert isinstance(definition, entities.Enum)
                return self.generate_enum(definition)

        raise ValueGenerationError(f"Unknown type {obj_type}")

    def generate_function(self, sig: value.Signature) -> str:
        """Generates a function with the given signature and adds it to the list of generated functions
        Creates a new identifier for the function and returns it.
        Generates a random function body and adds it to the list of generated statements.
        Currently, the function only logs the function arguments to the console.
        """
        identifier = self.scope.create_func_identifier(sig)

        function_scope = Scope(f"{identifier}_var", f"{identifier}_func", self.scope)
        function_builder: JSBuilder = JSBuilder(
            self.browser,
            self.grammar,
            self.compromised,
            self.origin_id,
            self.page_id,
            self.input_id,
            self.recursion_level,
            self.api_scope,
            function_scope,
            self.url_scope,
            self.event_listener_map,
        )

        # Setup the local scope of the function
        for arg in sig.arguments:
            if isinstance(arg, js.Parameter):
                function_builder.scope.add_var(arg.name, arg.var_type)
            elif isinstance(arg, js.Callback):
                function_builder.scope.add_func(
                    arg.name, value.Signature(arg.arguments, arg.ret)
                )
            else:
                raise ValueGenerationError(f"Unknown argument type {arg}")

        function_builder.generate_rand_instructions(NUM_INSTRUCTIONS)
        retvar: str = function_builder.generate_value(
            js.NamedVar(sig.ret.var_type, "return"), None
        )
        function_builder.add_statement(instruction.ReturnInstruction(retvar))

        block = statement.Block()
        block.statements = function_builder.statements
        function = statement.Function(
            identifier, [arg.name for arg in sig.arguments], block
        )

        self.add_statement(function)
        return identifier

    def generate_event_handler(self, var: js.NamedVar | None) -> str:
        """Generates a function that takes an event as a parameter, adds it to the scope and returns its identifier"""
        event_class_name: str = "Event"
        if var is not None:
            assert (
                isinstance(var.var_type, js_types.ObjectType)
                and var.var_type.class_name == "EventHandler"
            )
            handler_name: str = var.name
            if handler_name in self.event_listener_map:
                event_class_name = self.event_listener_map[handler_name]

        sig: value.Signature = value.Signature(
            [js.Parameter(js_types.ObjectType(event_class_name), "event")],
            js.Return(js_types.UNDEFINED()),
        )

        identifier: str | None = self.scope.get_matching_func(sig)
        if identifier is not None:
            return identifier
        return self.generate_function(sig)

    def generate_event_listener(self) -> str:
        event_handler: str = self.generate_event_handler(None)
        identifier: str = self.scope.create_var_identifier(
            js_types.ObjectType("EventListener")
        )
        stmt = instruction.StringInstruction(
            f"var {identifier} = {{handleEvent: {event_handler}}};"
        )
        self.add_statement(stmt)
        return identifier

    def get_parameters(
        self, func: js.Function | js.Constructor, callee: str | None
    ) -> List[str]:
        """Generates parameters to invoke a function and returns a list of their identifiers
        If additional instructions are needed to create the parameters, they are added to the list of generated statements.
        """
        # TODO: handle variadic arguments
        param_vars = []
        for arg in func.arguments:
            if arg.optional == True and random.random() < PROB_NONE:
                break

            if isinstance(arg, js.Parameter):

                if arg.nullable == True and random.random() < PROB_NONE:
                    param_vars.append("null")
                    continue

                if isinstance(arg.var_type, js_types.PrimitiveType):
                    # generate random value for primitive type
                    param = self.generate_value(arg, callee)
                else:
                    # for object types, reuse existing objects or create new ones
                    param = self.scope.get_matching_var(arg.var_type, self.grammar)
                    if param is None:
                        try:
                            param = self.generate_value(arg, callee)
                        except GrammarLookupError as e:
                            # fallback, if no matching object can be found
                            if arg.optional == True:
                                break
                            elif arg.nullable == True:
                                param = "null"
                            else:
                                raise e
                param_vars.append(param)
            elif isinstance(arg, js.Callback):
                # create a callback function
                sig = value.Signature(arg.arguments, arg.ret)
                identifier = self.scope.get_matching_func(sig)
                if identifier is None:
                    identifier = self.generate_function(sig)
                param_vars.append(identifier)
            else:
                raise ValueGenerationError(f"Unknown argument type {arg}")
        return param_vars

    def create_api_call(
        self, cls: js.Class, func: js.Function, identifier: str | None = None
    ) -> None:
        """Generates a call of an browser API function and adds it to the list of generated statements.
        Fulfills the requirements of the given function by generating parameters and the object.
        """

        if func.special == "static" or isinstance(cls, interfaces.Namespace):
            # if func is static, create params and call static function
            param_vars = self.get_parameters(func, cls.name)
            self.add_statement(instruction.StaticFunctionCall(cls, func, param_vars))
            return
        else:
            if identifier is not None:
                obj = identifier
            else:
                # if func is not static, create/obtain object
                obj_type = js_types.ObjectType(cls.name)
                obj = self.scope.get_matching_var(obj_type, self.grammar)
                if obj is None:
                    obj = self.generate_class_object(obj_type, cls, 0)

            # create params
            param_vars = self.get_parameters(func, obj)

            # call function
            if func.ret != js_types.UNDEFINED:
                retvar = self.scope.create_var_identifier(func.ret.var_type)
                self.add_statement(
                    instruction.MemberFunctionCall(obj, func, param_vars, retvar)
                )
            else:
                self.add_statement(
                    instruction.MemberFunctionCall(obj, func, param_vars)
                )

    def create_attribute_assignment(
        self, cls: js.Class, attr: js.Attribute, identifier: str | None = None
    ) -> None:
        """Generates an assignment to an attribute and adds it to the list of generated statements.
        Fulfills the requirements of the assignment instruction by generating the object and the value.
        """
        if identifier is not None:
            obj = identifier
        else:
            # Step 1: create/obtain object
            obj_type = js_types.ObjectType(cls.name)
            obj = self.scope.get_matching_var(obj_type, self.grammar)
            if obj is None:
                obj = self.generate_class_object(obj_type, cls, 0)

        # Step 2: generate value
        assert not attr.is_readonly()
        if isinstance(attr, webidl_var.Attribute) and attr.is_put_forwards():
            assignment_type: js_types.Type = self.grammar.get_put_forwards_type(attr)
            value = self.generate_value(
                webidl_var.Attribute(
                    assignment_type.hint(attr.var_type.get_hints()),
                    attr.name,
                    attr.nullable,
                    attr.special,
                    False,
                ),
                obj,
            )
        else:
            value = self.generate_value(attr, obj)

        # Step 3: assign value to attribute
        self.add_statement(
            instruction.Assignment(f"{obj}.{attr.name}", value, new_var=False)
        )

    def call_constructor(self, cls: js.Class, constructor: js.Constructor) -> str:
        """Generates a call of a constructor and adds it to the list of generated statements.
        Returns the identifier of the created object.
        """
        # Step 1: generate parameters
        param_vars = self.get_parameters(constructor, None)

        # Step 2: call constructor
        obj = self.scope.create_var_identifier(js_types.ObjectType(cls.name))
        if constructor.new_forbidden:
            self.add_statement(instruction.ConstructorCall(cls, param_vars, obj, False))
        else:
            self.add_statement(instruction.ConstructorCall(cls, param_vars, obj, True))
        return obj

    def generate_html_element(self, html_interface: interfaces.Interface) -> str:
        """Generates an HTML element by adding it to the DOM and returns the  identifier of the JS handle of the created object
        The HTML element is created by calling document.createElement with the correct tag name.
        If the element needs to be added to a specific parent element, a matching parent is searched or created.
        """
        assert html_interface.html_tag is not None
        identifier = self.scope.create_var_identifier(
            js_types.ObjectType(html_interface.name)
        )
        self.add_statement(
            instruction.StringInstruction(
                f"var {identifier} = document.createElement('{html_interface.html_tag}');"
            )
        )

        # check if the element needs to be added to a specific parent
        if html_interface.html_tag in TAG_HIERARCHY:
            parent = random.choice(TAG_HIERARCHY[html_interface.html_tag])
            parent_interface_name = TAG_TO_WEBIDL[parent]
            parent_type = js_types.ObjectType(parent_interface_name)
            parent_identifier = self.scope.get_matching_var(parent_type, self.grammar)
            if parent_identifier is None:
                parent_identifier = self.generate_html_element(
                    self.grammar.interfaces[parent_interface_name]
                )
            self.add_statement(
                instruction.StringInstruction(
                    f"{parent_identifier}.appendChild({identifier});"
                )
            )
        elif html_interface.html_tag in ["base", "link", "meta", "style", "title"]:
            # element belongs into head
            self.add_statement(
                instruction.StringInstruction(
                    f"document.head.appendChild({identifier});"
                )
            )
        else:
            self.add_statement(
                instruction.StringInstruction(
                    f"document.body.appendChild({identifier});"
                )
            )

        for member in html_interface.get_members():
            if isinstance(member, js.Attribute) and member.name in SRC_ATTRIBUTES:
                self.create_attribute_assignment(html_interface, member, identifier)

        if html_interface.name == "HTMLFormElement":
            button = self.scope.create_var_identifier(
                js_types.ObjectType("HTMLButtonElement")
            )
            self.add_statements(
                [
                    instruction.StringInstruction(
                        f"var {button} = document.createElement('button');"
                    ),
                    instruction.StringInstruction(
                        f"{button}.innerText = 'foo';"
                    ),
                    instruction.StringInstruction(
                        f"{identifier}.appendChild({button});"
                    ),
                ]
            )

        return identifier

    def generate_rand_action(self, callee: js.Class, identifier: str | None) -> None:
        """Call a random member of the callee or assign to a random attribute of the callee
        If identifier is not None, use the object at this identifier.
        Otherwise create a new object"""
        # either call (member-)function or assign to attribute
        member: js.Member = self.weighted_rand_choose_member(callee)
        if isinstance(member, js.Function):
            try:
                self.create_api_call(callee, member, identifier)
            except (ValueError, GrammarLookupError) as e:
                logging.warning(f"Exception {e} for api call of {callee.name}")
                # self.grammar.mark_uninstantiable(self.api_scope, callee.name) # TODO bad at this point because it might be that only this one function cannot be called
        elif isinstance(member, js.Attribute):
            try:
                self.create_attribute_assignment(callee, member, identifier)
                # self.grammar.mark_uninstantiable(self.api_scope, callee.name)
            except (ValueError, GrammarLookupError) as e:
                logging.warning(f"Exception {e} for attr assignment of {callee.name}")
        else:
            raise ValueGenerationError(f"Unknown member type {member}")

    def weighted_rand_choose_member(self, callee: js.Class) -> js.Member:
        """Choose a random member of the callee, with a higher probability for functions over attributes"""
        members: list[js.Member] = list(callee.get_members())
        random.shuffle(members)

        choose_navigation: bool = random.random() < PROB_NAV

        first_choice: js.Member | None = None
        for member in members:
            if (
                isinstance(member, js.Function)
                and member.special in ["", "stringifier"]
            ) or (isinstance(member, js.Attribute) and not member.is_readonly()):
                if choose_navigation:
                    if member.name in NAV_MEMBERS:
                        return member

                    if first_choice is None:
                        first_choice = member

                return member
        if first_choice is not None:
            return first_choice

        # self.grammar.mark_uninstantiable(self.api_scope, callee.name)
        raise ValueGenerationError(f"No suitable member found for {callee.name}")

    def generate_sanitizer_instructions(self) -> None:
        self.generate_sanitizer_declaration()
        self.generate_sanitizer_invocation()

    def generate_sanitizer_declaration(self) -> None:
        self.add_statement(self.sanitizer.sanitizer_declaration())

    def generate_sanitizer_invocation(self) -> None:
        self.add_statement(self.sanitizer.sanitizer_invocation())

    def generate_sanitizer_declarations(self) -> None:
        self.add_statements(
            [
                self.sanitizer.sanitizer_declaration(),
                self.sanitizer.sanitizer_invocation(),
                self.sanitizer.window_sanitizer_declaration(),
                self.sanitizer.iframe_sanitizer_declaration(),
            ]
        )

    def generate_rand_instructions(self, num: int) -> None:
        """Generates a random number of instructions and adds them to the list of generated statements"""
        self.generate_sanitizer_invocation()
        for _ in range(num):
            self.scope.reset_modified_vars()
            if self.compromised and random.random() < PROB_IPC_FUZZER:
                self.add_statement(self.ipc_fuzzer.rand_mutation(self.rand_complex_url))

            else:
                callee: interfaces.Interface | interfaces.Namespace | None = None
                identifier: str | None = None
                if (
                    random.random()
                    < RECYCLING_FACTOR
                    * self.scope.len()
                    / self.grammar.number_of_callees()
                ):
                    # choose random object from scope
                    try:
                        identifier, var_type = self.scope.get_rand_object_var()
                        callee = self.grammar.find_interfacelike(var_type.class_name)
                        if callee.name == "IPCFuzzer":
                            callee = None
                    except IndexError:
                        pass
                    except GrammarLookupError:
                        pass

                # either rand condition was not met or no object in scope
                if callee is None:
                    # generate random new object and call a random member function or assign to a random attribute
                    callee = self.get_rand_callee()
                    identifier = None
                try:
                    self.generate_rand_action(callee, identifier)

                except ValueGenerationError or GrammarLookupError as e:
                    logging.warning(f"Exception {e} for {callee.name}")
                except IndexError:
                    # callee had no usable members
                    pass
            self.invoke_handle_sanitizers()

    @staticmethod
    def string_escape(s: str) -> str:
        """outer string delimiters for js are ', thus shift ' to " and " to `"""
        assert not "`" in s
        return s.replace('"', "`").replace("'", '"').replace("</script>", "<\\/script>")

    def generate_js_url(self) -> str:
        """Generates a random javascript: URL"""
        temporary_scope: Scope = Scope("uv", "uf", self.scope)
        builder: JSBuilder = JSBuilder(
            self.browser,
            self.grammar,
            self.compromised,
            self.origin_id,
            self.page_id,
            self.input_id,
            self.recursion_level + 1,
            self.api_scope,
            temporary_scope,
            self.url_scope,
            self.event_listener_map,
        )
        if builder.recursion_level >= MAX_DOC_RECURSION:
            builder.generate_sanitizer_instructions()
        else:
            builder.generate_sanitizer_declarations()
            builder.generate_rand_instructions(NUM_INSTRUCTIONS)
        url: str = builder.lower(True, True, False)
        url = self.string_escape(url)
        url = url.replace("\n", "").replace("\t", "")
        url = urllib.parse.quote(url)

        url = "javascript:" + url
        # TODO: save js URL in urlscope
        return f"'{url}'"

    def generate_data_url(self) -> str:
        """Generates a random data: URL"""
        data: str = self.generate_html_document_string()
        data = urllib.parse.quote(data)
        data = "'data:text/html," + data + "'"
        # TODO: save data URL in urlscope
        return data

    def invoke_handle_sanitizers(self) -> None:
        """Invokes the sanitizer on all modified variables"""
        for identifier, var_type in self.scope.iter_modified_vars():
            if isinstance(var_type, js_types.ObjectType):
                if var_type.class_name == "HTMLIframeElement":
                    self.add_statement(
                        self.sanitizer.iframe_sanitizer_invocation(identifier)
                    )
                elif (
                    var_type.class_name == "Window"
                    or var_type.class_name == "WindowProxy"
                ) and identifier != "globalThis":
                    self.add_statement(
                        self.sanitizer.window_sanitizer_invocation(identifier)
                    )
        self.scope.reset_modified_vars()

    def clear(self) -> None:
        """Clears the list of generated statements and resets the scope"""
        self.statements = []
        self.scope.clear()

    # def set_compromised(self, compromised: bool) -> None:
    #     """Sets the compromised flag"""
    #     self.compromised = compromised

    def set_input_id(self, input_id: int) -> None:
        """Sets the input_id in the URL scope"""
        self.url_scope.set_input_id(input_id)

    def generate_html_document_string(self) -> str:
        builder: JSBuilder = JSBuilder(
            self.browser,
            self.grammar,
            self.compromised,
            self.origin_id,
            self.page_id,
            self.input_id,
            self.recursion_level + 1,
            self.api_scope,
            None,
            self.url_scope,
            self.event_listener_map,
        )
        if builder.recursion_level >= MAX_DOC_RECURSION:
            builder.generate_sanitizer_instructions()
        else:
            builder.generate_rand_instructions(NUM_INSTRUCTIONS)
        doc = builder.lower(True, True, True)
        doc = self.string_escape(doc)
        doc = doc.replace("\n", "\\n")
        return doc

    def generate_blob(self) -> str:
        """Generates a Blob object by creating a new Blob object and returns the identifier of the created object"""
        str_identifier = self.scope.create_var_identifier(js_types.ObjectType("String"))
        self.add_statement(
            instruction.StringInstruction(
                f"var {str_identifier} = '{self.generate_html_document_string()}';"
            )
        )
        identifier = self.scope.create_var_identifier(js_types.ObjectType("Blob"))
        self.add_statement(
            instruction.StringInstruction(
                f"var {identifier} = new Blob([{str_identifier}], {{type:'text/html'}});"
            )
        )
        return identifier

    def rand_complex_url(self) -> str:
        rnd: int = (
            random.randint(0, 2) if self.api_scope == "Window" else random.randint(0, 1)
        )
        match rnd:
            case 0:
                return self.generate_js_url()
            case 1:
                return self.generate_data_url()
            case 2:
                return self.generate_blob_url()
            case _:
                raise ValueError(f"Unknown random number {rnd}")

    # TODO: add URL scope
    def generate_blob_url(self) -> str:
        """Generates a random blob: URL"""
        blob = self.generate_blob()
        bloburl_identifier = self.scope.create_var_identifier(
            js_types.ObjectType("String")
        )
        if self.compromised and random.random() < 0.5:
            self.add_statement(
                instruction.StringInstruction(
                    f"var {bloburl_identifier} = URL.createObjectURL({blob}).replace('127.0.0.1','127.0.0.2');"
                )
            )
        else:
            self.add_statement(
                instruction.StringInstruction(
                    f"var {bloburl_identifier} = URL.createObjectURL({blob});"
                )
            )
        return bloburl_identifier

    def get_rand_callee(self) -> interfaces.Interface | interfaces.Namespace:
        if self.api_scope == "Window" and random.random() < PROB_NAV:
            name = random.choice(NAV_INTERFACES)
            return self.grammar.find_interfacelike(name)

        while True:
            callee_id: str = self.grammar.instantiable_callees.rand_choice()
            if not callee_id == "IPCFuzzer":
                return self.grammar.find_interfacelike(callee_id)


    def build_event_listener_map(self) -> dict[str, str]:
        """Returns a map of event listeners to their respective event handler function"""
        event_listener_map: dict[str, str] = {}
        for iface in self.grammar.interfaces.values():
            if iface.name.endswith("Event"):  # could also check if inherits from Event
                listener_name = "on" + iface.name[:-5].lower()
                event_listener_map[listener_name] = iface.name
        return event_listener_map


class SWBuilder(JSBuilder):
    def __init__(
        self,
        browser: str,
        grammar: Grammar,
        compromised: bool,
        origin_id: int,
        input_id: int,
    ):
        super().__init__(
            browser, grammar, compromised, origin_id, 1, input_id, 0, "ServiceWorker"
        )

    def generate_fetch_handler(self) -> None:
        handler = self.generate_event_handler(
            webidl_var.NamedVar(js_types.ObjectType("EventHandler"), "onfetch")
        )

        # ugly hack to make sure that we do not use an invalid repondWith that blocks all requests
        for stmt in self.statements:
            if isinstance(stmt, statement.Function) and stmt.name == handler:
                # found the handler function, remove all respondWith calls
                cleaned_body = [
                    body_stmt
                    for body_stmt in stmt.body.statements
                    if not "respondWith" in body_stmt.lower(False)
                ]
                stmt.body.statements = cleaned_body

                # sanitize request cookies
                san_instruction = self.sanitizer.sw_fetch_cookie_sanitizer()
                stmt.body.statements.insert(0, san_instruction)

                stmt.body.statements.insert(
                    0,
                    instruction.StringInstruction(
                        "event.respondWith(fetch(event.request));"
                    ),
                )

                #  add a respondWith call that returns a (valid) response
                respond_with: instruction.Instruction
                if random.random() < 0.25:
                    respond_with = instruction.StringInstruction(
                        f"event.respondWith(fetch({self.url_scope.rand_url(self.rand_complex_url)}).then((resp) => {{if (resp.ok) {{return resp;}} else {{return fetch(event.request);}}}}).catch((err) => {{return fetch(event.request);}}));"
                    )
                else:
                    respond_with = instruction.StringInstruction(
                        "event.respondWith(fetch(event.request));"
                    )
                stmt.body.statements.pop()  # remove the return statement at the end of the function
                stmt.body.statements.append(respond_with)
                break

        self.add_statement(
            instruction.Assignment("self.onfetch", handler, new_var=False)
        )

    # Exposed attributes: Worker?, ServiceWorker (SharedWorker, DedicatedWorker probably not)
    def generate_script(self) -> str:
        self.generate_sanitizer_declaration()
        for event_identifier in ["oninstall", "onactivate", "onmessage", "onpush"]:
            handler = self.generate_event_handler(
                webidl_var.NamedVar(
                    js_types.ObjectType("EventHandler"), event_identifier
                )
            )

            if event_identifier == "oninstall":
                for stmt in self.statements:
                    if isinstance(stmt, statement.Function) and stmt.name == handler:
                        # insert skipWaiting call into install event listener
                        stmt.body.statements.insert(
                            0,
                            instruction.StringInstruction("await self.skipWaiting();"),
                        )
                        break
            elif event_identifier == "onactivate":
                for stmt in self.statements:
                    if isinstance(stmt, statement.Function) and stmt.name == handler:
                        # insert clients.claim call into activate event listener
                        stmt.body.statements.insert(
                            0,
                            instruction.StringInstruction(
                                "await event.waitUntil(clients.claim());"
                            ),
                        )
                        break

            self.add_statement(
                instruction.Assignment(
                    f"self.{event_identifier}", handler, new_var=False
                )
            )
        self.generate_fetch_handler()
        return self.lower(True, False, False)

    def generate_sanitizer_declaration(self) -> None:
        self.add_statement(self.sanitizer.sw_sanitizer_declaration())
