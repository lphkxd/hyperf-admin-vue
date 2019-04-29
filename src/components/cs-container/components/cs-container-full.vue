<template>
  <div class="cs-container-full">
    <div v-if="$slots.header" class="cs-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cs-container-full__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="cs-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import normal from './mixins/normal'

export default {
  name: 'cs-container-full',
  mixins: [normal],
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
