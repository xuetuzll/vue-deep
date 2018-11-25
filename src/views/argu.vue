<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'lison'
    }
  },
  beforeRouteUpdate (to, from, next){
    console.log(to.name, from.name)
  }
}

//使用的是默认的值，不是传入的值
//在router里对应的组件设置props: true时，动态路由里面的参数传到页面会作为里面的属性

//beforeRouteUpdate进入这个页面这个钩子没有任何的改变，当你更新的时候，钩子才会调用
</script>


