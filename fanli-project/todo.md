## TODO

### 计划目录结构
- 开发目录
```javascript
    src: 
        ├─asset
        |   ├─images
        |   ├─css
        |   └─js
        |
        ├─pages
        |   ├─index
        |   |   ├─main.js
        |   |   ├─router
        |   |   ├─components
        |   |   └─index.vue
        |   |
        |   ├─page1
        |   |   ├─main.js
        |   |   ├─router
        |   |   ├─components
        |   |   └─index.vue
        |   ├─ ...
        |
        ├─template
        |
        └─components   //存放页面中共用的
 
```
- 打包后目录
```javascript
    dist:
        ├─asset
        |   ├─image
        |   ├─css
        |   └─js    
        |
        ├─index.html
        |
        ├─index
        |   ├─css
        |   └─js 
        |
        ├─page1
        |   ├─css
        |   ├─js
        |   └─index.html
        |
        ├─ ...
```

### 目标工作方式

- 开发

``` javascript
    // 创建一个CLI => 需要一个基础的demo
    npm install -g bob-builder

    //通过 bob-builder创建一个project (可以选择参数是否支持Vuex)
    bob create project-name

```

### 我们怎么做

- 产出一个空的vue-project
- 一个公共的文件夹，base.css base.js
- 将vue-project 发布到npm 可以使用`bob`命令下载vue-project  
- 列出项目常用的vue组件，查漏补缺
- 将这些组件以相同的开发方式，发布到vue的组件库，可通过npm 安装

### 问题
- 开发
    - 是否需要一个公共的库 如何维护公共的修改的部分，比如base.js base.css,并保持各个环境的一致。
        - 不能将base.css打包到项目文件里，需要外部引用
        - 维护一个公用的common文件夹
    - vuejs 等库是否需要统一入口统一版本
        - vuejs需要打包到项目里

- 发布
    - 把文件夹放到哪里？比如super/h5/search、 super/pc/mama/、 haitao/h5/search 如果是一个新项目，发布拿到的是一个文件，/search如何决定放哪里？

- 其他：
    - 是否准备一个fanli-fe github orgnization?


### Refrence
 - [vue-cli是如何工作的](https://segmentfault.com/a/1190000009803941)
  vue-cli 3.0后将init转化为create 

