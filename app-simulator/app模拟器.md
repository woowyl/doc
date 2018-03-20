<!-- 
	$height: 10in
-->

<!-- 
	$width: 12in
-->

电脑端模拟app环境，调试web页面
===
- 2017-12-27
- by 王远亮

---

一、关于参加分享的收获
二、mac中模拟app调试web页面
三、遇到的一些问题，和后期的优化


---

一、关于收获
- 了解前端都能做那些东西、交朋友
- 顺便学点知识点 *

---
二、mac中模拟app调试web页面

- 需求背景
- 使用方法

---
- 需求背景
	- 混合开发中需要调用app的方法，比如头部bar、调用native键盘等功能
	- 之前我们采用的方式
		- spy-debugger 真机调试
		- chrome中模拟手机
- 使用方法

	- 启动 iOS Simulator `/Applications/Xcode.app/Contents/Developer/Applications/iOS Simulator.app`
	- 在模拟器中安装 App 
		- 需要app提供一个安装包 Fanli.app
		- `/Applications/Xcode.app/Contents/Developer/usr/bin/simctl install booted Fanli.app`

---

三、 遇到的一些问题
- 涉及到app版本的问题，考虑对低版本的兼容，采用vue的方式
- 以上方式是否可以继续优化
	- 不依赖app的打包
	- 命令行语句优化
---
[参考地址](http://blog.csdn.net/lovenjoe/article/details/53929479)
---