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
var NoMatchesError_1 = require("./NoMatchesError");
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
        if (this.wrapperdComponent == null) {
            this.wrapperdComponent = withRouteWrapper_1.withRouteWrapper(this.component);
        }
        return this.wrapperdComponent;
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
     * Создает и возвращает элемент Route из библиотеки react-router с
     * предустановленными значениями свойств component, path и exact.
     *
     * @see https://reacttraining.com/react-router/web/api/Route
     */
    Route.prototype.render = function () {
        var component = this.getComponent();
        var path = this.getPath();
        var exact = this.exact;
        return react_1.createElement(react_router_dom_1.Route, {
            component: component,
            exact: exact,
            path: path,
        });
    };
    /**
     * Возвращает элемент Redirect из библиотеки react-router с предустановленными
     * значениями свойств.
     *
     * @param push True, если при перенаправлении следует делать запись в истории
     * браузера.
     * @param args Коллекция аргуметов, с которыми были вызваны методы
     * redirect или replace.
     */
    Route.prototype.goTo = function (push, args) {
        var rawExact = undefined;
        var rawFrom = undefined;
        var params = undefined;
        var value = args.shift();
        if (typeof value === 'string' || value instanceof Route) {
            rawFrom = value;
            value = args.shift();
            if (typeof value === 'boolean') {
                rawExact = value;
                value = args.shift();
            }
        }
        params = value;
        var to = this.href(params);
        var exact;
        var from;
        if (rawFrom != null) {
            if (rawFrom instanceof Route) {
                from = rawFrom.getPath();
                exact = rawExact == null ? rawFrom.exact : rawExact;
            }
            else {
                exact = rawExact;
                from = rawFrom;
            }
        }
        return react_1.createElement(react_router_dom_1.Redirect, {
            exact: exact,
            push: push,
            from: from,
            to: to,
        });
    };
    /**
     * Реализация всех перегрузок метода redirect.
     *
     * @param args Список аргументов.
     */
    Route.prototype.redirect = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.goTo(true, args);
    };
    /**
     * Реализация всех перегрузок метода replace.
     *
     * @param args Список аргументов.
     */
    Route.prototype.replace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.goTo(false, args);
    };
    Object.defineProperty(Route.prototype, "info", {
        /**
         * Коллекция значений, которая используется для разбора адресов страниц в
         * соответствии с маской данного маршрута: регулярное выражение и список
         * именованных ключей из маски.
         */
        get: function () {
            if (this.infoValue == null) {
                var keys = [];
                var regexp = path_to_regexp_1.pathToRegexp(this.getPath(), keys);
                this.infoValue = { regexp: regexp, keys: keys };
            }
            return this.infoValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "regexp", {
        /**
         * Регулярное выражение, в которое преобразуется маска адресов данного
         * маршрута.
         */
        get: function () {
            return this.info.regexp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "keys", {
        /**
         * Список названий параметров маски адресов данного маршрута.
         */
        get: function () {
            return this.info.keys;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Возвращает true, если указанный адрес страницы совпадает с маской данного
     * маршрута.
     *
     * @param href Адрес страницы.
     */
    Route.prototype.isMatch = function (href) {
        var match = this.regexp.exec(href);
        if (match == null) {
            return false;
        }
        var base = match[0];
        return !this.exact || base === href;
    };
    /**
     * Собирает список значений именованных параметров маски адреса в коллекцию.
     *
     * @param values Список совпадений с регулярным выражением, полученным из
     * маски адреса.
     */
    Route.prototype.createParams = function (values) {
        var length = this.keys.length;
        if (length === 0) {
            return undefined;
        }
        var params = {};
        for (var i = 0; i < length; i += 1) {
            var key = this.keys[i];
            var name_1 = key.name;
            var value = values[i];
            // @ts-ignore
            params[name_1] = value;
        }
        return params;
    };
    /**
     * Получает значения параметров маски данного машрута из указанного адреса
     * или выбрасывает исключение, если адрес не соответствует маске. Если
     * в маске нет именованных параметров, возвращает undefined.
     *
     * @param href Адрес страницы.
     */
    Route.prototype.parse = function (href) {
        var match = this.regexp.exec(href);
        if (match == null) {
            throw new NoMatchesError_1.NoMatchesError(this.getPath(), href);
        }
        var base = match[0], values = match.slice(1);
        if (this.exact && base !== href) {
            throw new NoMatchesError_1.NoMatchesError(this.getPath(), href);
        }
        return this.createParams(values);
    };
    /**
     * Получает значения параметров маски данного маршрута из указанного адреса.
     * Если в маске данного маршрута нет именованных параметров, или адрес не
     * совпадает с ней, возвращает undefined.
     *
     * @param href Адрес страницы.
     */
    Route.prototype.safeParse = function (href) {
        var match = this.regexp.exec(href);
        if (match == null) {
            return undefined;
        }
        var base = match[0], values = match.slice(1);
        if (this.exact && base !== href) {
            return undefined;
        }
        return this.createParams(values);
    };
    return Route;
}(service_1.LazyService));
exports.Route = Route;
