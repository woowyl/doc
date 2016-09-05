<!-- 
	$height: 10in
-->

<!-- 
	$width: 12in
-->

AngularJS directive  
===  
  
- What?
- Why?
- How

---

# 一、是什么

- **ng指令**：angular 已经帮我们定义好的指令   eg:
  - ng-repeat
  - ng-class
  - ng-if
  - ng-show
- **自定义指令**

---

  AngularJS 自定义指令大致如下：
  ```js
  angular.module('app', []);
  
  app.directive('directiveName', function(){
    return {
        resrict: string,
        priority: number,
        template: string,
        templateUrl: string,
        replace: bool,
        transclude: bool,
        scope: bool\object,
        controller: function controllerName ($scope, $element,
                    $attrs, $transclude){...},
        require: stirng,
        link: function postLink(scope, iElem, iAttrs){...},
        compile: function compile(tElem, tAttrs, transclude){
        	return {
            pre:function preLink(scope, iElem, iAttrs){...},
            post:function postLink(scope, iElem, iAttrs){...}             
            }
        }     
    }
  });
  
  ```
 
 ---
 # 二、Why
 
 - 页面复用率高的元素，可以抽象一个自定义组件，在其他地方进行重用
   比如：
   - 分页
   - SKU的加减
   - 弹出框......
 - HTML更加语义化
 - 指令的本质是替换的过程
 
 ---
# 三、How
- 1 . API 概览
- 2 . 有哪些坑
---
## 3-1 API 概述
- restrict   
- priority
```
  template
  templateUrl
```
```
  replace
  transclude
```
- scope
```
  controller
  require
```
```
  link
  compile
```

---
## restrict 
> restrict :  'EACM'

 可选参数，指明指令在DOM里面以什么形式被声明；
 默认参数：'A'
 
|字母|声明风格|示例 |
|:----------:|:-------:|:----------|
|***E***|元素|`<directiveName></directiveName>`|
|***A***|属性|`<div directiveName='expression'></div>`
|***C***|类|`<div class='directiveName'></div>`
|***M***|注释|`<--directive:directiveName expression-->`

[示例](https://jsfiddle.net/woowyl/t6xa6c82/3/)

---
## priority
>priority: 100

`可选参数`，指明指令的优先级，若在单个DOM上有多个指令，则优先级高的先执行；

一般使用不指定此参数。

---
## template & templateUrl
> template:'`<div></div>`'
> templateUrl: 'views/directive/example.html'

`可选参数`，指明指令元素被替换的内容；

在restrict参数为‘A’时，此参数可以被省略此参数可以被省略
[示例](https://jsfiddle.net/woowyl/rjoL8bet/)

---
## replace & transclude
> replace:'true/false'

`可选参数`，指明指令元素自定义标签是否被替换；
`默认值`，false；

> transclude: 'true/false'

`可选参数`，指明指令中原DOM元素是否保留在template或者templateUrl 的ng-transclude的位置；
`默认值`，false；


[replace/transclude 示例](https://jsfiddle.net/woowyl/avv0pe0g/2/)

---
## scope
> scope: true/false/{}

`可选参数`，指明指令元素作用域与父作用域的关系；
`默认参数`：false

- false： 继承不隔离
- true ： 继承隔离
- {  }
  - @ ： 
  - =
  - &
---
### false/true
 - false：继承不隔离，父子绑定，两者同步
 - true ：继承且隔离，父变子变，子变父不变（checkbox 全选 单选）
 
[示例](https://jsfiddle.net/woowyl/a8vzzxr4/3/)

---
### { @，=，&}
均需要通过自定义指令的属性进行传递
- @ : 不继承隔离，但通过绑定实现了 true的功能
- = : 不继承不隔离，通过绑定实现了，false的功能
- & : 用于表达式直接的绑定

[scope示例](https://jsfiddle.net/woowyl/tasdu2bg/6/)

---
## link & compile

---
## controller

---
## require

---
## 常见的坑
 - so
