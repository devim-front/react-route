[@devim-front/react-route](../README.md) › [RouterState](routerstate.md)

# Class: RouterState

Состояние роутера при использования его во время Server Side Rendering.
Экземпляр данного класса помещается в свойство <Router state={} /> при
отрисовке приложения на сервере, и по её завершеню
будет содержать HTTP-статус ответа сервера и адрес страницы, куда должен
быть перенаправлен пользователь (если во время отрисовки возникло
перенаправление). Также состояние роутера может быть использовано для
рендера приложения с асинхронной подгрузкой данных.

## Hierarchy

* **RouterState**

## Index

### Properties

* [isRendered](routerstate.md#markdown-header-isrendered)

### Accessors

* [isNotFound](routerstate.md#markdown-header-isnotfound)
* [isNotRendered](routerstate.md#markdown-header-isnotrendered)
* [isOk](routerstate.md#markdown-header-isok)
* [isRedirect](routerstate.md#markdown-header-isredirect)
* [redirectUrl](routerstate.md#markdown-header-redirecturl)
* [status](routerstate.md#markdown-header-status)

### Methods

* [next](routerstate.md#markdown-header-next)

## Properties

### <a id="markdown-header-isrendered" name="markdown-header-isrendered"></a>  isRendered

• **isRendered**: *boolean* = false

Указывает, что приложение завершило свой цикл отрисовок.

## Accessors

### <a id="markdown-header-isnotfound" name="markdown-header-isnotfound"></a>  isNotFound

• **get isNotFound**(): *boolean*

Указывает, что приложение не нашло обработчика для указанной страницы (
иными словами, клиенту должна быть показана страница 404).

**Returns:** *boolean*

___

### <a id="markdown-header-isnotrendered" name="markdown-header-isnotrendered"></a>  isNotRendered

• **get isNotRendered**(): *boolean*

Указывает, что приложению требуется повторная отрисовка, так как цикл
изменения его состояний ещё не завершен.

**Returns:** *boolean*

___

### <a id="markdown-header-isok" name="markdown-header-isok"></a>  isOk

• **get isOk**(): *boolean*

Указывает, что приложение вернуло статус 200 во время рендера (то есть,
обработчик для страницы нашёлся, и не возникло перенаправлений на другие
страницы).

**Returns:** *boolean*

___

### <a id="markdown-header-isredirect" name="markdown-header-isredirect"></a>  isRedirect

• **get isRedirect**(): *boolean*

Указывает, что во время рендера приложение сгенерировало перенаправление
на другую страницу.

**Returns:** *boolean*

___

### <a id="markdown-header-redirecturl" name="markdown-header-redirecturl"></a>  redirectUrl

• **get redirectUrl**(): *undefined | string*

Адрес страницы, куда должен быть перенаправлен пользователь, если
приложение сгенерировало перенаправление во время рендера.

**Returns:** *undefined | string*

___

### <a id="markdown-header-status" name="markdown-header-status"></a>  status

• **get status**(): *number*

Код ответа HTTP.

**Returns:** *number*

## Methods

### <a id="markdown-header-next" name="markdown-header-next"></a>  next

▸ **next**(): *Promise‹void›*

Возвращает обещание, после разрешения которого нужно произвести очередной
рендер приложения, так как его состояние изменилось.

**Returns:** *Promise‹void›*
