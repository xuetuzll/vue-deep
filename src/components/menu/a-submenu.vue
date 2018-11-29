<template>
  <ul class="a-submenu">
    <div class="a-submenu-title" @click="handleClick">
      <slot name="title"></slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)` }">^</span>
    </div>
    <div v-show="showChild" class="a-submenu-child-box">
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'ASubmenu',
  data (){
    return {
      showChild: false
    }
  },
  methods: {
    handleClick (){
      this.showChild = !this.showChild
    }
  }
}

//聚名插槽，用来显示标题的地方
//v-show搭配的简单显示与隐藏功能
//css的transform的rotate旋转
</script>

<style lang="less">
.a-submenu{
  background:#222;
  &-title{
    color: #fff;
    position: relative;
    .shrink-icon{
      position: absolute;
      top: 4px;
      right: 10px;
    }
  }
  &-child-box{
    overflow: hidden;
    padding-left: 10px;
  }
  li{
    background:#222;
  }
}
</style>
