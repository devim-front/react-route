import { CustomError } from '@devim-front/error';
/**
 * Ошибка, которая возникает, когда адрес не соответствует маске маршрута при
 * попытке получить коллекцию именованных параметров.
 */
export declare class NoMatchesError extends CustomError {
    /**
     * Возвращает стандартное сообщение об ошибке.
     * @param path Маска маршрута
     * @param href Адрес.
     */
    private static getMessage;
    /**
     * Создает экземпляр ошибки.
     *
     * @param path Маска адресов маршрута.
     * @param href Разбираемый адрес.
     * @param message Сообщение об ошибке.
     */
    constructor(path: string, href: string, message?: string);
}
