import { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RouterStore } from './RouterStore';

/**
 * Свойства компонента.
 */
type Props = RouteComponentProps;

/**
 * Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
 * библиотеки react-router-dom.
 */
const RouterScope: FC<Props> = ({ location }) => {
  const { pathname } = location;
  RouterStore.get().setHref(pathname);
  return null;
};

const component = withRouter(RouterScope);
export { component as RouterScope };
