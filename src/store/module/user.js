import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userName: 'lison',
  rules: {}
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  //吧数据挂载在state上
  SET_USER_NAME (state, params){
    return state.userName = params
  },
  SET_RULES (state, rules){
    state.rules = rules
  }
}
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }){
    // rootState.appName
    //dispatch('xxx', '')
  },
  xxx (){
    //
  },
  login ({commit}, { userName, password }){
    return new Promise((resolve, reject) => {
      login({ userName, password }).then(res => {
        if(res.code === 200 && res.data.token){
          setToken(res.data.token)
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
    //创建Promise目的，可以根据状态码进行分类并返回下一步操作
    //需要注意数据是通过（传入参数，载荷）的形式传递的
  },
  authorization ({ commit }, token){
    return new Promise((resolve, reject) =>{
      authorization().then(res => {
        //根据后端逻辑验证token是否过期
        if(parseInt(res.code) === 401){
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)
          //返回调用接口获取到的数据
          resolve(res.data.rules.page)
          //提交一个方法，把数据传过去
          commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout (){
    setToken('')
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

//用户登录的接口放在store状态管理工具的user里去调用，并引进来
//值从哪里来？通过载荷的形式传进来
