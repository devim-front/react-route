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
exports.RouterManager = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
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
     * @inheritdoc
     */
    RouterManager.prototype.render = function () {
        var location = this.props.location;
        var pathname = location.pathname;
        if (this.previousPathname !== pathname) {
            this.previousPathname = pathname;
            RouterStore_1.RouterStore.get().setHref(pathname);
        }
        return null;
    };
    return RouterManager;
}(react_1.Component));
var component = react_router_dom_1.withRouter(RouterManager);
exports.RouterManager = component;
