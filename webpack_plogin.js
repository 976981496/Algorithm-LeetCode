class MyPlugin {
    apply(compiler) {
        // 找到合适的事件钩子，实现自己的插件功能  
        compiler.hooks.emit.tap('MyPlugin',
            compilation => {

                // compilation: 当前打包构建流程的上下文    
                console.log(compilation);
                // do something...  
            })
    }
}

// Plugin的开发和开发Loader一样，需要遵循一些开发上的规范和原则：
// compiler暴露了和 Webpack整个生命周期相关的钩子（compiler-hooks[2]），
// 而compilation则暴露了与模块和依赖有关的粒度更小的事件钩子（Compilation Hooks[3]）。
// 插件必须是一个函数或者是一个包含 apply 方法的对象，
// 这样才能访问compiler实例；
// 传给每个插件的 compiler 和 compilation 对象都是同一个引用，
// 若在一个插件中修改了它们身上的属性，会影响后面的插件;
// 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住;