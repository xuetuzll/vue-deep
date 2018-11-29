<template>
  <a-submenu>
    <div slot="title">{{ parent.title }}</div>
    <template v-for="(item, index) in parent.children">
      <a-menu-item v-if="!item.children" :key="`menu_item_${index}_${index}`">{{ item.title }}</a-menu-item>
      <re-submenu v-else :key="`menu_item_${index}_${index}`" :parent="item"></re-submenu>
    </template>
  </a-submenu>
</template>

<script>
import menuComponents from '_c/menu'
const { AMenuItem, ASubmenu } = menuComponents
export default {
  name: 'ReSubmenu',
  components: {
    AMenuItem,
    ASubmenu
  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: Number
  }
}

//组件自身自己调用自己，如果不设置终止条件的话，会一直循环下去。
//递归的本质：一个for循环，循环每一项和引用自己本身

//不知道有几层，封装一个递归组件
//要想实现递归数据上要有规律，(children)作为其继续递归的条件
//如果没有children，显示需要数据
//如果有children，则引用组件本身
//同时使用slot显示title
//唯一要注意的就是数据，数据从props子组件中调用
//只要是父子组件传值，就需要子组件props拿取父组件的数据

//注意一点：凡是两层及以上数据的话，key值不能只有一个index
</script>

