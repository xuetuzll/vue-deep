import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random

Mock.mock('/getUserInfo', 'post', getUserInfo)

 Mock.setup({
   timeout: 0
 })

 Random.extend({
   fruit () {
     const fruit = ['apple', 'peach', 'lemon']
     return this.pick(fruit)
   }
 })

export default Mock

//引入mockjs，使用mock方法，mock.mock带有全局拦截，导出mock
