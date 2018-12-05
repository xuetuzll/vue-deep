import { routes, routerMap } from '@/router/router'
//在哪里去获取路由权限的列表呢，路由守卫这里。
const state = {
  //路由跳转的时候会对路由对象进行修改，并引用
  routers: routes,
  hasGetRules: false
}

const mutations = {
  CONCAT_ROUTES (state, routerList){
    //合并的时候需要注意要用routerList去合并routes，因为匹配规则里面有一个*通配匹配符号
    state.routers = routerList.concat(routes)
    state.hasGetRules = true
  }
}

const getAccesRouterList = (routes, rules) => {
  //返回一个过滤的值
  return routes.filter(item => {
    //过滤rules里面item.name
    //因为用了rules[item.name],routes来源于路由，所以要求每一个路由都需要有自己的name
    if(rules[item.name]) {
      if(item.children) item.children = getAccesRouterList(item.children, rules)
      return true
    } else return false
  })
}

const actions = {
  concatRoutes ({ commit }, rules){
    return new Promise((resolve, reject) => {
      try {
        let routerList = []
        //把对象转换成一个二维数组，比如{a: 'a', b: 'b' } => ['a', 'a'],['b': 'b']
        //意思就是返回页面里面第二个元素为TRUE的
        if(Object.entries(rules).every(item => item[1])) {
          routerList = routerMap
        } else {
          routerList = getAccesRouterList(routerMap, rules)
        }
        commit('CONCAT_ROUTES', routerList)
        resolve(state.routers)
      } catch(err) {
        reject(err)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
