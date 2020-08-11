import { Component } from 'react';

import { RouterStore } from './RouterStore';

/**
 * Указывает, что данный адрес не найден.
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
