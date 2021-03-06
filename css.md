## 常见子元素居中方式
 (1) "position: absolute": 'position: absolute;' + 'transform: translate(-50%, -50%)' // 原理是绝对定位是根据左上角，然后让子元素回移50%就居中了
 (2) "display: flex": 'display: flex;' + 'justify-content: center;' + 'align-items: center;'
 (3) "margin: 0px auto": // 水平居中，条件是当前元素指定宽和高
 (4) "margin: auto; position: absolute; top/left/bottom/right: 0px": // 水平 垂直居中
 (5)
## svg vs canvas
svg：XML 描述 2D 图形的语言；SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器；每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形
canvas ：JavaScript 来绘制 2D 图形;逐像素进行渲染的；旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象
## 面试题：

1、介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？
标准盒模型：整体宽度 = 内容宽度（content） + padding + border + margin
非标准（IE5以下）： 整体宽度 = 内容宽度（content + padding + border） + margin
扩展：
* 1、两种盒模型分别对应css的那个属性？box-sizing: content-box(标准)，border-box（非标准）

* 2、margin的特性（块级元素）：垂直叠加，发生于兄弟元素、自身元素、父子元素之间，发生条件是子元素处于[标准文档流](https://segmentfault.com/a/1190000018315599)

  (1) 兄弟元素，垂直方向上交界都有margin那么取大值舍小值，可以理解两军交战，实力强的把实力弱的团灭了
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
    .big{
      background: red;
      width: 400px;
      height: 400px;
      padding: 20px;
      margin-bottom: 30px; // 显示大的值
    }
    .small{
      background: black;
      width: 400px;
      height: 400px;
      margin-top: 20px; // 小的舍去不显示
    }
  </style>
  </head>
  <body >
  <div class='big'>
  </div>
  <small class='small'>
  </small>
  </body>
  </html>
  ```
  (2) 父子元素，垂直方向上边界的上边界取同样是取大值舍小值，发生条件是子元素在[标准文档流](https://segmentfault.com/a/1190000018315599)中并且父元素没有border属性
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
    .parent{
      background: red;
      width: 400px;
      height: 400px;
      margin-top: 50px; // 大的值作为最外层margin-top
    }
    .son{
      background: black;
      width: 400px;
      height: 200px;
      margin-top: 40px; // 舍去不显示
    }
  </style>
  </head>
  <body >
  <div class='parent'>
    <div class='son'>
    </div>
  </div>
  </body>
  </html>
  ```
  (3) 自身元素，如果一个元素没有内容或者高度并且margin-top和margin-bottom均有值，那么取两者之间大的值小的会被舍弃，如果相邻元素中有多个这样de空元素则以自身叠加后大的为这些元素的外边距其余的外边距
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
    .self{
      background: black;
      width: 400px;
      margin-top: 60px; // 按这个外边距
      margin-bottom: 10px; // 这个会被舍弃
    }
  </style>
  </head>
  <body >
    <hr/>
    <div class='self'>
    </div>
    <hr/>
  </body>
  </html>

  ```
2、CSS选择器有哪些？哪些属性可以继承？
   id选择器、class选择器、标签选择器、相邻选择器往后(+)、子元素器(>)、后代选择器（div p）、通配符选择器（ * ）、伪类选择器（:hover）、属性选择器([attribute=value]); 可继承属性font-family、font-size、color
3、css 样式优先级？
  !important > 行内 > id > class > 标签,继承的样式优先级最低
4、display有哪些值？说明他们的作用?
    inline（默认）–内联
    none–隐藏
    block–块显示
    table–表格显示
    list-item–项目列表
    inline-block
4、position的值？

    static（默认）：按照正常文档流进行排列；
    relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
    absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
    fixed(固定定位)：所固定的参照对像是可视窗口。
5、CSS3有哪些新特性？
    1 RGBA和透明度(opacity)
    2 background-image background-origin(content-box/padding-box/      border-box) background-size background-repeat
    3 word-wrap（对长的不可分割单词换行）word-wrap：break-word
    4 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
    5 盒阴影：box-shadow: 10px 10px 5px #888888
    6 font-face属性：定义自己的字体
    7 圆角（边框半径）：border-radius 属性用于创建圆角
    8 边框图片：border-image: url(border.png) 30 30 round
    9 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性
6、经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧？
    * 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。
7、css多列等高如何实现？（例如左边菜单想要和右侧内容保持高度一致）
   可以通过css盒子模型来解决，每列元素都设置一个比较大的padding-bottom，然后margin-bottom设置一个可以相反的值，这样保持在父元素内的每列高度和之前一样，然后父元素设置超过隐藏，就巧妙地形成了多列高度一样
8、li与li之间有看不见的空白间隔是什么原因引起的(display:inline ||   inline-block)？有什么解决办法？
   如果是每行一个li元素那么行之间有个换行符，这是导致有空隙的原因，解决方法是将所有li元素写在一行去掉换行符或者在ul折
9、css定义的权重
   标签的权重是1， class的权重是10， id的权重是100，权重越大优先级越高
   ```
   div {} // 权重1
  .name {} // 权重10
  #id {} // 权重100
  .name div {} // 权重 10 + 1
  #id div {} // 权重 100 + 1
  .name.name div {} // 10 + 10 + 1
   ```
10、移动端的布局用过媒体查询吗？
  @media (min-width: 700px) and (orientation:landscape){ .sidebar { display: none; } } // 屏幕大于700px时该样式生效
11、::before 和 :after中双冒号和单冒号 有什么区别？
    ::伪元素，:伪类
12、如果需要手动写动画，你认为最小时间间隔是多久，为什么？
    每秒60帧，animation
13、什么是CSS 预处理器 / 后处理器？
    预处理器例如：less、sass、stylus，用一种专门的编程语言，为 CSS 增加了一些编程的特性，将css作为目标生成文件。
    后处理器：autoprefixer，对css进行兼容和优化
14、css3 display新添加的属性display: box, box后可以添加的属性
    (1) box-orient: 父容器里子容器的排列方式
    (2) box-direction: 父容器里子容器的排列顺序 horizontal | vertical
    子元素可以设置box-flex: 比例，进行等比分隔 normal | reverse | inherit
    (3) box-align: 父容器里子元素的垂直对齐方式 start | end | center | baseline | strech
    (4) box-pack: 父容器里子元素的水平对齐方式 start | end | center | justify
    (5) line-clamp: 最多几行，超出溢出
