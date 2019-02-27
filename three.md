## 3.1 数据类型
  (1) 基本数据类型：string，number(flaot,精度17位小数，integer，Integer.MAX_VALUE获取整形最大值)，boolean，null，undefined， typeof后依次对应string number，boolean，object，undefined，存储在内存中的栈里，执行环境销毁后基本类型的值销毁
  (2) 引用数据类型：包含数组、函数，{}, typeof后依次对应object，function，object
    所以数组和普通对象通过typeof是区分不出来的，可以通过instanceof区分，但是instanceof会有全局局限性，跨iframe的Array通过instanceod检测类型会有问题，更安全的类型检测时Object.prototype.toString().call(Arr)，引用类型的引用指针是存储在栈里，而实际的对象值存储在堆(可以动态申请大小)里，一个堆可以对应多个指针栈，所以当所有的指针栈消失后对应的堆才被释放
    数组：Array 类型 ，
    声明方式

    ```
    var a = new Array(aru); // aru可以是长度或者初始化参数或者没有aru
    var a = []; // 字面量形式
    ```
    
    检测方式：instanceof Array, isArray()
    栈数组：通过push(),pop()方法模拟类似栈的数组；队列数组：通过shift(),push()；
    排序方法：reverse(func(argue1, argue2)) // 倒置；sort() // 默认是升序，将每一项转变为字符串然后比较，自定义函数比较 如果返回负数那么argue1 在argue2前，正数反之
    操作方法：concat(arg1,arg2...)，基本参数数组新建数组，然后添加剩余参数到数组中；slice(start,end),截取部分数组，end默认值是数组末尾；splice(arg1,arg2,arg3..),如果arg1存在，arg2不为0，arg3。。有值则是将arg3以及以后的元素进行替换，arg2为0其余条件不变则为插入，arg2不为0并且后面没有其他的参数了（没有arg3，，，）则为删除
    迭代方法：reduce(func(prev, cur, index, Array){}),reduceRight(),一个是从左到右一个是从右到左，返回结果作为下一个prev
  (3) 类型转化
    1、其它类型转Boolean，可以通过!!或者Boolean()，例如
    ```
    !!1 // true
    !!0 // false
    Boolean('hello') // true
    ```
    **注**：其它类型的值转为boolean时只有'',null,undefined,0,NaN是false，其余一律是true

    2、其它类型转number，通过Number(),parseInt(),parseFloat()
    ```
    Number(true) // 1 parseInt()同样
    Number(false) // 0 parseInt()同样
    Number(null) // 0 parseInt()同样
    Number(undefined) // NaN parseInt()同样
    Number('') // 0, 非浮点、数字、十六进制、空字符串的其他字符串转化后是NaN
    parseInt('') // NaN 字符串中开头的除去空格字符如果不是数字或者负号就会返回NaN，数字后面的空格会被忽略
    parseFloat('') // NaN 不同于parseInt的是第一个可以.
    ```
    3、 其它类型转string，通过value.toString(arg),其中arg表示进制，String(value)
    ```
    true.toString(); // 'true' String(value) 一样
    1.toString(); // '1' String(value) 一样
    null.toString(); // 报错
    undefined.toString(); // 报错
    String(null) // 'null'
    String(undefined) // 'undefined'
    ```
