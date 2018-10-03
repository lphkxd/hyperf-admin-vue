<template>
  <el-tooltip effect="dark" :content="active ? '退出全屏' : '全屏'" placement="bottom">
    <el-button class="cs-mr btn-text can-hover" type="text" @click="toggle">
      <cs-icon v-if="active" name="compress"/>
      <cs-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('careyshop/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('careyshop/fullscreen', [
      'toggle'
    ])
  }
}
</script>
