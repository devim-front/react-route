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
exports.RouterRoot = void 0;
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var RouterStore_1 = require("./RouterStore");
/**
 * Отображает корневой компонент приложения или страницу 404 в зависимости от
 * того, был ли обработан текущий адрес страницы одним из маршрутов, или нет.
 */
var RouterRoot = /** @class */ (function (_super) {
    __extends(RouterRoot, _super);
    function RouterRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Отображает страницу 404.
     */
    RouterRoot.prototype.renderNotFound = function () {
        RouterStore_1.RouterStore.get().unsetNotFound();
        var notFound = this.props.notFound;
        return notFound ? react_1.createElement(notFound) : null;
    };
    /**
     * Отображает корневой элемент приложения.
     */
    RouterRoot.prototype.renderApplication = function () {
        var application = this.props.application;
        return application ? react_1.createElement(application) : null;
    };
    /**
     * @inheritdoc
     */
    RouterRoot.prototype.render = function () {
        var isNotFound = RouterStore_1.RouterStore.get().isNotFound;
        return isNotFound ? this.renderNotFound() : this.renderApplication();
    };
    RouterRoot = __decorate([
        mobx_react_1.observer
    ], RouterRoot);
    return RouterRoot;
}(react_1.Component));
exports.RouterRoot = RouterRoot;
