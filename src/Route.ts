import { LazyService } from '@devim-front/service';
import { createElement, ComponentType } from 'react';
import { compile } from 'path-to-regexp';
import { Route as RouteComponent } from 'react-router-dom';

import { UndefinedComponentError } from './UndefinedComponentError';
import { UndefinedPathError } from './UndefinedPathError';
import { withRouteWrapper } from './withRouteWrapper';
import { Handler } from './Handler';
import { Events } from './Events';
import { Params } from './Params';

/**
 * Функция компиляции адреса страницы из шаблона маршрута.
 */
type Compile = ReturnType<typeof compile>;

/**
 * Представляет маршрут приложения.
 */
export class Route<P extends Params = void> extends LazyService<Events> {
  /**
   * Компонент, который обрабатывает маршрут. В отличии от свойства "component"
   * компонента Route из библиотеки react-router, в указанный компонент
   * не передаются свойства.
   *
   * @see https://reacttraining.com/react-router/web/api/Route/component
   */
  public component: Handler;

  /**
   * Маска адреса страницы, которой соответствует маршрут. Данное свойство
   * аналогично свойству "path" компонента Route из библиотеки react-router.
   *
   * @see https://reacttraining.com/react-router/web/api/Route/path-string-string
   */
  public path: string;

  /**
   * True, если адрес страницы должен соответствовать маске в точности.
   * Подробнее о поведении этого флага можно прочитать в документации
   * react-router.
   *
   * @see https://reacttraining.com/react-router/web/api/Route/exact-bool
   */
  public exact: boolean = false;

  /**
   * Возвращает значение свойства path или выбрасывает исключение, если оно не
   * указано.
   *
   * @throws UndefinedPathError Выбрасывается, если свойство path не указано.
   */
  protected getPath() {
    if (this.path == null) {
      throw new UndefinedPathError(this.constructor.name);
    }

    return this.path;
  }

  /**
   * Возвращает значение свойства component или выбрасывает исключение, если
   * оно не указано.
   *
   * @throws UndefinedComponentError Выбрасывается, если свойство component
   * не указано.
   */
  protected getComponent() {
    if (this.component == null) {
      throw new UndefinedComponentError(this.constructor.name);
    }

    return this.component;
  }

  /**
   * Сохраненное значение свойства compile.
   */
  private compileValue: Compile;

  /**
   * Компилирует маску пути в адрес страницы, подставляя указанный набор
   * параметров внесте именованных параметров маски адреса.
   *
   * @param params Коллекция параметров для подстановки в маску.
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
   * Сохранённое значение свойства "props".
   */
  private propsValue: {
    component: ComponentType<any>;
    path: string;
    exact: boolean;
  };

  /**
   * Коллекция свойств, пригодных для подстановки в компонент Route из
   * библиотеки react-router.
   */
  private get props() {
    if (this.propsValue == null) {
      const component = withRouteWrapper(this.getComponent());
      const path = this.getPath();
      const { exact } = this;

      this.propsValue = { component, exact, path };
    }

    return this.propsValue;
  }

  /**
   * Создает и возвращает элемент Route из библиотеки react-router с
   * предустановленными значениями свойств component, path и exact.
   *
   * @see https://reacttraining.com/react-router/web/api/Route
   */
  public render() {
    return createElement(RouteComponent, this.props);
  }
}
