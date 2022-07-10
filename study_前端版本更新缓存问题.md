﻿##浏览器渲染流程

1. 解析 HTML 文件，构建 DOM 树，同时浏览器主进程负责下载 CSS 文件
2. CSS 文件下载完成，解析 CSS 文件成树形的数据结构，然后结合 DOM 树合并成 RenderObject 树
3. 布局 RenderObject 树 （Layout/reflow），负责 RenderObject 树中的元素的尺寸，位置等计算
4. 绘制 RenderObject 树 （paint），绘制页面的像素信息
5. 浏览器主进程将默认的图层和复合图层交给 GPU 进程，GPU 进程再将各个图层合成（composite），最后显示出页面

- 关键资源的数量: 可能阻止网页首次渲染的资源。
- 关键路径长度: 获取所有关键资源所需的往返次数或总时间。
- 关键字节: 实现网页首次渲染所需的总字节数，等同于所有关键资源传送文件大小的总和。

优化 DOM

- 删除不必要的代码和注释包括空格，尽量做到最小化文件。
- 可以利用 GZIP 压缩文件。
- 结合 HTTP 缓存文件。

当前 VUE 项目更新
我理解的是： vue 属于单页面应用
webpack 打包后的 chunk 后面都会添加 hash 值 保证了文件的最新
但如果 index.html 文件发生了缓存
项目也还是旧的
只有保证 index.html 是最新的 整个项目才是最新的
因为是从这个 html 开始解析
所以 在这个文件里面添加

    <!-- 禁止index 页面的缓存 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />


    是保证这个页面禁止缓存
    发新版之后的，只需要重新加载下当前项目
    浏览器普通刷新就可
