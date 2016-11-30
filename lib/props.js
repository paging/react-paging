import React from 'react'
import { PropTypes, createClass } from 'react'
const example = function () {return arguments;}
// more props read: https://github.com/paging/paging-js createDate
module.exports = {
    defaultProps: {
        wrapClassName: 'pa-paging--fast',
        clsp: 'pa-paging',
        position: [
        	'dataCount',
        	'prevBtn',
        	'firstPage',
        	'prevSomePage',
        	'prevBatch',
        	'currentPage',
        	'nextBatch',
        	'nextSomePage',
        	'pageCount',
            'lastPage',
        	'nextBtn',
        	'status',
        	'goto'
        ],
        render: {
            dataCount: React.createClass({
                render: function () {return (<span>共{this.props.dataCount}条数据</span>)}
            }),
            prevBtn: React.createClass({
                render: function () {return(<span>上一页</span>)}
            }),
            firstPage: React.createClass({
                render: function () {return(<span>1</span>)}
            }),
            prevSomePage: React.createClass({
                render: function () {return(<span>...</span>)}
            }),
            prevBatch: React.createClass({
                render: function () {
                    return  (
                        <span>
                        {
                            this.props.prevBatch[ this.props.prevBatchIndex ]
                        }
                        </span>
                    )
                }
            }),
            currentPage: React.createClass({
                render: function () {return(<span>{this.props.page}</span>)}
            }),
            nextBatch: React.createClass({
                render: function () {
                    return  (
                        <span>
                        {
                            this.props.nextBatch[ this.props.nextBatchIndex ]
                        }
                        </span>
                    )
                }
            }),
            nextSomePage: React.createClass({
                render: function () {return(<span>...</span>)}
            }),
            lastPage: React.createClass({
                render: function () {return(<span>{this.props.pageCount}</span>)}
            }),
            nextBtn: React.createClass({
                render: function () {return(<span>下一页</span>)}
            }),
            status: React.createClass({
                render: function () {
                    return (
                        <span className={this.props.classNames.status}>
                            <span className={this.props.classNames.statusCurrent}>
                                {this.props.page}
                            </span>
                            /
                            <span className={this.props.classNames.statusPageCount}>
                                {this.props.pageCount}
                            </span>
                            <span className={this.props.classNames.satusUnit}>页</span>
                        </span>
                    )
                }
            }),
            goto: 'default'
        }
    },
    propTypes: {
        wrapClassName: PropTypes.string,
        clsp: PropTypes.string
    },
    propExample: {
        wrapClassName:example(
            'pa-paging--status',
            'pa-paging--some'
        ),
        clsp: example(
            'ui-paging',
            'm-paging',
            'm-pagingNight'
        )
    },
    propDesc: {
        wrapClassName: `
Composition wrap element className
        `,
        clsp: `
        ClassName prefix
        `
    }
}
