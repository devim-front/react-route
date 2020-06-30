import { LazyStore } from '@devim-front/store';
import { observable, computed, action } from 'mobx';

/**
 * Хранилище состояния маршрутизатора.
 */
export class RouterStore extends LazyStore {
  /**
   * Сохранённое значение текущего адреса страницы. Добавлено для того, чтобы
   * нельзя было установить это значение извне класса.
   */
  @observable
  private hrefValue: string;

  /**
   * Адрес текущей страницы.
   */
  @computed
  public get href() {
    return this.hrefValue;
  }

  /**
   * Задает текущий адрес страницы.
   *
   * @param href Новый адрес страницы.
   */
  @action
  public setHref(href: string) {
    this.hrefValue = href;
  }
}
