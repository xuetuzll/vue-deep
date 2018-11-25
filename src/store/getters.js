const getters = {
  appNameWithVersion: state => {
    return `${state.appName}v2.0`
  }
}
export default getters

//定义一些固定模式更新的东西
//getters里的方法中state代表同级的state
//使用es6的模板语法更简单一些
