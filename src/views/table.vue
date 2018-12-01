<template>
  <div>
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData"></edit-table-mul>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
import EditTable from '_c/edit-table'
import EditTableMul from '_c/edit-table-mul'
export default {
  components: {
    EditTable,
    EditTableMul
  },
  data (){
    return {
      tableData: [], //这里没有数据
      columns: [
        { key: 'name', title: '姓名' },
        { key: 'age', title: '年龄', editable: true },
        { key: 'email', title: '邮箱', editable: true }
      ]
    }
  },
  methods: {
    handleEdit ({ row, column, index, newValue }){
      console.log({ row, column, index, newValue })
    }
  },
  mounted (){
    getTableData().then(res => {
      this.tableData = res
    })
  }
}
</script>

