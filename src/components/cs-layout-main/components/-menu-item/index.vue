<template>
  <el-menu-item :index="menu.path || uniqueid">
    <i :class="`fa fa-${menu.icon || 'file-o'}`"></i>
    <span slot="title">{{menu.title}}</span>
  </el-menu-item>
</template>

<script>
  import _uniqueid from 'lodash.uniqueid'
  export default {
    name: 'cs-layout-main-menu-item',
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
