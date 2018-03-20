
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
var index = { template: '<index></index>' }
var about = { template: '<about></about>' }
var tag = { template: '<div class = "content">这里是一个tag</div>'}

var tab1 = { template: '<label>该公司在调查期间考虑了三个因素：人均年饮酒量、人均年吸烟量和居民的肥胖率。捷克位列全球饮酒最多的国家行列，每个捷克人每年喝13.7升纯酒精。捷克还是全球人均吸烟量最多的国家之一。</label>'}
var tab2 = { template: '<label>明确给组件定义 props 是传参的推荐方式，但组件的作者并不总能预见到组件被使用的场景。所以，组件可以接收任意传入的特性，这些特性都会被添加到组件的根元素上。</label>'}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
var routes = [
  { path: '/index', component: index,
        children: [
            {
                path: 'tab1',
                component: tab1
            },{
                path: 'tab2',
                component: tab2
            }]
  },
  { path: '/about', component: about },
  { path: '/tag', component: tag}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes  ie9不兼容
})


var app = new Vue({
    router: router,
    el: '#V_router',
    data: {}
});