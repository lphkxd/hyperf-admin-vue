<template>
  <svg aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'cs-icon-svg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return `#cs-${this.name}`
    }
  }
}
</script>
