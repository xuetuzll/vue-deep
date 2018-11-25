<template>
  <div>
    <a-input v-model="stateValue"/>
    <p>{{ stateValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
    <!-- <a-show :content="inputValue"></a-show> -->
    <p>appName: {{ appName }},appNameWithVersion: {{ appNameWithVersion }}</p>
    <p>userName: {{ userName }}, firstLetter is {{ firstLetter }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名</button>
    <button @click="registerModule">动态注册模块</button>
    <p v-for="(item, index) in todoList" :key="index">{{ item }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'

// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('user')
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
      userName: state => state.userName
    }),
    ...mapState({
      appName: state => state.appName,
      appVersion : state => state.appVersion,
      todoList: state => state.todo ? state.todo.todoList : []
    }),
    stateValue: {
      get (){
        return this.$store.state.stateValue
      },
      set (value){
        this.SET_STATE_VALUE(value)
      }
    },
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
    ...mapMutations([
      'SET_APP_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapMutations('user', [
      'SET_USER_NAME'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput (val){
      this.inputValue = val
    },
    handleChangeAppName (){
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // })
      // this.$store.commit('SET_APP_VERSION')
      // this.SET_APP_NAME('newAppName')
      // this.updateAppName()
      this.$store.dispatch('updateAppName', '123')
    },
    changeUserName (){
      // this.$store.state.user.userName = 'haha'
      this.SET_USER_NAME('vue-cource')
    },
    registerModule (){
      this.$store.registerModule('todo', {
        state: {
          todoList: [
            '学习mutations',
            '学习actions'
          ]
        }
      })
    },
    handleStateValueChange (val){
      this.SET_STATE_VALUE(val)
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

/*
想修改store里面的值，不能直接通过，绑定一个方法让他去修改视图
*/

//重点：vuex里每一个方法的本质去修改state的数据
/*
  state类似与data数据，本身含有两个set设置数据，get返回获取的数据
  getters是对data进行修改（补充添加），一般是全局定义版本一类固定的模式
  mutations是对data进行修改（替换更新）
  commit提交mutations里的一个方法名，可以不附带传递过去的值，通过mutations去修改state的数据
  如果使用展开符，把方法名数组形式定义在展开符里，this.方法名传参
*/

//动态注册的模块和开启命名空间的模块使用是一样的
//使用动态注册模块和for结合能动态渲染需要的数据

//如果想给模块添加一个子模块，使用数组的形式['父模块名', '子模块名']

//vuex中state要实现双向绑定
//直接用语法糖和mapState挂载数据会报错没有使用set方法
//vuex的双向绑定，通过mutation去设置值，需要改语法糖为属性绑定加方法名
//另一种方式更好：语法糖，数据设置set和get方法，一样通过mutation
</script>
