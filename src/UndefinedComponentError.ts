import { BaseError } from './BaseError';

/**
 * Возникает, когда в коде происходит попытка обратиться к необъявленному
 * свойству component.
 */
export class UndefinedComponentError extends BaseError {
  /**
   * Создает экземпляр ошибки с указанным именем класса.
   * @param route Название класса компонента.
   */
  public constructor(route: string) {
    const message = `${route}.component is undefined`;
    super(message);
  }
}
