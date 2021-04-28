
// // window对象提供了onhashchange事件来监听hash值的改变,
// 一旦url中的hash值发生改变,便会触发该事件。
// window对象提供了onpopstate事件来监听历史栈的改变,一旦历史栈信息发生改变,便会触发该事件。
// 需要特别注意的是,
// 调用history.pushState()
// 或history.replaceState()
// 不会触发popstate事件。
// 只有在做出浏览器动作时，才会触发该事件。


let Vue
class VueRouter {
    constructor(options) {
        this.$options = options
        this.routeMap = {}
        //实现响应式修改
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }
}
init() {
    this.bindEvents()
    this.createRouterMap(this.$options)

}
bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
}
onHashChange() {
    // http://www.runoob.com/test.htm＃/test：
    //window.location.hash   ＃/test
    //.slice(1)   /test
    this.app.current = window.location.hash.slice(1) || '/'
}
createRouterMap() {
    //遍历将路由列表放在对象类里面   
    options.routes.forEach(item => {
        this.routeMap[item.path] = item
    });
}
initComponent() {
    Vue.component('router-link', {
        props: {
            to: String
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        props: {
            to: String
        },
        render(h) {
            const Comp = this.routeMap[this.app.current].component
            return h(Comp)
        }
    })
}
VueRouter.install = function (_Vue) {
    Vue = _Vue
     
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this.$options.router.init()
            }

        }
    })
}
export default VueRouter