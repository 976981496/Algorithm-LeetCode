

// // window对象提供了onhashchange事件来监听hash值的改变,
// 一旦url中的hash值发生改变,便会触发该事件。

// window对象提供了onpopstate事件来监听历史栈的改变,一旦历史栈信息发生改变,便会触发该事件。
// 需要特别注意的是,
// 调用history.pushState()
// 或history.replaceState()
// 不会触发popstate事件。
// 只有在做出浏览器动作时，才会触发该事件。

import { BaseRouter } from './base.js';

export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    //监听历史栈信息变化,变化时重新渲染
    window.addEventListener('popstate', e => {
      this.handler();
    });
  }
  //渲染
  handler() {
    this.render(this.getState());
  }
  //获取路由路径
  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }
  //使用pushState方法实现压入功能
  //PushState不会触发popstate事件,所以需要手动调用渲染函数
  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }
  //使用replaceState实现替换功能  
  //replaceState不会触发popstate事件,所以需要手动调用渲染函数
  replace(path) {
    history.replaceState(null, null, path);
    this.handler();
  }
  go(n) {
    window.history.go(n);
  }
}

