<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-topic"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-edit
      state="create"
      :loading="loading">
    </page-edit>

  </cs-container>
</template>

<script>
export default {
  name: 'system-article-topic-create',
  components: {
    'PageEdit': () => import('./componnets/PageEdit')
  },
  data() {
    return {
      scrollTop: 0,
      // 加载状态
      loading: false
    }
  }
}
</script>
