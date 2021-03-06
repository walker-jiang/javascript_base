## 6.1理解对象
  创建方式：函数生成 和 字面量
  例如：
  ```
     var a = new Object(); // new 构造函数方式
     var a = Object(); // 调用函数
     var a = {}; // 字面量
  ```
### 属性类型
 (1)数据属性：[[configurable]](能否修改属性), [[enumerable]](能否通过for in 循环获取),[[writable]](能否修改),[[value]], 通过Object.defineProperty(obj, proper, properObj)方法修改默认属性
  例如：
  ```
    var a = {
      name: 'jiang'
    };
    console.log(Object.getOwnPropertyDescriptor(a, 'name')); // {value: "jiang", writable: true, enumerable: true, configurable: true}
    Object.defineProperty(a, 'name', { 'writable': false});
    a.name = 'zhong';
    console.log(Object.getOwnPropertyDescriptor(a, 'name')); // {value: "jiang", writable: false, enumerable: true, configurable: true} // 值没有改变
  ```
 (2)访问器属性：函数(getter(),setter), 特性([[Configuable]], [[Enumerable]], [[Get]], [[Set]])
   例如：
   ```
   var a = {
     name: 'jiang'
   };
   Object.defineProperty(a, 'sex', {
     get: function(){
       return 1;
     },
   });
  a.name = 'zhong';
  console.log(a);
  console.log(a.sex);
   ```
 (3)读取：Object.getOwnPropertyDescriptor()
## 6.2创建对象
 ### 工厂模式
   + 定义：本义是将创建相同或相似对象的过程进行封装，只需调用封装后的函数就可以获取对象
   + 解决的问题：类似的对象不用写重复的代码
   + 带来的问题：创建的对象没有类型标识
   ```
  function factory(name){
    var o = {};
      0.name = name;
    o.action = function(){};
    return o;
  };// 在这里factory就是工厂模式的工厂
  var instance1 = facroty('san');
  var instance2 = facroty('si');
   ```
 ### 构造函数
   + 定义：形如：function A(){};的函数， 通过new来进行实例化
   + 解决的问题：同一个构造函数产生的实例类型项目（可以通过instanceOf鉴定）， 实例间共享原型对象的属性
   + 特点：构造函数内部的this指的是当前的实例对象
   带来的问题：每个方法都属于不同的实例，就是没创建一个实例方法就会重新创建一遍
   ```
   function Factory(name){
     this.name = name;
     this.action = function(){};
   };
   var instance1 = new Factory('san');
   var instance2 = new Factory('si');
   console.log(instance1 instanceof Factory); // true
   console.log(instance2 instanceof Factory); // true
   ```
 ### 原型模式
   + 定义：一个对象中属性和方法被所有实例所共享（共享实例都可以看成是这个复制品），这样的对象就是原型对象
   + 解决的问题：构造函数的方法和属性在各个实例间是共享的
   ```
   function Func(){};
   Func.prototype.name = 'xiaotu';
   Func.prototype.action = function(){
     console.log(this.name,'跑路');
   };
   var instance1 = new Func();
   var instance2 = new Func();
   instance1.action(); // xiaotu 跑路
   instance2.action(); // xiaotu 跑路
   ```
   + 特点：(1)通过new 构造函数产生实例对象，构造函数默认属性prototype指向实例对象的原型对象， 原型对象的默认的constructor(constructor属性被实例对象所共享)属性又指向构造函数， 实例对象通过[[ProtoType]]指向实例得原型对象
  ```
  function Func(){};
  console.log(Func.prototype); // {constructor: ƒ}
  console.log(Func.prototype.constructor); // ƒ Func(){}
  var instance1 = new Func(); // instance1可以访问原型的constructor
  console.log(instance1.constructor) // ƒ Func(){}
  console.log(instance1.__proto__) // {constructor: ƒ}
  // 关系图（*代表指向目标）
                constructor
        *----------------------------\
 函数(Func) ----------------------* 原型对象(Func.prototype)
        \           (prototype)      *
         \                          /
          \ (new)         (_proto_)/(Object.getPrototypeOf(instance1))
           \                      /
            \                    /
             \                  /
              \                /
               \              /
              对象实例(instance1)
  ```
  (2)实例对象与原型对象之间的对应关系可以通过isProtoTypeOf()来判断， 可以通过getProtoTypeOf()获取对象实例的原型对象
  ```
  function Func(){};
  var instance1 = new Func();
  console.log(Func.prototype.isPrototypeOf(instance1)); // true
  console.log(Object.getPrototypeOf(instance1)); // {constructor: ƒ}
  ```
  (3)实例对象与原型对象的属性可以重复但不会覆盖，只是搜索时优先搜索实例对象的
  ```
  function Func(){
    this.name = 'jiang';
  };
  Func.prototype.name = 'zhong';
  var instance1 = new Func();
  console.log(instance1.name); // jiang
  delete instance1.name;
  console.log(instance1.name); // zhong
  ```
  (4)hasProprtyOf():判断对象实例中是否有此属性， in：判断对象实例和原型对象中是否由此属性, for - in 循环遍历包括原型和实例的属性， Object.keys() 返回所有实例的属性
  ```
  function Func(){
  };
  Func.prototype.name = 'zhong';
  var instance1 = new Func();
  console.log(instance1.hasOwnProperty('name')); // false
  console.log('name' in instance1); // true
  ```
  (5)原型对象添加属性的方式：'.'(增量添加) '{}'(覆盖添加此时有默认的constructor指向Object)
