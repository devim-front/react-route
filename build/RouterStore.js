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
 *
 * @internal
 */
var RouterStore = /** @class */ (function (_super) {
    __extends(RouterStore, _super);
    function RouterStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Указывает, что пользователю должна быть показана страница 404.
         */
        _this.isNotFound = false;
        return _this;
    }
    /**
     * Задает текущий адрес страницы.
     *
     * @param href Новый адрес страницы.
     */
    RouterStore.prototype.setHref = function (href) {
        this.href = href;
    };
    /**
     * Задает состояние роутера.
     *
     * @param state Состояние.
     */
    RouterStore.prototype.setState = function (state) {
        this.state = state;
    };
    /**
     * Задает адрес страницы, на которую нужно перейти в следующем цикле отрисовки
     * приложения.
     *
     * @param href Адрес страницы.
     * @param push Указывает, следует ли делать запись в браузерной истории
     * об этом перенаправлении.
     */
    RouterStore.prototype.setRedirect = function (href, push) {
        if (push === void 0) { push = false; }
        this.redirect = href;
        this.push = push;
        if (this.state) {
            this.state.addPromise(Promise.resolve());
        }
    };
    /**
     * Сбрасывает параметры перенаправления в состояние по умолчанию.
     */
    RouterStore.prototype.unsetRedirect = function () {
        this.redirect = undefined;
        this.push = undefined;
    };
    /**
     * Указывает, что пользователю должна быть показана страница 404.
     */
    RouterStore.prototype.setNotFound = function () {
        this.isNotFound = true;
        if (this.state) {
            this.state.addPromise(Promise.resolve());
        }
    };
    /**
     * Сбрасывает значение флага isNotFound в false.
     */
    RouterStore.prototype.unsetNotFound = function () {
        this.isNotFound = false;
    };
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "href", void 0);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setHref", null);
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "redirect", void 0);
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "push", void 0);
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "isNotFound", void 0);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setRedirect", null);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "unsetRedirect", null);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setNotFound", null);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "unsetNotFound", null);
    return RouterStore;
}(store_1.LazyStore));
exports.RouterStore = RouterStore;
