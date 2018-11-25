import Vue from 'vue'
const mutations = {
  SET_APP_NAME (state, params){
    state.appName = params
  },
  SET_APP_VERSION (state){
    Vue.set(state, 'appVersion', 'V2.0')
  },
  SET_STATE_VALUE (state, value){
     state.stateValue = value
  }
}

export default mutations

//根据需求去替换数据,同步的操作
