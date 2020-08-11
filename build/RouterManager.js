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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var mobx_react_1 = require("mobx-react");
var RouterStore_1 = require("./RouterStore");
/**
 * Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
 * библиотеки react-router-dom.
 */
var RouterManager = /** @class */ (function (_super) {
    __extends(RouterManager, _super);
    function RouterManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Возвращает элемент, который вызывает перенаправление на указанный адрес,
     * или генерирует перенаправление программно, если оно идёт на другой ресурс.
     *
     * @param redirect Адрес, на который должно произойти перенаправление.
     * @param push Указывает, следует ли делать запись в истории при этом
     * перенаправлении.
     */
    RouterManager.prototype.renderRedirect = function (redirect, push) {
        var staticContext = this.props.staticContext;
        RouterStore_1.RouterStore.get().unsetRedirect();
        if (typeof window == 'undefined') {
            if (staticContext) {
                staticContext.action = push ? 'PUSH' : 'REPLACE';
                staticContext.url = redirect;
                staticContext.statusCode = 301;
            }
            return null;
        }
        var isExternal = redirect.indexOf('//') >= 0;
        if (isExternal) {
            window.location.href = redirect;
            return null;
        }
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect, push: push });
    };
    /**
     * @inheritdoc
     */
    RouterManager.prototype.render = function () {
        var _a = RouterStore_1.RouterStore.get(), redirect = _a.redirect, push = _a.push;
        if (redirect != null) {
            return this.renderRedirect(redirect, push);
        }
        var location = this.props.location;
        var pathname = location.pathname;
        if (this.previousPathname !== pathname) {
            this.previousPathname = pathname;
            RouterStore_1.RouterStore.get().setHref(pathname);
        }
        return null;
    };
    RouterManager = __decorate([
        mobx_react_1.observer
    ], RouterManager);
    return RouterManager;
}(react_1.Component));
var component = react_router_dom_1.withRouter(RouterManager);
exports.RouterManager = component;
