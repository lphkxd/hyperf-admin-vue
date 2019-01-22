<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-article"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-edit
      state="create"
      :form="formData"
      :loading="loading"
      @on-change="test">
    </page-edit>

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
      scrollTop: 0,
      loading: false,
      formData: {
        title: '',
        article_cat_id: [],
        image: [],
        keywords: '',
        description: '',
        content: '',
        source: '',
        source_url: '',
        url: '',
        target: '_blank',
        is_top: '0',
        status: '1'
      }
    }
  },
  methods: {
    test(val) {
      console.log(val)
    }
  }
}
</script>
