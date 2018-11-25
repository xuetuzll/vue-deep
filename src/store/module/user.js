const state = {
  userName: 'lison'
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  //
}
const actions = {
  //
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
