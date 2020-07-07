import { Component } from 'react';
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
     * @inheritdoc
     */
    render(): null;
}
declare const component: import("react").ComponentClass<Pick<Props, never> & {
    wrappedComponentRef?: ((instance: RouterManager | null) => void) | import("react").RefObject<RouterManager> | null | undefined;
}, any> & import("react-router").WithRouterStatics<typeof RouterManager>;
export { component as RouterManager };
