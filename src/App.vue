<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>
    <transition-group :name="routerTransition">
      <router-view key="default"/>
      <router-view key="email" name="email"/>
      <router-view key="tel" name="tel"/>
    </transition-group>
  </div>
</template>

<script>
export default {
  data (){
    return {
      routerTransition: ''
    }
  },
  watch: {
    '$route' (to){
      to.query && to.query.transitionName  && (this.routerTransition = to.query.transitionName)
    }
  }
}

//transition-group需要设置name，通过css的name-过渡流程

//watch在过渡效果的使用， '代表要监听的对象' （to代表去哪里找）
/*
  1.可以在路由元信息里定义，指定需要切换效果的页面
  2.也可以在？传的参数里去监听是否有参数值，有就让它有切换动效
*/
</script>


<style lang="less">
.router-enter{
  opacity: 0;
}
.router-enter-active{
  transition: opacity 1s ease;
}
.router-enter-to{
  opacity: 1;
}
.router-leave{
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

