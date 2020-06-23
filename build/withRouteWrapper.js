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
exports.withRouteWrapper = void 0;
var react_1 = require("react");
/**
 * Оборачивает компонент, который обслуживает маршрут, в обёртку, которая
 * изолирует его от проброса ненужных свойств.
 *
 * @param target Компонент, который обслуживает маршрут.
 */
exports.withRouteWrapper = function (target) { var _a; return _a = /** @class */ (function (_super) {
        __extends(WithRouteHandler, _super);
        function WithRouteHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        WithRouteHandler.prototype.render = function () {
            return react_1.createElement(target);
        };
        return WithRouteHandler;
    }(react_1.Component)),
    /**
     * @inheritdoc
     */
    _a.displayName = "WithRouteHandler(" + (target.displayName || target.name) + ")",
    _a; };
