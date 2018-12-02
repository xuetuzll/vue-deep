<template>
  <div class="folder-wrapper">
    <Tree :data="folderTree" :render="renderFunc"></Tree>
  </div>
</template>

<script>
import { getFolderList, getFileList } from '@/api/data'
import { putFileInFolder, transferFolderToTree } from '@/lib/util'
export default {
  data (){
    return {
      folderList: [],
      fileList: [],
      folderTree: [],
      renderFunc: (h, { root, node, data }) => {
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" color="#2d8cf8" /> : ''}
            { data.title }
          </div>
        )
      }
    }
  },
  mounted (){
    // getFolderList().then(res => {
    //   getFileList().then(res => {

    //   })
    // })
    // axios.all([])//数组里包含每一个请求都会被执行
    Promise.all([getFolderList(), getFileList()]).then(res => {
      this.folderTree = transferFolderToTree(putFileInFolder(res[0], res[1]))
    })
  }
}
</script>

<style lang="less">
.folder-wrapper{
  width: 300px;
  .tree-item{
    display: inline-block;
    width: ~'calc(100% - 50px)';
  }
}
</style>


