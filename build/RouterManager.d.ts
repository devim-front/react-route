import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
/**
 * Свойства компонента.
 */
declare type Props = RouteComponentProps;
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
     * Содержит адрес, на который следует выполнить перенаправление в текущем
     * цикле переотрисовки. Если перенаправление не нужно, свойство равно
     * undefined.
     */
    get redirect(): string | undefined;
    /**
     * Указывает, что при перенаправлении в текущем цикле переотрисовки нужно
     * сделать запись в браузерной истории. Если перенаправление не нужно,
     * свойство равно undefined.
     */
    get push(): boolean | undefined;
    /**
     * @inheritdoc
     */
    render(): JSX.Element | null;
}
declare const component: React.ComponentClass<Pick<Props, never> & {
    wrappedComponentRef?: ((instance: RouterManager | null) => void) | React.RefObject<RouterManager> | null | undefined;
}, any> & import("react-router").WithRouterStatics<typeof RouterManager>;
export { component as RouterManager };
