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

export const getFilesList = () => {
  return axios.request({
    url: 'get_file_list',
    params: {
      userId: 1
    },
    method: 'get'
  })
}

export const getFile = ({ key, type }) => {
  return axios.request({
    url: 'get_file',
    data: {
      key,
      type
    },
    method: 'post'
  })
}

export const deleteFile = key => {
  return axios.request({
    url: 'delete_file',
    data: {
      key
    },
    method: 'delete'
  })
}

export const sendFormData = ({ url, data }) => {
  return axios.request({
    url,
    data,
    method: 'post'
  })
}

//开发中有时候只需要一个文件夹，有时候只需要文件

//api就是请求的地址
