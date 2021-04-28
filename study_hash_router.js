
// window对象提供了onhashchange事件来监听hash值的改变,
// 一旦url中的hash值发生改变,便会触发该事件。

// window对象提供了onpopstate事件来监听历史栈的改变,一旦历史栈信息发生改变,便会触发该事件。
// 需要特别注意的是,
// 调用history.pushState()
// 或history.replaceState()
// 不会触发popstate事件。
// 只有在做出浏览器动作时，才会触发该事件。






//-------------------------------------BaseRouter--------------------------------------------//
// BaseRouter
const ELEMENT = document.querySelector('#page');

export class BaseRouter {
 //list = 路由列表
  constructor(list) {
    this.list = list;
  }
  render(state) {
   //匹配当前的路由,匹配不到则使用404配置内容 并渲染~
    let ele = this.list.find(ele => ele.path === state);
    ele = ele ? ele : this.list.find(ele => ele.path === '*');
    ELEMENT.innerText = ele.component;
  }
}
//----------------------------------------BaseRouter-----------------------------------------//







import { BaseRouter } from './base.js'; 

export class HashRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    //监听hash变化事件,hash变化重新渲染  
    window.addEventListener('hashchange', e => {
      this.handler();
    });
  }
  //渲染
  handler() {
    this.render(this.getState());
  }
  //获取当前hash
  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }
  //获取完整url
  getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}#${path}`;
  }
  //改变hash值 实现压入 功能
  push(path) {
    window.location.hash = path;
  }
  //使用location.replace实现替换 功能 
  replace(path) {
    window.location.replace(this.getUrl(path));
  }
  //这里使用history模式的go方法进行模拟 前进/后退 功能
  go(n) {
    window.history.go(n);
  }
}
