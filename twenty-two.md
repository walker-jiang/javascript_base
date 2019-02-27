## 22.1 安全的类型检测
  为什么：typeof 不靠谱, 无法将数组从对象中区分出来， instanceof 有特殊情况，在iframe存在的情况下无法判断另一个iframe内的数组
  如何做：Object.prototype.toString().call(Arr);
## 22.3 高级定时器
  特点：链式的setTimeout在有定时器时不会添加到等待队列而是继续等，这样保证了不会跳过某个的定时器，也保证了最小时间
  问题(伪代码)：
  ```
  onClick(){
    setInterval(function(){

      },200ms)

    ... // 1000ms
  };
  ```
 // 此时会发生跳过

 ```
 setInterval(function(){
    ... // 1000ms
   },200ms)
 ```
 // 此时发生间歇时间小，1000ms后第一个定时器执行完毕，此时添加队列已有等待的定时器会立刻执行
 解决方法：链式setTimeout
