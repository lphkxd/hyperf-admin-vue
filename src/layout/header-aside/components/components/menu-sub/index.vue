<template>
  <el-submenu :index="menu.path || uniqueId">
    <template slot="title">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <cs-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>
      <i v-else class="fa fa-folder-o"></i>
      <span>{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <cs-layout-header-aside-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <cs-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
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
      uniqueId: uniqueId('cs-menu-empty-')
    }
  }
}
</script>
