import { LazyStore } from '@devim-front/store';
import { observable, computed, action } from 'mobx';

/**
 * Хранилище состояния маршрутизатора.
 *
 * @internal
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

  /**
   * Адрес, на который должен быть перенаправлен пользователь в данный момент.
   * Если перенаправления нет, то undefined.
   */
  @observable
  public redirect: string | undefined;

  /**
   * Показывает, следует ли делать запись в истории браузера при перенаправлении
   * на адрес, указанный в свойстве "redirect".
   */
  @observable
  public push: boolean | undefined;

  /**
   * Задает адрес страницы, на которую нужно перейти в следующем цикле отрисовки
   * приложения.
   *
   * @param href Адрес страницы.
   * @param push Указывает, следует ли делать запись в браузерной истории
   * об этом перенаправлении.
   */
  @action
  public setRedirect(href: string | undefined, push: boolean = false) {
    if (href == null) {
      this.redirect = undefined;
      this.push = undefined;

      return;
    }

    this.redirect = href;
    this.push = push;
  }
}
