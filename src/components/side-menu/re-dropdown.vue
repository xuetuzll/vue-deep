<template>
  <Dropdown @on-click="handleClick" placement="right-start">
    <span :style="titleStyle" class="drop-menu-span">
      <!--这个是当前级别的-->
      <Icon :type="parent.icon" :color="iconColor" :size="20" />
      <span v-if="showTitle">{{ parent.title }}</span>
    </span>
    <DropdownMenu slot="list">
      <template v-for="item in parent.children">
        <DropdownItem v-if="!item.children" :key="`drop_${item.name}`" :name="item.name">
          <Icon :type="item.icon" color="#515a6e" :size="20" />
          {{ item.title }}
        </DropdownItem>
        <re-dropdown v-else :key="`drop_${item.name}`" :parent="item"></re-dropdown>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name:"ReDropdown",
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleStyle (){
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : ''
      }
    }
  },
  methods: {
    handleClick (name){
      if(!this.showTitle) this.$emit('on-select', name)
    }
  }
}

//注意一点：递归组件内没有定义但是被复用的类名，会被父级影响，所以不要轻易删除。
//两种使用方式：一种不是iview的时候，使用递归组件可以定义一个循环自己本身的递归组件
//第二种使用iview组件的递归方式，就是重复一遍递归组件。
//一级二级下拉框字体颜色区别的话，不能在css样式里面定义，只能通过行间样式设置。
//有气泡框的没有下拉菜单，区别点字体的水平位置
//使用iview组件，事件绑定的主体是：组件本身。
//组件内的事件触发作用的对象是data的数据，本质是$emit发送方法的数据,父组件使用方法拿到数据
</script>
