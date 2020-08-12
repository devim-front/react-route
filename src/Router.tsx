import React, { FC, ComponentProps, ComponentType } from 'react';
import { BrowserRouter, StaticRouter, HashRouter } from 'react-router-dom';

import { RouterManager } from './RouterManager';
import { RouterState } from './RouterState';
import { RouterStore } from './RouterStore';
import { RouterRoot } from './RouterRoot';
import { StaticContext } from 'StaticContext';

/**
 * Свойства статического роутера.
 */
type StaticProps = ComponentProps<typeof StaticRouter>;

/**
 * Свойства компонента.
 */
type Props = {
  /**
   * Путь к корню сайта. Данное свойство используется, если корень сайта
   * расположен не по обычному адресу "/", а в подкаталоге (например,
   * "/en", "/account" и тому подобное).
   */
  basename?: string;

  /**
   * Адрес страницы, которая должна быть отрендерена. Используется только
   * при запуске приложения в NodeJS; в браузере же значение берётся из адресной
   * строки.
   */
  url?: StaticProps['location'];

  /**
   * Состояние роутера при запуске на NodeJS. После завершения рендера в этом
   * объекте будут находится HTTP-статус ответа, адрес страницы, на которую
   * должен будет произойти редирект и тому подобное.
   */
  state?: RouterState;

  /**
   * Указывает, что при запуске этого компонента в браузере, в качестве
   * контекста маршрутизатора следует использовать не BrowserRouter, а
   * HashRouter.
   *
   * @see https://reactrouter.com/web/api/HashRouter
   */
  hash?: boolean;

  /**
   * Корневой компонент приложения, использующего маршрутизацию.
   */
  application?: ComponentType<any>;

  /**
   * Компонент, представляющий страницу "404 Not Found".
   */
  notFound?: ComponentType<any>;
};

/**
 * Помещает указанный в свойстве "application" компонент в контекст
 * маршрутизатора и отображает его.
 *
 * Маршрутизатор способен определять, в какой среде выполнения он запустился. На
 * NodeJS он использует StaticRouter, в браузере - либо BrowserRouter, либо
 * HashRouter (в зависимости от значения свойства "hash").
 */
export const Router: FC<Props> = ({
  url,
  children,
  state = new RouterState(),
  hash = false,
  application,
  notFound,
  ...props
}) => {
  const isServer = typeof window === 'undefined';

  const content = (
    <>
      <RouterManager />
      <RouterRoot application={application} notFound={notFound} />
    </>
  );

  if (isServer) {
    const context: StaticContext = {
      statusCode: 200,
    };

    state.setContext(context);
    RouterStore.get().setState(state);

    return (
      <StaticRouter {...props} context={context} location={url}>
        {content}
      </StaticRouter>
    );
  }

  return hash ? (
    <HashRouter {...props}>{content}</HashRouter>
  ) : (
    <BrowserRouter {...props}>{content}</BrowserRouter>
  );
};
