<template>
  <div>
    <!-- <ul @click="handleClick">
      <li @click.stop="handleClick" v-for="(item, index) in list" :key="`list_item_${index}`">{{ item.name }}</li>
    </ul> -->
    <!-- <list :list="list" :render="renderFunc">
      <count-to slot="aa" slot-scope="count" :end-val="count.number"></count-to>
    </list> -->
    <list :list="list">
      <count-to slot="aa" slot-scope="count" :end-val="Number(count.number)"></count-to>
    </list>

  </div>
</template>

<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
  data (){
    return {
      list: [
        {number: 100},
        {number: 200},
        {number: 300},
        {number: 400}
      ]
    }
  },
  methods: {
    handleClick (event){
      console.log(event)
    },
    handleEnd (event){
      console.log(123)
    },
    // renderFunc (h, name){
    //   return h('i', {
    //     style: {
    //       color: 'pink'
    //     }
    //   }, name)
    // },
    // renderFunc (h, number){
    //   return (
    //     // <i on-click={this.handleClick} style={{ color: 'red' }}>{ name }</i>
    //     <CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={number} style={{ color: 'pink' }}></CountTo>
    //   )
    // }
  },
  components: {
    List,
    CountTo
  }
}

//点里面的子元素的时候。父元素也会触发，就是冒泡。
//通过.stop修饰符阻止冒泡。

//按自己的意愿去渲染名字
//子级v-for循环的值要被父级拿来用需要用到函数式组件
//作用目标：对子组件有特殊需求处理的渲染方式的函数式组件，
//返回的是当前被渲染实例里面的数据
//配合v-for的子组件，能实现对每个子组件的返回数据渲染处理

//注意函数式组件只是把某一类别取出来，做处理还是在父组件的方法里
//在父组件的方法里指定自定义的数据，做怎么样的自定义。

//真正的本质：函数式组件就是把这一批的数据中某一类别数据取出来特殊处理。

//jsx通过一种形式，在js里写HTML标签和特定的语法，转移成js
//写jsx非常方便，{}表示要渲染的数据，{{}}第二个{}表示要抱起来的对象
//想绑事件用on-前缀,由于方法定义在外部，this.方法名

//对一组数据从自定义数据的样式到对应的事件。

//如何渲染一组自定义组件
//在render里面写的组件是不需要在componnets里面注册的，
//在jsx里面写的组件也是不需要在components里面注册的。
//在jsx里面你引进来什么什么命名，就使用什么命名

//事件分两种，一种原生事件，一种自定义事件
//原生的dom绑定的都是原生事件（本身绑定在dom层的事件）
//一个组件可以绑定两种事件。
//on-前缀是自定义事件
//nativeOn-前缀是原生的事件

//在render函数里，很多vue提供的指令修饰符都不能实现了，需要自己通过原生dom去实现

//在自定义渲染的内容需要传入渲染函数或者使用jsx比较繁琐。

//在使用作用域插槽需要components注册组件
//slot-scope属性随便传值，指代子组件在插槽里传的值包裹起来的对象，不是绑定的属性
//作用域插槽可以配合聚名插槽使用
//注意插槽的使用，有slot=""会直接找对应属性的
//也就是说，如果有slot属性名相同的，直接放入。

//注意，这里slot=""属性值与子组件属性名相同时，
//对应插槽的slot数据才有组件的自定义样式

//有了作用域插槽，就不用写jsx和函数式组件来定义模板
//只需要在父组件里定义slot-scope属性，
//就能拿到引用的子组件里的slot插槽里传的值包裹起来的对象

//渲染页面也可以理解为引入list列表子组件，
//在list列表子组件下，再引入需要循环渲染的组件
//父组件通过作用域插槽slot-scope与子组件slot匹配，
//实现list子组件下的组件与list组件循环的数据进行关联。

//扩展性的应用，使用插槽，可以在list循环列表中，
//写入不同的slot，对应不同的父组件写入的内容，当插槽相同时写入。
//相当于有循环列表中有无数的插槽，父组件只需要对应去使用插槽就好了

</script>


