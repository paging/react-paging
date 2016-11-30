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
                if (state.gotoInput === 0) {
                    state.gotoInput = ''
                }
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
    componentWillReceiveProps (nextProps) {
        const self = this
        if (nextProps.page) {
            self.setState({
                gotoInput: nextProps.page
            })
        }
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
        let pagingData = createData(props)
        let clsp = props.clsp
        let nodes = []
        self.props.position.forEach(function (key, index) {
            let paging = extend(true, {}, pagingData)
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
                            [clsp + 'Disable']: !paging.prevPage
                        })} onClick={function(){
                            if (paging.prevPage) {
                                self.changePage(paging.prevPage)
                            }
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
                        })} onClick={function () {
                            self.changePage(paging.prevSomePage)
                        }} >
                            {createElement(component, paging)}
                        </span>
                    )
                break
                case "prevBatch":
                    paging.prevBatch.forEach(function (item, index) {
                        paging.prevBatchIndex = index
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
                    paging.nextBatch.forEach(function (item, index) {
                        paging.nextBatchIndex = index
                        nodes.push(
                            <span key={'nextBatch' + index} className={`${clsp}-nextBatch`} onClick={function(){
                                self.changePage(item)
                            }} >{createElement(component, paging)}</span>
                        )
                    })
                break
                case "nextSomePage":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-nextSomePage']: true,
                            [clsp + 'Hide']: !paging.nextHasMorePage
                        })} onClick={function () {
                            self.changePage(paging.nextSomePage)
                        }} >
                        {createElement(component, paging)}
                        </span>
                    )
                break
                case "lastPage":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-lastPage']: true,
                            [clsp + 'Hide']: paging.isLastPage || paging.page === paging.pageCount
                        })} onClick={function(){
                            self.changePage(paging.pageCount)
                        }} >{createElement(component, paging)}</span>
                    )
                break
                case "nextBtn":
                    OutputComponent = (
                        <span key={index} className={classNames({
                            [clsp + '-nextBtn']: true,
                            [clsp + 'Disable']: !paging.nextPage
                        })} onClick={function(){
                            if (paging.nextPage) {
                                self.changePage(paging.nextPage)
                            }
                        }} >
                            {createElement(component, paging)}
                        </span>
                    )
                break
                case "status":
                    paging.classNames = {
                        status: `${clsp}-status`,
                        statusCurrent: `${clsp}-status-current`,
                        statusPageCount: `${clsp}-status-pageCount`,
                        satusUnit: `${clsp}-status-unit`
                    }
                    paging.key = index
                    OutputComponent = createElement(component, paging)
                break
                case "goto":
                    if (component && component !== 'default') {
                        OutputComponent = (<component {...paging} key={index} />)
                    }
                    else {
                        OutputComponent = (
                            <span key={index} className={`${clsp}-goto`} >
                                <input ref="gotoInput" className={`${clsp}-goto-input`} value={self.state.gotoInput} onChange={function (e) {
                                    self.ms({
                                        type: 'CHANGE_GOTO_INPUT',
                                        value: e.target.value
                                    })
                                }} />
                                <span className={`${clsp}-goto-submit`} onClick={function () {
                                    if (self.state.gotoInput) {
                                        if (self.state.gotoInput !== paging.page) {
                                            self.changePage(self.state.gotoInput)
                                        }
                                    }
                                    else {
                                        self.refs.gotoInput.focus()
                                    }
                                }} >跳转</span>
                            </span>
                        )
                    }
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
                [clsp + 'Hide']: pagingData.hasPaging
            })}>
                {nodes}
            </span>
        )
    }
}
Paging.defaultProps = props.defaultProps
Paging.propTypes = props.propTypes

module.exports = Paging
