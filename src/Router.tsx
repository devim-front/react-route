import React, { FC, ComponentProps, ComponentType, createElement } from 'react';
import { BrowserRouter, StaticRouter, HashRouter } from 'react-router-dom';

import { RouterManager } from './RouterManager';

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
   * Мутабельный контекст роутера. Используется для того, чтобы передавать
   * информацию из компонентов React в серверную часть приложения при его
   * запуске на NodeJS. Следует поместить в это свойство пустой объект,
   * и после рендера приложения, в этот объект будут записаны дополнительные
   * свойства.
   */
  context?: StaticProps['context'];

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
   * Корневой компонент страницы, которая показывается в случае если адрес
   * страницы не обработан никем (иными словами, страница не найдена).
   */
  fallback?: ComponentType<any>;
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
  context,
  children,
  hash = false,
  application,
  fallback,
  ...props
}) => {
  const isServer = typeof window === 'undefined';

  const content = (
    <>
      <RouterManager />
      {application ? createElement(application) : null}
    </>
  );

  if (isServer) {
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
