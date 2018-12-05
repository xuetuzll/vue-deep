<template>
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
    <FormItem v-for="(item, index) in list" :error="errorStore[item.name]"
      :key="`${_uid}_${index}`" :label="item.label" :prop="item.name"
      label-position="left"  @click="handleFocus(item.name)">
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component v-for="(child, i) in item.children.list" :is="item.children.type"
            :value="child.value" :key="`${_uid}_${index}_${i}`" :label="child.label">{{ child.title }}</component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
//同一个页面key重复的话，用唯一标识_uid
//渲染额类型是根据type来显示的
//input要限制宽度,做成自定义属性传进来
//表单控件类型很多，需要用到动态组件。
//component组件写在这里面，template渲染模板
//label绑定才会变成单选
//:range="item.range"，为true生效
//性别下拉选框，学历单选框
//填不同的表单验证的规则是不一样的
//组件内部需要传一个model，一个rules规则对象
import clonedeep from 'clonedeep'
import { sendFormData } from '@/api/data'
export default {
  name: 'FormGroup',
  data (){
    return {
      initValueList: [],
      rules: {},
      valueList: {},
      errorStore: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    url: {
      type: String,
      required: true
    }
  },
  watch: {
    list (){
      this.setInitValue()
    }
  },
  methods: {
    //数据是传进来的，需要组件去重新设置
    setInitValue (){
      let rules = {}
      let valueList = {}
      let initValueList = {}
      let errorStore = {}
      this.list.forEach(item =>{
        rules[item.name] = item.rule
        valueList[item.name] = item.value
        initValueList[item.name] = item.value
        errorStore[item.name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
    },
    handleSubmit (){
      //先验证一下表单的规则，调一个接口
      this.$refs.form.validate(valid => {
        if(valid){
          sendFormData({
            url: this.url,
            data: this.valueList
          }).then(res => {
            this.$emit('on-submit-success', res)
          }).catch(error => {
            this.$emit('on-submit-error', error)
            for(let key in error){
              this.errorStore[key] = error[key]
            }
          })
        }
      })
    },
    handleReset (){
      this.valueList = clonedeep(this.initValueList)
    },
    handleFocus (name){
      this.errorStore[name] = ''
    }
  },
  mounted (){
    this.setInitValue()
  }
}
</script>
