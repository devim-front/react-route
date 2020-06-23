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
* [Handler](README.md#markdown-header-handler)
* [Params](README.md#markdown-header-params)

### Functions

* [withRouteWrapper](README.md#markdown-header-const-withroutewrapper)

## Type aliases

### <a id="markdown-header-compile" name="markdown-header-compile"></a>  Compile

Ƭ **Compile**: *ReturnType‹typeof compile›*

Функция компиляции адреса страницы из шаблона маршрута.

___

### <a id="markdown-header-handler" name="markdown-header-handler"></a>  Handler

Ƭ **Handler**: *ComponentType‹any›*

Компонент React, который обслуживает маршрут.

___

### <a id="markdown-header-params" name="markdown-header-params"></a>  Params

Ƭ **Params**: *Record‹string, string | number› | void*

Коллекция параметров маски адреса страницы.

## Functions

### <a id="markdown-header-const-withroutewrapper" name="markdown-header-const-withroutewrapper"></a> `Const` withRouteWrapper

▸ **withRouteWrapper**(`target`: [Handler](README.md#markdown-header-handler)): *WithRouteHandler*

Оборачивает компонент, который обслуживает маршрут, в обёртку, которая
изолирует его от проброса ненужных свойств.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | [Handler](README.md#markdown-header-handler) | Компонент, который обслуживает маршрут.  |

**Returns:** *WithRouteHandler*
