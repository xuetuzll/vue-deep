<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu width="auto" theme="dark">
      <template v-for="item in list">
        <menu-item v-if="!item.children" :key="`menu_${item.name}`" :name="item.name">
          <Icon :type="item.icon" />
          {{ item.title }}
        </menu-item>
        <re-submenu v-else :key="`menu_${item.name}`"
          :name="item.name" :parent="item">
        </re-submenu>
      </template>
    </Menu>
    <!-- <div>
      <template v-for="item in list">
        //
        <Tooltip :content="item.content" :key="`drop_${item.name}`">
          <a class="drop-menu-a">
            <Icon :type="item.icon"></Icon>
          </a>
        </Tooltip>
      </template>
    </div> -->
  </div>
</template>

<script>
import ReSubmenu from './re-submenu.vue'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}

//parent的由来：需要把有children的数组传进去，
//这样才能遍历children相关的数据显示

//注意一点：导入并注册的组件名，必须把大写转成短横连接，没按要求转换则组件使用不上。
</script>

<style lang="less">
.side-menu-wrapper{
  width:100%;
}
</style>
