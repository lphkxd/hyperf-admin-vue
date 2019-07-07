<template>
  <cs-container :is-back-to-top="true">
    <page-main
      :tree-data="tree"
      :loading="loading"
      @refresh="handleRefresh"
      ref="main"/>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getGoodsCategoryList } from '@/api/goods/category'

export default {
  name: 'goods-setting-category',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: true
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 提交查询请求
    handleSubmit() {
      this.loading = true
      getGoodsCategoryList(null)
        .then(res => {
          this.tree = res.data.length
            ? util.formatDataToTree(res.data, 'goods_category_id')
            : []

          if (this.$refs.main) {
            this.$refs.main.filterText = ''
            this.$refs.main.resetForm()
            this.$refs.main.resetElements()
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
