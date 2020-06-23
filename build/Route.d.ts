import { LazyService } from '@devim-front/service';
import { ComponentType } from 'react';
import { Route as RouteComponent } from 'react-router-dom';
import { Handler } from './Handler';
import { Events } from './Events';
import { Params } from './Params';
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
}
