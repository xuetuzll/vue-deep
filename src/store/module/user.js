const state = {
  userName: 'lison'
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params){
    return state.userName = params
  }
}
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }){
    // rootState.appName
    //dispatch('xxx', '')
  },
  xxx (){

  }
}

export default {
  namespaced: true,
  //设置命名空间，模块更加密闭
  state,
  getters,
  mutations,
  actions
}

//模块没有开启命名空间的话直接获取，不用写模块名
//命名空间里使用action又不一样了，有两个state，一个当前state，另一个根state
//dispatch('action方法名', '参数')可以触发另一个action
