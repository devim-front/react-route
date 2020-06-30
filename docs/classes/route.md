[@devim-front/react-route](../README.md) › [Route](route.md)

# Class: Route ‹**P**›

Представляет маршрут приложения.

## Type parameters

▪ **P**: *[Params](../README.md#markdown-header-params)*

## Hierarchy

* LazyStore‹[Events](../interfaces/events.md)›

  ↳ **Route**

## Index

### Constructors

* [constructor](route.md#markdown-header-constructor)

### Properties

* [component](route.md#markdown-header-component)
* [exact](route.md#markdown-header-exact)
* [path](route.md#markdown-header-path)
* [instance](route.md#markdown-header-static-protected-instance)

### Accessors

* [isActive](route.md#markdown-header-isactive)
* [params](route.md#markdown-header-params)
* [isExists](route.md#markdown-header-static-protected-isexists)

### Methods

* [dispose](route.md#markdown-header-dispose)
* [emit](route.md#markdown-header-protected-emit)
* [href](route.md#markdown-header-href)
* [isMatch](route.md#markdown-header-ismatch)
* [off](route.md#markdown-header-off)
* [on](route.md#markdown-header-on)
* [parse](route.md#markdown-header-parse)
* [redirect](route.md#markdown-header-redirect)
* [render](route.md#markdown-header-render)
* [replace](route.md#markdown-header-replace)
* [create](route.md#markdown-header-static-protected-create)
* [delete](route.md#markdown-header-static-delete)
* [get](route.md#markdown-header-static-get)
* [init](route.md#markdown-header-static-init)

## Constructors

### <a id="markdown-header-constructor" name="markdown-header-constructor"></a>  constructor

\+ **new Route**(...`_args`: any[]): *[Route](route.md)*

*Inherited from [RouterStore](routerstore.md).[constructor](routerstore.md#markdown-header-constructor)*

Создает экземпляр сервиса. Получить созданный экземпляр можно с помощью
статического метода get, вызов конструктора напрямую приводит к ошибке.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`..._args` | any[] | Аргументы, полученные из метода create.  |

**Returns:** *[Route](route.md)*

## Properties

### <a id="markdown-header-component" name="markdown-header-component"></a>  component

• **component**: *[Handler](../README.md#markdown-header-handler)*

Компонент, который обрабатывает маршрут. В отличии от свойства "component"
компонента Route из библиотеки react-router, в указанный компонент
не передаются свойства.

**`see`** https://reacttraining.com/react-router/web/api/Route/component

___

### <a id="markdown-header-exact" name="markdown-header-exact"></a>  exact

• **exact**: *boolean* = false

True, если адрес страницы должен соответствовать маске в точности.
Подробнее о поведении этого флага можно прочитать в документации
react-router.

**`see`** https://reacttraining.com/react-router/web/api/Route/exact-bool

___

### <a id="markdown-header-path" name="markdown-header-path"></a>  path

• **path**: *string*

Маска адреса страницы, которой соответствует маршрут. Данное свойство
аналогично свойству "path" компонента Route из библиотеки react-router.

**`see`** https://reacttraining.com/react-router/web/api/Route/path-string-string

___

### <a id="markdown-header-static-protected-instance" name="markdown-header-static-protected-instance"></a> `Static` `Protected` instance

▪ **instance**: *any*

*Inherited from [RouterStore](routerstore.md).[instance](routerstore.md#markdown-header-static-protected-instance)*

Экземпляр сервиса.

## Accessors

### <a id="markdown-header-isactive" name="markdown-header-isactive"></a>  isActive

• **get isActive**(): *boolean*

Указывает, что текущий адрес страницы соответствует данному маршруту.

**Returns:** *boolean*

___

### <a id="markdown-header-params" name="markdown-header-params"></a>  params

• **get params**(): *P | object*

Коллекция значений параметров маски данного маршрута или undefined если
либо текущий адрес страницы не совпадает с маской, либо в маске нет
именованных параметров.

**Returns:** *P | object*

___

### <a id="markdown-header-static-protected-isexists" name="markdown-header-static-protected-isexists"></a> `Static` `Protected` isExists

• **get isExists**(): *boolean*

*Inherited from [RouterStore](routerstore.md).[isExists](routerstore.md#markdown-header-static-protected-isexists)*

Указывает, что экземпляр данного класса уже был создан.

**Returns:** *boolean*

## Methods

### <a id="markdown-header-dispose" name="markdown-header-dispose"></a>  dispose

▸ **dispose**(): *void*

*Inherited from [RouterStore](routerstore.md).[dispose](routerstore.md#markdown-header-dispose)*

*Overrides void*

Освобождает все занятые экземпляром сервиса ресурсы, подготавливая его к
удалению. Для строго или ленивого сервиса прямой вызов этого метода
запрещён и приведет к ошибке, поскольку это может создать неоднозначность
в коде. Используйте вместо него статический метод delete.

**Returns:** *void*

___

### <a id="markdown-header-protected-emit" name="markdown-header-protected-emit"></a> `Protected` emit

▸ **emit**‹**T**›(`event`: T, ...`args`: Parameters‹Events[T]›): *void*

*Inherited from [RouterStore](routerstore.md).[emit](routerstore.md#markdown-header-protected-emit)*

Вызывает указанное событие, передавая аргументы в его обработчики.

**Type parameters:**

▪ **T**: *keyof Events*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`...args` | Parameters‹Events[T]› | Аргументы, передаваемые в обработчики.  |

**Returns:** *void*

___

### <a id="markdown-header-href" name="markdown-header-href"></a>  href

▸ **href**(`params`: P): *string*

Возвращает адрес страницы, подставляя указанные параметры в шаблон
маршрута.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | P | Параметры подстановки маршрута.  |

**Returns:** *string*

___

### <a id="markdown-header-ismatch" name="markdown-header-ismatch"></a>  isMatch

▸ **isMatch**(`href`: string): *boolean*

Возвращает true, если указанный адрес страницы совпадает с маской данного
маршрута.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`href` | string | Адрес страницы.  |

**Returns:** *boolean*

___

### <a id="markdown-header-off" name="markdown-header-off"></a>  off

▸ **off**‹**T**›(`event`: T, `handler`: Events[T]): *void*

*Inherited from [RouterStore](routerstore.md).[off](routerstore.md#markdown-header-off)*

Удаляет указанный обработчик события.

**Type parameters:**

▪ **T**: *keyof Events*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | Events[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-on" name="markdown-header-on"></a>  on

▸ **on**‹**T**›(`event`: T, `handler`: Events[T]): *void*

*Inherited from [RouterStore](routerstore.md).[on](routerstore.md#markdown-header-on)*

Добавляет обработчик указанному событию.

**Type parameters:**

▪ **T**: *keyof Events*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | Events[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-parse" name="markdown-header-parse"></a>  parse

▸ **parse**(`href`: string, `isThrow`: boolean): *undefined | P*

Получает значения параметров маски данного машрута из указанного адреса
или выбрасывает исключение, если адрес не соответствует маске. Если
в маске нет именованных параметров, возвращает undefined.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`href` | string | - | Адрес страницы. |
`isThrow` | boolean | true | Указывает, следует ли выбрасывать исключение, если указанный адрес страницы не соответствует маршруту. Если false, то в случае несоответствия адреса метод вернет undefined. По умолчанию true.  |

**Returns:** *undefined | P*

___

### <a id="markdown-header-redirect" name="markdown-header-redirect"></a>  redirect

▸ **redirect**(`params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на указанный маршрут
в любом случае.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса страницы.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **redirect**(`from`: string, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает указанной маской.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Маска адреса страницы. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **redirect**(`from`: string, `exact`: boolean, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает указанной маской.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Маска адреса страницы. |
`exact` | boolean | Значение свойства "exact" элемента Redirect. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **redirect**(`from`: [Route](route.md)‹any›, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает с указанным маршрутом.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | [Route](route.md)‹any› | Маршрут. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **redirect**(`from`: [Route](route.md)‹any›, `exact`: boolean, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает с указанным маршрутом.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | [Route](route.md)‹any› | Маршрут. |
`exact` | boolean | Значение флага "exact", переопределяющее аналогичный флаг у переданного в "from" маршрута. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

___

### <a id="markdown-header-render" name="markdown-header-render"></a>  render

▸ **render**(): *ComponentElement‹RouteProps, Route‹RouteProps››*

Создает и возвращает элемент Route из библиотеки react-router с
предустановленными значениями свойств component, path и exact.

**`see`** https://reacttraining.com/react-router/web/api/Route

**Returns:** *ComponentElement‹RouteProps, Route‹RouteProps››*

___

### <a id="markdown-header-replace" name="markdown-header-replace"></a>  replace

▸ **replace**(`params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на указанный маршрут
в любом случае. Переправление происходит без записи в браузерной истории.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса страницы.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **replace**(`from`: string, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает указанной маской. Переправление
происходит без записи в браузерной истории.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Маска адреса страницы. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **replace**(`from`: string, `exact`: boolean, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает указанной маской. Переправление
происходит без записи в браузерной истории.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Маска адреса страницы. |
`exact` | boolean | Значение свойства "exact" элемента Redirect. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **replace**(`from`: [Route](route.md)‹any›, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает с указанным маршрутом. Переправление
происходит без записи в браузерной истории.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | [Route](route.md)‹any› | Маршрут. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

▸ **replace**(`from`: [Route](route.md)‹any›, `exact`: boolean, `params`: P): *[GoTo](../README.md#markdown-header-goto)*

Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
таким образом, чтобы вызывать перенаправление на данный маршрут лишь
тогда, когда адрес страницы совпадает с указанным маршрутом. Переправление
происходит без записи в браузерной истории.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | [Route](route.md)‹any› | Маршрут. |
`exact` | boolean | Значение флага "exact", переопределяющее аналогичный флаг у переданного в "from" маршрута. |
`params` | P | Коллекция именованных параметров для подстановки в маску адреса данного маршрута.  |

**Returns:** *[GoTo](../README.md#markdown-header-goto)*

___

### <a id="markdown-header-static-protected-create" name="markdown-header-static-protected-create"></a> `Static` `Protected` create

▸ **create**‹**T**›(...`args`: ConstructorParameters‹T›): *void*

*Inherited from [RouterStore](routerstore.md).[create](routerstore.md#markdown-header-static-protected-create)*

Создает экземпляр сервиса и сохраняет его. Для создания экземпляра класса
следует использовать именно его; вызов оператора new приводит к ошибке.

**Type parameters:**

▪ **T**: *typeof SingleService*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...args` | ConstructorParameters‹T› | Аргументы конструктора.  |

**Returns:** *void*

___

### <a id="markdown-header-static-delete" name="markdown-header-static-delete"></a> `Static` delete

▸ **delete**(): *void*

*Inherited from [RouterStore](routerstore.md).[delete](routerstore.md#markdown-header-static-delete)*

Удаляет существующий экземпляр сервиса, освобождая все занятые им ресурсы.

**Returns:** *void*

___

### <a id="markdown-header-static-get" name="markdown-header-static-get"></a> `Static` get

▸ **get**‹**T**›(`this`: T): *InstanceType‹T›*

*Inherited from [RouterStore](routerstore.md).[get](routerstore.md#markdown-header-static-get)*

*Overrides void*

Возвращает экземпляр сервиса. Если экземпляр сервиса ещё не был создан,
создаёт его.

**Type parameters:**

▪ **T**: *typeof SingleService*

**Parameters:**

Name | Type |
------ | ------ |
`this` | T |

**Returns:** *InstanceType‹T›*

___

### <a id="markdown-header-static-init" name="markdown-header-static-init"></a> `Static` init

▸ **init**(): *void*

*Inherited from [RouterStore](routerstore.md).[init](routerstore.md#markdown-header-static-init)*

*Overrides void*

Инициализирует экземпляр сервиса. В случае с ленивым сервисом, метод
просто создаёт экземпляр класса, если тот не был создан ранее. Повторные
вызовы init его не пересоздают. Чтобы пересоздать экземпляр принудительно,
используйте метод delete, а затем init.

**Returns:** *void*
