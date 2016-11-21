import {PropTypes} from 'react'
const example = function () {return arguments;}
// more props read: https://github.com/paging/paging-js createDate
module.exports = {
    defaultProps: {
        wrapClassName: 'pa-paging--fast',
        clsp: 'pa-paging'
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
