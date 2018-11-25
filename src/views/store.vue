<template>
  <div>
    <a-input @input="handleInput" />
    <p>{{ inputValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
    <!-- <a-show :content="inputValue"></a-show> -->
    <p>appName: {{ appName }},appNameWithVersion: {{ appNameWithVersion }}</p>
    <p>userName: {{ userName }}, firstLetter is {{ firstLetter }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'

// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('user')
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'store',
  data (){
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  computed: {
    // ...mapState([
    //   'appName'
    // ])
    ...mapState('user', {
      userName: state => state.userName,
    }),
    ...mapState({
      appName: state => state.appName
    }),
    ...mapGetters([
      'appNameWithVersion'
    ]),
    ...mapGetters('user', [
      'firstLetter'
    ]),
    // appName (){
    //   return this.$store.state.appName
    // },
    // userName (){
    //   return this.$store.state.user.userName
    // }
    inputValueLastLetter (){
      return this.inputValue.substr(-1, 1)
    }
  },
  methods: {
    handleInput (val){
      this.inputValue = val
    }
  }
}

//input中，v-model是语法糖，等同于:value="value" @input="子组件方法"
//语法糖简单来说就是触发事件修改值

/*
两个兄弟组件如何进通信
a-input触发事件，通过方法给父组件data传值，a-show组件去绑定父组件的data
*/

/*
跨文件组件如何进行通信,通过空的Vue实例来作为一个中介进行交互
定义空的vue实例后，在入口函数的实例原型上绑定空vue实例作为对象
发送者定义方法$emit在vue空实例对象中发送数据，
接收者在mounted钩子中调用$on接受vue空实例对象的数据
*/

/*
vuex状态管理工具
组件赋值配合...展开符
数组形式['appName'],对象形式{appName: state => state.appName}
*/
/*
在开启命名空间的时候，
使用这种不用传模块名
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
使用这种需要传模块名
import { mapState } from 'vuex'
*/
/*
计算属性对应的方法，可以像data的数据一样被视图单项绑定
mapGetters不知道如何使用对象的方式去使用
*/
</script>
