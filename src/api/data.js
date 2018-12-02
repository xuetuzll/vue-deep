import axios from './index'
export const getTableData = () => {
  return axios.request({
    url: '/getTableData',
    method: 'get'
  })
}

export const getFolderList = () => {
  return axios.request({
    url: '/getFolderList',
    method: 'get'
  })
}

export const getFileList = () => {
  return axios.request({
    url: '/getFileList',
    method: 'get'
  })
}

//开发中有时候只需要一个文件夹，有时候只需要文件

//api就是请求的地址
