<template>
  <Submenu :name="parent.name">
    <template slot="title">
      <Icon :type="parent.icon" />
      {{ parent.title }}
    </template>
    <template v-for="item in parent.children">
      <menu-item v-if="!item.children" :key="`menu_${item.name}`" :name="item.name">
        <Icon :type="item.icon" />
        {{ item.title }}
      </menu-item>
      <re-submenu v-else :key="`menu_${item.name}`"
        :name="item.name" :parent="item">
      </re-submenu>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>


