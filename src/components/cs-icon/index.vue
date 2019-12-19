<template>
  <i class="iconfont" :class="`icon${name}`" aria-hidden="true"/>
</template>

<script>
export default {
  name: 'cs-icon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
