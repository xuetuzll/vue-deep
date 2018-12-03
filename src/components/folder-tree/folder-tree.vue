<template>
  <div>
    <Tree :data="folderTree" :render="renderFunc"></Tree>
  </div>
</template>

<script>
import { putFileInFolder, transferFolderToTree, expandSpecifiedFolder } from '@/lib/util'
import clonedeep from 'clonedeep'
export default {
  name: 'FolderTree',
  data (){
    return {
      folderTree: [],
      currentRenamingId: '',
      currentRenamingContent : '',
      renderFunc: (h, { root, node, data }) => {
        //tree组件绑定render，这里给每一项都绑定下拉内容，以及身份标识。
        const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop
        const dropdownRender = dropList.map(item => {
          return (<dropdownItem name={item.name}>{ item.title }</dropdownItem>)
        })
        const isRenaming = this.currentRenamingId === `${data.type || 'file'}_${data.id}`
        //根据是否点击给予身份标识
        //未点击过，显示dropdown点击后不显示
        //对点击内容进行判断，执行对应的业务逻辑
        //重命名遍历splice替换每一个数据，.sync监视数据并更新组件
        //删除过滤不想要的数据，.sync更新数据，更新组件。
        //这里给每一项添加样式，根据身份标识来判断是否显示两种情况
        //给确认绑定事件更新发送数据

        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" color="#2d8cf8" /> : ''}
            {
              isRenaming
                ? <span>
                    <i-input value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
                    <i-button size="small" type="text" on-click={this.saveRename.bind(this, data)}><icon type="md-checkmark" /></i-button>
                    <i-button size="small" type="text"><icon type="md-close" /></i-button>
                  </span>
                : <span>{ data.title }</span>
            }
            {
              dropList && !isRenaming ? <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this, data)}>
                <i-button size="small" type="text" class="tree-item-button">
                  <icon type="md-more" size={12} />
                </i-button>
                <dropdownMenu slot="list">
                  { dropdownRender }
                </dropdownMenu>
              </dropdown> : ''
            }
          </div>
        )
      }
    }
  },
  props: {
    folderList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
    folderDrop: {
      type: Array,
      default: () => []
    },
    fileDrop: {
      type: Array,
      default: () => []
    },
    beforeDelete: Function
  },
  watch: {
    folderList (){
      this.transData()
    },
    fileList (){
      this.transData()
    }
  },
  methods: {
    transData (){
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList, this.fileList))
    },
    isFolder (type){
      return type === 'folder'
    },
    handleDelete (data){
      const folderId = data.folder_id
      const isFolder = this.isFolder(data.type)
      let updateListName = isFolder ? 'folderList' : 'fileList'
      let list = isFolder ? clonedeep(this.folderList) : clonedeep(this.fileList)
      //如果想把列表中的某个东西删掉，可以考虑过滤掉你不想要的。
      list = list.filter(item => item.id !== data.id)
      //由于需要发送的数据来源于父级两个数据合并而成，所以父级用.sync
      //.sync本质是一个语法糖监视对象的数据，并更新父组件.sync修饰符修饰的对象。
      this.$emit(`update:${updateListName}`, list)
      this.$nextTick(() => {
        expandSpecifiedFolder(this.folderTree, folderId)
      })
    },
    handleDropdownClick (data, name){
      if(name === 'rename'){
        this.currentRenamingId = `${data.type || 'file'}_${data.id}`
      } else if (name === 'delete'){
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》吗？`,
          onOk: () => {
            //先去服务端调接口，删除成功了再往下继续
            this.beforeDelete ? this.beforeDelete().then(() => {
              this.handleDelete(data)
            }).catch(() => {
              this.$Message.error('删除失败')
            }) : this.handleDelete(data)
          }
        })
      }
    },
    handleInput (value){
      this.currentRenamingContent = value
    },
    updateList (list, id){
      let i = -1
      let len = list.length
      while (++i < len) {
        let folderItem = list[i]
        if(folderItem.id === id){
          folderItem.name = this.currentRenamingContent
          list.splice(i, 1, folderItem)
          break
        }
      }
      //修改数据不应该在子组件内完成，要通过事件抛到父组件去
      return list
    },
    saveRename (data){
      const id = data.id
      const type = data.type
      if(type === 'folder'){
        const list = this.updateList(clonedeep(this.folderList), id)
        this.$emit('update:folderList', list)
      } else {
        const list = this.updateList(clonedeep(this.fileList), id)
        this.$emit('update:fileList', list)
      }
      this.currentRenamingId = ''
    }
  },
  mounted (){
    this.transData() //数据如果不是同步进来的，需要监听。
  }
}

//iview组件标签名和原生一样的情况，使用i-前缀
//jsx里面使用on-前缀绑定事件

//可编辑的东西，首先要有一个全局的标识对应的id
//获取点击的坐标位置，用bind的方式提供函数的运行环境
</script>

<style lang="less">
.tree-item{
  display:inline-block;
  width:~"calc(100% - 50px)";
  height: 30px;
  line-height: 30px;
  & > .ivu-dropdown{
    float:right;
  }
  ul.ivu-dropdown-menu{
    padding: 0;
  }
  li.ivu-dropdown-item{
    margin: 0;
    padding: 7px 16px;
  }
  .tree-rename-input{
    width: ~"calc(100% - 80px)";
  }
}
//tree的样式覆盖了dropdown样式
//改样式关键就是找到对应的位置，是什么原因，最后提高权重。
</style>

