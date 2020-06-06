import { LazyService } from '@devim-front/service';
import { ComponentType, createElement } from 'react';
import { compile } from 'path-to-regexp';
import {
  Redirect as RedirectComponent,
  Route as RouteComponent,
} from 'react-router-dom';

import { UndefinedComponentError } from './UndefinedComponentError';
import { UndefinedPathError } from './UndefinedPathError';
import { Events } from './Events';
import { Params } from './Params';

/**
 * Функция компиляции адреса страницы из шаблона маршрута.
 */
type Compile = ReturnType<typeof compile>;

/**
 * Параметры перенаправления.
 */
type RedirectOptions = {
  /**
   * Маска адреса или маршрут, при совпадении с которым должно происходить
   * перенаправление. Если не указан, перенаправление происходит в любом
   * случае.
   */
  from?: string | Route;

  /**
   * Указывает, что дочерняя страница не совпадает с маской, если её
   * родительская страница совпала.
   */
  exact?: boolean;

  /**
   * Указывает, что при указанном перенаправлении не делается запись в
   * браузерной истории.
   */
  replace?: boolean;
};

/**
 * Представляет маршрут приложения.
 */
export class Route<P extends Params = void> extends LazyService<Events> {
  /**
   * Компонент, который обрабатывает маршрут.
   */
  public component: ComponentType<any>;

  /**
   * Маска адреса страницы, которой соответствует маршрут.
   */
  public path: string;

  /**
   * True, если адрес страницы должен соответствовать маске в точности.
   */
  public exact: boolean = false;

  /**
   * Возвращает непустое значение свойства path или выбрасывает исключение.
   */
  protected getPath() {
    if (this.path == null) {
      throw new UndefinedPathError(this.constructor.name);
    }

    return this.path;
  }

  /**
   * Возвращает непустое значение свойства component или выбрасывает исключение.
   */
  protected getComponent() {
    if (this.component == null) {
      throw new UndefinedComponentError(this.constructor.name);
    }

    return this.component;
  }

  /**
   * Значение свойства compile.
   */
  private compileValue: Compile;

  /**
   * Собирает маршрут.
   */
  private get compile() {
    if (this.compileValue == null) {
      const path = this.getPath();
      this.compileValue = compile(path);
    }

    return this.compileValue;
  }

  /**
   * Возвращает адрес страницы, подставляя указанные параметры в шаблон
   * маршрута.
   *
   * @param params Параметры подстановки маршрута.
   */
  public href(params: P) {
    return this.compile(params as any);
  }

  /**
   * Возвращает элемент Route из библиотеки react-router.
   */
  public render() {
    const component = this.getComponent();
    const path = this.getPath();
    const { exact } = this;
    return createElement(RouteComponent, { component, path, exact });
  }

  /**
   * Возвращает элемент Redirect из библиотеки react-router.
   *
   * @param params Параметры для подстановки в маску маршрута.
   * @param options Параметры перенаправления.
   */
  public redirect(params: P, options: RedirectOptions = {}) {
    const to = this.href(params);

    const { replace: push = false } = options;
    let { from, exact } = options;

    if (from instanceof Route) {
      exact = exact == null ? from.exact : exact;
      from = from.getPath();
    }

    return createElement(RedirectComponent, { exact, from, push, to });
  }
}
