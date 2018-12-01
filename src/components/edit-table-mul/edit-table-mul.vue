<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>

<script>
import clonedeep from 'clonedeep'
export default {
  name: 'EditTable',
  data (){
    return {
      insideData: [],
      insideColumns: [],
      edittingId: '',
      endittingContent: ''
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    //监视表头的更新
    column (){
      this.handleColumns()
    },
    value (){
      this.handleColumns()
    }
  },
  methods: {
    handleClick ({ row, column, index }){
      let keyIndex = this.insideData[index].edittingKeyArr ? this.insideData[index].edittingKeyArr.indexOf(column.key) : -1
      let rowObj = this.insideData[index]
      if(keyIndex > -1){
        rowObj.edittingKeyArr.splice(keyIndex, 1)
        this.insideData.splice(index, 1, rowObj)
        this.$emit('input', this.insideData)
        this.$emit('on-edit', { row, column, index, newValue: this.insideData[index][column.key] })
      } else {
        rowObj.edittingKeyArr = (rowObj.edittingKeyArr) ? [...rowObj.edittingKeyArr, column.key] : [column.key]
        this.insideData.splice(index, 1, rowObj) //相当于替换，会触发数据的更新
      }
    },
    handleInput (row, column, index, newValue){
      this.insideData[index][column.key] = newValue
    },
    handleColumns (){
      this.insideData = clonedeep(this.value)
      const insideColumns = this.columns.map(item => {
      if(!item.render && item.editable){
        item.render = (h, { row, column, index }) => {
          const keyArr = this.insideData[index] ? this.insideData[index].edittingKeyArr : ''
          // const isEditting = this.edittingId === `${index}_${column.key}`
          return (
            <div>
              {keyArr && keyArr.indexOf(column.key) > -1
                ? <i-input value={row[column.key]} style="width: 50px;" on-input={this.handleInput.bind(this, row, column, index)}></i-input>
                : <span>{row[column.key]}</span>}
              <i-button on-click={this.handleClick.bind(this, { row, column, index })}>{ keyArr && keyArr.indexOf(column.key) > -1 ? '保存' : '编辑' }</i-button>
            </div>
          )
        }
        return item
      } else {
        return item
      }
    })
    this.insideColumns = insideColumns
    }
  },
  mounted (){
    this.handleColumns()
  }
}

//想封装一个可编辑的表格
//首先要map映射相关数据
//根据需求自定义相关jsx渲染
//如果想拿到数据，映射完需要返回，挂载到data数据上
//表格里面每一行有一个行号，每一列有一个key值
//每一行行里面的每一列：row[column.key]
//绑定事件需要知道iview的组件的事件绑定，jsx中要在on-前缀
//jsx里面不需要在@符号，@符号是在vue中的
//表格组件传参数的方式this.方法名.bind(this, {结构赋值})
//index代表第几行，column里面看key属于哪一列
//row里面看这一列的详细信息


//思路拆分：第一步把mock的数据呈现出来。
//根据业务需求自定义渲染数据，例如渲染可编辑的表格
//功能如下：点击编辑弹出输入框，点击保存弹出内容文本框并发送数据
//包含数据：编辑状态，文本框内容，表格数据的坐标，表格的数据列表
//如何实现：表格数据map映射设置自定义渲染列表
//确定坐标：点击的时候如果没有坐标则设置坐标
//按钮内容显示模式：每次点击的时候，判断坐标是否相等，相等保存，不相等编辑
//文本框内容的保存与否：每次点击的时候，判断坐标是否相等，相等保存，不相等不保存
//表格数据的保存：找到对应的行和列，深度拷贝后赋值，把数据发送到自定义按钮上调用，把数据发送到父级调用
//自定义按钮和父级的方法调用修改数据
//watch对自定义表格的监听

</script>
