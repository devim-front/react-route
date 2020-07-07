[@devim-front/react-route](../README.md) › [RouterManager](routermanager.md)

# Class: RouterManager ‹**S, SS, S**›

Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
библиотеки react-router-dom.

## Type parameters

▪ **S**

▪ **SS**

▪ **S**

## Hierarchy

* Component‹[Props](../README.md#markdown-header-props)›

  ↳ **RouterManager**

## Index

### Constructors

* [constructor](routermanager.md#markdown-header-constructor)

### Properties

* [context](routermanager.md#markdown-header-context)
* [previousPathname](routermanager.md#markdown-header-previouspathname)
* [refs](routermanager.md#markdown-header-refs)
* [contextType](routermanager.md#markdown-header-static-optional-contexttype)

### Accessors

* [push](routermanager.md#markdown-header-push)
* [redirect](routermanager.md#markdown-header-redirect)

### Methods

* [UNSAFE_componentWillMount](routermanager.md#markdown-header-optional-unsafe_componentwillmount)
* [UNSAFE_componentWillReceiveProps](routermanager.md#markdown-header-optional-unsafe_componentwillreceiveprops)
* [UNSAFE_componentWillUpdate](routermanager.md#markdown-header-optional-unsafe_componentwillupdate)
* [componentDidCatch](routermanager.md#markdown-header-optional-componentdidcatch)
* [componentDidMount](routermanager.md#markdown-header-optional-componentdidmount)
* [componentDidUpdate](routermanager.md#markdown-header-optional-componentdidupdate)
* [componentWillMount](routermanager.md#markdown-header-optional-componentwillmount)
* [componentWillReceiveProps](routermanager.md#markdown-header-optional-componentwillreceiveprops)
* [componentWillUnmount](routermanager.md#markdown-header-optional-componentwillunmount)
* [componentWillUpdate](routermanager.md#markdown-header-optional-componentwillupdate)
* [getSnapshotBeforeUpdate](routermanager.md#markdown-header-optional-getsnapshotbeforeupdate)
* [render](routermanager.md#markdown-header-render)
* [shouldComponentUpdate](routermanager.md#markdown-header-optional-shouldcomponentupdate)

## Constructors

### <a id="markdown-header-constructor" name="markdown-header-constructor"></a>  constructor

\+ **new RouterManager**(`props`: [Props](../README.md#markdown-header-props), `context?`: any): *[RouterManager](routermanager.md)*

*Inherited from [RouterManager](routermanager.md).[constructor](routermanager.md#markdown-header-constructor)*

**`deprecated`** 

**`see`** https://reactjs.org/docs/legacy-context.html

**Parameters:**

Name | Type |
------ | ------ |
`props` | [Props](../README.md#markdown-header-props) |
`context?` | any |

**Returns:** *[RouterManager](routermanager.md)*

## Properties

### <a id="markdown-header-context" name="markdown-header-context"></a>  context

• **context**: *any*

*Inherited from [RouterManager](routermanager.md).[context](routermanager.md#markdown-header-context)*

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

___

### <a id="markdown-header-previouspathname" name="markdown-header-previouspathname"></a>  previousPathname

• **previousPathname**: *string*

Сохранённое значение пути в адресе страницы. Используется для того, чтобы
реагировать конкретно на изменение пути, а не адреса в целом.

___

### <a id="markdown-header-refs" name="markdown-header-refs"></a>  refs

• **refs**: *object*

*Inherited from [RouterManager](routermanager.md).[refs](routermanager.md#markdown-header-refs)*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

* \[ **key**: *string*\]: ReactInstance

___

### <a id="markdown-header-static-optional-contexttype" name="markdown-header-static-optional-contexttype"></a> `Static` `Optional` contextType

▪ **contextType**? : *Context‹any›*

*Inherited from [RouterManager](routermanager.md).[contextType](routermanager.md#markdown-header-static-optional-contexttype)*

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

## Accessors

### <a id="markdown-header-push" name="markdown-header-push"></a>  push

• **get push**(): *undefined | false | true*

Указывает, что при перенаправлении в текущем цикле переотрисовки нужно
сделать запись в браузерной истории. Если перенаправление не нужно,
свойство равно undefined.

**Returns:** *undefined | false | true*

___

### <a id="markdown-header-redirect" name="markdown-header-redirect"></a>  redirect

• **get redirect**(): *undefined | string*

Содержит адрес, на который следует выполнить перенаправление в текущем
цикле переотрисовки. Если перенаправление не нужно, свойство равно
undefined.

**Returns:** *undefined | string*

## Methods

### <a id="markdown-header-optional-unsafe_componentwillmount" name="markdown-header-optional-unsafe_componentwillmount"></a> `Optional` UNSAFE_componentWillMount

▸ **UNSAFE_componentWillMount**(): *void*

*Inherited from [RouterManager](routermanager.md).[UNSAFE_componentWillMount](routermanager.md#markdown-header-optional-unsafe_componentwillmount)*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### <a id="markdown-header-optional-unsafe_componentwillreceiveprops" name="markdown-header-optional-unsafe_componentwillreceiveprops"></a> `Optional` UNSAFE_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `nextContext`: any): *void*

*Inherited from [RouterManager](routermanager.md).[UNSAFE_componentWillReceiveProps](routermanager.md#markdown-header-optional-unsafe_componentwillreceiveprops)*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`nextContext` | any |

**Returns:** *void*

___

### <a id="markdown-header-optional-unsafe_componentwillupdate" name="markdown-header-optional-unsafe_componentwillupdate"></a> `Optional` UNSAFE_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `nextState`: Readonly‹S›, `nextContext`: any): *void*

*Inherited from [RouterManager](routermanager.md).[UNSAFE_componentWillUpdate](routermanager.md#markdown-header-optional-unsafe_componentwillupdate)*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *void*

___

### <a id="markdown-header-optional-componentdidcatch" name="markdown-header-optional-componentdidcatch"></a> `Optional` componentDidCatch

▸ **componentDidCatch**(`error`: Error, `errorInfo`: ErrorInfo): *void*

*Inherited from [RouterManager](routermanager.md).[componentDidCatch](routermanager.md#markdown-header-optional-componentdidcatch)*

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error |
`errorInfo` | ErrorInfo |

**Returns:** *void*

___

### <a id="markdown-header-optional-componentdidmount" name="markdown-header-optional-componentdidmount"></a> `Optional` componentDidMount

▸ **componentDidMount**(): *void*

*Inherited from [RouterManager](routermanager.md).[componentDidMount](routermanager.md#markdown-header-optional-componentdidmount)*

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

___

### <a id="markdown-header-optional-componentdidupdate" name="markdown-header-optional-componentdidupdate"></a> `Optional` componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `prevState`: Readonly‹S›, `snapshot?`: SS): *void*

*Inherited from [RouterManager](routermanager.md).[componentDidUpdate](routermanager.md#markdown-header-optional-componentdidupdate)*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

**Parameters:**

Name | Type |
------ | ------ |
`prevProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`prevState` | Readonly‹S› |
`snapshot?` | SS |

**Returns:** *void*

___

### <a id="markdown-header-optional-componentwillmount" name="markdown-header-optional-componentwillmount"></a> `Optional` componentWillMount

▸ **componentWillMount**(): *void*

*Inherited from [RouterManager](routermanager.md).[componentWillMount](routermanager.md#markdown-header-optional-componentwillmount)*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### <a id="markdown-header-optional-componentwillreceiveprops" name="markdown-header-optional-componentwillreceiveprops"></a> `Optional` componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `nextContext`: any): *void*

*Inherited from [RouterManager](routermanager.md).[componentWillReceiveProps](routermanager.md#markdown-header-optional-componentwillreceiveprops)*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`nextContext` | any |

**Returns:** *void*

___

### <a id="markdown-header-optional-componentwillunmount" name="markdown-header-optional-componentwillunmount"></a> `Optional` componentWillUnmount

▸ **componentWillUnmount**(): *void*

*Inherited from [RouterManager](routermanager.md).[componentWillUnmount](routermanager.md#markdown-header-optional-componentwillunmount)*

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** *void*

___

### <a id="markdown-header-optional-componentwillupdate" name="markdown-header-optional-componentwillupdate"></a> `Optional` componentWillUpdate

▸ **componentWillUpdate**(`nextProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `nextState`: Readonly‹S›, `nextContext`: any): *void*

*Inherited from [RouterManager](routermanager.md).[componentWillUpdate](routermanager.md#markdown-header-optional-componentwillupdate)*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *void*

___

### <a id="markdown-header-optional-getsnapshotbeforeupdate" name="markdown-header-optional-getsnapshotbeforeupdate"></a> `Optional` getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `prevState`: Readonly‹S›): *SS | null*

*Inherited from [RouterManager](routermanager.md).[getSnapshotBeforeUpdate](routermanager.md#markdown-header-optional-getsnapshotbeforeupdate)*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

**Parameters:**

Name | Type |
------ | ------ |
`prevProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`prevState` | Readonly‹S› |

**Returns:** *SS | null*

___

### <a id="markdown-header-render" name="markdown-header-render"></a>  render

▸ **render**(): *null | Element‹›*

**`inheritdoc`** 

**Returns:** *null | Element‹›*

___

### <a id="markdown-header-optional-shouldcomponentupdate" name="markdown-header-optional-shouldcomponentupdate"></a> `Optional` shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: Readonly‹[Props](../README.md#markdown-header-props)›, `nextState`: Readonly‹S›, `nextContext`: any): *boolean*

*Inherited from [RouterManager](routermanager.md).[shouldComponentUpdate](routermanager.md#markdown-header-optional-shouldcomponentupdate)*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../README.md#markdown-header-props)› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *boolean*
