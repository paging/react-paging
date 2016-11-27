require('./index.css')
import classNames from "classnames"
import { createData } from "paging"
import { Component, createElement, createClass} from 'react'
import extend from "extend"
import props from './props'

class Paging extends Component {
    constructor(props) {
        super(props)
        let paging = createData(props)
        this.state = {
            gotoInput: paging.page
        }
    }
    ms(action) {
        let self = this
        let state = self.state
        switch(action.type) {
            case 'CHANGE_GOTO_INPUT':
                state.gotoInput = action.value
                let rNumber = /\D/g
                if (rNumber.test(state.gotoInput)) {
                    state.gotoInput = state.gotoInput.replace(rNumber, '')
                }
                state.gotoInput = Number(state.gotoInput)
                if (isNaN(state.gotoInput)) {
                    state.gotoInput = ''
                }
            break
            case 'CHANGE_PAGE':
                self.props.onChange(action.page)
            default:
        }
        self.setState(state)

    }
    changePage(page) {
        let self = this
        self.ms({
            type: 'CHANGE_PAGE',
            page: page
        })
    }
    render() {
        let self = this
        let props = self.props
        let paging = createData(props)
        let clsp = props.clsp
        let nodes = []
        self.props.position.forEach(function (key, index) {
            let component = self.props.render[key]
            let OutputComponent
            switch (key) {
                case "dataCount":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-dataCount']: true,
                            [clsp + 'Hide']: !paging.dataCount
                        })}>
                            {createElement(component, paging)}
                        </span>
                    )
                break
                case "prevBtn":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-prevBtn']: true,
                            [clsp + 'Hide']: !paging.prevPage
                        })} onClick={function(){
                            self.changePage(paging.prevPage)
                        }} >
                            {createElement(component, paging)}
                        </span>
                    )
                break
                case "firstPage":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-firstPage']: true,
                            [clsp + 'Hide']: paging.isFirstPage
                        })} onClick={function(){
                            self.changePage(1)
                        }} >{createElement(component, paging)}</span>
                    )
                break
                case "prevSomePage":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-prevSomePage']: true,
                            [clsp + 'Hide']: !paging.prevHasMorePage
                        })}>
                            {createElement(component, paging)}
                        </span>
                    )
                break
                case "prevBatch":
                    paging.prevBatchIndex = index
                    paging.prevBatch.forEach(function (item, index) {
                        nodes.push(
                            <span key={'prevBatch' + index} className={`${clsp}-prevBatch`} onClick={function(){
                                self.changePage(item)
                            }} >{createElement(component, paging)}</span>
                        )
                    })
                break
                case "currentPage":
                    OutputComponent = (
                        <span key={index} className={`${clsp}-currentPage`} onClick={function(){
                            self.changePage(paging.page)
                        }} >{createElement(component, paging)}</span>
                    )
                break
                case "nextBatch":
                    paging.nextBatchIndex = index
                    paging.nextBatch.forEach(function (item, index) {
                        nodes.push(
                            <span key={'nextBatch' + index} className={`${clsp}-nextBatch`} onClick={function(){
                                self.changePage(item)
                            }} >{createElement(component, paging)}</span>
                        )
                    })
                break
            }
            if (OutputComponent) {
                nodes.push(OutputComponent)
            }
        })
        return (
            <span className={classNames({
                [clsp]: true,
                [props.wrapClassName]: true,
                [clsp + 'Hide']: paging.hasPaging
            })}>
                {nodes}
                <span className={classNames({
                    [clsp + '-nextSomePage']: true,
                    [clsp + 'Hide']: !paging.nextHasMorePage
                })}>
                ...
                </span>
                <span className={classNames({
                    [clsp + '-lastPage']: true,
                    [clsp + 'Hide']: paging.isLastPage || paging.page === paging.pageCount
                })} onClick={function(){
                    self.changePage(paging.pageCount)
                }} >{paging.pageCount}</span>
                <span className={classNames({
                    [clsp + '-nextBtn']: true,
                    [clsp + 'Hide']: !paging.nextPage
                })} onClick={function(){
                    self.changePage(paging.nextPage)
                }} >
                    下一页
                </span>
                <span className={`${clsp}-status`}>
                    <span className={`${clsp}-status-current`}>{paging.page}</span><span className={`${clsp}-status-pageCount`}>/{paging.pageCount}</span>
                    <span className={`${clsp}-status-unit`}>页</span>
                </span>
                <input ref="gotoInput" className={`${clsp}-gotoInput`} value={self.state.gotoInput} onChange={function (e) {
                    self.ms({
                        type: 'CHANGE_GOTO_INPUT',
                        value: e.target.value
                    })
                }} />
                <span className={`${clsp}-gotoSubmit`} onClick={function () {
                    if (self.state.gotoInput) {
                        self.changePage(self.state.gotoInput)
                    }
                    else {
                        self.refs.gotoInput.focus()
                    }
                }} >跳转</span>
            </span>
        )
    }
}
Paging.defaultProps = props.defaultProps
Paging.propTypes = props.propTypes

module.exports = Paging
