# react-paging

> React,Paging generator,Completely custom style. 可完全自定义界面的 React 分页

[![Build Status](https://api.travis-ci.org/paging/react-paging.svg)](https://travis-ci.org/paging/react-paging) [![NPM version](https://img.shields.io/npm/v/react-paging.svg?style=flat)](https://npmjs.org/package/react-paging) [![NPM downloads](https://img.shields.io/npm/dt/react-paging.svg)](https://npmjs.org/package/react-paging)

<!-- MARKRUN-HTML <div style="display:none;"  > -->

[🔗 Live demo](https://paging.github.io/react-paging/)  
[🕐 Releases](https://github.com/paging/react-paging/releases)

🌀 [Example](./example/README.md) 🌀 [Doc](./doc/README.md) 🌀 [Test](./test/README.md)  

<!-- MARKRUN-HTML </div> -->

## 📦 Install

```shell
npm i react-paging --save
```

## 📄 Usage

````html
<div id="demo"></div>
````
````css
.my-paging--some .pa-paging-currentPage{
    color:red;
}
````
````js
var Paging = require('react-paging')
var React = require('react')
var App = React.createClass({
    getInitialState: function () {
        return {
            page: 1
        }
    },
    render: function () {
        var self = this
        var props = {
            wrapClassName: 'my-paging--some',
            page: self.state.page,
            pageCount: 10,
            onChange: function (page) {
                self.setState({
                    page: page
                })
            }
        }
        return (
            <Paging {...props}/>
        )
    }
})

ReactDOM.render(<App />, document.getElementById('demo'))
````

## props

[props](./lib/props.js)
<!--MARKRUN-REPLACE
{
    type: 'react-props',
    file: './lib/props.js'
}
-->


<!--MARKRUN-HTML
<style>.gc-comments {font:12px/1.5 Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif}</style>
<script src="https://unpkg.com/github-comments@latest/gc.js"></script>
<div class="gc-comments" data-repos="paging/react-paging" data-issues="1" >
    <div class="gc-comments-title">
        Comments
    </div>
    <div class="gc-comments-info">
        Synchronous comments <a target="_blank" href="issues_link">issues_link</a>
    </div>
</div>
-->

## 🔨 development

```shell
npm i -g fis3 --registry=https://registry.npm.taobao.org
# Install dependencies | 安装依赖
npm run dep
    # > Suggested Use `yarn` replace `npm run dep` | 建议使用 `yarn` 替代 `npm run dep`
    # npm i -g yarn
    # npm run yi

# Server
npm run s

# Build
npm run dev


#  build document ./output | 构建 gh-pages 版本 到 output/
npm run gh
#  git push ./output branch:gh-pages | 将 output/** 发布到 gh-pages 分支
npm run gh-push
# build commonjs code ./output | 构建 npm 要发布的代码到 output/
npm run npm
cd ./output
npm publish
```

Build based on [fast-boot](https://github.com/fast-flow/boot#react-branch)

> For npm owner: npm publish Need to be in ./output
