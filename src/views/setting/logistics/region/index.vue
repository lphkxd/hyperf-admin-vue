<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :tree-data="tree"
      :loading="loading"
      @refresh="handleRefresh"
      ref="main"/>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getRegionSonList } from '@/api/logistics/region'

export default {
  name: 'setting-logistics-region',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
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
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getRegionSonList({ ...form })
        .then(res => {
          this.tree = res.data.length
            ? util.formatDataToTree(res.data, 'region_id')
            : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
