# Devim Front: React Route

Содержит сущности для роутинга в React.

## Установка

Подключите этот пакет в зависимости:

```bash
npm i -S @devim-front/react-route
```

## Пример использования

Объявление простого маршрута:

```typescript
import loadable from '@loadable/component';
import React from 'react';
import { Route } from '@devim-front/react-route';

export class HomeRoute extends Route {
  public path = '/';
  public component = loadable(() => import('../pages/HomePage'));
  public exact = true;
}
```

Объявление маршрута с параметрами:

```typescript
import loadable from '@loadable/component';
import React from 'react';
import { Route } from '@devim-front/react-route';

type Params = {
  name: string;
};

export class ArticleRoute extends Route<Params> {
  public path = '/:name';
  public component = loadable(() => import('../pages/ArticlePage'));
  public exact = true;
}
```

_Прочие примеры в стадии наполнения._

## API

Документация находится [в этом разделе](https://github.com/devim-front/react-route/tree/master/docs).
