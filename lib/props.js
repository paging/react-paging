'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var example = function example() {
    return arguments;
};
// more props read: https://github.com/paging/paging-js createDate
module.exports = {
    defaultProps: {
        wrapClassName: 'pa-paging--fast',
        clsp: 'pa-paging',
        position: ['dataCount', 'prevBtn', 'firstPage', 'prevSomePage', 'prevBatch', 'currentPage', 'nextBatch', 'nextSomePage', 'pageCount', 'lastPage', 'nextBtn', 'status', 'goto'],
        render: {
            dataCount: _react2["default"].createClass({
                displayName: 'dataCount',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '\u5171',
                        this.props.dataCount,
                        '\u6761\u6570\u636E'
                    );
                }
            }),
            prevBtn: _react2["default"].createClass({
                displayName: 'prevBtn',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '\u4E0A\u4E00\u9875'
                    );
                }
            }),
            firstPage: _react2["default"].createClass({
                displayName: 'firstPage',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '1'
                    );
                }
            }),
            prevSomePage: _react2["default"].createClass({
                displayName: 'prevSomePage',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '...'
                    );
                }
            }),
            prevBatch: _react2["default"].createClass({
                displayName: 'prevBatch',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        this.props.prevBatch[this.props.prevBatchIndex]
                    );
                }
            }),
            currentPage: _react2["default"].createClass({
                displayName: 'currentPage',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        this.props.page
                    );
                }
            }),
            nextBatch: _react2["default"].createClass({
                displayName: 'nextBatch',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        this.props.nextBatch[this.props.nextBatchIndex]
                    );
                }
            }),
            nextSomePage: _react2["default"].createClass({
                displayName: 'nextSomePage',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '...'
                    );
                }
            }),
            lastPage: _react2["default"].createClass({
                displayName: 'lastPage',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        this.props.pageCount
                    );
                }
            }),
            nextBtn: _react2["default"].createClass({
                displayName: 'nextBtn',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        null,
                        '\u4E0B\u4E00\u9875'
                    );
                }
            }),
            status: _react2["default"].createClass({
                displayName: 'status',

                render: function render() {
                    return require("react").createElement(
                        'span',
                        { className: this.props.classNames.status },
                        require("react").createElement(
                            'span',
                            { className: this.props.classNames.statusCurrent },
                            this.props.page
                        ),
                        '/',
                        require("react").createElement(
                            'span',
                            { className: this.props.classNames.statusPageCount },
                            this.props.pageCount
                        ),
                        require("react").createElement(
                            'span',
                            { className: this.props.classNames.satusUnit },
                            '\u9875'
                        )
                    );
                }
            }),
            "goto": 'default'
        }
    },
    propTypes: {
        wrapClassName: _react.PropTypes.string,
        clsp: _react.PropTypes.string
    },
    propExample: {
        wrapClassName: example('pa-paging--status', 'pa-paging--some'),
        clsp: example('ui-paging', 'm-paging', 'm-pagingNight')
    },
    propDesc: {
        wrapClassName: '\nComposition wrap element className\n        ',
        clsp: '\n        ClassName prefix\n        '
    }
};