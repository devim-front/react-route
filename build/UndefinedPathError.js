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
exports.UndefinedPathError = void 0;
var BaseError_1 = require("./BaseError");
/**
 * Возникает, когда у маршрута не задано свойство path, но в коде происходит
 * попытка его получить.
 */
var UndefinedPathError = /** @class */ (function (_super) {
    __extends(UndefinedPathError, _super);
    /**
     * Создает экземпляр ошибки для указанного класса.
     * @param route Название класса роута.
     */
    function UndefinedPathError(route) {
        var _this = this;
        var message = route + ".path is undefined";
        _this = _super.call(this, message) || this;
        return _this;
    }
    return UndefinedPathError;
}(BaseError_1.BaseError));
exports.UndefinedPathError = UndefinedPathError;
