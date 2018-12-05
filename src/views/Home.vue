<template>
  <div class="home">
    <!-- <b>{{ food }}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo" :style="{ background: bgColor }">请求数据</button>
    <img :src="url">
    <button @click="handleLogout">退出登录</button> -->
    <Row>
      <i-col></i-col>
    </Row>
    <Row :gutter="10">
      <i-col span="12"></i-col>
      <i-col span="12"></i-col>
    </Row>
    <Row :gutter="10" class="blue">
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
    </Row>
    <Button v-if="rules.edit_button">编辑</Button>
    <Button v-if="rules.publish_button">发布</Button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { getUserInfo } from '@/api/user'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data (){
    return {
      url: '',
      bgColor: ''
    }
  },
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  computed: {
    ...mapState({
      rules: state => state.user.rules
    })
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      //
    })
  },
  beforeRouteLeave (to, from, next){
    const leave = confirm('您确定要离开吗?')
    if(leave) next()
    else next(false)
  },
  methods: {
    handleClick (type){
      if(type === 'back') this.$router.back()
      else if(type === 'push'){
        const name = 'lison'
        this.$router.push({
          path: `/argu/${name}`
          // query: {
          //   name: 'lison'
          // }
        })
      } else if(type === 'replace'){
        this.$router.replace({
          name: 'parent'
        })
      }
    },
    getInfo (){
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res:', res.data);
        this.url = res.data.img
        this.bgColor = res.data.color
      })
    },
    ...mapActions('user', [
      'logout'
    ]),
    handleLogout (){
      this.logout()
      this.$router.push({
        name: 'login'
      })
    }
  }
}

//函数模式：传入属性中能根据当前路由设置传入的属性的属性值
/*router.js里的对应规则下的props传参数
这个参数通过props去渲染mvvm绑定的察觉不到的属性
对应的规则定义下的页面的props被mvvm绑定的属性使用
*/
//重点：props在路由组件传参中渲染隐形的属性，双向绑定mvvm
//props初始属性的定义在第一次使用的地方定义。

//组件内路由守卫
/*beforeRouteEnter中
to.name代表将要进入的页面（下一个页面，但未进入），
from.name代表从哪个页面进来（上一个页面）。
有next()方法，需要next（）才会执行页面渲染
*/
//简单的说，this不能使用，需要next(vm => {}),这样才能使用。

/*beforeRouteEnter，比如用户在页面做了一些编辑，在用户要离开的时候进行提示
根据next(变量真假)判断是否执行next
*/

</script>

<style lang="less">
.home{
  .ivu-col{
    height: 50px;
    margin-top: 10px;
    background: orange;
    background-clip: content-box;
  }
}
.blue{
  .ivu-col{
    background: blue;
    background-clip: content-box;
  }
}

//background-clip: content-box;内容区域显示背景色
</style>

