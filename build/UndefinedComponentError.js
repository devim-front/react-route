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
exports.UndefinedComponentError = void 0;
var BaseError_1 = require("./BaseError");
/**
 * Возникает, когда в коде происходит попытка обратиться к необъявленному
 * свойству component.
 */
var UndefinedComponentError = /** @class */ (function (_super) {
    __extends(UndefinedComponentError, _super);
    /**
     * Создает экземпляр ошибки с указанным именем класса.
     * @param route Название класса компонента.
     */
    function UndefinedComponentError(route) {
        var _this = this;
        var message = route + ".component is undefined";
        _this = _super.call(this, message) || this;
        return _this;
    }
    return UndefinedComponentError;
}(BaseError_1.BaseError));
exports.UndefinedComponentError = UndefinedComponentError;
