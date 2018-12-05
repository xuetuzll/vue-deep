import Cookie from 'js-cookie'
import clonedeep from 'clonedeep'

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

export const setToken = (token, tokenName = 'token') => {
  Cookie.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
  return Cookie.get(tokenName)
}

//把文件的文件夹id倒叙放入文件夹id中，这两个id对应相等
export const putFileInFolder = (folderList, fileList) => {
  //拷贝文件和文件夹
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  //映射返回的新文件夹
  return folderListCloned.map(folderItem => {
    const folderId = folderItem.id
    let index = fileListCloned.length
    while (--index >= 0){
      //文件从后往前取出放入每一个文件项
      const fileItem = fileListCloned[index]
      //mock设置数据每个文件项都有自己的文件夹id
      if(fileItem.folder_id === folderId){
        //把删除的元素以数组的形式返回
        const file = fileListCloned.splice(index, 1)[0]
        file.title = file.name
        if(folderItem.children) folderItem.children.push(file)
        else folderItem.children = [file]
      }
    }
    folderItem.type = 'folder' //渲染的类型
    return folderItem
  })
}
//把什么放入什么本质是：mock定义数据，建立一种联系
//通过深拷贝，map映射新数据
//做循环倒过来放入防止splice取数据的时候位置变化
//通过关系放入数据，添加必要属性

//看这个题目，能想起来就知道怎么做，10个数据，5组，两层，第一层3个


//把handle方法返回出去
//数据变成树状图，第一层有几个最终显示几个
//第二层的id等于第一层的第id个，id超过第一层的个数，不显示。

//递归循环本身，文件夹的文件夹id等于文件夹id
//这种方法只能是两层
export const transferFolderToTree = folderList => {
  if(!folderList.length) return []
  const folderListCloned = clonedeep(folderList)
  //递归本身，这个的用法在树状图里
  const handle = id => {
    let arr = []
    folderListCloned.forEach(item => {
      if(item.folder_id === id){
        //item.folder_id只有0，1，2三个
        const children = handle(item.id)
        //递归调用自己，除了自己还有上面的判断条件1==1或者2==2
        //如果当前文件夹已有children子集，则进行合并
        if(item.children) item.children = [].concat(item.children, children)
        else item.children = children
        item.title = item.name
        arr.push(item)
      }
    })
    return arr
  }
  return handle(0) //所有第一级的handle为0
}

export const expandSpecifiedFolder = (folderTree, id) => {
  return folderTree.map(item => {
    if(item.type === 'folder'){
      if(item.id === id){
        item.expand = true
      } else {
        if(item.children && item.children.length){
          item.children = expandSpecifiedFolder(item.children, id)
          if(item.children.some(child => {
            return child.expand === true
          })) {
            item.expand = true
          } else {
            item.expand = false
          }
        }
      }
    }
    return item
  })
}

//模拟提交一个表单的方法
export const downloadFile = ({ url, params, }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params){
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

//业务相关的功能，设置title，设置cookie，获取cookie
