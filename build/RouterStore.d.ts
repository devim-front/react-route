import { LazyStore } from '@devim-front/store';
import { RouterState } from './RouterState';
/**
 * Хранилище состояния маршрутизатора.
 *
 * @internal
 */
export declare class RouterStore extends LazyStore {
    /**
     * Текущий адрес страницы.
     */
    href: string;
    /**
     * Задает текущий адрес страницы.
     *
     * @param href Новый адрес страницы.
     */
    setHref(href: string): void;
    /**
     * Адрес, на который должен быть перенаправлен пользователь в данный момент.
     * Если перенаправления нет, то undefined.
     */
    redirect: string | undefined;
    /**
     * Показывает, следует ли делать запись в истории браузера при перенаправлении
     * на адрес, указанный в свойстве "redirect".
     */
    push: boolean | undefined;
    /**
     * Указывает, что пользователю должна быть показана страница 404.
     */
    isNotFound: boolean;
    /**
     * Состояние роутера.
     */
    private state;
    /**
     * Задает состояние роутера.
     *
     * @param state Состояние.
     */
    setState(state: RouterState): void;
    /**
     * Задает адрес страницы, на которую нужно перейти в следующем цикле отрисовки
     * приложения.
     *
     * @param href Адрес страницы.
     * @param push Указывает, следует ли делать запись в браузерной истории
     * об этом перенаправлении.
     */
    setRedirect(href: string, push?: boolean): void;
    /**
     * Сбрасывает параметры перенаправления в состояние по умолчанию.
     */
    unsetRedirect(): void;
    /**
     * Указывает, что пользователю должна быть показана страница 404.
     */
    setNotFound(): void;
    /**
     * Сбрасывает значение флага isNotFound в false.
     */
    unsetNotFound(): void;
}
