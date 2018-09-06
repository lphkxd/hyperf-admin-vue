<template>
  <el-menu mode="horizontal" :default-active="active" @select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in header">
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
    ...mapState('careyshop/menu', [
      'header'
    ])
  },
  data() {
    return {
      active: ''
    }
  },
  watch: {
    '$route.matched': {
      handler(val) {
        const menu = val[val.length - 1]
        this.active = menu.parent.path ? menu.parent.path : menu.path
      },
      immediate: true
    }
  }
}
</script>
