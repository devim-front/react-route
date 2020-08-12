"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var RouterManager_1 = require("./RouterManager");
var RouterState_1 = require("./RouterState");
var RouterStore_1 = require("./RouterStore");
var RouterRoot_1 = require("./RouterRoot");
/**
 * Помещает указанный в свойстве "application" компонент в контекст
 * маршрутизатора и отображает его.
 *
 * Маршрутизатор способен определять, в какой среде выполнения он запустился. На
 * NodeJS он использует StaticRouter, в браузере - либо BrowserRouter, либо
 * HashRouter (в зависимости от значения свойства "hash").
 */
exports.Router = function (_a) {
    var url = _a.url, children = _a.children, _b = _a.state, state = _b === void 0 ? new RouterState_1.RouterState() : _b, _c = _a.hash, hash = _c === void 0 ? false : _c, application = _a.application, notFound = _a.notFound, props = __rest(_a, ["url", "children", "state", "hash", "application", "notFound"]);
    var isServer = typeof window === 'undefined';
    var content = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(RouterManager_1.RouterManager, null),
        react_1.default.createElement(RouterRoot_1.RouterRoot, { application: application, notFound: notFound })));
    if (isServer) {
        var context_1 = {
            statusCode: 200,
        };
        state.setContext(context_1);
        RouterStore_1.RouterStore.get().setState(state);
        return (react_1.default.createElement(react_router_dom_1.StaticRouter, __assign({}, props, { context: context_1, location: url }), content));
    }
    return hash ? (react_1.default.createElement(react_router_dom_1.HashRouter, __assign({}, props), content)) : (react_1.default.createElement(react_router_dom_1.BrowserRouter, __assign({}, props), content));
};
