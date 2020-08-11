import { Component, ComponentType, createElement } from 'react';
import { observer } from 'mobx-react';

import { RouterStore } from './RouterStore';

/**
 * Свойства компонента.
 */
type Props = {
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
 * Отображает корневой компонент приложения или страницу 404 в зависимости от
 * того, был ли обработан текущий адрес страницы одним из маршрутов, или нет.
 */
@observer
export class RouterRoot extends Component<Props> {
  /**
   * Отображает страницу 404.
   */
  private renderNotFound() {
    RouterStore.get().unsetNotFound();

    const { notFound } = this.props;
    return notFound ? createElement(notFound) : null;
  }

  /**
   * Отображает корневой элемент приложения.
   */
  private renderApplication() {
    const { application } = this.props;
    return application ? createElement(application) : null;
  }

  /**
   * @inheritdoc
   */
  public render() {
    const { isNotFound } = RouterStore.get();
    return isNotFound ? this.renderNotFound() : this.renderApplication();
  }
}
