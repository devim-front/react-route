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
var RouterScope_1 = require("./RouterScope");
/**
 * Объявляет контект маршрутизации приложения. Данный компонент должен быть
 * подключён так, чтобы его рендер произошёл раньше, чем создаются экземпляры
 * маршрутов. Желательно подключать
 */
exports.Router = function (_a) {
    var url = _a.url, context = _a.context, children = _a.children, props = __rest(_a, ["url", "context", "children"]);
    var isServer = typeof window === 'undefined';
    var content = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(RouterScope_1.RouterScope, null),
        children));
    return isServer ? (react_1.default.createElement(react_router_dom_1.StaticRouter, __assign({}, props, { context: context, location: url }), content)) : (react_1.default.createElement(react_router_dom_1.BrowserRouter, __assign({}, props), content));
};
