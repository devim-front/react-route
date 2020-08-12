import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from './StaticContext';
/**
 * Свойства компонента.
 */
declare type Props = Omit<RouteComponentProps, 'staticContext'> & {
    /**
     * Статический контекст роутера при запуске приложения на NodeJS.
     */
    staticContext?: StaticContext;
};
/**
 * Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
 * библиотеки react-router-dom.
 */
declare class RouterManager extends Component<Props> {
    /**
     * Сохранённое значение пути в адресе страницы. Используется для того, чтобы
     * реагировать конкретно на изменение пути, а не адреса в целом.
     */
    previousPathname: string;
    /**
     * Возвращает элемент, который вызывает перенаправление на указанный адрес,
     * или генерирует перенаправление программно, если оно идёт на другой ресурс.
     *
     * @param redirect Адрес, на который должно произойти перенаправление.
     * @param push Указывает, следует ли делать запись в истории при этом
     * перенаправлении.
     */
    private renderRedirect;
    /**
     * @inheritdoc
     */
    render(): JSX.Element | null;
}
declare const component: React.ComponentClass<Pick<Props, never> & {
    wrappedComponentRef?: ((instance: RouterManager | null) => void) | React.RefObject<RouterManager> | null | undefined;
}, any> & import("react-router").WithRouterStatics<typeof RouterManager>;
export { component as RouterManager };
