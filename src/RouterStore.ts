import { LazyStore } from '@devim-front/store';
import { observable, action } from 'mobx';

import { RouterState } from './RouterState';

/**
 * Хранилище состояния маршрутизатора.
 *
 * @internal
 */
export class RouterStore extends LazyStore {
  /**
   * Текущий адрес страницы.
   */
  @observable
  public href: string;

  /**
   * Задает текущий адрес страницы.
   *
   * @param href Новый адрес страницы.
   */
  @action
  public setHref(href: string) {
    this.href = href;
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
   * Указывает, что пользователю должна быть показана страница 404.
   */
  @observable
  public isNotFound: boolean = false;

  /**
   * Состояние роутера.
   */
  private state: RouterState;

  /**
   * Задает состояние роутера.
   *
   * @param state Состояние.
   */
  public setState(state: RouterState) {
    this.state = state;
  }

  /**
   * Задает адрес страницы, на которую нужно перейти в следующем цикле отрисовки
   * приложения.
   *
   * @param href Адрес страницы.
   * @param push Указывает, следует ли делать запись в браузерной истории
   * об этом перенаправлении.
   */
  @action
  public setRedirect(href: string, push: boolean = false) {
    this.redirect = href;
    this.push = push;

    if (this.state) {
      this.state.addPromise(Promise.resolve());
    }
  }

  /**
   * Сбрасывает параметры перенаправления в состояние по умолчанию.
   */
  @action
  public unsetRedirect() {
    this.redirect = undefined;
    this.push = undefined;
  }

  /**
   * Указывает, что пользователю должна быть показана страница 404.
   */
  @action
  public setNotFound() {
    this.isNotFound = true;

    if (this.state) {
      this.state.addPromise(Promise.resolve());
    }
  }

  /**
   * Сбрасывает значение флага isNotFound в false.
   */
  @action
  public unsetNotFound() {
    this.isNotFound = false;
  }
}
