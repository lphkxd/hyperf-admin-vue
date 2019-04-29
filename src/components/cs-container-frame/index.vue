<template>
  <cs-container v-bind="$attrs">
    <iframe class="cs-container-frame" :src="src" frameborder="0"></iframe>
  </cs-container>
</template>

<script>
export default {
  name: 'cs-container-frame',
  props: {
    src: {
      type: String,
      required: false,
      default: 'http://www.careyshop.cn/'
    }
  }
}
</script>

<style scoped>
  .cs-container-frame {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>
