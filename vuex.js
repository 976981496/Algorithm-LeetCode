




// 1. 每个组件都共享Store中的数据, 
//以及每个组件都可以通过 $store.state  或者 getters 拿到传入的数据,
// 2. 通过事件 或者 回调函数 触发muation,进行同步更新数据, 从而触发视图更新
// 3. 通过 提交 action  进行异步操作数据,

let Vue
 
class Store {
  constructor(options = {}) {
    // 核心代码: 保证数据都是响应式的
    this.myState = new Vue({
      data() {
        return {
          state: options.state
        }
      }
    })
    //   定义实例上的 getters
    this.getters = {}
    //   遍历所有的对象中的方法名
    Object.keys(options.getters).forEach(key => {
      // 重新构造 this.getters 对象
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.state)
        }
      })
    })
 
    //  定义 muations
    let mutations = {}
    Object.keys(options.mutations).forEach(key => {
      mutations[key] = payload => {
        options.mutations[key](this.state, payload)
      }
    })
    //  提供commit 方法
    this.commit = (key, payload) => {
      mutations[key](payload)
    }
    // 收集 actions
    let actions = {}
 
    Object.keys(options.actions).forEach(key => {
      actions[key] = payload => {
        options.actions[key](this, payload)
      }
    })
    this.dispatch = (key, payload) => {
      actions[key](payload)
    }
  }
 
  get state() {
    return this.myState.state
  }
}
 
const install = _Vue => {
  console.log("install")
  Vue = _Vue // 用一个变量接收 _Vue 构造器
  Vue.mixin({
    beforeCreate() {
      //判断 根 实例 有木有传入store 数据源,
      //如果传入了, 就把它放到实例的 $store上
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 2. 子组件去取父级组件的$store属性
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
 
export default {
  install,
  Store
}






























export default {
    Store,
    install
}