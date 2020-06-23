import { LazyService } from '@devim-front/service';
import { ComponentType, ReactElement } from 'react';
import { Route as RouteComponent, RedirectProps } from 'react-router-dom';
import { Handler } from './Handler';
import { Events } from './Events';
import { Params } from './Params';
/**
 * Элемент Redirect из библиотеки react-router с предустановленными
 * значениями свойств.
 */
declare type GoTo = ReactElement<RedirectProps>;
/**
 * Представляет маршрут приложения.
 */
export declare class Route<P extends Params = void> extends LazyService<Events> {
    /**
     * Компонент, который обрабатывает маршрут. В отличии от свойства "component"
     * компонента Route из библиотеки react-router, в указанный компонент
     * не передаются свойства.
     *
     * @see https://reacttraining.com/react-router/web/api/Route/component
     */
    component: Handler;
    /**
     * Маска адреса страницы, которой соответствует маршрут. Данное свойство
     * аналогично свойству "path" компонента Route из библиотеки react-router.
     *
     * @see https://reacttraining.com/react-router/web/api/Route/path-string-string
     */
    path: string;
    /**
     * True, если адрес страницы должен соответствовать маске в точности.
     * Подробнее о поведении этого флага можно прочитать в документации
     * react-router.
     *
     * @see https://reacttraining.com/react-router/web/api/Route/exact-bool
     */
    exact: boolean;
    /**
     * Возвращает значение свойства path или выбрасывает исключение, если оно не
     * указано.
     *
     * @throws UndefinedPathError Выбрасывается, если свойство path не указано.
     */
    protected getPath(): string;
    /**
     * Возвращает значение свойства component или выбрасывает исключение, если
     * оно не указано.
     *
     * @throws UndefinedComponentError Выбрасывается, если свойство component
     * не указано.
     */
    protected getComponent(): ComponentType<any>;
    /**
     * Сохраненное значение свойства compile.
     */
    private compileValue;
    /**
     * Компилирует маску пути в адрес страницы, подставляя указанный набор
     * параметров внесте именованных параметров маски адреса.
     *
     * @param params Коллекция параметров для подстановки в маску.
     */
    private get compile();
    /**
     * Возвращает адрес страницы, подставляя указанные параметры в шаблон
     * маршрута.
     *
     * @param params Параметры подстановки маршрута.
     */
    href(params: P): string;
    /**
     * Сохранённое значение свойства "props".
     */
    private propsValue;
    /**
     * Коллекция свойств, пригодных для подстановки в компонент Route из
     * библиотеки react-router.
     */
    private get props();
    /**
     * Создает и возвращает элемент Route из библиотеки react-router с
     * предустановленными значениями свойств component, path и exact.
     *
     * @see https://reacttraining.com/react-router/web/api/Route
     */
    render(): import("react").CElement<import("react-router").RouteProps, RouteComponent<import("react-router").RouteProps>>;
    /**
     * Возвращает элемент Redirect из библиотеки react-router с предустановленными
     * значениями свойств.
     *
     * @param push True, если при перенаправлении следует делать запись в истории
     * браузера.
     * @param args Коллекция аргуметов, с которыми были вызваны методы
     * redirect или replace.
     */
    private createRedirect;
    /**
     * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
     * таким образом, чтобы вызывать перенаправление на указанный маршрут
     * в любом случае.
     *
     * @param params Коллекция именованных параметров для подстановки в маску
     * адреса страницы.
     */
    redirect(params: P): GoTo;
    /**
     * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
     * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
     * тогда, когда адрес страницы совпадает указанной маской.
     *
     * @param from Маска адреса страницы.
     * @param params Коллекция именованных параметров для подстановки в маску
     * адреса данного маршрута.
     */
    redirect(from: string, params: P): GoTo;
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
    redirect(from: string, exact: boolean, params: P): GoTo;
    /**
     * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
     * таким образом, чтобы вызывать перенаправление на данный маршрут лишь
     * тогда, когда адрес страницы совпадает с указанным маршрутом.
     *
     * @param from Маршрут.
     * @param params Коллекция именованных параметров для подстановки в маску
     * адреса данного маршрута.
     */
    redirect(from: Route<any>, params: P): GoTo;
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
    redirect(from: Route<any>, exact: boolean, params: P): GoTo;
    /**
     * Возвращает элемент Redirect из библиотеки react-router, сконфигурированный
     * таким образом, чтобы вызывать перенаправление на указанный маршрут
     * в любом случае. Переправление происходит без записи в браузерной истории.
     *
     * @param params Коллекция именованных параметров для подстановки в маску
     * адреса страницы.
     */
    replace(params: P): GoTo;
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
    replace(from: string, params: P): GoTo;
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
    replace(from: string, exact: boolean, params: P): GoTo;
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
    replace(from: Route<any>, params: P): GoTo;
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
    replace(from: Route<any>, exact: boolean, params: P): GoTo;
}
export {};
