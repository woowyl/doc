<!-- 
	$height: 10in
-->

<!-- 
	$width: 12in
-->

AngularJS directive  
===  
  
- What？
- Why?
- How?

---

# 一、What

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
   - alert提示框 ... ...  
   
 - HTML更加语义化
 - 指令的本质是替换的过程，使HTML结构变得更加清晰
 - 指令有自己的作用域，可以作为独立元素存在
 
 ---
  ### 使用controller也能获得同样的结果，对吧？
  是的，确实如此---但是这样做会带来一个重大的问题。一旦我需要在其它地方添加相同的方法，我必须拷贝这份代码（html DOM + controller）（非 常un-DRY!)或者进行重构（重构本身并不是什么不好的的事情）。通过直接构建一个指令的方式，我们 以后就没有必要担心这种事情了---同时下次再需要实现相同功能的时候完全不需要花任何时间。通过构建指令的方式来进行DOM交互和修改，随着业务需求的 不断介入，我们就可以立即腾出手来处理复杂性不断增加的应用了。这是相当不错的一件事情，因为它保证了我们可以更少地和自己的实现打架，并且可以一直编写 DRYer code。

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

[resttict示例](https://jsfiddle.net/woowyl/t6xa6c82/3/)

---
## priority
>priority: 100

`可选参数`，指明指令的优先级，若在单个DOM上有多个指令，数值越高会越先执行；
`默认参数`：0  
一般使用不指定此参数。

---
## template & templateUrl
> template:'`<div></div>`'

>templateUrl: '/views/directive/directiveName.html'

`可选参数`，指明dom节点被替换的内容，如指令只处理原dom的事件，此参数可以省略

[示例](https://jsfiddle.net/woowyl/rjoL8bet/1/)

---
### 为什么不用controller实现这段代码？

这样我们也能获得同样的结果，对吧？是的，确实如此---但是这样做会带来一个重大的问题。一旦我需要在其它地方添加书籍，我必须拷贝这份代码（非 常un-DRY!）（译者注：DRY---Dont Repeat Yourself，貌似是Ruby所倡导的一个重要的编码原则。），或者进行重构（重构本身并不是什么不好的的事情）。通过直接构建一个指令的方式，我们 以后就没有必要担心这种事情了---同时下次再需要实现相同功能的时候完全不需要花任何时间。通过构建指令的方式来进行DOM交互和修改，随着业务需求的 不断介入，我们就可以立即腾出手来处理复杂性不断增加的应用了。这是相当不错的一件事情，因为它保证了我们可以更少地和自己的实现打架，并且可以一直编写 DRYer code。
    
---
## replace & transclude

> replace: true/false

 `可选参数`，指明定义在template或templateUrl中的内容是否对DOM元素做整体替换，即是否保留自定义的DOM节点，或定义了指令的原生DOM节点；
 `默认参数`：'false'  
   
 
>transclude: true/false

 `可选参数`，指明指令中的原DOM节点是否被保留，并显示在template或者templateUrl中的 ng-transclud中；  
 
 `默认参数`：'false'


[replace/transclude 示例](https://jsfiddle.net/woowyl/avv0pe0g/2/)

---
## scope
> scope: true/false/{ }

 `可选参数`，指明指令的作用域和父作用域的关联
 
 默认参数：'false'
 - true
 - false
 - {     }
   - @
   - &
   - =
---    
### true/false（对全部变量的统一定义）

false: 继承不隔离，父子绑定，两者同步变
true: 继承隔离，父变子变，子变父不变 （checbox 全选的操作）

[示例](https://jsfiddle.net/woowyl/a8vzzxr4/3/)
[全选示例]()

---

- false: 指令对应的DOM元素上**存在的scope元素**
- true: 创建**新的scope对象**，且继承了外层控制器的scope
- {}:使用**独立的scope对象**
---
### @、&、= （可对单个变量进行个性化处理）
{@/&/=}：不继承且隔离（最彻底）

使用{},想实现子作用域和父作用域的沟通，必须使用中间桥梁：指令的attr
- @：没有继承，但是使用@ 完成了类似于 `socpe:true`的效果） 
- = ：没有继承，但是使用= 完成了类似于 `scope:false`的效果
- & ：提供一种途经是 directive 能在父 scope 的上下文中执行一个表达式

```
@ = : 定义变量的绑定

& : 定义方法的绑定
```
[示例](https://jsfiddle.net/woowyl/tasdu2bg/6/)

---
## link & compile
```
compile:function  compile(tElement, tAttrs, transclude) {     
    return {
    	pre: function preLink(scope, iElement, iAttrs){...},
    	post: function postLink(scope, iElement, iAttrs){...}  
    }
},
link: function link(scope, iElement, iAttrs) {

}
 ```       
---

- 这两个函数是根据Angular创建动态视图的两个处理阶段来命名的。
  - 加载脚本 ：加载ng库 查找ng-app 找到应用的边界
  - 编译阶段 ：遍历DOM结构，识别并根据规则（template、replace...）将指令转换为DOM,并执行compile函数
  - 链接阶段 ：为了让视图变为动态的，ng会为每条指令运行一个link函数
- 每个指令compile只执行一次，而link每次都会执行 `ng-repeat`
- 对于大多数指令来说，并不需要对模板进行转换，所以大部分情况下只需编写link函数即可
- compile的post 会对link进行覆盖

---
## controller
- 何时使用controller：一般场景下都不想要使用controller，只需要把逻辑写在link中就可以了；用controller的场景就是该指令（假设为a）会被其他指令（假设为b）require的时候，这样就会在b指令的link函数中传入这个controller（如果require多个的话，传入的是一个数组，数组中存放的是每一个require的指令对应的controller），目的很显然是为了指令间进行交流的。
- 在自定义Angular指令时，其中有一个叫做require的字段，这个字段的作用是用于指令之间的相互交流。举个简单的例子，假如我们现在需要编写两 个指令，在linking函数中有很多重合的方法，为了避免重复自己（著名的DRY原则），我们可以将这个重复的方法写在第三个指令的 controller中，然后在另外两个需要的指令中require这个拥有controller字段的指令，最后通过linking函数的第四个参数就可以引用这些重合的方法


[controller-require](https://jsfiddle.net/woowyl/gg5y9ou2/1/)
---
## require
>? : 如果require没有找到相应的指令避免报错,还能确保程序的正常执行
^ : 表示往父级查找



- 要求必须存在另一个指令，当前指令才能正确运行
- 可以是自定义指令也可以是ng原生指令
- require后可调用被require的controller中定义的方法
- 调用方式是使用link的第四个参数 ctrl
---
### 调用自定义
```
var app = angular.modeule('myapp',[]);  
  
app.directive('common',function(){  
    return {  
    ...  
    controller: function($scope){  
        this.method1 = function(){  
        };  
        this.method2 = function(){  
        };  
    },  
    ...  
    }  
});  
  
app.directive('d1',function(){  
    return {  
    ...  
    require: '?^common',  
    link: function(scope,elem,attrs,common){  
        scope.method1 = common.method1;  
        ..  
        },  
    ...  
    }  
});  

```
---

### 调原生 ng-model 
```
angular.module('myApp')  
.directive('spoint', function() {  
  return {  
    require: 'ngModel',  
    link: function(scope, elm, attrs, ctrl) {  
      var fibonacci = [1, 2, 3, 5, 8, 13, 20, 40, 80];  
      ctrl.$parsers.unshift(function(viewValue) {  
        if (fibonacci.indexOf(parseInt(viewValue)) >= 0) {  
          ctrl.$setValidity('fibonacci', true);  
          return viewValue;  
        } else {  
          ctrl.$setValidity('fibonacci', false);  
          return undefined;  
        }  
      });  
    }  
  };  
});  
```
---

## controller compile link执行顺序
-controller先运行，compile后运行，link不运行(link就是compile中的postLink)
[controller compile link执行顺序](https://jsfiddle.net/woowyl/chfek4aL/2/)

---
## 常见的坑
- scope中
  - 使用`"="`在DOM attr中虚 `attr="key"`
  - 使用`"@"`在DOM attr中虚 `attr={{key}}`

---
![](/Users/wangyuanliang/personal/github/doc/directive-init.png)
