// window对象提供了onhashchange事件来监听hash值的改变,
// 一旦url中的hash值发生改变,便会触发该事件。
// window对象提供了onpopstate事件来监听历史栈的改变,一旦历史栈信息发生改变,便会触发该事件。
// 需要特别注意的是,
// 调用history.pushState()
// 或history.replaceState()
// 不会触发popstate事件。
// 只有在做出浏览器动作时，才会触发该事件。

let Vue
class VueRouter {
    constructor(option) {
        this.$option = option
        this.routerMap = {}
        this.app = new Vue({
            date: {
                current: '/'
            }

        });

    }



}
init() {
    this.bindEvent()
    this.createRouter(this.$option )
    this.initComponent( )

}
bindEvent() {
    window.addEventListener('hashChange', handleHashChange.bind(this))
    window.addEventListener('load', handleHashChange.bind(this))

}
createRouter(option) {
    option.routes.forEach(route => {
        this.routerMap[route.path] = item

    });

}
handleHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
}
//注册两个组件
initComponent() {
    Vue.component('router-link', {
        props: {
            to: String
        },
        render: function (createElement) {
            return createElement(
                'a', {
                    attrs: {
                        herf: '#' + this.to
                    },
                },
                this.$slots.default
            )

        }
    })

    Vue.component('router-view', {
        props: {
            to: String
        },
        render: function (h) {
            let com = this.routerMap[this.app.current].component
            return h(com)
        }

    })
}
VueRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$option.router) {
                this.$option.router.init()
            }

        }
    })

}

export default VueRouter