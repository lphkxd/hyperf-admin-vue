<template>
  <div class="cs-container-card">
    <div v-if="$slots.header" class="cs-container-card__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cs-container-card__body" ref="body">
      <div class="cs-container-card__body-card">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="cs-container-card__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import normal from './mixins/normal'

export default {
  name: 'cs-container-card',
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
