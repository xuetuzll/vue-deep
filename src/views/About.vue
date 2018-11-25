<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b>{{ food }}</b>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  }
}

//对象模式：适合不是动态路由的模式
</script>
