const getters = {
  appNameWithVersion: state => {
    return `${state.appName}v2.0`
  }
}
export default getters

//getters里的方法中state代表同级的state
//使用es6的模板语法更简单一些
