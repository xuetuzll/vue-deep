import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'

//
export const routerMap = [
  {
    path: '/',
    alias: '/home_page',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        component: Home
      },
      {
        path: 'table_page',
        name: 'table_page',
        component: () => import('@/views/table.vue')
      },
      {
        path: 'folder_tree',
        name: 'folder_tree',
        component: () => import('@/views/folder-tree/folder-tree.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/upload.vue')
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/form.vue')
      }
    ]
    // props: route => ({
    //   //() => ({})  等价于 () => { return {} }
    //   food: route.query.food
    // }),
    // beforeEnter: (to, from, next) => {
    //   if(from.name === 'login') alert('这是从登录页来的')
    //   else alert('这不是从登录页来的')
    //   next()
    // }
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
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue'),
    props: true
  },
  {
    path: '/count_to',
    name: 'count_to',
    //另一种方法，通过服务端返回一个可访问的列表，做一个过滤，动态挂载在实力上。
    // meta: { //前端配置管理员级别
    //   access: ['super_admin'], //这里配置管理员的级别
    //   icon: 'md-funnel',
    //   showAlways: true
    // },
    component: () => import('@/views/count-to.vue'),
  },
  {
    path: '/menu_page',
    name: 'menu_page',
    component: () => import('@/views/menu-page.vue'),
  },
  {
    path: '/render_page',
    name: 'render_page',
    component: () => import('@/views/render-page.vue'),
  },
  {
    path: '/split_pane',
    name: 'split_pane',
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
    name: 'named_view',
    components: {
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/'
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/store.vue')
  }
]


export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]

//import写外面一开始加载
//import写里面，懒加载，使用的使用加载

//路由规则中有一项写错，该项不进行加载

//使用权限管理，把需要根据权限来控制的通过状态管理工具，
//把后台能给予权限的地址，前端定义方法获取地址
//把地址拼接起来，之后通过全局路由守卫去判断地址是否有权限进入
//v-if判断组件显不显示
