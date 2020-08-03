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
exports.Route = void 0;
var store_1 = require("@devim-front/store");
var react_1 = require("react");
var path_to_regexp_1 = require("path-to-regexp");
var react_router_dom_1 = require("react-router-dom");
var mobx_1 = require("mobx");
var UndefinedComponentError_1 = require("./UndefinedComponentError");
var UndefinedPathError_1 = require("./UndefinedPathError");
var withRouteWrapper_1 = require("./withRouteWrapper");
var NoMatchesError_1 = require("./NoMatchesError");
var RouterStore_1 = require("./RouterStore");
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
     * Разбирает указанный адрес с помощью регулярного выражения, полученного
     * из маски маршрута, и возвращает массив совпавших с ним подстрок,
     * исключая первую (сам адрес целиком). Если адрес не соответствует маске,
     * возвращает undefined.
     *
     * @param href Адрес страницы.
     */
    Route.prototype.getValues = function (href) {
        var match = this.regexp.exec(href);
        if (match == null) {
            return undefined;
        }
        var base = match[0], values = match.slice(1);
        if (this.exact && base !== href) {
            return undefined;
        }
        return values;
    };
    /**
     * Возвращает true, если указанный адрес страницы совпадает с маской данного
     * маршрута.
     *
     * @param href Адрес страницы.
     */
    Route.prototype.isMatch = function (href) {
        var values = this.getValues(href);
        return values != null;
    };
    /**
     * Получает значения параметров маски данного машрута из указанного адреса
     * или выбрасывает исключение, если адрес не соответствует маске. Если
     * в маске нет именованных параметров, возвращает undefined.
     *
     * @param href Адрес страницы.
     * @param isThrow Указывает, следует ли выбрасывать исключение, если указанный
     * адрес страницы не соответствует маршруту. Если false, то в случае
     * несоответствия адреса метод вернет undefined. По умолчанию true.
     */
    Route.prototype.parse = function (href, isThrow) {
        if (isThrow === void 0) { isThrow = true; }
        var values = this.getValues(href);
        if (values == null) {
            if (isThrow) {
                throw new NoMatchesError_1.NoMatchesError(this.getPath(), href);
            }
            return undefined;
        }
        return this.createParams(values);
    };
    Object.defineProperty(Route.prototype, "isActive", {
        /**
         * Указывает, что текущий адрес страницы соответствует данному маршруту.
         */
        get: function () {
            return this.isMatch(RouterStore_1.RouterStore.get().href);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "params", {
        /**
         * Коллекция значений параметров маски данного маршрута или пустой объект,
         * если или текущий адрес страницы не совпадает с маской, или в маске нет
         * именованных параметров.
         */
        get: function () {
            return this.parse(RouterStore_1.RouterStore.get().href, false) || {};
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Вызывает перенаправление на адрес, полученный в результате подстановки
     * указанной коллекции параметров в маску данного маршрута.
     *
     * Отличается от метода redirect тем, что не возвращает элемент <Redirect />
     * из библиотеки react-router-dom, а использует mobx, чтобы инициировать
     * перенаправление. Таким образом, этот метод предназначен для вызова внутри,
     * например, сервисов и хранилищ, а не при построении Virtual DOM.
     *
     * @param params Коллекция именованных параметров для подстановки в маску
     * адреса данного маршрута.
     */
    Route.prototype.doRedirect = function (params) {
        var href = this.href(params);
        RouterStore_1.RouterStore.get().setRedirect(href, true);
    };
    /**
     * Вызывает перенаправление на адрес, полученный в результате подстановки
     * указанной коллекции параметров в маску данного маршрута.
     *
     * Отличается от метода replace тем, что не возвращает элемент <Redirect /> из
     * библиотеки react-router-dom, а использует mobx, чтобы инициировать
     * перенаправление. Таким образом, этот метод предназначен для вызова внутри,
     * например, сервисов и хранилищ, а не при построении Virtual DOM.
     *
     * @param params Коллекция именованных параметров для подстановки
     * в маску данного маршрута.
     */
    Route.prototype.doReplace = function (params) {
        var href = this.href(params);
        RouterStore_1.RouterStore.get().setRedirect(href, false);
    };
    __decorate([
        mobx_1.computed
    ], Route.prototype, "isActive", null);
    __decorate([
        mobx_1.computed
    ], Route.prototype, "params", null);
    return Route;
}(store_1.LazyStore));
exports.Route = Route;
