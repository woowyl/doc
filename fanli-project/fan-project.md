<!-- 
	$height: 11in
-->

<!-- 
	$width: 20in
-->
<!-- $size: 16:9 -->
---
Fanli-cli 项目开发
===

## 一、 环境配置  

## 二、项目初始化

## 三、开发流程

## 四、发布流程

## 五、注意事项-补充 

---

## 一、环境配置 （初始配置，后续开发无需重复配置）

 - ### 安装cli    

	```javascript
    
    	npm install -g fanli-cli
    	
    ```
     <br>
      
 - ### 下载`raw`文件夹（`git@github.com:Fanli-FE/raw.git`）到 `/workdata/`文件夹下

---

## 二、 项目初始化
- 获取代码
   
	- 开发新需求

      ```javascript

          fed create <storyXXXX> <project-name>

      ```
    	
	- 已有需求修改

      ```javascript

          fed fetch <storyXXXX> <project-name>

      ```
- 初始化代码

	```javascript
    	
  		cd storyXXXX/project-name
        
   		npm install 
    
   	```


---

## 三、 开发流程
 <br>

 - 项目配置  
 
 <br>
 
 - 业务开发
---
1. ### 项目配置

    1. 根据项目需求选择合适的目录结构
        - 单页 —— 删除多余文件夹，只留下单独
        - 多页 —— 根据页面情况，添加对应文件夹

  	2. 配置 `build/webpack.fanli.conf`
        ```json
            module.exports = [
                {
                    pageName: 'index',     //打包后
                    pageTitle: '首页',     //页面标题
                    remwidth: 750,        //设计稿尺寸
                    remswitch: 1          //?  
                },
                ...
            ]

        ```
    1. 查看开发效果

        ```
            npm run dev
        ```

    1. 开发完成生产发布文件

        ``` 
            npm run build 
        ```
---
2. ### 业务开发

    1. ##### 技术要求
       - Vue —— .vue的开发方式（必须）
         <img src="https://cn.vuejs.org/images/vue-component.png" width="500px">
       - ES6 （必须）
       - less (推荐)
       - Vuex (可选)

---


 2. #### 目录结构
 
```javascript
  src: 
        ├─assets (可选)
        |   ├─images                // 放全站共用的图片，比如logo
        |   └─style                 // 全站共用的样式，此内容可写在公共组件中，公共组件的共用部分可抽象在这里
        |       ├─base.css      
        |       └─base.less   
        |
        ├─pages
        |   |
        |   ├─index     
        |   |   ├─main.js           // 入口文件，处理全局依赖和Vue初始化 
        |   |   ├─App.vue           // 入口模板，对应之前的 index.html       
        |   |   |  
        |   |   ├─router            //定义路由
        |   |   |   └─index.js
        |   |   |
        |   |   ├─images            //项目内图片
        |   |   ├─components        //项目内组件，推荐路由组件和其他组件分类创建
        |   |   |
        |   |   └─store (vuex 可选)
        |   |       ├─action.js
        |   |       ├─index.js
        |   |       └─mutations.js
        |   |
        |   ├─page1                 //直出页面，只有html的页面
        |   |   ├─main.js
        |   |   └─index.vue
        |   ├─ ...
        |
        └─components                //存放页面中共用的组件，比如头部和底部
            ├─footer.vue
            └─header.vue
```

---
## 四 、注意事项
1. ###  如需使用公共less样式，需要在.vue的`<style>`标签中单独引入

	```javascript
    
      @import '~^/assets/style/cli.less';
    
    ```
3. ### 可根据开发需求，安装对应的npm包，但为了开发版本一直，package.json中版本号只允许出现 `^` 和 `=`。


         
  ---

3. ### 发送Http请求，Vue推荐使用`axios`库
	1.  安装: `npm install --save axios vue-axios`   
	2.  添加到入口文件 
        ```javascript
          import Vue from 'vue'
          import axios from 'axios'
          import VueAxios from 'vue-axios'

          Vue.use(VueAxios, axios)
        ```
     3. 在methods中使用（三选一即可）：
         ```javascript
              Vue.axios.get(api).then((response) => {
                console.log(response.data)
              })

              this.axios.get(api).then((response) => {
                console.log(response.data)
              })

              this.$http.get(api).then((response) => {
                console.log(response.data)
              })
         ```

---

## 问题

1. UBT埋点
1. 懒加载
1. axios是否要加入到种子项目中
1. 测试打包后文件的展示情况
1. [svnignore](https://stackoverflow.com/questions/17298668/svn-ignore-like-gitignore)