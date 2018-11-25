import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
//结构赋值
import { setTitle } from '@/lib/util'

Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  routes
})

const HAS_LOGINED = true

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  if(to.name !== 'login'){
    if(HAS_LOGINED) next()
    else next({ name: 'login' })
  } else {
    if(HAS_LOGINED) next({ name: 'home' })
    else next()
  }
})

//router.beforeResolve

router.afterEach((to, from) => {
  //路由跳转之后做的操作
})

export default router

//导航守卫的使用
/*判断是否已登入，使用全局前置守卫，
to.name代表跳转的页面，from.name代表页面从哪里来，next()接下来要做的事情
*/
//这里配置了3个导航守卫
//1.全局前置守卫，主要作用：根据登入与否进行操作，全局加载动画的定义，
//to.meta路由元信息（公共部分），在全局前置守卫里被引用，需要判断，与业务相关写在util.js文件里
//2.全局解析守卫，在组件被解析完之后，但导航未被确认之前
//3.全局后置守卫，路由跳转之后做的操作

/*
1.导航被触发（路由被调用）
2.失活组件（beforeRouterLeave）
3.调用全局的前置守卫（beforeEach）
4.在重用的组件里调用（beforeRouteUpdate）
5.调用路由独享的守卫（beforeEnter）
6.解析异步路由组件
7.被激活的组件调用（beforeRouteEnter）
8.调用全局解析守卫（beforeResolve）
9.导航被确认
10.调用全局的后置守卫（afterEach）
11.触发dom的更新
12.用创建好的实例调用（beforeRouteEnter）的next回调函数
*/
