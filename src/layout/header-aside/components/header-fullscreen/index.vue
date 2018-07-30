<template>
    <el-tooltip
            effect="dark"
            :content="isFullScreen ? '退出全屏' : '全屏'"
            placement="bottom">
        <el-button class="cs-mr btn-text can-hover" type="text" @click="fullScreenToggle">
            <cs-icon v-if="isFullScreen" name="compress"/>
            <cs-icon v-else name="arrows-alt" style="font-size: 16px"/>
        </el-button>
    </el-tooltip>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      isFullScreen: state => state.careyshop.isFullScreen
    })
  },
  methods: {
    ...mapMutations([
      'fullScreenToggle'
    ])
  }
}
</script>
