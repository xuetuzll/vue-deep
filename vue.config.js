const path = require('path')

const resolve = dir => path.join(__dirname, dir)


//项目的基本路径
const BASE_URL = process.env.NODE_ENV === 'procution' ? '/iview-admin/' : '/'


module.exports = {
  lintOnSave: false,
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
//eslink的检测
//baseUrl配置项目基本路径 根据是否是生产环境判断项目基本路径
//chainWebpack,代表引入到东西的地方，用前面的代表后面的。
//productionSourceMap打包时不生成.map文件减少打包大小
/*跨域配置,可以使用后端定义跨域请求，
也可以使用devServer配置代理的url请求。
*/
