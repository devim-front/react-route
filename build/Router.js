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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var RouterManager_1 = require("./RouterManager");
/**
 * Помещает указанный в свойстве "application" компонент в контекст
 * маршрутизатора и отображает его.
 *
 * Маршрутизатор способен определять, в какой среде выполнения он запустился. На
 * NodeJS он использует StaticRouter, в браузере - либо BrowserRouter, либо
 * HashRouter (в зависимости от значения свойства "hash").
 */
exports.Router = function (_a) {
    var url = _a.url, context = _a.context, children = _a.children, _b = _a.hash, hash = _b === void 0 ? false : _b, application = _a.application, props = __rest(_a, ["url", "context", "children", "hash", "application"]);
    var isServer = typeof window === 'undefined';
    var content = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(RouterManager_1.RouterManager, null),
        application ? react_1.createElement(application) : null));
    if (isServer) {
        return (react_1.default.createElement(react_router_dom_1.StaticRouter, __assign({}, props, { context: context, location: url }), content));
    }
    return hash ? (react_1.default.createElement(react_router_dom_1.HashRouter, __assign({}, props), content)) : (react_1.default.createElement(react_router_dom_1.BrowserRouter, __assign({}, props), content));
};
