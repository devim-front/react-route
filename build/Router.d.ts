import { FC, ComponentProps, ComponentType } from 'react';
import { StaticRouter } from 'react-router-dom';
/**
 * Свойства статического роутера.
 */
declare type StaticProps = ComponentProps<typeof StaticRouter>;
/**
 * Свойства компонента.
 */
declare type Props = {
    /**
     * Путь к корню сайта. Данное свойство используется, если корень сайта
     * расположен не по обычному адресу "/", а в подкаталоге (например,
     * "/en", "/account" и тому подобное).
     */
    basename?: string;
    /**
     * Адрес страницы, которая должна быть отрендерена. Используется только
     * при запуске приложения в NodeJS; в браузере же значение берётся из адресной
     * строки.
     */
    url?: StaticProps['location'];
    /**
     * Мутабельный контекст роутера. Используется для того, чтобы передавать
     * информацию из компонентов React в серверную часть приложения при его
     * запуске на NodeJS. Следует поместить в это свойство пустой объект,
     * и после рендера приложения, в этот объект будут записаны дополнительные
     * свойства.
     */
    context?: StaticProps['context'];
    /**
     * Указывает, что при запуске этого компонента в браузере, в качестве
     * контекста маршрутизатора следует использовать не BrowserRouter, а
     * HashRouter.
     *
     * @see https://reactrouter.com/web/api/HashRouter
     */
    hash?: boolean;
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
 * Помещает указанный в свойстве "application" компонент в контекст
 * маршрутизатора и отображает его.
 *
 * Маршрутизатор способен определять, в какой среде выполнения он запустился. На
 * NodeJS он использует StaticRouter, в браузере - либо BrowserRouter, либо
 * HashRouter (в зависимости от значения свойства "hash").
 */
export declare const Router: FC<Props>;
export {};
