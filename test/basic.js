// Don't delete code
window.require = function (path) {
    if (path === 'react') {
        return React
    }
}

// http://wiki.jikexueyuan.com/project/react/test-utilities.html
var TestUtils = React.addons.TestUtils
var Simulate = TestUtils.Simulate
var render = TestUtils.renderIntoDocument
// expect https://github.com/Automattic/expect.js


// _Package = require('../index')
describe('#basic.js', function() {
    it('render success', function (){
        var node = render(<_Package />)
        expect(node.refs.wrap).to.not.a('undefined')
    })
    it('set title', function (){
        var title = "demo"
        var node = render(<_Package title={title} />)
        expect(node.refs.wrap.innerHTML).eql(title)
    })
    it('click wrap', function () {
        var node = render(<_Package />)
        Simulate.click(node.refs.wrap)
        var dataTime = node.refs.wrap.getAttribute('data-time')
        expect(dataTime).not.to.eql('')
    })
})
