import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import CountTo from '_c/count-to'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

//在生产环境引入mock,请求真实接口，把mock.js注释
// if(process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.use(iview)

const handleClick = event => {
  console.log(event)
  event.stopPropagation()
}

let list = [{name: 'lison'}, {name: 'lili'}]
// 做映射,map方法会遍历这个数组，item数组每一项，最后把return重现组装起来，返回数组
const getLiEleArr = (h) => {
  return list.map((item, index) => h('li', {
    on: {
      'click': handleClick
    },
    key: `list_item_${index}`
  }, item.name))
}

// const getLiEleArr = h => {
//   return list.map(item => h('li', {
//     on: {
//       'click': handleClick
//     }
//   }, item.name))
// }

new Vue({
  router,
  store,
  render: h => {
    return h(App)
  }
  // render: h => {
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
  // }
  // render: h => h('div', [
  //   h('ul', {
  //     on: {
  //       'click': handleClick
  //     }
  //   }, getLiEleArr(h))
  // ])
}).$mount('#app')

//render函数的渲染，div，组件
//渲染组件props数据绑定的属性，on组件初始化就调用的方法，注意同时原生的绑定用on
//nativeOn给组件绑定方法的事件，class属于保留字

//render函数的渲染，div的方式
//自己本身去定义映射的数组渲染方法
//想使用类似于v-for生成多个虚拟节点div
//相同事件可以抽离出来
//定义数组，map方法遍历数组的每一项并映射返回数组
//把映射放回的放到渲染里就能实现
//不能像vue修饰符一样阻止冒泡，只能在事件方法里阻止冒泡
//key主要被用在被映射的数组渲染方法里
//event.stopPropagation()阻止默认事件
