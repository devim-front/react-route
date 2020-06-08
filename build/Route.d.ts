import { LazyService } from '@devim-front/service';
import { ComponentType } from 'react';
import { Redirect as RedirectComponent, Route as RouteComponent } from 'react-router-dom';
import { Events } from './Events';
import { Params } from './Params';
/**
 * Параметры перенаправления.
 */
declare type RedirectOptions = {
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
export declare class Route<P extends Params = void> extends LazyService<Events> {
    /**
     * Компонент, который обрабатывает маршрут. В отличии от свойства "component"
     * компонента Route из библиотеки react-router, в указанный компонент
     * не будут переданы свойства роутера.
     *
     * @see https://reacttraining.com/react-router/web/api/Route/component
     */
    component: ComponentType<any>;
    /**
     * Маска адреса страницы, которой соответствует маршрут.
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
     * Создает и возвращает элемент Route из библиотеки react-router.
     */
    render(): import("react").CElement<import("react-router").RouteProps, RouteComponent<import("react-router").RouteProps>>;
    /**
     * Создает и возвращает элемент Redirect из библиотеки react-router.
     *
     * @param params Параметры для подстановки в маску маршрута.
     * @param options Параметры перенаправления.
     */
    redirect(params: P, options?: RedirectOptions): import("react").CElement<import("react-router").RedirectProps, RedirectComponent>;
}
export {};
