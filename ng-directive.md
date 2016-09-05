<!-- 
	$height: 10in
-->

<!-- 
	$width: 12in
-->

AngularJS directive  
===  
  
- 是什么
- 为什么
- 怎么用

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
 # 二、为什么
 
 - 页面复用率高的元素，可以抽象一个自定义组件，在其他地方进行重用
   比如：
   - 分页
   - SKU的加减
   - 
 - HTML更加语义化
 - 指令的本质是替换的过程
 
 ---
# 三、怎么用
- 1 . API 概览
- 2 . 有哪些坑
---
## 3-1 API 概述
- restrict   
- priority
- template
- templateUrl
- replace
- transclude
- scope
- controller
- require
- link
- compile

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

---
## replace & transclude

---
## scope

---
## link & compile

---
## controller

---
## require

---
## 常见的坑
 -在html中定义
