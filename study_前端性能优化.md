﻿
##浏览器渲染流程

1. 解析 HTML 文件，构建 DOM 树，同时浏览器主进程负责下载 CSS 文件
2. CSS 文件下载完成，解析 CSS 文件成树形的数据结构，然后结合 DOM 树合并成 RenderObject 树
3. 布局 RenderObject 树 （Layout/reflow），负责 RenderObject 树中的元素的尺寸，位置等计算
4. 绘制 RenderObject 树 （paint），绘制页面的像素信息
5. 浏览器主进程将默认的图层和复合图层交给 GPU 进程，GPU 进程再将各个图层合成（composite），最后显示出页面

* 关键资源的数量: 可能阻止网页首次渲染的资源。
* 关键路径长度: 获取所有关键资源所需的往返次数或总时间。
* 关键字节: 实现网页首次渲染所需的总字节数，等同于所有关键资源传送文件大小的总和。

优化 DOM
* 删除不必要的代码和注释包括空格，尽量做到最小化文件。
* 可以利用 GZIP 压缩文件。
* 结合 HTTP 缓存文件。

优化 CSSOM
首先，DOM 和 CSSOM 通常是并行构建的，所以 CSS 加载不会阻塞 DOM 的解析。

然而，由于 Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的，
所以他必须等待到 CSSOM Tree 构建完成，也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后，才能开始渲染。因此，CSS 加载会阻塞 Dom 的渲染。

由此可见，对于 CSSOM 缩小、压缩以及缓存同样重要，我们可以从这方面考虑去优化。

* 减少关键 CSS 元素数量
* 当我们声明样式表时，请密切关注媒体查询的类型，它们极大地影响了 CRP 的性能 。


优化 JavaScript
当浏览器遇到 script 标记时，会阻止解析器继续操作，直到 CSSOM 构建完毕，JavaScript 才会运行并继续完成 DOM 构建过程。

* async: 当我们在 script 标记添加 async 属性以后，浏览器遇到这个 script 标记时会继续解析 DOM，同时脚本也不会被 CSSOM 阻止，即不会阻止 CRP。
* defer: 与 async 的区别在于，脚本需要等到文档解析后（ DOMContentLoaded 事件前）执行，而 async 允许脚本在文档解析时位于后台运行（两者下载的过程不会阻塞 DOM，但执行会）。
* 当我们的脚本不会修改 DOM 或 CSSOM 时，推荐使用 async 。
* 预加载 —— preload & prefetch 。
* DNS 预解析 —— dns-prefetch 。



CSS

避免使用 table 布局。
尽可能在 DOM 树的最末端改变 class。
避免设置多层内联样式。
将动画效果应用到 position 属性为 absolute 或 fixed 的元素上。
避免使用 CSS 表达式（例如：calc()）。

Javascript

避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
// 优化前
const el = document.getElementById('test');
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
el.style.padding = '5px';
// 优化后,一次性修改样式，这样可以将三次重排减少到一次重排
const el = document.getElementById('test');
el.style.cssText += '; border-left: 1px ;border-right: 2px; padding: 5px;'
避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。


事件委托
1. 大量减少内存占用，减少事件注册。
2. 新增元素实现动态绑定事件



Vue 应用运行时性能优化措施

引入生产环境的 Vue 文件
使用单文件组件预编译模板
提取组件的 CSS 到单独到文件
利用Object.freeze()提升性能
扁平化 Store 数据结构
合理使用持久化 Store 数据
组件懒加载
Vue 应用加载性能优化措施

服务端渲染 / 预渲染
组件懒加载



webpack模块打包和JavaScript 压缩（如gzip压缩）
利用CDN
按需加载资源
在使用 DOM 操作库时用上 array-ids
缓存优化
避免重定向
启用 HTTP/2
应用性能分析
使用负载均衡方案
为了更快的启动时间考虑一下同构
使用索引加速数据库查询
使用更快的转译方案
避免或最小化 JavaScript 和 CSS 的使用而阻塞渲染
用于未来的一个建议：使用 service workers + 流
图片编码优化，尽量使用svg和字体图标



http 层面的优化
dns解析   dns prefetch

tcp 使用http2.0  头部压缩 二进制格式 服务器并发
减少http请求次数
使用浏览器缓存
gzip压缩

cnd 缓存
应用缓存

dom 优化
使用语义化标签 减少标签的使用
减少回流和重回
<\script>标签异步加载。js放在在<\body>标签的底部，减少对整个页面下载的影响
动态加载

服务器渲染  ssr

webpack优化
图片压缩
减少Es6 转为es5
提取公共代码






