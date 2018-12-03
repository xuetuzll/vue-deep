<template>
  <div class="folder-wrapper">
    <!-- <Tree :data="folderTree" :render="renderFunc"></Tree> -->
    <folder-tree :folder-list.sync="folderList" :file-list.sync="fileList"
      :folder-drop="folderDrop" :file-drop="fileDrop"
      :beforeDelete="beforeDelete">
    </folder-tree>
  </div>
</template>

<script>
//父组件绑定了两个相关的值，抛出去的值与两个都有关
//只与其中一个有关的话，用v-model绑定数据
//用.sync修饰符相关的绑定，怎么更新呢
//子组件内使用this.$emit('update:事件名', 值)
import { getFolderList, getFileList } from '@/api/data'
import FolderTree from '_c/folder-tree'
export default {
  components: {
    FolderTree
  },
  data (){
    return {
      folderList: [],
      fileList: [],
      folderDrop: [
        {
        name: 'rename',
        title: '重命名'
        },
        {
        name: 'delete',
        title: '删除文件夹'
        }
      ],
      fileDrop: [
        {
        name: 'rename',
        title: '重命名'
        },
        {
        name: 'delete',
        title: '删除文件'
        }
      ]
    }
  },
  methods: {
    beforeDelete (){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let error = null //new Error('error')
          if(!error){
            resolve()
          } else reject(error)
        }, 1000)
      })
    }
  },
  mounted (){
    // getFolderList().then(res => {
    //   getFileList().then(res => {

    //   })
    // })
    // axios.all([])//数组里包含每一个请求都会被执行
    Promise.all([getFolderList(), getFileList()]).then(res => {
      this.folderList = res[0]
      this.fileList = res[1]
    })
  }
}

//想要封装一个组件，尽量的减少自己的操作，分析什么是必须传进去的什么是可以在组件内完成的。
//比如树状图：文件夹和文件是必须传进去的，其他的是组件内可以完成的。
//把文件夹和文件的相关操作放入组件内，在props里面去接收文件。
//父子组件不涉及递归组件的话，显示都是在子组件显示，那么给Tree组件传入必须的参数即可
//也可以理解为，父组件传data的数据给子组件，子组件取值计算方法显示
//引入组件并注册，
</script>

<style lang="less">
.folder-wrapper{
  width: 300px;
}
</style>


