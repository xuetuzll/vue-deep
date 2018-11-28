<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px` }">
      <slot name="left"></slot>
    </div>
    <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>
    <div class="pane pane-right" :style="{ left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitPane',
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data (){
    return {
      canMove: false,
      initOffset: 0
    }
  },
  computed: {
    leftOffsetPercent (){
      return `${this.value * 100}%`
    },
    triggerLeft (){
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
    }
  },
  methods: {
    handleClick (){
      this.value -= 0.02
    },
    handleMousedown (){
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseUp)
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true
    },
    handleMousemove (event){
      if(!this.canMove) return
      const outerRect =this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX -this.initOffset - outerRect.left + this.triggerWidth / 2) / outerRect.width
      if(offsetPercent < this.min) offsetPercent = this.min
      if(offsetPercent > this.max) offsetPercent = this.max
      this.$emit('input', offsetPercent)
    },
    handleMouseUp (){
      this.canMove = false
    }
  }
}

//控制两个div的宽度，绝对定位，左边width百分之多少，右边距离右下都为0，距离左边百分之多少。
//css3中支持计算，百分之30-4px，calc()

//拖动效果本质是拿到鼠标距离容器的距离
//getBoundingClientRect()

//鼠标按下的时候给document添加move事件
//鼠标抬起的时候，也要给document添加up事件
//需要考虑鼠标点击滑动条的初始值
//滑动最大值最小值

//子组件内需要修改父组件的值
//不能通过赋值直接修改，而是通过事件来触发告诉父组件
//父组件接受这个事件，这个值，通过响应修改这个值。
//一个鼠标样式的网站: css-cursor.techstream.org

</script>

<style lang="less">
.split-pane-wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  .pane{
    height:100%;
    position: absolute;
    top:0;
    &-left{
      background: palevioletred;
    }
    &-right{
      right: 0;
      bottom: 0;
      background: palegoldenrod;
    }
    &-trigger-con{
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      cursor:col-resize;
    }
  }
}
</style>

