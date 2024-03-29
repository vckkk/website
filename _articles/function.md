---
title: JavaScript中的函数
date: "2019-08-12"
lang: zh-CN
display: home
tags:
  - JavaScript
categorise:
  - Blog
---

**函数是迄今为止发明出来的用于节省空间时间和提高性能的最重要手段**



那对函数的了解又有多少呢？

执行一个函数时都发生了什么？
```js
function say() {
  let str = 'Helo';
  console.log(str);
}

say();
```

## 函数的执行机制
### 创建函数
我们定义的函数是怎么一步步生成的？
>1、首先开辟一个新的堆内存

我们定义的函数就存在计算机的堆内存中，那函数是以怎么的形态存储在内存中？
>2、创建函数<code>say</code>，把函数体以字符串的形式存在之前开辟的堆内存中。

>3、在当前上下文中声明```say```函数（变量），

当前上下文中，我们可以理解成当前上下堆栈（执行环境），```say```这个变量就存储在这个栈当中
>4、栈中的```say```变量指向堆中的函数体，或是说把堆内存函数体的地址赋值给上下文中的```say```

### 执行函数
#### 将存储的字符串函数体变成真正的js代码
**每一个函数的调用，都会在函数上下文堆栈中创建帧。**
函数的执行是在栈上完成的。
此时的执行流程大致如下：
>1、形成一个代码执行环境，栈内存；
>
>2、将堆内存中的函数体字符串复制到栈内存中，使其成为真正的js代码；
>
>3、对形参进行赋值，在进行变量提升；
>
>4、在堆内存中自上而下的执行；
>
>5、将执行结果返回给调用者；
>

这里可以结合JS的Event Loop去理解

#### 函数闭包
**函数在执行的时候，都会形成一个全新的私有作用域，也叫私有栈内存。**
这个私有作用域的目的有：
>1、将堆内存中的字符串变为js代码
>
>2、保护栈内存中的私有变量不受外界干扰

函数执行时的这种保护机制就成为闭包。有关闭包的内容以后会完整的梳理一下。[闭包](/blank)
#### js引擎如何执行函数
这篇文章可以多读几遍，加深认识和理解
[参考文章](http://www.cnblogs.com/onepixel/p/5090799.html)

## this
有关this的内容会单独列出总结
