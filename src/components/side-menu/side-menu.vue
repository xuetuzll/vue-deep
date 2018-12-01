<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu v-show="!collapsed" width="auto" theme="dark" @on-select="handleSelect">
      <template v-for="item in list">
        <menu-item v-if="!item.children" :key="`menu_${item.name}`" :name="item.name">
          <Icon :type="item.icon"></Icon>
          {{ item.title }}
        </menu-item>
        <re-submenu v-else :key="`menu_${item.name}`"
          :name="item.name" :parent="item">
        </re-submenu>
      </template>
    </Menu>
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list">
        <!--transfer让它放到body里面？-->
        <Tooltip v-if="!item.children" transfer :content="item.title" placement="right" :key="`drop_${item.name}`">
          <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :type="item.icon" color="#fff" :size="20"></Icon>
          </span>
        </Tooltip>
        <re-dropdown v-else @on-select="handleSelect" icon-color="#fff" :show-title=false :key="`drop_${item.name}`" :parent="item"></re-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
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
  },
  methods: {
    handleSelect (name){
      console.log(name)
    },
    handleClick (name){
      console.log(name)
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
  .ivu-tooltip, .drop-menu-span{
    width:100%;
    display: block;
    text-align:center;
    padding: 5px 0;
  }
  .drop-wrapper > .ivu-dropdown{
    display: block;
    margin: 0 auto;
    padding: 5px;
  }
}

//思考为什么不用css的color: #fff;
//思考为什么不能给它的宽度100%，后面所有的宽度都会继承前面的宽度
//使用子级选择器选中的是直接相关的子元素
</style>
