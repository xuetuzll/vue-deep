<template>
  <div>
    <input v-model="userName" />
    <input type="password" v-model="password" />
    <button @click="handleSubmit">登录</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login-page',
  data (){
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('user', [
      'login',
      'authorization'
    ]),
    handleSubmit (){
      this.login({
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!')
        this.$router.push({
          name: 'home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

//登录页面如果全局前置守卫监控的数据已登录，那么并不会进入登录页
//一个登录想完成，根据后端有没有允许进入的代码，设置请求基础路径或请求代理，
//有代理的话基础路径为空字符串，第二步定义请求接口地址方法参数正确，
//第三步根据请求的需求定义状态管理工具vuex，
//返回需要字符串中axios封装根据后端数据设置返回值，避免多层拆卸
//第四步，引入并使用状态管理工具，拿出数据
//想要通过状态码来判断后续操作

//登录流程：首先得有请求工具（自己封装的axios），能确保连得上
//（请求时拦截数据获取token）
//根据后台地址和请求方式定义api
//根据需求在状态管理工具内根据后台状态码分流并封装promise
//分析业务需求，对应涉及到的模块，比如登录
//1.router全局前置守卫里要根据token来进行一系列的判断，
//2.token的获取在后端jsonwebtoken里定义，同时定义时间，
//每次调用时，判断token的一切，重现设置token，更新时间
//全局前置守卫导入vuex的actions时注意dispatch调用的mutation方法有没有命名空间，有要带上命名空间值
//如果token过期了，不清除，会死循环。
//3.结合token判断和登入判断，变成新的登入判断模式


</script>
