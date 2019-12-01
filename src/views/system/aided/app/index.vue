<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      ref="header"
      :loading="loading"
      @submit="handleSubmit"/>

    <page-main
      :loading="loading"
      :table-data="table"
      @refresh="handleRefresh"/>
  </cs-container>
</template>

<script>
import { getAppList } from '@/api/aided/app'

export default {
  name: 'system-aided-app',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      loading: true,
      table: []
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 刷新列表页面
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询
    handleSubmit(form) {
      this.loading = true
      getAppList({ ...form })
        .then(res => {
          this.table = res.data || []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
