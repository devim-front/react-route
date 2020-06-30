"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterScope = void 0;
var react_router_dom_1 = require("react-router-dom");
var RouterStore_1 = require("./RouterStore");
/**
 * Обеспечивает интеграцию между хранилищами маршрутов и контекстом роутера из
 * библиотеки react-router-dom.
 */
var RouterScope = function (_a) {
    var location = _a.location;
    var pathname = location.pathname;
    RouterStore_1.RouterStore.get().setHref(pathname);
    return null;
};
var component = react_router_dom_1.withRouter(RouterScope);
exports.RouterScope = component;
