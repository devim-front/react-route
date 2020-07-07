import { Component } from 'react';
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
class RouterManager extends Component<Props> {
  /**
   * Сохранённое значение пути в адресе страницы. Используется для того, чтобы
   * реагировать конкретно на изменение пути, а не адреса в целом.
   */
  previousPathname: string;

  /**
   * @inheritdoc
   */
  public render() {
    const { location } = this.props;
    const { pathname } = location;

    if (this.previousPathname !== pathname) {
      this.previousPathname = pathname;
      RouterStore.get().setHref(pathname);
    }

    return null;
  }
}

const component = withRouter(RouterManager);
export { component as RouterManager };
