<template>
  <input @input="handleInput" :value="value">
</template>

<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput (event){
      const value = event.target.value
      this.$emit('input', value)
    }
  }
}

//父子组件传值
/*
被使用的是子组件，父组件向通过修改本身data来改变子组件的值
子组件需要通过$emit发送（'组件', '数据'）让父组件去调用子组件
*/

</script>

