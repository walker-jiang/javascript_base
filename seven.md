##函数表达式
  + 定义：函数表达式区别于函数声明，也是一种定义函数的方式，形似与变量赋值，这个值就是函数体，例如：
  ```
  var a = function(){}; // 函数表达式之匿名函数
  var a = function fn(){}; // 函数表达式之具名函数
  (function(){})(); // 匿名函数之立即执行函数
  // 目前知道的是这三种形式， 希望高人补充
  ```
  + 特点：  
     1 . 区别于函数声明，和普通变量一样使用前必须声明，不声明在非严格模式下被认为是全局的变量，在严格模式下报错  
####递归
  + 定义：在一个函数中调用自身，递归必须要有结束条件阶乘
  ```
  // fibonacci数列
  function fibonacci(n){
    if(n == 1 || n == 2){ // 结束条件
      return 1;
    }else{
      var num = fibonacci(n-1) + fibonacci(n-2); // 递归调用
      return num // 每一层递归都返回和
    }
  };
  console.log(fibonacci(6)); // 8
  ```
  + 特点：  
     1 . 调用*匿名函数表达式*自身，为了便于维护，可以通过arguments.callee（指向当前函数的指针）来调用当前函数，这样做的好处是当递归函数换名称时不用更换内部的函数名称  
  ```
  function fibonacci(n){
    if(n == 1){
      return 1;
    }else{
      var num = arguments.callee(n-1) * n ;
      return num
    }
  };
  let a = fibonacci;
  fibonacci = null;
  console.log(a(6)); // 函数内在再次调用fibonacci就会报错 Uncaught TypeError: fibonacci is not a function
  ```
  一变
  ```
  function fibonacci(n){
    if(n == 1){
      return 1;
    }else{
      var num = arguments.callee(n-1) * n ;
      return num
    }
  };
  let a = fibonacci;
  fibonacci = null;
  console.log(a(6)); // 720 但是在严格模式下回报错 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed
  ```
  二变
  ```
  'use strict';
  let a = (function fibonacci(n){
    if(n == 1){
      return 1;
    }else{
      var num = fibonacci(n-1) * n ;
      return num
    }
  });
  let b = a;
  a=null;
  console.log(b(4)); // 24 ,这里相当于包了一层，如果外边的变量改变是不会影响函数内部调用的
  ```
     **注**：在严格模式下arguments.callee会报错，可以通过*命名函数表达式*来实现
####闭包
  + 闭包是指有权访问另一个作用域中的变量的函数,形式很多，不举例了，重点在下面
  + 特点：关于闭包的特点都得先理解执行环境、作用域、活动对象的概念
  > 执行环境: 函数被调用时会创建当前函数的执行环境，可以想象成一个对象，对象包含一个属性，该属性指向作用域（作用域链表）
  > 作用域，也可以看成是作用域链表，一个list，list的元素是指向活动对象，包括本作用域内的活动对象的指向和对上级的指向，当前函数执行完毕作用域就消失了
  >活动对象，包含当前函数内的所有属性，当没有作用域链引用时活动对象被销毁
  **注**:指向可以理解为引用，像 a=[], a就指向了内存中的一个数组
  ```
  {                                              
    scope: scopeList              ----|             
  }                                   |
  执行环境（context）                  |
  [                                   |
    activeObj1: activeObjects1,     --|--|
    activeObj2: activeObjects2,     --|--|--|
    ...                               |  |  |
  ]                                   |  |  |
  作用域链（scopeList）           <----|  |  |
  {                                      |  |  
    var1: 1,                             |  |
    var2: 1,                             |  |
    var1: [],                            |  |
  }                                      |  |
  活动对象（activeObjects1）           <--|  |
  {                                         |
    _var1: 1,                               |
    _var2: 1,                               |
    _var1: [],                              |
  }                                         |
  活动对象（activeObjects2）              <--|  

  // 可以看出执行环境和作用域链是一对一的， 所以当执行完函数后执行环境就没了，作用域没有被引用了就也没了，但是活动对象和作用域链是多对多的（途中只展示了一对多） ，所以就算作用域没了，当前作用域的活动对象也可能被其它作用域引用（例如闭包），所以仍然存在于内存中
  ```
#### 闭包与变量
  + 特点：闭包对外层活动对象是引用不是复制（也可以说是复制了引用），这里写一个亲身经历的笔试题
  ```
  var nAdd = null;
  function f(){
    let n = 99;
    nAdd = () => {
     ++n;
    }
    return () => {
     console.log(n);
    }
  };
  var f1 = f();
  var f2 = f();
  nAdd();
  f1();
  f2();
  nAdd();
  f1();
  f2();
  ```
   我认为这个题挺有意思。这里不给答案，读者可以自己先猜一下，然后自己跑一下和自己的猜想对对。
   我认为这个题目的关键在nAdd是在f函数的外层，也就是每次实例化这个f函数都会对nAdd重新赋值，重新赋值后执行环境中n会不同，多次赋值取最后一个，只要能搞清楚执行环境、作用域、活动对象的关系其实不难，不会也没关系，一开始看到我也懵。
