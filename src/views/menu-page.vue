<template>
  <div class="menu-box">
    <!-- <a-menu>
      <a-menu-item>111</a-menu-item>
      <a-menu-item>222</a-menu-item>
      <a-submenu>
        <div slot="title">3333</div>
        <a-menu-item>3333-1</a-menu-item>
        <a-submenu>
          <div slot="title">3333-22</div>
          <a-menu-item>3333-22-1</a-menu-item>
          <a-menu-item>3333-22-2</a-menu-item>
        </a-submenu>
      </a-submenu>
    </a-menu> -->
    <a-menu>
      <template v-for="(item, index) in list">
        <a-menu-item v-if="!item.children" :key="`menu_item_${index}`">{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`menu_item_${index}_${index}`" :parent="item" :index="index"></re-submenu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import menuComponents from '_c/menu'
import ReSubmenu from '_c/re-submenu'
const { AMenu, AMenuItem, ASubmenu } = menuComponents
export default {
  name: 'menu-page',
  components: {
    AMenu,
    AMenuItem,
    ASubmenu,
    ReSubmenu
  },
  data (){
    return {
      list: [
        {title:'1111'},
        {title:'2222'},
        {title:'3333', children: [{title:'3333-1'},{title: '3333-2', children: [
          {title: '3333-2-1'},{title: '3333-2-2'}
        ]}]}
      ]
    }
  }
}

//在一个组件内需要插入值，所引入的组件需要slot才能插入
//slot完全匹配，聚名插槽，相同名字就匹配，
//作用域插槽，只有当作用域相同时匹配

//递归组件拆分成两块，一块直接循环显示第一层，一块递归组件（循环每一项，结束条件，ifelse判断）

</script>

<style>
.menu-box{
  width:300px;
  height:400px;
}
</style>


