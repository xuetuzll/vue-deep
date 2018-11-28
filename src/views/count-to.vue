<template>
  <div>
    <count-to ref="countTo" :end-val="endVal" @on-animation-end="handleEnd">
      <span slot="left">总金额：</span>
      <span slot="right">元</span>
    </count-to>
    <button @click="getNumber">获取数值</button>
    <button @click="up">更新值</button>
  </div>
</template>

<script>
import CountTo from '_c/count-to'
export default {
  name: 'count_to',
  components: {
    CountTo
  },
  data (){
    return {
      endVal : 100
    }
  },
  methods: {
    getNumber (){
      console.log(this.$refs.countTo.getCount())
    },
    up (){
      this.endVal += Math.random() * 100
    },
    handleEnd(endval){
      console.log(endval)
    }
  }
}

//想把整个组件拿出来，ref属性
//通过ref的方法形式调用子组件的ref方法拿需求
//父组件调用子组件内部方法的一个方法


</script>
