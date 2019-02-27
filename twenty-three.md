## 23.1 离线检测
  含义：设备能否上网
  代码：
  ```
    navigator.onLine
  ```
  注：IE6+和safari+5，firefox3+和opera16+,chrome最新的没问题
## 23.2 应用缓存
  缓存的目的是专门为网页离线设计的，当然在在线情况也会缓存

  机制：当用户在地址输入请求的地址去请求网页时，浏览器会先本地缓存中查看是否有对应的缓存文件，如果有然后查看‘新鲜度’就是是否过期了，如果过期了此时也不会去请求新的资源而是去与服务器端进行校验核对服务器端有没有更新的资源如果有则去请求没有就更新‘新鲜度’， 新鲜度由响应时服务器告诉浏览器或者在返回的html中加meta属性告诉浏览器，不过meta属性通常是针对本地静态文件

  (1) 离线缓存方法(我也没实现，想一想都离线了还让用户看啥，毕竟浏览器都有很好的网断界面)：
  ```
  <html manifest="/e.manifest">
  ```
## 23.3 数据存储
  (1) Cookie
    为什么：cookie的存在让服务器和客户端有了一种通讯方式，因为http是无状态的，可以通过cookie让服务器鉴别当前用户，cookie的值存储在客户端本地（java创建的cookie存在于响应头，而javascript创建的cookie存在于请求头）注：cookie的存取的前提是页面在服务中而不是本地文件

    如何做（javascript）：赋值：document.cookie = 'name=jiang;expires=Thu, 18 Dec 2043 12:00:00 GMT';读取：document.cookie；cookie没有提供删除的api，销毁的间接方法是重新为对应cookie赋值，并将过期时间设为之前的一个时间，默认是浏览器关闭销毁

    限制：cookie在每个域名下的数量是有限制的，各个浏览器限制的数量不一样最少的是20，最多的chrome无限制，cookie的大小限制各个浏览器也不同，基本是4096+-1，也就是一个域名下的cookie大小在这个范围内

    **注**：碰到cookie数量的限制问题可以通过‘子cookie’来解决，思路是cookie中键-值中值是另一个键值

  (2) Storage类型
    为什么：同样是存储，Cookie比Storage出现的早，那么Storage的出现一定是为了弥补Cookie的某些不足了，比如数量和大小的限制

    如何做：Storage提供了一些API，clear(),getItem(name),key(index),removeItem(name),setItem(name,value)

    1、 sessionStorage对象
    特点：声明周期是浏览器关闭前，访问域是最初建立的页面，只存在与服务器上资源本地静态资源不支持，大小限制大部分是2.5M，IE8，opera是5M,访问域是当前页面

    2、globalStorage[]对象
    特点：跨越回话限制，可以指定访问域和持久存储

    示例：
    ```
    globalStorage['wrox.com'].name = 'jiang'; // 指定访问域
    ```
    **注**：指定的域名有同源策略，就是协议和端口要保持一致

    3、 localStorage对象
    特点：localStorage是globalStorage替代品，localStorage对象不能指定访问域并且有同源策略，访问域是同域名和端口，大小限制是chrome和safari 是2.5M其它大部分是5M
    **注**：更大量的数据可以通过indexDB存储
