import React, { Component } from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import { RouterStore } from './RouterStore';

/**
 * Свойства компонента.
 */
type Props = RouteComponentProps;

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
   * Содержит адрес, на который следует выполнить перенаправление в текущем
   * цикле переотрисовки. Если перенаправление не нужно, свойство равно
   * undefined.
   */
  @computed
  get redirect() {
    return RouterStore.get().redirect;
  }

  /**
   * Указывает, что при перенаправлении в текущем цикле переотрисовки нужно
   * сделать запись в браузерной истории. Если перенаправление не нужно,
   * свойство равно undefined.
   */
  @computed
  get push() {
    return RouterStore.get().push;
  }

  /**
   * @inheritdoc
   */
  public render() {
    const { location } = this.props;
    const { pathname } = location;

    const { redirect, push } = this;

    if (redirect != null) {
      RouterStore.get().setRedirect(undefined);
      return <Redirect to={redirect} push={push} />;
    }

    if (this.previousPathname !== pathname) {
      this.previousPathname = pathname;
      RouterStore.get().setHref(pathname);
    }

    return null;
  }
}

const component = withRouter(RouterManager);
export { component as RouterManager };
