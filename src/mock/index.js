import Mock from 'mockjs'
//导入mock定义的数据
import { getUserInfo } from './response/user'
import { getTableData, getFileList, getFolderList } from './data'

const Random = Mock.Random

Mock.mock('/getUserInfo', 'post', getUserInfo)

Mock.mock('/getTableData', 'get', getTableData)

Mock.mock('/getFileList', 'get', getFileList)

Mock.mock('/getFolderList', 'get', getFolderList)

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

//Mock.mock自带拦截
//这个文件是导出mock，注意mock有没有被导出去
