# Devim Front: React Route

Содержит сущности для роутинга в React.

## Установка

Подключите этот пакет в зависимости:

```bash
npm i -S @devim-front/react-route
```

## Общие концепции

Библиотека представляет собой надстройку над [react-router-dom](https://reactrouter.com/web/guides/quick-start), призванную решить несколько распространённых проблем этого механизма.

### Маршрут

Центральным понятием библиотеки является маршрут. Маршрут - это [ленивое хранилище](https://github.com/devim-front/store#%D1%81%D0%B2%D1%8F%D0%B7%D1%8C-%D1%81-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0%D0%BC%D0%B8), призванное типизировать и унифицировать процесс маршрутизации в приложениях на react и [mobx](https://mobx.js.org/README.html).

В библиотеке `react-router-dom` за обработку адресов страниц отвечает компонент [Route](https://reactrouter.com/web/api/Route). Среди его свойств есть свойство [path](https://reactrouter.com/web/api/Route/path-string-string), которое представляет собой маску адреса страницы и [component](https://reactrouter.com/web/api/Route/component) - обработчик адреса, то есть компонент, который будет отображен, когда адрес страницы совпадает с маской. Этот подход дает большую степень свободы, но в больших проектах всплывают несколько проблем:

1. Когда в масках используются параметры (например, "id" в маске "/article/:id" - [см. документацию](https://reactrouter.com/web/api/Route/path-string-string)), в Typescript нет возможности покрыть их типами.

2. Библиотека способна сопоставить маску и адрес, но не предоставляет инструментов ни для генерации адресов по маске, ни для парсинга иных адресов, кроме текущего.

Маршрут из нашей библиотеки призван расширить функционал библиотеки react-router-dom, сохранив при этом совместимость с ней. Предполагается, что любому типовому адресу страницы соответствует собственный класс маршрута. Он выглядит приблизительно так:

```ts
// HomeRoute.ts
import { Route } from '@devim-front/react-route';

import { HomePage } from './HomePage';

export class HomeRoute extends Route {
  public path = '/';
  public component = HomePage;
}
```

В свойствах класса объявляется маска адреса этого маршрута и компонент, который будет его обрабатывать. Если маска нашего маршрута имеет параметры, то их следует объявить в generic маршрута:

```ts
// ArticleRoute.ts
import { Route } from '@devim-front/react-route';

import { ArticlePage } from './ArticlePage';

type Params = {
  id: string;
};

export class ArticleRoute extends Route<Params> {
  public path = '/article/:id';
  public component = ArticlePage;
}
```

Чтобы задействовать маршруты в приложении, используется метод `render`:

```tsx
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ArticleRoute } from './ArticleRoute';
import { HomeRoute } from './HomeRoute';

export const App = () => (
  <BrowserRouter>
    <Switch>
      {ArticleRoute.get().render()}
      {HomeRoute.get().render()}
    </Switch>
  </BrowserRouter>
);
```

Метод `render` возвращает элемент `Route` из библиотеки `react-router-dom`, присваивая ему свойства `path` и `component`. В нашем примере, если адрес страницы будет соответствовать маске из `ArticleRoute`, будет отображен компонент `ArticlePage`. Иначе - `HomePage`.

Если для генерации ссылок из масок маршрутов используется метод `href`. Сгенерируем ссылку на статью в нашем примере:

```ts
import { ArticleRoute } from './ArticleRoute';
const href = ArticleRoute.get().href({ id: '1' });
// -> /article/1
```

С помощью метода `parse` можно разбирать любые адреса:

```ts
const params = ArticleRoute.get().parse('/article/1');
// -> { id: '1' }
```

Проверка, соответствует ли адрес маршруту, выполняется методом `isMatch`:

```ts
const isMatch = ArticleRoute.get().isMatch('/article/2');
// -> true
```

### Получение параметов текущего адреса

Итак, допустим, мы объявили маршрут и задействовали его в приложении. Как нам теперь его использовать? В библиотеке `react-router-dom` предлагается HOC [withRouter](https://reactrouter.com/web/api/withRouter) или [коллекция хуков](https://reactrouter.com/web/api/Hooks). Этот подход имеет те же проблемы, которые мы описали выше: нет унификации и чёткой типизации.

Наш маршрут, являясь ленивым хранилищем, имеет observable-свойства `isActive` и `params`.

`isActive` - флаг, указывающий, совпадает ли текущий адрес с маршрутом. `params` - типизированная коллекция значений параметров, полученных при разборе текущего адреса по маске:

```tsx
// ArticlePage.tsx
import React from 'react';
import { observer } from 'mobx-react';

import { ArticleRoute } from './ArticleRoute';

export const ArticlePage = observer(() => {
  const { id } = ArticleRoute.get().params;
  return <h1>Here is article {id}</h1>;
});
```

Рекомендуется добавлять в класс маршрута computed-свойства, соответствующие параметрам:

```ts
// ArticleRoute.ts
import { Route } from '@devim-front/react-route';
import { computed } from 'mobx';

import { ArticlePage } from './ArticlePage';

type Params = {
  id: string;
};

export class ArticleRoute extends Route<Params> {
  public path = '/article/:id';
  public component = ArticlePage;

  @computed
  public get id() {
    return this.params.id;
  }
}
```

Тогда их применение становится проще:

```tsx
// ArticlePage.tsx
import React from 'react';
import { observer } from 'mobx-react';

import { ArticleRoute } from './ArticleRoute';

export const ArticlePage = observer(() => {
  const { id } = ArticleRoute.get();
  return <h1>Here is article {id}</h1>;
});
```

Чтобы механизм observable заработал, нужно связать его с `react-router-dom`. За это отвечает компонент маршрутизатора `Router`, предоставляемый нашей библиотекой. Но делает он далеко не только это.

### Маршрутизатор

Большинство react приложений строятся таким образом, чтобы работать не только в браузере, но и на NodeJS для Server Side Rendering. Библиотека `react-router-dom` предоставляет свои маршрутизаторы: `StaticRouter` для серверной части и `BrowserRouter` для клиентской. Мы решили объединить их в один компонент `Router`:

```tsx
// index.ts
import { Router } from '@devim-front/react-route';
import { render } from 'react-dom';

import { App } from './App';

render(<Router application={App} />, document.getElementById('root'));
```

Он сам определяет, в какой среде выполняется приложение, и использует соответствующий контекст. Он предоставляет унифицированный набор свойств, совместимый со всеми возможностями компонентов из `react-router-dom`.

Для работоспособности всех фич библиотеки мы настоятельно рекомендуем использовать компонент `Router` вместо стандартных средств `react-router-dom`.

## API

Документация находится [в этом разделе](https://github.com/devim-front/react-route/tree/master/docs).
