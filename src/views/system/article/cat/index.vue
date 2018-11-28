<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getArticleCatList } from '@/api/article/cat'

export default {
  name: 'system-article-cat',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: false
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getArticleCatList(form)
        .then(res => {
          this.tree = res.data.length ? util.formatDataToTree(res.data) : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
