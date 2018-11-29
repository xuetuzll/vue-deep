<template>
  <div>
    <li @mousemove="handleMove" v-for="(item, index) in list" :key="`item_${index}`">
      <!-- <span v-if="!render">{{ item.number }}</span>
      <render-dom v-else :render-func="render" :number="item.number"></render-dom> -->
      <slot>{{item.number}}</slot>
      <slot name="aa" :number="item.number"></slot>
    </li>
  </div>
</template>

<script>
import RenderDom from '_c/render-dom'
export default {
  name: 'list',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    RenderDom
  },
  methods: {
    handleMove (event){
      event.preventDefault()
    }
  }
}

//数组设置默认值的方式 default: () => []

//render-page想要显示list页面循环数据，
//循环的数据属于用户render渲染的数据
//


//如果想要显示用户通过render创建的渲染的视图模板，函数式组件用到了。

//子组件根据数据父组件的data数据渲染，
//子组件再根据子子组件渲染props传上来的数据

//使用作用域插槽如何实现刚才的效果

//作用域插槽的本质：数据在显示的时候可以像插槽一样对应放入
//也就是说，不需要去处理像通过函数式组件一样有特殊处理需求的数据
//只需要把这些数据循环一遍，绑定组件使用必须值，
//用slot作用域插槽的形式，往插槽内插入数据

//相比老方案，页面需要渲染完之后，使用函数式组件重新渲染一遍。



</script>


