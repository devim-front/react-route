import { Component, ComponentType } from 'react';
/**
 * Свойства компонента.
 */
declare type Props = {
    /**
     * Корневой компонент приложения, использующего маршрутизацию.
     */
    application?: ComponentType<any>;
    /**
     * Компонент, представляющий страницу "404 Not Found".
     */
    notFound?: ComponentType<any>;
};
/**
 * Отображает корневой компонент приложения или страницу 404 в зависимости от
 * того, был ли обработан текущий адрес страницы одним из маршрутов, или нет.
 */
export declare class RouterRoot extends Component<Props> {
    /**
     * Отображает страницу 404.
     */
    private renderNotFound;
    /**
     * Отображает корневой элемент приложения.
     */
    private renderApplication;
    /**
     * @inheritdoc
     */
    render(): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | null;
}
export {};
