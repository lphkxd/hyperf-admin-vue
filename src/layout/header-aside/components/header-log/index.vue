<template>
  <el-tooltip
    effect="dark"
    :content="tooltipContent"
    placement="bottom">
    <el-button
      class="cs-ml-0 cs-mr btn-text can-hover"
      type="text"
      @click="$router.push({name: 'log'}).catch(() => {})">
      <el-badge
        v-if="logLength > 0"
        :max="99"
        :value="logLengthError"
        :is-dot="logLengthError === 0">
        <cs-icon :name="logLengthError === 0 ? 'dot-circle-o' : 'bug'" style="font-size: 20px"/>
      </el-badge>
      <cs-icon v-else name="dot-circle-o" style="font-size: 20px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('careyshop', {
      logLength: 'log/length',
      logLengthError: 'log/lengthError'
    }),
    tooltipContent() {
      return this.logLength === 0
        ? '没有日志或异常'
        : `${this.logLength} 条日志${this.logLengthError > 0
          ? ` | 包含 ${this.logLengthError} 个异常`
          : ''}`
    }
  },
  methods: {
    ...mapMutations('careyshop/log', [
      'clean'
    ])
  }
}
</script>
