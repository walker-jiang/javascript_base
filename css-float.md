定义选择往那个方向浮动、以往这个属性总用于图像(也适用于其他元素)，使文本环绕在图像周围（一半）,并且脱离了正常的文档流，如果后面还有元素，该元素会被浮动元素覆盖，加上这个属性相当于display: inline-block
环绕特性
```
<!DOCTYPE html>
<html lang="en">
<head>
<style>
 .p > div {
   float: left;
   margin: 0;
   font-size: 30px;
 }
 .p {
   border: 1px solid red;
   max-width: 30ex;
 }
</style>
</head>
<body >
  <div class='p'>
    <div>2222</div>
    11111111111111111111
    111111111111111
    1
  </div>
</body>
</html>
```
**注：** 文字不能再行内溢出才有效果

脱离正常的文档流&display: inline-block
```
<!DOCTYPE html>
<html lang="en">
<head>
<style>
 div:nth-child(even) {
   border: 1px solid red;
   float: left;
   width: 100px;
   height: 20px;
 }
 div:nth-child(odd) {
   border: 2px solid yellow;
   width: 200px;
   height: 20px;
 }
</style>
</head>
<body >
  <div>
  </div>
  <div>
  </div>
  <div>
  </div>
</body>
</html>

```
