"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _paging = require("paging");

var _react = require("react");

var _extend = require("extend");

var _extend2 = _interopRequireDefault(_extend);

var _props = require("./props");

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./index.css');

var Paging = function (_Component) {
    _inherits(Paging, _Component);

    function Paging(props) {
        _classCallCheck(this, Paging);

        var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

        var paging = (0, _paging.createData)(props);
        _this.state = {
            gotoInput: paging.page
        };
        return _this;
    }

    _createClass(Paging, [{
        key: "ms",
        value: function ms(action) {
            var self = this;
            var state = self.state;
            switch (action.type) {
                case 'CHANGE_GOTO_INPUT':
                    state.gotoInput = action.value;
                    var rNumber = /\D/g;
                    if (rNumber.test(state.gotoInput)) {
                        state.gotoInput = state.gotoInput.replace(rNumber, '');
                    }
                    state.gotoInput = Number(state.gotoInput);
                    if (state.gotoInput === 0) {
                        state.gotoInput = '';
                    }
                    if (isNaN(state.gotoInput)) {
                        state.gotoInput = '';
                    }
                    break;
                case 'CHANGE_PAGE':
                    self.props.onChange(action.page);
                default:
            }
            self.setState(state);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var self = this;
            if (nextProps.page) {
                self.setState({
                    gotoInput: nextProps.page
                });
            }
        }
    }, {
        key: "changePage",
        value: function changePage(page) {
            var self = this;
            self.ms({
                type: 'CHANGE_PAGE',
                page: page
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _classNames8;

            var self = this;
            var props = self.props;
            var pagingData = (0, _paging.createData)(props);
            var clsp = props.clsp;
            var nodes = [];
            self.props.position.forEach(function (key, index) {
                var _classNames, _classNames2, _classNames3, _classNames4, _classNames5, _classNames6, _classNames7;

                var paging = (0, _extend2["default"])(true, {}, pagingData);
                var component = self.props.render[key];
                var OutputComponent = void 0;
                switch (key) {
                    case "dataCount":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, clsp + '-dataCount', true), _defineProperty(_classNames, clsp + 'Hide', !paging.dataCount), _classNames)) },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "prevBtn":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames2 = {}, _defineProperty(_classNames2, clsp + '-prevBtn', true), _defineProperty(_classNames2, clsp + 'Disable', !paging.prevPage), _classNames2)), onClick: function onClick() {
                                    if (paging.prevPage) {
                                        self.changePage(paging.prevPage);
                                    }
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "firstPage":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames3 = {}, _defineProperty(_classNames3, clsp + '-firstPage', true), _defineProperty(_classNames3, clsp + 'Hide', paging.isFirstPage), _classNames3)), onClick: function onClick() {
                                    self.changePage(1);
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "prevSomePage":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames4 = {}, _defineProperty(_classNames4, clsp + '-prevSomePage', true), _defineProperty(_classNames4, clsp + 'Hide', !paging.prevHasMorePage), _classNames4)), onClick: function onClick() {
                                    self.changePage(paging.prevSomePage);
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "prevBatch":
                        paging.prevBatch.forEach(function (item, index) {
                            paging.prevBatchIndex = index;
                            nodes.push(require("react").createElement(
                                "span",
                                { key: 'prevBatch' + index, className: clsp + "-prevBatch", onClick: function onClick() {
                                        self.changePage(item);
                                    } },
                                (0, _react.createElement)(component, paging)
                            ));
                        });
                        break;
                    case "currentPage":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: clsp + "-currentPage", onClick: function onClick() {
                                    self.changePage(paging.page);
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "nextBatch":
                        paging.nextBatch.forEach(function (item, index) {
                            paging.nextBatchIndex = index;
                            nodes.push(require("react").createElement(
                                "span",
                                { key: 'nextBatch' + index, className: clsp + "-nextBatch", onClick: function onClick() {
                                        self.changePage(item);
                                    } },
                                (0, _react.createElement)(component, paging)
                            ));
                        });
                        break;
                    case "nextSomePage":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames5 = {}, _defineProperty(_classNames5, clsp + '-nextSomePage', true), _defineProperty(_classNames5, clsp + 'Hide', !paging.nextHasMorePage), _classNames5)), onClick: function onClick() {
                                    self.changePage(paging.nextSomePage);
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "lastPage":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames6 = {}, _defineProperty(_classNames6, clsp + '-lastPage', true), _defineProperty(_classNames6, clsp + 'Hide', paging.isLastPage || paging.page === paging.pageCount), _classNames6)), onClick: function onClick() {
                                    self.changePage(paging.pageCount);
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "nextBtn":
                        OutputComponent = require("react").createElement(
                            "span",
                            { key: index, className: (0, _classnames2["default"])((_classNames7 = {}, _defineProperty(_classNames7, clsp + '-nextBtn', true), _defineProperty(_classNames7, clsp + 'Disable', !paging.nextPage), _classNames7)), onClick: function onClick() {
                                    if (paging.nextPage) {
                                        self.changePage(paging.nextPage);
                                    }
                                } },
                            (0, _react.createElement)(component, paging)
                        );
                        break;
                    case "status":
                        paging.classNames = {
                            status: clsp + "-status",
                            statusCurrent: clsp + "-status-current",
                            statusPageCount: clsp + "-status-pageCount",
                            satusUnit: clsp + "-status-unit"
                        };
                        paging.key = index;
                        OutputComponent = (0, _react.createElement)(component, paging);
                        break;
                    case "goto":
                        if (component && component !== 'default') {
                            OutputComponent = require("react").createElement("component", _extends({}, paging, { key: index }));
                        } else {
                            OutputComponent = require("react").createElement(
                                "span",
                                { key: index, className: clsp + "-goto" },
                                require("react").createElement("input", { ref: "gotoInput", className: clsp + "-goto-input", value: self.state.gotoInput, onChange: function onChange(e) {
                                        self.ms({
                                            type: 'CHANGE_GOTO_INPUT',
                                            value: e.target.value
                                        });
                                    } }),
                                require("react").createElement(
                                    "span",
                                    { className: clsp + "-goto-submit", onClick: function onClick() {
                                            if (self.state.gotoInput) {
                                                if (self.state.gotoInput !== paging.page) {
                                                    self.changePage(self.state.gotoInput);
                                                }
                                            } else {
                                                self.refs.gotoInput.focus();
                                            }
                                        } },
                                    "\u8DF3\u8F6C"
                                )
                            );
                        }
                        break;
                }
                if (OutputComponent) {
                    nodes.push(OutputComponent);
                }
            });
            return require("react").createElement(
                "span",
                { className: (0, _classnames2["default"])((_classNames8 = {}, _defineProperty(_classNames8, clsp, true), _defineProperty(_classNames8, props.wrapClassName, true), _defineProperty(_classNames8, clsp + 'Hide', pagingData.hasPaging), _classNames8)) },
                nodes
            );
        }
    }]);

    return Paging;
}(_react.Component);

Paging.defaultProps = _props2["default"].defaultProps;
Paging.propTypes = _props2["default"].propTypes;

module.exports = Paging;