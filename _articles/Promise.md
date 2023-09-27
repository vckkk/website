---
title: JavaScript中的异步编程
date: "2019-11-07"
lang: zh-CN
display: home
tags:
  - JavaScript
categorise:
  - Blog
---

JavaScript中的异步编程 ---- Promise



  了解JavaScript的异步编程之前需要先学习[JavaScript的有关运行机制](http://www.webhbz.com/Pages/eventloop.html)
为了在整体上有个充分的认识，可以先阅读一下知乎上的这篇[文章](https://zhuanlan.zhihu.com/p/66593213)，相对简单便于理解。

## 什么是Promise

  Promise最早由社区提出，是用来解决回调地狱的方案，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。
> 所谓的`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。   ---- 《ECMAScript 6 入门》

Promise对象在创建后，就会创建内部状态机，Promise对象代表了一个异步操作，而状态机就包含了这个异步操作的状态，`pendding`，`fulfilled`，`rejected`，
在`Promise`对象中，只会存在上述三种状态中的一种，且为不可逆的，不受外界影响。

## 创建以及使用Promise
在ES6中有原生的Promise构造函数，使用关键字`new` 来创建一个`Promise`对象。

```JavaScript
const promise = new Promise ((resolve,reject) => { // 构造函数接受一个函数为参数，将这个参数暂名为'fn' ，'fn'又接受两个参数，且均为函数
  const flag = Math.random() > .5 ? true : false ;
  if(flag) {
    console.log('使用resolve将promise状态从pending变为resolved');
    resolve('大于0.5')
  } else {
    console.log('使用reject将promise状态从pending变为rejected')
    reject('小于0.5')
  }
})


promise.then((resolve) => {
  console.log(resolve)  // -- '大于0.5'
},(reject) => {
  console.log(reject)  // -- '小于0.5'
})

```
我们来一点点拆分这个`Promise`，她接收了一个函数，而这个函数又有两个参数`resolve`，`reject`，这两个参数都是Promise为我们创建好的`函数`。这两个函数的作用就是将`Promise`的状态从`pending`（等待）转换为`resolved`（已解决）或者从`pending`（等待）转换为`rejected`（已失败）。
而在Promise创建后，有一些自身的方法。这里先只说`then`，该方法接受两个`函数`作为参数，这里就和上面传入Promise的构造函数中的参数函数（`fn`）的两个参数（`resolve`,`reject`）对应上了。很显然，`then`方法的第一个参数函数，接收到`resolve`传递出的数据，而第二个参数就接收到了`reject`传递出的数据。
那么`Promise`是怎么解决异步操作的回调地狱呢？简单的说就是用`Promsie`对象包裹一个异步操作，异步操作只在`Promise`对象内部，不受外部影响同时也不阻塞外部，在这个异步操作有了结果后，通过`then`方法和外部进行数据传递。如下：

```JavaScript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('success') : reject('fail');
    }, 1000)
});


promise.then((result) => {
    console.log(result);
}, (err) => {
    console.log(err);
});

```
这里的`setTimeout`就是一个异步函数，在1秒后得到结果。若大于0.5的话，`resolve`就会执行，则`Promise`的状态从`pending`变为`fulfilled`，否则变为`rejected`，异步操作中的数据(‘success’或‘fail’)会通过函数传递到`Promise`外部，我们通过`then`获取到该数据.
那么简单的`Promise`对象我们已经了解了,但是他是怎么来解决回答地狱的呢?其实很简单,因为`then`方法会`return`一个`Promise`对象来供我们使用.同时我们也可以手动创建新的`Promise`对象.
举个🌰

```js
const pm1 = new Promise((resolve,reject) => {
  resolve('假装这是异步操作的成功的结果')
});

// @1 使用return 默认的Promise对象
pm1.then(result => {
  console.log('接收Promise传出的:', result);
  return '我是被then return出来的';
}).then(result => {
  console.log("接收上一个then:", result)
  return "我还是被then return出来的";
}).then(result => {
  console.log('接收上一个then:', result)
});

---控制台打印如下
接收Promise传出的: 假装这是异步操作的成功的结果
接收上一个then: 我是被then return出来的
接收上一个then: 我还是被then return出来的
Promise {<resolved>: undefined}
---

// @2 手动创建Promise
pm1.then(result => {
  console.log("pm1异步:",result);
  const pm2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('pm2异步操作成功的结果')
    },2000)
  });
  return pm2;
}).then(result2 => {
  console.log("pm2异步:",result2)
})

--- 控制台打印如下
pm1异步: 假装这是异步操作的成功的结果
Promise {<pending>}
// 2s后
pm2异步: pm2异步操作成功的结果
---
```
这就是常见的`Promis`的链式调用,其实`Promise`就是原生封装的一个对象,约定创建是传入两个方法分别在成功和失败后调用,又在`then`的两参数(均为函数)中获取.下面简单介绍一下`catch`和其他原生方法的使用场景.

### catch
一句话来解释,`catch` === `then(null,reject)`.
`catch`是用来捕捉`Promis`中的异常,也就是失败后传递出的信息.`then`是可以同时接受失败和成功后`Promise`从内部传出的数据,但是未来方便阅读和维护,一般在`then`中只执行成功的.我们将整个过程中的异常放到最后,通过`catch`来捕获.再举个🌰:

```js
const pmCatch = new Promise((resolve,reject) => {
  reject('fail')
});

pmCatch.then(result => {
  console.log('this is then');
  const pmCatch2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('success')
    },2000)
  });
  return pmCatch2;
}).then(res => {
  cpnsole.log('then:', res);
}).catch(err => {
  console.log('catch:', err);
})

---控制台打印如下
catch: fail
Promise {<resolved>: undefined}
---

```
看下打印结果,好像跟想象中的不太一样.这里没有打印出‘this is then’和‘then:success’,而是直接打印了‘catch: fail’.明显的在整个`Promise`链中,只要出现了`reject`了,整个`Promise`的状态就会凝固且不会变化.另外,`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。而且`Promise`对象对于异常有类似冒泡的性质,异常会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

### Promise.finally()
`finally`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```js

promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});

```


### Promise.all()
`Promise.all()`方法用于将多个`Promise`实例，包装成一个新的`Promise`实例.
```js
const p = Promise.all([p1, p2, p3]); // p1 p2 p3 均为Promise对象
```
`Promise.all()`方法的参数可以不是数组，但必须具有`Iterator`接口，且返回的每个成员都是`Promise`实例。
`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。
- 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

一般的使用场景是数据同时依赖于多个请求的返回值时.


### Promis.race()
`Promise.race()`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例。其参数格式同`Promise.all()`;
```js
const p = Promise.all([p1, p2, p3]); // p1 p2 p3 均为Promise对象
```
只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的`Promise`实例的返回值，就传递给`p`的回调函数。“行”如其名,竞跑.谁最早跑完听谁的.

### Promise.any()
`Promise.any()`方法接受一组`Promise`实例作为参数，包装成一个新的`Promise`实例。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

### 其他
其他的还有`Promise.resolve()`,`Promise.reject()`,以上两个方法详情参考阮大的[《ES6入门》](http://es6.ruanyifeng.com/#docs/promise#Promise-resolve)
