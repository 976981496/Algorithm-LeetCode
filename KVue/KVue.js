//遍历Kvue的构造函数
class KVue {
  constructor(options) {
    this.$optuons = options;
    this.$data = options.data;
    this.observe(this.$data)
  }
  observe (values) {
    if(values typeof Object)
    
  }
}
