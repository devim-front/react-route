/**
 * Представляет ошибку, возникающую при неверном использовании механик роутинга.
 */
export class BaseError extends Error {
  /**
   * Создает экземпляр класса.
   * @param message Сообщение об ошибке.
   */
  public constructor(message: string) {
    super(message);
    this.name = 'RouteError';
  }
}
