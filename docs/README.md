[@devim-front/react-route](README.md)

# @devim-front/react-route

## Index

### Classes

* [BaseError](classes/baseerror.md)
* [NoMatchesError](classes/nomatcheserror.md)
* [NotFound](classes/notfound.md)
* [Route](classes/route.md)
* [RouterManager](classes/routermanager.md)
* [RouterRoot](classes/routerroot.md)
* [RouterState](classes/routerstate.md)
* [UndefinedComponentError](classes/undefinedcomponenterror.md)
* [UndefinedPathError](classes/undefinedpatherror.md)

### Interfaces

* [Events](interfaces/events.md)

### Type aliases

* [Compile](README.md#markdown-header-compile)
* [GoTo](README.md#markdown-header-goto)
* [Handler](README.md#markdown-header-handler)
* [Params](README.md#markdown-header-params)
* [Props](README.md#markdown-header-props)
* [StaticContext](README.md#markdown-header-staticcontext)
* [StaticProps](README.md#markdown-header-staticprops)

### Functions

* [Router](README.md#markdown-header-const-router)
* [withRouteWrapper](README.md#markdown-header-const-withroutewrapper)

## Type aliases

### <a id="markdown-header-compile" name="markdown-header-compile"></a>  Compile

Ƭ **Compile**: *ReturnType‹typeof compile›*

Функция компиляции адреса страницы из шаблона маршрута.

___

### <a id="markdown-header-goto" name="markdown-header-goto"></a>  GoTo

Ƭ **GoTo**: *ReactElement‹RedirectProps›*

Элемент Redirect из библиотеки react-router с предустановленными
значениями свойств.

___

### <a id="markdown-header-handler" name="markdown-header-handler"></a>  Handler

Ƭ **Handler**: *ComponentType‹any›*

Компонент React, который обслуживает маршрут.

___

### <a id="markdown-header-params" name="markdown-header-params"></a>  Params

Ƭ **Params**: *Record‹string, string› | void*

Коллекция параметров маски адреса страницы.

___

### <a id="markdown-header-props" name="markdown-header-props"></a>  Props

Ƭ **Props**: *object*

Свойства компонента.
Свойства компонента.
Свойства компонента.

#### Type declaration:

* **application**? : *ComponentType‹any›*

* **basename**? : *undefined | string*

* **hash**? : *undefined | false | true*

* **notFound**? : *ComponentType‹any›*

* **state**? : *[RouterState](classes/routerstate.md)*

* **url**? : *StaticProps["location"]*

___

### <a id="markdown-header-staticcontext" name="markdown-header-staticcontext"></a>  StaticContext

Ƭ **StaticContext**: *Exclude‹ComponentProps<typeof StaticRouter>["context"], undefined›*

Объект контекста роутера.

___

### <a id="markdown-header-staticprops" name="markdown-header-staticprops"></a>  StaticProps

Ƭ **StaticProps**: *ComponentProps‹typeof StaticRouter›*

Свойства статического роутера.

## Functions

### <a id="markdown-header-const-router" name="markdown-header-const-router"></a> `Const` Router

▸ **Router**(`__namedParameters`: object): *Element‹›*

Помещает указанный в свойстве "application" компонент в контекст
маршрутизатора и отображает его.

Маршрутизатор способен определять, в какой среде выполнения он запустился. На
NodeJS он использует StaticRouter, в браузере - либо BrowserRouter, либо
HashRouter (в зависимости от значения свойства "hash").

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Element‹›*

___

### <a id="markdown-header-const-withroutewrapper" name="markdown-header-const-withroutewrapper"></a> `Const` withRouteWrapper

▸ **withRouteWrapper**(`target`: [Handler](README.md#markdown-header-handler)): *WithRouteHandler*

Оборачивает компонент, который обслуживает маршрут, в обёртку, которая
изолирует его от проброса ненужных свойств.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | [Handler](README.md#markdown-header-handler) | Компонент, который обслуживает маршрут.  |

**Returns:** *WithRouteHandler*
