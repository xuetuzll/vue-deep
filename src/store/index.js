import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import user from './module/user'
import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV === 'development',
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [saveInLocal]
})

//加载插件：因为store的东西存在内存中刷新浏览器会被清除。
//在严格模式下，strict设置为true的时候，组件内直接赋值的形式会给你报个错
//根据环境，开发环境为true，生产环境为false。
