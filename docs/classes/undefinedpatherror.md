[@devim-front/react-route](../README.md) › [UndefinedPathError](undefinedpatherror.md)

# Class: UndefinedPathError

Возникает, когда у маршрута не задано свойство path, но в коде происходит
попытка его получить.

## Hierarchy

  ↳ [BaseError](baseerror.md)

  ↳ **UndefinedPathError**

## Index

### Constructors

* [constructor](undefinedpatherror.md#markdown-header-constructor)

## Constructors

### <a id="markdown-header-constructor" name="markdown-header-constructor"></a>  constructor

\+ **new UndefinedPathError**(`route`: string): *[UndefinedPathError](undefinedpatherror.md)*

*Overrides [BaseError](baseerror.md).[constructor](baseerror.md#markdown-header-constructor)*

Создает экземпляр ошибки для указанного класса.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | string | Название класса роута.  |

**Returns:** *[UndefinedPathError](undefinedpatherror.md)*
