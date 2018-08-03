<template>
  <el-menu mode="horizontal" @select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in menuHeader">
      <cs-layout-header-aside-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
      <cs-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import csLayoutMainMenuItem from '../components/menu-item'
import csLayoutMainMenuSub from '../components/menu-sub'

export default {
  name: 'cs-layout-header-aside-menu-header',
  mixins: [
    menuMixin
  ],
  components: {
    'cs-layout-header-aside-menu-item': csLayoutMainMenuItem,
    'cs-layout-header-aside-menu-sub': csLayoutMainMenuSub
  },
  computed: {
    ...mapState({
      menuHeader: state => state.careyshop.menuHeader
    })
  }
}
</script>
