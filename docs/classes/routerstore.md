[@devim-front/react-route](../README.md) › [RouterStore](routerstore.md)

# Class: RouterStore ‹**E**›

Хранилище состояния маршрутизатора.

## Type parameters

▪ **E**: *StoreEvents*

## Hierarchy

* LazyStore

  ↳ **RouterStore**

## Index

### Constructors

* [constructor](routerstore.md#markdown-header-constructor)

### Properties

* [instance](routerstore.md#markdown-header-static-protected-instance)

### Accessors

* [href](routerstore.md#markdown-header-href)
* [isExists](routerstore.md#markdown-header-static-protected-isexists)

### Methods

* [dispose](routerstore.md#markdown-header-dispose)
* [emit](routerstore.md#markdown-header-protected-emit)
* [off](routerstore.md#markdown-header-off)
* [on](routerstore.md#markdown-header-on)
* [setHref](routerstore.md#markdown-header-sethref)
* [create](routerstore.md#markdown-header-static-protected-create)
* [delete](routerstore.md#markdown-header-static-delete)
* [get](routerstore.md#markdown-header-static-get)
* [init](routerstore.md#markdown-header-static-init)

## Constructors

### <a id="markdown-header-constructor" name="markdown-header-constructor"></a>  constructor

\+ **new RouterStore**(...`_args`: any[]): *[RouterStore](routerstore.md)*

*Inherited from [RouterStore](routerstore.md).[constructor](routerstore.md#markdown-header-constructor)*

Создает экземпляр сервиса. Получить созданный экземпляр можно с помощью
статического метода get, вызов конструктора напрямую приводит к ошибке.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`..._args` | any[] | Аргументы, полученные из метода create.  |

**Returns:** *[RouterStore](routerstore.md)*

## Properties

### <a id="markdown-header-static-protected-instance" name="markdown-header-static-protected-instance"></a> `Static` `Protected` instance

▪ **instance**: *any*

*Inherited from [RouterStore](routerstore.md).[instance](routerstore.md#markdown-header-static-protected-instance)*

Экземпляр сервиса.

## Accessors

### <a id="markdown-header-href" name="markdown-header-href"></a>  href

• **get href**(): *string*

Адрес текущей страницы.

**Returns:** *string*

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

▸ **emit**‹**T**›(`event`: T, ...`args`: Parameters‹E[T]›): *void*

*Inherited from [RouterStore](routerstore.md).[emit](routerstore.md#markdown-header-protected-emit)*

Вызывает указанное событие, передавая аргументы в его обработчики.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`...args` | Parameters‹E[T]› | Аргументы, передаваемые в обработчики.  |

**Returns:** *void*

___

### <a id="markdown-header-off" name="markdown-header-off"></a>  off

▸ **off**‹**T**›(`event`: T, `handler`: E[T]): *void*

*Inherited from [RouterStore](routerstore.md).[off](routerstore.md#markdown-header-off)*

Удаляет указанный обработчик события.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | E[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-on" name="markdown-header-on"></a>  on

▸ **on**‹**T**›(`event`: T, `handler`: E[T]): *void*

*Inherited from [RouterStore](routerstore.md).[on](routerstore.md#markdown-header-on)*

Добавляет обработчик указанному событию.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | E[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-sethref" name="markdown-header-sethref"></a>  setHref

▸ **setHref**(`href`: string): *void*

Задает текущий адрес страницы.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`href` | string | Новый адрес страницы.  |

**Returns:** *void*

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
