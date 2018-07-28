<template>
  <el-menu mode="horizontal" @select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in menus">
      <cs-layout-main-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
      <cs-layout-main-menu-sub v-else :menu="menu" :key="menuIndex"/>
    </template>
  </el-menu>
</template>

<script>
  import menus from '@/menu/index'
  import menuMixin from '../mixin/menu'

  // 组件
  import csLayoutMainMenuItem from '../-menu-item/index'
  import csLayoutMainMenuSub from '../-menu-sub/index'

  export default {
    name: 'cs-layout-main-menu-header',
    mixins: [
      menuMixin
    ],
    components: {
      'cs-layout-main-menu-item': csLayoutMainMenuItem,
      'cs-layout-main-menu-sub': csLayoutMainMenuSub
    },
    data() {
      return {
        menus
      }
    }
  }
</script>
