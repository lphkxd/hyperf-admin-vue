<template>
  <el-popover
    style="float: right"
    placement="bottom-end"
    width="400"
    trigger="hover"
    title="提示"
    @show="getHelp">
    <div class="popover-content" v-html="helpContent"></div>
    <el-button
      size="small"
      slot="reference">
      <cs-icon name="question"/>
    </el-button>
  </el-popover>
</template>

<script>
import { getHelpRouter } from '@/api/index/help'

export default {
  props: {
    router: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      helpContent: ''
    }
  },
  methods: {
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.router).then(res => { this.helpContent = res })
      }
    }
  }
}
</script>
