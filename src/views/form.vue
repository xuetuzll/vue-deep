<template>
  <div class="form-wrapper">
    <form-group :list="formList" :url="url"></form-group>
  </div>
</template>

<script>
import FormGroup from '_c/form-group'
export default {
  components: {
    FormGroup
  },
  data (){
    return {
      //列表通过接口从服务端获取。
      url: '/data/formData',
      formList: [
        {
          name: 'name',
          type: 'i-input',
          value: '',
          label: '姓名',
          rule: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]
        },
        {
          name: 'range',
          type: 'slider',
          value: [10, 40],
          range: true,
          label: '范围'
        },
        {
          name: 'sex',
          type: 'i-select',
          value: '',
          label: '性别',
          children: {
            type: 'i-option',
            list: [
              { value: 'man', title: '男' },
              { value: 'woman', title: '女' }
            ]
          }
        },
        {
          name: 'education',
          type: 'radio-group',
          value: 1, //单选框是一个值
          label: '学历',
          children: {
            type: 'radio',
            list: [
              { label: 1, title: '本科' },
              { label: 2, title: '研究生' },
              { label: 3, title: '博士' }
            ]
          }
        },
        {
          name: 'skill',
          type: 'checkbox-group',
          value: [], //多选框是个数组
          label: '技术',
          children: {
            type: 'checkbox',
            list: [
              { label: 1, title: 'Vue' },
              { label: 2, title: 'Nodejs' },
              { label: 3, title: 'MySQL' }
            ]
          }
        },
        {
          name: 'inWork',
          type: 'i-switch',
          value: true,
          label: '在职'
        }
      ]
    }
  },
  methods: {
    //
  }
}
</script>

<style>
.form-wrapper{
  padding: 20px;
}
</style>