+ 带来的问题：如果原型对象的属性是引用类型的那么实例对象和原型对象的这个属性是同一个引用， 所以有了组合原型模式和构造函数，将引用属性定义在构造中就没这个问题了
**注**：当通过实例去写值得时候如果实例不存在该属性则会去原型属性中查找，如果在原型中是引用类型的属性则对原型属性修改，如果是基本类型的则在实例中新建属性并赋值
```
function Func(){
  this.legs = ['left'];
};
Func.prototype.arms = ['right'];
var instance1 = new Func();
instance1.legs.push('right');
instance1.arms.push('left');
var instance2 = new Func();
console.log(instance2.legs); // ["left"]
console.log(instance2.arms); // ["right", "left"]
console.log(instance2.hasOwnProperty('arms')); // false
console.log(instance2.__proto__.hasOwnProperty('arms')); // true
```
### 组合原型模式和构造函数：
原型模式负责定义实例共享的属性和方法， 构造函数定义每个实例特定的方法和属性
```
如上例（5）
```
  ## 6.3继承
    只支持实现继承（相对于接口继承）
  ### 原型链
  + 定义：将一个（函数A）对象实例a赋值给某个函数B的原型B.prototype,那么B的实例b就拥有了a的属性，如果让A的原型的值等于另一个实例，a也拥有了其他对象的值， 如此形成了原型链
  + 解决的问题：让对象之间实现了继承
```
function SuperFunc(){
  this.name = 'big-jiang';
};
function SubFunc(){
  this.name = 'small-jiang';
};
var superFunc = new SuperFunc();
SubFunc.prototype = superFunc;
var subFunc = new SubFunc();
console.log(subFunc.name); // 'small-jiang'
console.log(subFunc.__proto__.name); // 'big-jiang'
SuperFunc.prototype = new ...  // 继续继承成链
```
  + 特点：
         (1)所有对象都继承了Object， 可以通过对象原型的原型（最后一层原型）的constructor是否指向Object的原型去判断
 ```
 function SuperFunc(){
   this.name = 'big-jiang';
 };
 function SubFunc(){
   this.name = 'small-jiang';
 };
 console.log(SuperFunc.prototype.constructor == Object); // false 应是SuperFunc
 console.log(SuperFunc.prototype.__proto__.constructor == Object); // true
 var superFunc = new SuperFunc();
 SubFunc.prototype = superFunc;
 console.log(SubFunc.prototype.constructor == SubFunc); // false 应是SuperFunc
 console.log(SubFunc.prototype.constructor == SuperFunc); // true
 console.log(SubFunc.prototype.__proto__.constructor == SuperFunc); // true
 console.log(SubFunc.prototype.__proto__.__proto__.constructor == Object); // true

 ```
         (2)确定某原型是不是对应某实例间可以通过instanceOf和isPrototypeOf()
 ```
 function SuperFunc(){
   this.name = 'big-jiang';
 };
 function SubFunc(){
   this.name = 'small-jiang';
 };
 var superFunc = new SuperFunc();
 SubFunc.prototype = superFunc;
 var subFunc = new SubFunc();
 console.log(subFunc instanceof SubFunc); // true
 console.log(subFunc instanceof SuperFunc); // true
 ```
 + 带来的问题：父级的实例变成了子级的原型，父级的属性是引用类型的话就会带来所有实例共享的问题，不能向父级构造函数传递参数
 ```
 function SuperFunc(){
   this.arms = ['left'];
 };
 function SubFunc(){
 };
 var superFunc = new SuperFunc();
 SubFunc.prototype = superFunc;
 SubFunc.prototype.constructor = SubFunc;
 var subFunc1 = new SubFunc();
 subFunc1.arms.push('right');
 var subFunc2 = new SubFunc();
 console.log(subFunc2.arms); // ["left", "right"]
 ```
 ### 借用构造函数
   + 定义：在子函数中通过apply或者call将当前作用域传给父函数来实现继承
   + 解决的问题：这样就不会有原型带来的共享引用属性的问题， 也可以在apply或者call中传递参数
  ```
  function SuperFunc(name){
    this.name = name;
  };
  function SubFunc(){
    this.name = 'zhong';
    SuperFunc.call(this, 'jiang');
  };
  var subFunc = new SubFunc();
  console.log(subFunc.name); // jiang
  ```
  + 带来的问题：复用性差，父级原型中的属性方法，自己都不能获取到
 ### 组合继承
  + 定义：将借用构造函数和作用域链两种方式结合起来使用
       解决的问题：将前两种继承方式的优点结合起来， 缺点可以选择性去避免
   ```
   function SuperFunc(name){
     this.name = name;
     this.arms = ['left'];
   };
   function SubFunc(){
     SuperFunc.call(this, 'jiang');
   };
   var superFunc = new SuperFunc();
   SubFunc.prototype = superFunc;
   var subFunc = new SubFunc();
   subFunc.arms.push('right');
   var subFunc2 = new SubFunc();
   console.log(subFunc2.arms); // 'left'
   ```
