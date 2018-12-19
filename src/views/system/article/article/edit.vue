<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="({x, y}) => {this.scrollTop = y}">
  </cs-container>
</template>

<script>
export default {
  name: 'system-article-edit',
  props: {
    article_id: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
