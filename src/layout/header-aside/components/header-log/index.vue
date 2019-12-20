<template>
  <el-tooltip effect="dark" :content="tooltipContent" placement="bottom">
    <el-button class="btn-text can-hover" type="text" @click="handleClick">
      <el-badge v-if="logLength > 0" :max="99" :value="logLengthError" :is-dot="logLengthError === 0">
        <i :class="logLengthError === 0 ? 'el-icon-aim' : 'el-icon-cpu'"/>
      </el-badge>
      <i v-else class="el-icon-aim"/>
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
    ]),
    handleClick() {
      this.$router.push({
        name: 'log'
      })
        .catch(() => {
        })
    }
  }
}
</script>
