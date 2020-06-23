import { Component, createElement } from 'react';

import { Handler } from './Handler';

/**
 * Оборачивает компонент, который обслуживает маршрут, в обёртку, которая
 * изолирует его от проброса ненужных свойств.
 *
 * @param target Компонент, который обслуживает маршрут.
 */
export const withRouteWrapper = (target: Handler) =>
  class WithRouteHandler extends Component {
    /**
     * @inheritdoc
     */
    public static displayName = `WithRouteHandler(${
      target.displayName || target.name
    })`;

    /**
     * @inheritdoc
     */
    public render() {
      return createElement(target);
    }
  };