#### 关于this对象
  + 定义：this是和执行环境绑定的
  + 特点：特点和定义息息相关，this和执行环境绑定，只要执行完毕执行环境不存在了就，例如：
  ```
  var name = 'china,hebei';
  var province = {
    name: 'hebei',
    getName: function(){
      return function(){
       return this.name;
      };
    }
  };
  console.log(province.getName()()); // china,hebei
  ```
  从结果来看this指的是全局的那个this,这个和常规理解不太一样，按说getName属于province这个对象，this指向province才对，想想定义就明白了，province.getName()这个执行了getName函数，并返回了一个函数体，再次执行这个函数体的时候getName()已经执行完了，执行完了执行环境当然就不存在了，this就返回给执行的环境（全局环境）,那如何改成指向province呢？
  ```
  var name = 'china,hebei';
  var province = {
    name: 'hebei',
    getName: function(){
      let that = this;
      return function(){
       return that.name;
      };
    }
  };
  console.log(province.getName()()); // hebei
  ```
  很容易理解，that在getName执行完毕后并不会消失，因为它所在的活动对象还被最后返回的函数的作用域链引用着，所以最后输出的就是hebei
#### 块级作用域
  + 定义：通过创建一个立即执行函数来模仿模块作用域的效果，普通的{}没有块级概念
  ```
  for(var i=0; i<2; i++){
    console.log(i);
  }
  console.log(i) // 2
  ```
  块级作用域,很简单，通过函数作用域封装一层即可，例如
  ```
  (function(){
    for(var i=0; i<2; i++){
      console.log(i);
    }
  })()
  console.log(i) // Uncaught ReferenceError: i is not defined
  ```
#### 私有变量
  + 定义：在函数定义的变量和方法都可以看成是私有变量，可以通过在函数创建闭包实现在函数外部访问私有变量，称之为共有方法(特权方法),例如：
  ```
  function Student(){
    var name = 'jiang';
    this.getName = function(){
      return name;
    };
  };
  var xiaoming = new Student();
  console.log(xiaoming.getName()); // jiang   只有这种特权方法可以访问到
  ```
    特点：私有变量只能通过特权方法在函数外部被访问
    解决的问题：增强函数的封装性，函数作用域内得变量只能通过特权方法访问
    带来的问题：每个实例都会重新创建一个特权方法
#### 静态私有变量
  + 定义： 在私有作用域内（立即执行函数）定义函数内的私有变量和全局的（变量没有声明就赋值时）匿名函数，为匿名函数添加原型方法，原型方法内访问函数内的变量，这样在函数外部可以可以通过变量名称直接访问全局的匿名函数上的原型方法，方法内部可以访问函数私有变量
  ```
  (function(){
    let name = 'jiang';
    student = function(){};
    student.prototype.getName = function(){
      return name;
    };
  })()
  console.log(student.prototype.getName()); // jiang
  ```
  + 解决的问题：解决了每个实例都不共享的私有变量和特权方法的问题
  + 带来的问题：解决的问题也变成了它自身的问题，最好的方案是私有变量和静态私有变量结合使用
#### 模块模式
  + 定义：模块模式就是把私有变量和单例模式结合起来，在JS中通过字面对象来创建对象是最简单的单例模式，而私有变量是函数作用域被的，方法就是定义一个变量（单例对象），然后创建一个立即执行函数返回一个字面对象，对象内部创建公共的特权方法和属性，函数内部定义私有变量。
  单例模式，例如
  ```
  var a = {};
  var a = {}; // 总是只有一个a对象
  ```
  ```
  var a = (function(){
    var name = 'jiang'; // 私有变量
    return{ // 单例模式
      getName: function(){
        return name;
      }
    }
  })()
  console.log(a.getName());
  ```
  + 解决的问题：在单例内创建私有变量, 单例模式的应用场景是需要重复使用但不需要同时使用的对象，像错误提示弹框
  + 带来的问题：返回的对象是没有类型的就是不能通过instanceof确认对象类型
#### 增强版的模块模式
  + 定义：将函数内返回的对象通过构造函数的方式声明，然后为其添加特权方法和属性，然后将对象返回，这样的对象就可以通过instanceof确认其类型了
  ```
  var a = (function(){
    var name = 'jiang';
    function Student(){};
    var xiaoming = new Student();
    xiaoming.getName = function(){
      return name;
    };
    return xiaoming;
  })()
  ```
