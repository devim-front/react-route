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
   * случае. Если в качестве опции from указан другой маршрут, то
   * перенаправление будет происходить только тогда, когда адрес страницы
   * будет соответствовать указанному маршруту. Настройку "exact" маршрута
   * можно переопределить с помощью опции exact (см. ниже).
   *
   * @see https://reacttraining.com/react-router/web/api/Redirect/from-string
   */
  from?: string | Route;

  /**
   * Указывает, что дочерняя страница не совпадает с маской, если её
   * родительская страница совпала. Подробнее о поведении этой опции можно
   * прочитать в документации по react-router. Если в качестве from указан
   * другой маршрут, то установленное в этой опции значение переопределит
   * соответствующую настройку маршрута.
   *
   * @see https://reacttraining.com/react-router/web/api/Route/exact-bool
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
   * Компонент, который обрабатывает маршрут. В отличии от свойства "component"
   * компонента Route из библиотеки react-router, в указанный компонент
   * не будут переданы свойства роутера.
   *
   * @see https://reacttraining.com/react-router/web/api/Route/component
   */
  public component: ComponentType<any>;

  /**
   * Маска адреса страницы, которой соответствует маршрут.
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
   * Создает и возвращает элемент Route из библиотеки react-router.
   */
  public render() {
    const component = this.getComponent();
    const path = this.getPath();
    const { exact } = this;
    return createElement(RouteComponent, { component, path, exact });
  }

  /**
   * Создает и возвращает элемент Redirect из библиотеки react-router.
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
