"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoMatchesError = void 0;
var error_1 = require("@devim-front/error");
/**
 * Ошибка, которая возникает, когда адрес не соответствует маске маршрута при
 * попытке получить коллекцию именованных параметров.
 */
var NoMatchesError = /** @class */ (function (_super) {
    __extends(NoMatchesError, _super);
    /**
     * Создает экземпляр ошибки.
     *
     * @param path Маска адресов маршрута.
     * @param href Разбираемый адрес.
     * @param message Сообщение об ошибке.
     */
    function NoMatchesError(path, href, message) {
        var _this = this;
        var finalMessage = message || NoMatchesError.getMessage(path, href);
        _this = _super.call(this, 'NoRouteMatchesError', finalMessage) || this;
        return _this;
    }
    /**
     * Возвращает стандартное сообщение об ошибке.
     * @param path Маска маршрута
     * @param href Адрес.
     */
    NoMatchesError.getMessage = function (path, href) {
        return "The address \"" + href + "\" doesn't match with route pattern \"" + path + "\"";
    };
    return NoMatchesError;
}(error_1.CustomError));
exports.NoMatchesError = NoMatchesError;
