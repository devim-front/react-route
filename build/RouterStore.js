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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterStore = void 0;
var store_1 = require("@devim-front/store");
var mobx_1 = require("mobx");
/**
 * Хранилище состояния маршрутизатора.
 */
var RouterStore = /** @class */ (function (_super) {
    __extends(RouterStore, _super);
    function RouterStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RouterStore.prototype, "href", {
        /**
         * Адрес текущей страницы.
         */
        get: function () {
            return this.hrefValue;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Задает текущий адрес страницы.
     *
     * @param href Новый адрес страницы.
     */
    RouterStore.prototype.setHref = function (href) {
        this.hrefValue = href;
    };
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "hrefValue", void 0);
    __decorate([
        mobx_1.computed
    ], RouterStore.prototype, "href", null);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setHref", null);
    return RouterStore;
}(store_1.LazyStore));
exports.RouterStore = RouterStore;
