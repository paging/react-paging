require('./index.css')
import classNames from "classnames"
import { createData } from "paging"
import {Component} from 'react'
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
        return (
            <span className={classNames({
                [clsp]: true,
                [props.wrapClassName]: true,
                [clsp + '--hasPaging']: paging.hasPaging
            })}>
                <span className={classNames({
                    [clsp + '-dataCount']: true,
                    [clsp + '-dataCount--none']: !paging.dataCount
                })}>共{paging.dataCount}条数据</span>
                <span className={classNames({
                    [clsp + '-prevBtn']: true,
                    [clsp + '-prevBtn--none']: !paging.prevPage
                })} onClick={function(){
                    self.changePage(paging.prevPage)
                }} >
                    上一页
                </span>

                <span className={classNames({
                    [clsp + '-firstPage']: true,
                    [clsp + '-firstPage--none']: paging.isFirstPage
                })} onClick={function(){
                    self.changePage(1)
                }} >1</span>
                <span className={classNames({
                    [clsp + '-prevSomePage']: true,
                    [clsp + '-prevSomePage--none']: !paging.prevHasMorePage
                })}>
                ...
                </span>
                {
                    paging.prevBatch.map(function (item, index) {
                        return (
                            <span key={index} className={`${clsp}-prevBatch`} onClick={function(){
                                self.changePage(item)
                            }} >{item}</span>
                        )
                    })
                }
                <span className={`${clsp}-currentPage`} onClick={function(){
                    self.changePage(paging.page)
                }} >{paging.page}</span>
                {
                    paging.nextBatch.map(function (item, index) {
                        return (
                            <span key={index} className={`${clsp}-nextBatch`} onClick={function(){
                                self.changePage(item)
                            }} >{item}</span>
                        )
                    })
                }
                <span className={classNames({
                    [clsp + '-nextSomePage']: true,
                    [clsp + '-nextSomePage--none']: !paging.nextHasMorePage
                })}>
                ...
                </span>
                <span className={classNames({
                    [clsp + '-lastPage']: true,
                    [clsp + '-lastPage-none']: paging.isLastPage || paging.page === paging.pageCount
                })} onClick={function(){
                    self.changePage(paging.pageCount)
                }} >{paging.pageCount}</span>
                <span className={classNames({
                    [clsp + '-nextBtn']: true,
                    [clsp + '-nextBtn--none']: !paging.nextPage
                })} onClick={function(){
                    self.changePage(paging.nextPage)
                }} >
                    下一页
                </span>
                <span className={`${clsp}-status`}>
                    <span className={`${clsp}-status-current`}>{paging.page}</span><span className={`${clsp}-status-pageCount`}>/{paging.pageCount}</span>
                </span>
                <span className={`${clsp}-statusUnit`}>页</span>
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
