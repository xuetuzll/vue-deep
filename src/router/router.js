import Home from '@/views/Home.vue'

export default [
  {
    path: '/',
    alias: '/home_page',
    name: 'home',
    component: Home,
    props: route => ({
      //() => ({})  等价于 () => { return {} }
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {
      if(from.name === 'login') alert('这是从登录页来的')
      else alert('这不是从登录页来的')
      next()
    }
    //路由内的独享守卫，专门针对特定路由的守卫
    /*
      主要就是路由的跳转进行判断后的逻辑处理
      没有next()是不会进行跳转的
    */
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    props: {
      food: 'banana'
    },
    meta: {
      title: '关于'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue'),
    props: true
  },
  {
    path: '/count-to',
    name: 'count-to',
    component: () => import('@/views/count-to.vue'),
  },
  {
    path: '/menu-page',
    name: 'menu-page',
    component: () => import('@/views/menu-page.vue'),
  },
  {
    path: '/render-page',
    name: 'render-page',
    component: () => import('@/views/render-page.vue'),
  },
  {
    path: '/split-pane',
    name: 'split-pane',
    component: () => import('@/views/split-pane.vue'),
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: 'child',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',
    components: {
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/main',
    redirect: '/'
  },
  {
    path: '/store',
    component: () => import('@/views/store.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]

//import写外面一开始加载
//import写里面，懒加载，使用的使用加载

//路由规则中有一项写错，该项不进行加载
