<template>
  <div>
    <hr class="separated" v-bind:class="{title: title}">
    <b v-if="title">{{title}}</b>
  </div>
</template>

<script>
export default {
  name: 'cs-line',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .separated {
    height: 1px;
    border: none;
    border-top: 1px dashed $color-border-1;
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 10px;
  }
</style>
