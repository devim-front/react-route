import React, { FC, PropsWithChildren, ComponentProps } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import { RouterScope } from './RouterScope';

/**
 * Свойства статического роутера.
 */
type StaticProps = ComponentProps<typeof StaticRouter>;

/**
 * Свойства компонента.
 */
type Props = PropsWithChildren<{
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
}>;

/**
 * Объявляет контект маршрутизации приложения. Данный компонент должен быть
 * подключён так, чтобы его рендер произошёл раньше, чем создаются экземпляры
 * маршрутов. Желательно подключать
 */
export const Router: FC<Props> = ({ url, context, children, ...props }) => {
  const isServer = typeof window === 'undefined';

  return isServer ? (
    <StaticRouter {...props} context={context} location={url}>
      <RouterScope />
      {children}
    </StaticRouter>
  ) : (
    <BrowserRouter {...props}>
      <RouterScope />
      {children}
    </BrowserRouter>
  );
};
