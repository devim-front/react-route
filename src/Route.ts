import { LazyStore } from '@devim-front/store';
import { createElement, ReactElement } from 'react';
import { compile, pathToRegexp, Key } from 'path-to-regexp';
import {
  Route as RouteComponent,
  RedirectProps,
  Redirect,
} from 'react-router-dom';
import { computed } from 'mobx';

import { UndefinedComponentError } from './UndefinedComponentError';
import { UndefinedPathError } from './UndefinedPathError';
import { withRouteWrapper } from './withRouteWrapper';
import { Handler } from './Handler';
import { Events } from './Events';
import { Params } from './Params';
import { NoMatchesError } from './NoMatchesError';
import { RouterStore } from './RouterStore';

/**
 * Функция компиляции адреса страницы из шаблона маршрута.
 */
type Compile = ReturnType<typeof compile>;

/**
 * Элемент Redirect из библиотеки react-router с предустановленными
 * значениями свойств.
 */
type GoTo = ReactElement<RedirectProps>;

/**
 * Представляет маршрут приложения.
 */
export class Route<P extends Params = void> extends LazyStore<Events> {
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
  private getPath() {
    if (this.path == null) {
      throw new UndefinedPathError(this.constructor.name);
    }

    return this.path;
  }

  /**
   * Компонент - обработчик маршрута, обёрнутый в служебный компонент.
   */
  private wrapperdComponent: Handler;

