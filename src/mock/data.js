import { doCustomTimes } from '@/lib/tools'
import Mock from 'mockjs'

//导出一个定义了几次的模板，
//@某个值，随机某个值
export const getTableData = () => {
  const template = {
    name: '@name',
    'age|18-25': 0,
    email: '@email'
  }
  let arr = []
  doCustomTimes(5, () =>{
    arr.push(Mock.mock(template))
  })
  return arr
}
