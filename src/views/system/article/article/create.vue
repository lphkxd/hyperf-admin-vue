<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-article"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-edit state="create"></page-edit>

  </cs-container>
</template>

<script>
export default {
  name: 'system-article-create',
  components: {
    'PageEdit': () => import('./componnets/PageEdit')
  },
  data() {
    return {
      scrollTop: 0
    }
  }
}
</script>
