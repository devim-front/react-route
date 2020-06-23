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
var withRouteWrapper_1 = require("./withRouteWrapper");
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
    Object.defineProperty(Route.prototype, "props", {
        /**
         * Коллекция свойств, пригодных для подстановки в компонент Route из
         * библиотеки react-router.
         */
        get: function () {
            if (this.propsValue == null) {
                var component = withRouteWrapper_1.withRouteWrapper(this.getComponent());
                var path = this.getPath();
                var exact = this.exact;
                this.propsValue = { component: component, exact: exact, path: path };
            }
            return this.propsValue;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Создает и возвращает элемент Route из библиотеки react-router с
     * предустановленными значениями свойств component, path и exact.
     *
     * @see https://reacttraining.com/react-router/web/api/Route
     */
    Route.prototype.render = function () {
        return react_1.createElement(react_router_dom_1.Route, this.props);
    };
    return Route;
}(service_1.LazyService));
exports.Route = Route;
