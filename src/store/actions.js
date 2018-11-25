import { getAppName } from '@/api/app'

const actions = {
  // updateAppName({ commit }){
  //   getAppName().then(res => {
  //     const { info: { appName } } = res
  //     commit('SET_APP_NAME', appName)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  async updateAppName ({ commit }){
    try{
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (err){
      console.log(err)
    }
  }
}

export default actions

//actions主要用来异步请求修改mutation同步数据
//es6异步请求数据的写法
//updateAppName({ commit })相当于定义好了commit变量
//updateAppName(params){ const commit = params.commit}
//const { info: { appName } } = res相当于把info里的appname这一层作为res

//传统的写法：ifelse，根据code判断
//es6变量定义{ commit }这样定义变量，
//api请求部分用promise去拆分只能才成2不同的类，只需要状态码为200的
//.then去拿需要的数据.catch去拿错误信息

//es8提供了async本质是把等待的异步值赋给变量名，变量名使用es6定义
//通过try{}去拿需要的数据 catch{}去拿错误信息

