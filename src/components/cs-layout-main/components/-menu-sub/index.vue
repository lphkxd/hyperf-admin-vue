<template>
  <el-submenu :index="menu.path || uniqueid">
    <template slot="title">
      <i :class="`fa fa-${menu.icon || 'folder-o'}`"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <cs-layout-main-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <cs-layout-main-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
  import _uniqueid from 'lodash.uniqueid'

  // 组件
  import csLayoutMainMenuItem from '../-menu-item/index'

  export default {
    name: 'cs-layout-main-menu-sub',
    components: {
      'cs-layout-main-menu-item': csLayoutMainMenuItem
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
        uniqueid: _uniqueid('cs-menu-empty-')
      }
    }
  }
</script>
