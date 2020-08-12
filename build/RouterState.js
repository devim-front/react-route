"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterState = void 0;
/**
 * Состояние роутера при использования его во время Server Side Rendering.
 * Экземпляр данного класса помещается в свойство <Router state={} /> при
 * отрисовке приложения на сервере, и по её завершеню
 * будет содержать HTTP-статус ответа сервера и адрес страницы, куда должен
 * быть перенаправлен пользователь (если во время отрисовки возникло
 * перенаправление). Также состояние роутера может быть использовано для
 * рендера приложения с асинхронной подгрузкой данных.
 */
var RouterState = /** @class */ (function () {
    function RouterState() {
        /**
         * Список неразрешенных обещаний приложения.
         */
        this.promises = [];
        /**
         * Указывает, что приложение завершило свой цикл отрисовок.
         */
        this.isRendered = false;
    }
    /**
     * Задаёт контект роутера.
     *
     * @internal
     * @param context Объект контекста роутера.
     */
    RouterState.prototype.setContext = function (context) {
        this.context = context;
    };
    /**
     * Добавляет неразрешенное обещание в общих список обещаний.
     *
     * @internal
     * @param promise Обещание.
     */
    RouterState.prototype.addPromise = function (promise) {
        this.promises.push(promise);
    };
    Object.defineProperty(RouterState.prototype, "redirectUrl", {
        /**
         * Адрес страницы, куда должен быть перенаправлен пользователь, если
         * приложение сгенерировало перенаправление во время рендера.
         */
        get: function () {
            return this.context.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterState.prototype, "status", {
        /**
         * Код ответа HTTP.
         */
        get: function () {
            return this.context.statusCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterState.prototype, "isRedirect", {
        /**
         * Указывает, что во время рендера приложение сгенерировало перенаправление
         * на другую страницу.
         */
        get: function () {
            return this.status >= 300 && this.status < 400;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterState.prototype, "isNotFound", {
        /**
         * Указывает, что приложение не нашло обработчика для указанной страницы (
         * иными словами, клиенту должна быть показана страница 404).
         */
        get: function () {
            return this.status === 404;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterState.prototype, "isOk", {
        /**
         * Указывает, что приложение вернуло статус 200 во время рендера (то есть,
         * обработчик для страницы нашёлся, и не возникло перенаправлений на другие
         * страницы).
         */
        get: function () {
            return this.status === 200;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Возвращает обещание, после разрешения которого нужно произвести очередной
     * рендер приложения, так как его состояние изменилось.
     */
    RouterState.prototype.next = function () {
        var _this = this;
        var length = this.promises.length;
        if (length === 0) {
            this.isRendered = true;
            return Promise.resolve();
        }
        var nextPromises = [];
        var isNotFirst = false;
        var _loop_1 = function (i) {
            var promise = this_1.promises[i];
            var handler = function () {
                if (isNotFirst) {
                    return;
                }
                _this.promises.splice(i, 1);
                isNotFirst = true;
            };
            var nextPromise = promise.then(handler, handler);
            nextPromises.push(nextPromise);
        };
        var this_1 = this;
        for (var i = 0; i < length; i += 1) {
            _loop_1(i);
        }
        return Promise.race(nextPromises);
    };
    Object.defineProperty(RouterState.prototype, "isNotRendered", {
        /**
         * Указывает, что приложению требуется повторная отрисовка, так как цикл
         * изменения его состояний ещё не завершен.
         */
        get: function () {
            return !this.isRendered;
        },
        enumerable: false,
        configurable: true
    });
    return RouterState;
}());
exports.RouterState = RouterState;
