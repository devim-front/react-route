import { BaseError } from './BaseError';
/**
 * Возникает, когда в коде происходит попытка обратиться к необъявленному
 * свойству component.
 */
export declare class UndefinedComponentError extends BaseError {
    /**
     * Создает экземпляр ошибки с указанным именем класса.
     * @param route Название класса компонента.
     */
    constructor(route: string);
}
