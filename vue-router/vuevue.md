<!-- 
	$height: 10in
-->

<!-- 
	$width: 12in
-->

Vue 分享
===
- 2017-9-28
- by 王远亮

---
## 1. Vue Router的基础使用
## 2. vue组件间通信
## 3. 使用中的一些注意点
 
---


# 1.Vue Router 的基础使用
  
- What？
- Why?
- How?

---

## 1.1 What
vue-router是Vue.js  ***官方***  的路由**插件**，它和Vue.js是深度集成的，适合用于构建单页面应用。Vue的单页面应用是基于路由和**组件**的，路由用于设定访问路径，并将路径和**组件**映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是**组件**的切换。

---
## 1.2 Why
 
 1.2.1 为什么要替换原有的路由方式？
 1.2.2 不使用路由插件，是否可以实现相同的功能？
 
---

### 1.2.1 为什么要替换原有的路由方式

- 目前我们采用的主要是后端路由和a标签直接路由到Html的方式,每次点击后需要刷新页面，重新渲染页面，无法完成单页面应用的功能。
- 路由由后端确认，但页面由前端开发，虽然可以通过固定命名格式的方式约束两者的统一，但仍然会有一定的沟通成本。路由的前端定义也是前后端分离的重要一步。

---

### 1.2.2 如果不使用路由插件，是否可以实现相同的功能？
理论上是可行的，可以通过变量去控制组件的显示与否，去完成页面不同内容的展示。但存在两个明显的问题：
 - 需要一次加载完一个系统所有用到的组件，无法做到按需加载
 - 组件数量庞大后，控制显示的变量会越来越多，难以维护


而上面的两个问题，通过vue-router都可以避免，做到不同路由对应不同组件，按需异步加载，实现无刷新单页面。

---

## 1.3 How

##### 1.3.1 基础使用
##### 1.3.2 路由传参
##### 1.3.3 嵌套路由
---

### 1.3.1 基础使用
一、引入js文件
``` javascript
    <script src = 'libs/vue-2.4.4.js'></script>
    <script src = 'libs/vue.router.js'></script>
```
二、放入 `<router-view>`和路由地址
```html
<router-view></router-view>
```

```html
<router-link to="/index">首页</router-link>
<router-link to="/about">关于我</router-link>
```
三、定义路由组件
	
```js
//这里的组件和vue的组件不完全相同，组件里可以是vue组件
var index = { template: '<index></index>' }
var about = { template: '<about></about>' }
var tag = { template: '<div class = "content">这里是一个tag</div>'}
```
---
四、定义路由
```javacript
var routes = [
  { path: '/index', component: index },
  { path: '/about', component: about },
  { path: '/tag', component: tag}
]
```

五、创建Router
```javascript
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes  ie9不兼容
})
```
六、在单页应用中挂载
```javascript
var app = new Vue({
    router: router,
    el: '#V_router',
    data: {}
});
```
[demo](http://localhost:8088/vue/router1/#/index)

---
### 1.3.2路由传参
>参照商家联盟，根据路由参数获取分组详情

一、如果是相同的模板，可以映射在一个组件上。在定义路由的时候这里只定义了一次，通过参数去区分不同的内容。
```javascript
var routes = [
  { path: '/type/:skill', component: type }
]
```

二、获取路由参数的方式

**this.$route.params.参数名**
```javascript
data: function() {
     return {
     //只执行一次
     // skill :  this.$route.params.skill
     }
},
computed: {
     skill: function(){
     	return this.$route.params.skill;
     } 
},
```

---

三、组件的复用

因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
详见demo中的mounted执行。

解决方法：
- 使用computed
- 使用watch监听$route对象

[demo](http://localhost:8088/vue/router2/#/type/C++)

---

### 1.3.3嵌套路由

当有在route-view中 仍然可以抽象出公用组件时，我们就可以使用嵌套路由

一、路由的定义
```javascript
{ 
path: '/index', component: index,
        children: [
            {
                path: 'tab1',
                component: tab1
            },{
                path: 'tab2',
                component: tab2
            }]
  },
```

二、路由跳转的JS方式
 - router.push('Tab2')
 - router.push({ name: 'user', params: { userId: 123 }})

[demo](http://localhost:8088/vue/router3/#/)

---
# 2. vue组件之间的通信
  ### 2.1 亲戚间通信
   - 父与子
   - 兄与弟
  
---
### 2.1.1 父 => 子
- 子组件调用父组件

>$emit 发出请求   on监听emit事件
    

- 子组件获取父组件参数
```javascript
<child :message ="test"></child>

Vue.compnent('child', {
	props: [‘message’]   //父组件改变子组件也变化，  子组件变化父组件不变，但如果是引用类型的除外
})
```
---
### 2.1.2 子 => 父

- 父组件调用子组件方法
1.`$refs` （demo 修改组件B中的值）
  


- 父组件获取子组件参数
 1、$refs 

---
### 2.1.3 兄弟 => 姐妹
- 子=>父 =>子
- $refs
- Vuex

---

### 2.2 $emit  on 和 $refs的用法
  
  什么时候用$emit on 
  
  比如分页插件的定义，当使用`$parent.$refs`直接调用父组件或者子组件的元素和方法时，必须知道参数名和方法名，但是对于封装好的插件，两者都是互相不知道的，这时候就需要$emit 和 on 通过on定义在组件上，充当两者的桥梁。
  
  >`$refs` 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模板或计算属性中使用 $refs。
  
---
# 一些需要注意的地方
- ie9 不支持去掉:的写法
- 父子组件之间传值时，深浅拷贝的问题
- 不建议直接修改组件中的props值，而是通过data过渡一次
---



