import React, { Component } from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import { RouterStore } from './RouterStore';
import { StaticContext } from './StaticContext';

/**
 * Свойства компонента.
 */
type Props = Omit<RouteComponentProps, 'staticContext'> & {
  /**
   * Статический контекст роутера при запуске приложения на NodeJS.
   */
  staticContext?: StaticContext;
};

/**
 * Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
 * библиотеки react-router-dom.
 */
@observer
class RouterManager extends Component<Props> {
  /**
   * Сохранённое значение пути в адресе страницы. Используется для того, чтобы
   * реагировать конкретно на изменение пути, а не адреса в целом.
   */
  previousPathname: string;

  /**
   * Возвращает элемент, который вызывает перенаправление на указанный адрес,
   * или генерирует перенаправление программно, если оно идёт на другой ресурс.
   *
   * @param redirect Адрес, на который должно произойти перенаправление.
   * @param push Указывает, следует ли делать запись в истории при этом
   * перенаправлении.
   */
  private renderRedirect(redirect: string, push: boolean) {
    RouterStore.get().unsetRedirect();
    return <Redirect to={redirect} push={push} />;
  }

  /**
   * @inheritdoc
   */
  public render() {
    const { redirect, push } = RouterStore.get();

    if (redirect != null) {
      return this.renderRedirect(redirect, push as boolean);
    }

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
