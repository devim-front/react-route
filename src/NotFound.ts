import { Component } from 'react';

import { RouterStore } from './RouterStore';

/**
 * При вставке в Virual DOM указывает, что данный адрес страницы не обработан
 * ни одним маршрутом (иными словами, указывает роутеру отобразить страницу
 * 404).
 */
export class NotFound extends Component {
  /**
   * @inheritdoc
   */
  public render() {
    RouterStore.get().setNotFound();
    return null;
  }
}
