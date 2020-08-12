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
exports.NotFound = void 0;
var react_1 = require("react");
var RouterStore_1 = require("./RouterStore");
/**
 * При вставке в Virual DOM указывает, что данный адрес страницы не обработан
 * ни одним маршрутом (иными словами, указывает роутеру отобразить страницу
 * 404).
 */
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    NotFound.prototype.render = function () {
        RouterStore_1.RouterStore.get().setNotFound();
        return null;
    };
    return NotFound;
}(react_1.Component));
exports.NotFound = NotFound;
