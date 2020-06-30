import { LazyStore } from '@devim-front/store';
/**
 * Хранилище состояния маршрутизатора.
 */
export declare class RouterStore extends LazyStore {
    /**
     * Сохранённое значение текущего адреса страницы. Добавлено для того, чтобы
     * нельзя было установить это значение извне класса.
     */
    private hrefValue;
    /**
     * Адрес текущей страницы.
     */
    get href(): string;
    /**
     * Задает текущий адрес страницы.
     *
     * @param href Новый адрес страницы.
     */
    setHref(href: string): void;
}
