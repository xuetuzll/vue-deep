<template>
  <div>
    <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'
export default {
  name: 'CountTo',
  computed: {
    eleId (){
      return `count_up_${this.uid}`
    },
    countClass (){
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  data (){
    return {
      counter: {}
    }
  },
  props: {
    startVal: { //初始值
      type: Number,
      default: 0
    },
    endVal: { //最终值
      type: Number,
      required: true
    },
    decimals: { //小数点后保留几位小数
      type: Number,
      default:0
    },
    delay: { //设置动画延迟
      typr: Number,
      default: 0
    },
    duration: { //渐变时长
      type: Number,
      default:1
    },
    useEasing: { //是否使用变数效果
      type: Boolean,
      default: false
    },
    useGrouping: { //是否显示分组
      type: Boolean,
      default: true
    },
    separator: { //分组的符号
      type: String,
      default: ','
    },
    decimal: { //整数和小数分割的符号
      type: String,
      default: '.'
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    getCount (){
      return this.$refs.number.innerText
    },
    emitEndEvent (){
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit('on-animation-end', Number(this.getCount()))
        })
      }, this.duration*1000+ 10)
    }
  },
  watch: {
    endVal (newVal, oldVal){
      this.counter.update(newVal)
      this.emitEndEvent()
    }
  },
  mounted (){
    this.$nextTick(() => {
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal
      })
      setTimeout(() => {
        this.counter.start()
        this.emitEndEvent()
      }, this.delay)

    })
  }
}

//dom的nextTick属性等元素渲染完后挂载
//简单的讲：第三方库的引用，就是按照依赖，引入依赖，dom元素渲染好之后挂载依赖

//问题一：每个组件的id值不一样
//每个元素都有自增的uid，保证uid不一样
//绑定计算属性都要有：
//代码别写错，写错会报错

//数组渐变组件（第三方插件）
//加类名控制样式，css写样式
//加自定义内容用slot插槽
//ref属性用在组件上获取实例，用在原生的标签上获取dom

//watch的使用就是监视某个东西变化的时候
//两个参数，根据需求去使用
//watch监视的值，在被使用时，一定是与数据绑定的，这样才能看到被监听值的改变

//有时候需要在数据更新结束之后发射数据。
//this.$nextTick等组件渲染完，setTimeout设置大致发射时间，最后$emit发送（方法名，数据值），最后父组件触发
//发射出去的数据父组件触发是不需要值，方法是用时，把值显示出来

//需要新样式，导入样式
</script>



