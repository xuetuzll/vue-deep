<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider width="180" collapsible hide-trigger v-model="collapsed"> <!--加入breakpoint则自动对应屏幕变成最小-->
        <side-menu :collapsed="collapsed" :list="menuList"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"></Icon>
        </Header>
        <Content class="content-con">
          <Card shadow class="page-card">
            <router-view>

            </router-view>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from '_c/side-menu'
export default {
  components: {
    SideMenu
  },
  data (){
    return {
      collapsed: true,
      menuList: [
        {
          title: '11111',
          name: 'menu1',
          icon: 'ios-alarm'
        },
        {
          title: '22222',
          name: 'menu2',
          icon: 'ios-alarm'
        },
        {
          title: '3',
          name: 'menu3',
          icon: 'ios-alarm',
          children: [
            {
              title: '3-11',
              name: 'menu31',
              icon: 'ios-alarm'
            },
            {
              title: '3-22',
              name: 'menu32',
              icon: 'ios-alarm',
              children: [
                {
                  title: '3-22-11',
                  name: 'menu321',
                  icon: 'ios-alarm'
                },
                {
                  title: '3-22-22',
                  name: 'menu322',
                  icon: 'ios-alarm'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    triggerClasses (){
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    }
  },
  methods: {
    handleCollapsed (){
      this.collapsed = !this.collapsed
    }
  }
}

//默认提供一个按钮
//Header里面的Icon绑定的事件其实是给Header绑定
//样式绑定计算属性，通过data数据的真假加动画的样式
//
</script>

<style lang="less">
.layout-wrapper, .layout-outer{
  height:100%;

  .header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    padding: 0 23px;
    .trigger-icon{
      cursor: pointer;
      transition: transform .3s ease;
      &.rotate{
        transform: rotateZ(-90deg);
        transition: transform .3s ease;
      }
    }
  }
  .content-con{
    padding: 10px;
    .page-card{
      min-height: ~"calc(100vh - 84px)"
    }
  }
}

//box-shadow阴影效果
//transform：rotateZ(旋转角度)
//还有过渡时长的设置
//~在less里面的css3的计算属性calc( - )必须有,100vh代表100%视图
</style>
