import { BaseError } from './BaseError';

/**
 * Возникает, когда у маршрута не задано свойство path, но в коде происходит
 * попытка его получить.
 */
export class UndefinedPathError extends BaseError {
  /**
   * Создает экземпляр ошибки для указанного класса.
   * @param route Название класса роута.
   */
  public constructor(route: string) {
    const message = `${route}.path is undefined`;
    super(message);
  }
}
