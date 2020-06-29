import { CustomError } from '@devim-front/error';

/**
 * Ошибка, которая возникает, когда адрес не соответствует маске маршрута при
 * попытке получить коллекцию именованных параметров.
 */
export class NoMatchesError extends CustomError {
  /**
   * Возвращает стандартное сообщение об ошибке.
   * @param path Маска маршрута
   * @param href Адрес.
   */
  private static getMessage(path: string, href: string) {
    return `The address "${href}" doesn't match with route pattern "${path}"`;
  }

  /**
   * Создает экземпляр ошибки.
   *
   * @param path Маска адресов маршрута.
   * @param href Разбираемый адрес.
   * @param message Сообщение об ошибке.
   */
  public constructor(path: string, href: string, message?: string) {
    const finalMessage = message || NoMatchesError.getMessage(path, href);
    super('NoRouteMatchesError', finalMessage);
  }
}
