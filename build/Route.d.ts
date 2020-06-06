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
export declare class Route<P extends Params = void> extends LazyService<Events> {
    /**
     * Компонент, который обрабатывает маршрут.
     */
    component: ComponentType<any>;
    /**
     * Маска адреса страницы, которой соответствует маршрут.
     */
    path: string;
    /**
     * True, если адрес страницы должен соответствовать маске в точности.
     */
    exact: boolean;
    /**
     * Возвращает непустое значение свойства path или выбрасывает исключение.
     */
    protected getPath(): string;
    /**
     * Возвращает непустое значение свойства component или выбрасывает исключение.
     */
    protected getComponent(): ComponentType<any>;
    /**
     * Значение свойства compile.
     */
    private compileValue;
    /**
     * Собирает маршрут.
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
     * Возвращает элемент Route из библиотеки react-router.
     */
    render(): import("react").CElement<import("react-router").RouteProps, RouteComponent<import("react-router").RouteProps>>;
    /**
     * Возвращает элемент Redirect из библиотеки react-router.
     *
     * @param params Параметры для подстановки в маску маршрута.
     * @param options Параметры перенаправления.
     */
    redirect(params: P, options?: RedirectOptions): import("react").CElement<import("react-router").RedirectProps, RedirectComponent>;
}
export {};
