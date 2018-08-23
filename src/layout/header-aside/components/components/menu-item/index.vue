<template>
  <el-menu-item :index="menu.path || uniqueId">
    <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
    <i v-else-if="menu.iconSvg">
      <cs-icon-svg :name="menu.iconSvg"/>
    </i>
    <i v-else class="fa fa-file-o"></i>
    <span slot="title">{{menu.title || '未命名菜单'}}</span>
  </el-menu-item>
</template>

<script>
import { uniqueId } from 'lodash'
export default {
  name: 'cs-layout-header-aside-menu-item',
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
