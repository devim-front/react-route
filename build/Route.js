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
exports.Route = void 0;
var service_1 = require("@devim-front/service");
var react_1 = require("react");
var path_to_regexp_1 = require("path-to-regexp");
var react_router_dom_1 = require("react-router-dom");
var UndefinedComponentError_1 = require("./UndefinedComponentError");
var UndefinedPathError_1 = require("./UndefinedPathError");
/**
 * Представляет маршрут приложения.
 */
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * True, если адрес страницы должен соответствовать маске в точности.
         * Подробнее о поведении этого флага можно прочитать в документации
         * react-router.
         *
         * @see https://reacttraining.com/react-router/web/api/Route/exact-bool
         */
        _this.exact = false;
        return _this;
    }
    /**
     * Возвращает значение свойства path или выбрасывает исключение, если оно не
     * указано.
     *
     * @throws UndefinedPathError Выбрасывается, если свойство path не указано.
     */
    Route.prototype.getPath = function () {
        if (this.path == null) {
            throw new UndefinedPathError_1.UndefinedPathError(this.constructor.name);
        }
        return this.path;
    };
    /**
     * Возвращает значение свойства component или выбрасывает исключение, если
     * оно не указано.
     *
     * @throws UndefinedComponentError Выбрасывается, если свойство component
     * не указано.
     */
    Route.prototype.getComponent = function () {
        if (this.component == null) {
            throw new UndefinedComponentError_1.UndefinedComponentError(this.constructor.name);
        }
        return this.component;
    };
    Object.defineProperty(Route.prototype, "compile", {
        /**
         * Компилирует маску пути в адрес страницы, подставляя указанный набор
         * параметров внесте именованных параметров маски адреса.
         *
         * @param params Коллекция параметров для подстановки в маску.
         */
        get: function () {
            if (this.compileValue == null) {
                var path = this.getPath();
                this.compileValue = path_to_regexp_1.compile(path);
            }
            return this.compileValue;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Возвращает адрес страницы, подставляя указанные параметры в шаблон
     * маршрута.
     *
     * @param params Параметры подстановки маршрута.
     */
    Route.prototype.href = function (params) {
        return this.compile(params);
    };
    /**
     * Создает и возвращает элемент Route из библиотеки react-router.
     */
    Route.prototype.render = function () {
        var component = this.getComponent();
        var path = this.getPath();
        var exact = this.exact;
        return react_1.createElement(react_router_dom_1.Route, { component: component, path: path, exact: exact });
    };
    /**
     * Создает и возвращает элемент Redirect из библиотеки react-router.
     *
     * @param params Параметры для подстановки в маску маршрута.
     * @param options Параметры перенаправления.
     */
    Route.prototype.redirect = function (params, options) {
        if (options === void 0) { options = {}; }
        var to = this.href(params);
        var _a = options.replace, push = _a === void 0 ? false : _a;
        var from = options.from, exact = options.exact;
        if (from instanceof Route) {
            exact = exact == null ? from.exact : exact;
            from = from.getPath();
        }
        return react_1.createElement(react_router_dom_1.Redirect, { exact: exact, from: from, push: push, to: to });
    };
    return Route;
}(service_1.LazyService));
exports.Route = Route;
