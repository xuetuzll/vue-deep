import { doCustomTimes } from '@/lib/tools'
import Mock from 'mockjs'
const Random = Mock.Random

//导出一个定义了几次的模板，
//@某个值，随机某个值
export const getTableData = () => {
  const template = {
    name: '@name',
    'age|18-25': 0,
    email: '@email'
  }
  let arr = []
  doCustomTimes(5, () => {
    arr.push(Mock.mock(template))
  })
  return arr
}

export const getFileList = () => {
  const template = {
    'name|5': '@cword', //标识中文
    'creat_time': '@datetime',
    'folder_id|1-5': 0,
    'id|+1': 1000
  }
  let arr = []
  doCustomTimes(10, () => {
    arr.push(Mock.mock(template))
  })
  return arr
}

export const getFolderList = () => {
  //两层，第一层3个，总共5个
  const template1 = {
    'name|1': '@word',
    'creat_time': '@datetime',
    'folder_id': 0,
    'id|+1': 1
  }
  const template2 = {
    'name|1': '@word',
    'creat_time': '@datetime',
    'folder_id|+1': 1,
    'id|+1': 4
  }
  let arr = []
  doCustomTimes(3, () => {
    arr.push(Mock.mock(template1))
  })
  doCustomTimes(2, () => {
    arr.push(Mock.mock(template2))
  })
  return arr
}