  /**
   * Возвращает значение свойства component или выбрасывает исключение, если
   * оно не указано.
   *
   * @throws UndefinedComponentError Выбрасывается, если свойство component
   * не указано.
   */
  private getComponent() {
    if (this.component == null) {
      throw new UndefinedComponentError(this.constructor.name);
    }

    if (this.wrapperdComponent == null) {
      this.wrapperdComponent = withRouteWrapper(this.component);
    }

    return this.wrapperdComponent;
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
   * Создает и возвращает элемент Route из библиотеки react-router с
   * предустановленными значениями свойств component, path и exact.
   *
   * @see https://reacttraining.com/react-router/web/api/Route
   */
  public render() {
    const component = this.getComponent();
    const path = this.getPath();
    const { exact } = this;

    return createElement(RouteComponent, {
      component,
      exact,
      path,
    });
  }

  /**
   * Возвращает элемент Redirect из библиотеки react-router с предустановленными
   * значениями свойств.
   *
   * @param push True, если при перенаправлении следует делать запись в истории
   * браузера.
   * @param args Коллекция аргуметов, с которыми были вызваны методы
   * redirect или replace.
   */
  private goTo(push: boolean, args: any[]): GoTo {
    let rawExact: boolean | undefined = undefined;
    let rawFrom: Route<any> | string | undefined = undefined;
    let params: P = undefined as P;

    let value = args.shift();

    if (typeof value === 'string' || value instanceof Route) {
      rawFrom = value;
      value = args.shift();

      if (typeof value === 'boolean') {
        rawExact = value;
        value = args.shift();
      }
    }

    params = value;

    const to = this.href(params);

    let exact: boolean | undefined;
    let from: string | undefined;

    if (rawFrom != null) {
      if (rawFrom instanceof Route) {
        from = rawFrom.getPath();
        exact = rawExact == null ? rawFrom.exact : rawExact;
      } else {
        exact = rawExact;
        from = rawFrom;
      }
    }

    return createElement(Redirect, {
      exact,
      push,
      from,
      to,
    });
  }

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на указанный маршрут
   * в любом случае.
   *
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса страницы.
   */
  public redirect(params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает указанной маской.
   *
   * @param from Маска адреса страницы.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public redirect(from: string, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает указанной маской.
   *
   * @param from Маска адреса страницы.
   * @param exact Значение свойства "exact" элемента Redirect.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public redirect(from: string, exact: boolean, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает с указанным маршрутом.
   *
   * @param from Маршрут.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public redirect(from: Route<any>, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает с указанным маршрутом.
   *
   * @param from Маршрут.
   * @param exact Значение флага "exact", переопределяющее аналогичный флаг
   * у переданного в "from" маршрута.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public redirect(from: Route<any>, exact: boolean, params: P): GoTo;

  /**
   * Реализация всех перегрузок метода redirect.
   *
   * @param args Список аргументов.
   */
  public redirect(...args: any[]) {
    return this.goTo(true, args);
  }

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на указанный маршрут
   * в любом случае. Переправление происходит без записи в браузерной истории.
   *
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса страницы.
   */
  public replace(params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает указанной маской. Переправление
   * происходит без записи в браузерной истории.
   *
   * @param from Маска адреса страницы.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public replace(from: string, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает указанной маской. Переправление
   * происходит без записи в браузерной истории.
   *
   * @param from Маска адреса страницы.
   * @param exact Значение свойства "exact" элемента Redirect.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public replace(from: string, exact: boolean, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает с указанным маршрутом. Переправление
   * происходит без записи в браузерной истории.
   *
   * @param from Маршрут.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public replace(from: Route<any>, params: P): GoTo;

  /**
   * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
   * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
   * тогда, когда адрес страницы совпадает с указанным маршрутом. Переправление
   * происходит без записи в браузерной истории.
   *
   * @param from Маршрут.
   * @param exact Значение флага "exact", переопределяющее аналогичный флаг
   * у переданного в "from" маршрута.
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public replace(from: Route<any>, exact: boolean, params: P): GoTo;

  /**
   * Реализация всех перегрузок метода replace.
   *
   * @param args Список аргументов.
   */
  public replace(...args: any[]) {
    return this.goTo(false, args);
  }

  /**
   * Сохранённое значение свойства "parser".
   */
  private infoValue: { regexp: RegExp; keys: Key[] };

  /**
   * Коллекция значений, которая используется для разбора адресов страниц в
   * соответствии с маской данного маршрута: регулярное выражение и список
   * именованных ключей из маски.
   */
  private get info() {
    if (this.infoValue == null) {
      const keys: Key[] = [];
      const regexp = pathToRegexp(this.getPath(), keys);
      this.infoValue = { regexp, keys };
    }

    return this.infoValue;
  }

  /**
   * Регулярное выражение, в которое преобразуется маска адресов данного
   * маршрута.
   */
  private get regexp() {
    return this.info.regexp;
  }

  /**
   * Список названий параметров маски адресов данного маршрута.
   */
  private get keys() {
    return this.info.keys;
  }

  /**
   * Собирает список значений именованных параметров маски адреса в коллекцию.
   *
   * @param values Список совпадений с регулярным выражением, полученным из
   * маски адреса.
   */
  private createParams(values: string[]) {
    const { length } = this.keys;

    if (length === 0) {
      return undefined as P;
    }

    const params: P = {} as P;

    for (let i = 0; i < length; i += 1) {
      const key = this.keys[i];
      const { name } = key;
      const value = values[i];
      // @ts-ignore
      params[name] = value;
    }

    return params;
  }

  /**
   * Разбирает указанный адрес с помощью регулярного выражения, полученного
   * из маски маршрута, и возвращает массив совпавших с ним подстрок,
   * исключая первую (сам адрес целиком). Если адрес не соответствует маске,
   * возвращает undefined.
   *
   * @param href Адрес страницы.
   */
  private getValues(href: string) {
    const match = this.regexp.exec(href);

    if (match == null) {
      return undefined;
    }

    const [base, ...values] = match;

    if (this.exact && base !== href) {
      return undefined;
    }

    return values;
  }

  /**
   * Возвращает true, если указанный адрес страницы совпадает с маской данного
   * маршрута.
   *
   * @param href Адрес страницы.
   */
  public isMatch(href: string) {
    const values = this.getValues(href);
    return values != null;
  }

  /**
   * Получает значения параметров маски данного машрута из указанного адреса
   * или выбрасывает исключение, если адрес не соответствует маске. Если
   * в маске нет именованных параметров, возвращает undefined.
   *
   * @param href Адрес страницы.
   * @param isThrow Указывает, следует ли выбрасывать исключение, если указанный
   * адрес страницы не соответствует маршруту. Если false, то в случае
   * несоответствия адреса метод вернет undefined. По умолчанию true.
   */
  public parse(href: string, isThrow: boolean = true) {
    const values = this.getValues(href);

    if (values == null) {
      if (isThrow) {
        throw new NoMatchesError(this.getPath(), href);
      }

      return undefined;
    }

    return this.createParams(values);
  }

  /**
   * Указывает, что текущий адрес страницы соответствует данному маршруту.
   */
  @computed
  public get isActive() {
    return this.isMatch(RouterStore.get().href);
  }

  /**
   * Коллекция значений параметров маски данного маршрута или пустой объект,
   * если или текущий адрес страницы не совпадает с маской, или в маске нет
   * именованных параметров.
   */
  @computed
  public get params() {
    return this.parse(RouterStore.get().href, false) || {};
  }

  /**
   * Вызывает перенаправление на адрес, полученный в резульате подстановки
   * указанной коллекции параметров в маску данного маршрута.
   *
   * @param params Коллекция именованных параметров для подстановки в маску
   * адреса данного маршрута.
   */
  public doRedirect(params: P) {
    const href = this.href(params);
    RouterStore.get().setRedirect(href, true);
  }

  /**
   * Вызывает перенаправление на адрес, полученный в результате подстановки
   * указанной коллекции параметров в маску данного маршрута.
   *
   * @param params Коллекция именованных параметров для подстановки
   * в маску данного маршрута.
   */
  public doReplace(params: P) {
    const href = this.href(params);
    RouterStore.get().setRedirect(href, false);
  }
}
