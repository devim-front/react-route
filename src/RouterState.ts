import { StaticContext } from './StaticContext';

/**
 * Состояние роутера при использования его во время Server Side Rendering.
 * Экземпляр данного класса помещается в свойство <Router state={} /> при
 * отрисовке приложения на сервере, и по её завершеню
 * будет содержать HTTP-статус ответа сервера и адрес страницы, куда должен
 * быть перенаправлен пользователь (если во время отрисовки возникло
 * перенаправление). Также состояние роутера может быть использовано для
 * рендера приложения с асинхронной подгрузкой данных.
 */
export class RouterState {
  /**
   * Объект контекста StaticRouter.
   */
  private context: StaticContext;

  /**
   * Список неразрешенных обещаний приложения.
   */
  private promises: Promise<void>[] = [];

  /**
   * Указывает, что приложение завершило свой цикл отрисовок.
   */
  public isRendered: boolean = false;

  /**
   * Задаёт контект роутера.
   *
   * @internal
   * @param context Объект контекста роутера.
   */
  public setContext(context: StaticContext) {
    this.context = context;
  }

  /**
   * Добавляет неразрешенное обещание в общих список обещаний.
   *
   * @internal
   * @param promise Обещание.
   */
  public addPromise(promise: Promise<void>) {
    this.promises.push(promise);
  }

  /**
   * Адрес страницы, куда должен быть перенаправлен пользователь, если
   * приложение сгенерировало перенаправление во время рендера.
   */
  public get redirectUrl() {
    return this.context.url as string | undefined;
  }

  /**
   * Код ответа HTTP.
   */
  public get status() {
    return this.context.statusCode as number;
  }

  /**
   * Указывает, что во время рендера приложение сгенерировало перенаправление
   * на другую страницу.
   */
  public get isRedirect() {
    return this.status >= 300 && this.status < 400;
  }

  /**
   * Указывает, что приложение не нашло обработчика для указанной страницы (
   * иными словами, клиенту должна быть показана страница 404).
   */
  public get isNotFound() {
    return this.status === 404;
  }

  /**
   * Указывает, что приложение вернуло статус 200 во время рендера (то есть,
   * обработчик для страницы нашёлся, и не возникло перенаправлений на другие
   * страницы).
   */
  public get isOk() {
    return this.status === 200;
  }

  /**
   * Возвращает обещание, после разрешения которого нужно произвести очередной
   * рендер приложения, так как его состояние изменилось.
   */
  public next() {
    const { length } = this.promises;

    if (length === 0) {
      this.isRendered = true;
      return Promise.resolve();
    }

    const nextPromises: Promise<void>[] = [];
    let isNotFirst: boolean = false;

    for (let i = 0; i < length; i += 1) {
      const promise = this.promises[i];

      const handler = () => {
        if (isNotFirst) {
          return;
        }

        this.promises.splice(i, 1);
        isNotFirst = true;
      };

      const nextPromise = promise.then(handler, handler);
      nextPromises.push(nextPromise);
    }

    return Promise.race(nextPromises);
  }

  /**
   * Указывает, что приложению требуется повторная отрисовка, так как цикл
   * изменения его состояний ещё не завершен.
   */
  public get isNotRendered() {
    return !this.isRendered;
  }
}
