import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import CountTo from '_c/count-to'

//在生产环境引入mock
if(process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

new Vue({
  router,
  store,
  render: h => {
    return h(App)
    // return h('div', {
    //   attrs: {
    //     id: 'box'
    //   },
    //   style: {
    //     color: 'pink'
    //   }
    // }, 'lison')
    // return h(CountTo, {
    //   'class': [],
    //   attrs: {},
    //   style: {},
    //   props: {
    //     endVal: 100
    //   },
    //   domProps: {},
    //   on: {
    //     'on-animation-end': (val) => {
    //       console.log('animation end!');
    //     }
    //   },
    //   nativeOn: {
    //     'click': () => {
    //       console.log('click');
    //     }
    //   },
    //   directives: [],
    //   scopedSlots: {},
    //   slot: '',
    //   key: '',
    //   ref: ''
    // })
  }
}).$mount('#app')

//render函数的渲染，div，组件，页面
//渲染组件props数据绑定的属性，on组件初始化就调用的方法，
//nativeOn给组件绑定方法的事件，class属于保留字
