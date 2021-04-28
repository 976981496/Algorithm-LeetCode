﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿
#概念
###module
就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import,require语句引入的代码。
###chunk
chunk是webpack根据功能拆分出来的，chunk包含着module，可能是一对多也可能是一对一。包含三种情况：  
1. 你的项目入口（entry）  
2. 通过import()动态引入的代码  
3. 通过splitChunks拆分出来的代码  
###bundle
bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，是对chunk进行编译压缩打包等处理之后的产出。

---
#webpack打包流程
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 编译完所有模块后，得到了每个模块被编译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
---

#webpack的打包优化
###减少编译时间
1. 缩小 loader 处理资源的范围 (include/exclude)
2. 缓存loader的执行结果(cache-loader)
3. 优化模块查找路径 resolve.modules
4. module.noParse，忽略大型的 library 可以提高构建性能
5. HappyPack，让webpack对loader的执行过程，从单一进程形式扩展为多进程模式
6. runtimeChunk, bundle缓存优化，将包含chunks 映射关系的 list单独从 bundle.js里提取出来
7.  sourceMap
###减少编译输出文件大小  
1. 代码压缩插件UglifyJsPlugin 与 ParallelUglifyPlugin
2. Tree Shaking，babel保留ES6模块化语法，以便进行tree sharking
3. externals, 不将指定的依赖包打包到bundle中，而是在运行时再从外部获取依赖
4. DllPlugin与webpack.DllReferencePlugin
5. 配置optimization.minimizer，使用terser-webpack-plugin压缩bundle
6. splitChunks，抽离出重复使用的依赖
打包体积 优化思路

提取第三方库或通过引用外部文件的方式引入第三方库
代码压缩插件UglifyJsPlugin
服务器启用gzip压缩
按需加载资源文件 require.ensure
优化devtool中的source-map
剥离css文件，单独打包
去除不必要插件，通常就是开发环境与生产环境用同一套配置文件导致 #####打包效率
开发环境采用增量构建，启用热更新
开发环境不做无意义的工作如提取css计算文件hash等
配置devtool
选择合适的loader
个别loader开启cache 如babel-loader
第三方库采用引入方式
提取公共代码
优化构建时的搜索路径 指明需要构建目录及不需要构建目录
模块化引入需要的部分
---

#webpack热更新原理
1. 在启动本地服务时，会生成2个文件，一个是websocket客户端代码，一个是检查更新逻辑的代码；这2个文件的代码会被打包到bundle.js中，运行在浏览器中。
2. 本地服务启动之后，会启动websocket服务，建立本地服务和浏览器的双向通信
3. 修改代码，webpack-dev-middleware会监听本地文件的变化（文件的生成时间），然后重编译，将结果输出到内存
4. 每次编译结束，会生成带有hash值的json和js文件，同时本地服务会通过websocket通知浏览器，发送新的hash值。hash值代表每一次编译的标识，本次输出的hash值会作为下次编译新生成的文件标识
5. 浏览器收到websocket消息，做检查更新，HotModuleReplacementPlugin利用上一次编译生成hash值，发送xxx/hash.hot-update.json的ajax请求，请求返回下次热更新hash值和本次需要更新的文件信息
6. HotModuleReplacementPlugin再发送xxx/hash.hot-update.js 请求，通过JSONP方式，立即运行请求到的js文件，js文件中包含已修改的mudule信息。通过moduleId就可以更新本地保存的modules。
7. 最后执行相关的module代码，完成热更新。

---

###webpack-dev-server
webpack-dev-server实际上相当于启用了一个express的Http服务器+调用webpack-dev-middleware。它的作用主要是用来伺服资源文件。这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会用webpack实时的编译，再用webpack-dev-middleware将webpack编译后文件会输出到内存中。

###webpack-dev-middleware
webpack-dev-middleware监听本地文件修改，编译，然后输出的文件存在于内存中。webpack梳理出entry和output模块的关系脉络，webpack-dev-middleware 在此基础上形成一个文件映射系统，每当应用程序请求一个文件，它匹配到了就把内存中缓存的对应结果以文件的格式返回给你。因为是内存型文件系统，所以重建速度非常快，适合于开发阶段用作静态资源服务器；因为 webpack 可以把任何一种资源都当作是模块来处理，因此能向客户端反馈各种格式的资源，所以可以替代HTTP 服务器。事实上，大多数 webpack 用户用过的 webpack-dev-server 就是一个 express＋webpack-dev-middleware 的实现。二者的区别仅在于 webpack-dev-server 是封装好的，除了 webpack.config 和命令行参数之外，很难去做定制型开发。而 webpack-dev-middleware 是中间件，可以编写自己的后端服务然后把它整合进来，相对而言比较灵活自由。

###webpack-hot-middleware：
是一个结合webpack-dev-middleware使用的middleware，它可以实现浏览器的无刷新更新（hot reload）。webpack-dev-middleware完成对文件修改的watch，动态编译和保存在内存；webpack-hot-middleware完成浏览器与服务器websocket连接的建立以及根据接收到的代码修改信息，更新本地module，刷新页面。

---

#tree-sharking
tree shaking 是一个术语，用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。依赖于 ES2015 模块系统。
 package.json 的 “sideEffects” 属性作为标记
babel配置module: false
uglify.js plugin

---

#rollup
如果你需要代码拆分(Code Splitting)，或者你有很多静态资源需要处理，再或者你构建的项目需要引入很多CommonJS模块的依赖，那么 webpack 是个很不错的选择。

如果您的代码库是基于 ES2015 模块的，而且希望你写的代码能够被其他人直接使用，你需要的打包工具可能是 Rollup 。

 rollup 相对 webpack 而言，要小巧、干净利落一些，但不具备 webpack 的一些强大的功能，如热更新，代码分割，公共依赖提取等。

所以，一个不错的选择是，应用使用 webpack，类库使用 rollup。

---

#vite
其Vite 的主要功能就是通过劫持浏览器的这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再返回给浏览器渲染页面，vite整个过程中没有对文件进行打包编译，所以其运行速度比原始的webpack开发编译速度快出许多！

1.  重写引入模块路径前面加上/@modules/, 重写后浏览器会再次发送请求
2.  拦截含有/@modules/的请求, 去node_modules引入对应的模块并返回
3.  解析.vue文件, 被解析成render函数返回给浏览器渲染页面：请求：http://localhost:3000/src/App.vue, vue文件时，koa中间件检测到请求的是vue模板文件，则会在请求后面添加一个type=template参数 如： http://localhost:3000/src/App.vue?type=template, koa通过这个参数来判断是请求vue模板文件，并编译成js文件返回给浏览器 
4. 静态服务插件 实现可以返回静态文件的功能

https://juejin.cn/post/6844904202364420109













