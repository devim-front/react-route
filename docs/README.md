[@devim-front/react-route](README.md)

# @devim-front/react-route

## Index

### Classes

* [BaseError](classes/baseerror.md)
* [Route](classes/route.md)
* [UndefinedComponentError](classes/undefinedcomponenterror.md)
* [UndefinedPathError](classes/undefinedpatherror.md)

### Interfaces

* [Events](interfaces/events.md)

### Type aliases

* [Compile](README.md#markdown-header-compile)
* [Params](README.md#markdown-header-params)
* [RedirectOptions](README.md#markdown-header-redirectoptions)

## Type aliases

### <a id="markdown-header-compile" name="markdown-header-compile"></a>  Compile

Ƭ **Compile**: *ReturnType‹typeof compile›*

Функция компиляции адреса страницы из шаблона маршрута.

___

### <a id="markdown-header-params" name="markdown-header-params"></a>  Params

Ƭ **Params**: *Record‹string, string | number› | void*

Коллекция параметров маски адреса страницы.

___

### <a id="markdown-header-redirectoptions" name="markdown-header-redirectoptions"></a>  RedirectOptions

Ƭ **RedirectOptions**: *object*

Параметры перенаправления.

#### Type declaration:

* **exact**? : *undefined | false | true*

* **from**? : *string | [Route](classes/route.md)*

* **replace**? : *undefined | false | true*
