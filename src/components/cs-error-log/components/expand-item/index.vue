<template>
  <div
    class="cs-error-log__expand"
    :class="className">
    <p class="cs-error-log__expand-title">{{title}}</p>
    <p class="cs-error-log__expand-value">{{value === '' ? '无数据' : value}}</p>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'log'
    },
    title: {
      default: ''
    },
    value: {
      default: ''
    }
  },
  computed: {
    className() {
      return this.type === 'log' ? 'cs-error-log__expand--log' : 'cs-error-log__expand--error'
    }
  }
}
</script>
