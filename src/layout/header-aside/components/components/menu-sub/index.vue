<template>
  <el-submenu :index="menu.path || uniqueid">
    <template slot="title">
      <i :class="`fa fa-${menu.icon || 'folder-o'}`"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <cs-layout-header-aside-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <cs-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import uniqueid from 'lodash.uniqueid'
import csLayoutMainMenuItem from '../menu-item'

export default {
  name: 'cs-layout-header-aside-menu-sub',
  components: {
    'cs-layout-header-aside-menu-item': csLayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueid: uniqueid('cs-menu-empty-')
    }
  }
}
</script>
