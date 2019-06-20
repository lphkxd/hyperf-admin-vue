<template>
  <cs-container :is-back-to-top="true">
    <page-main
      :table-data="table"
      :loading="loading"
      @refresh="handleRefresh"/>
  </cs-container>
</template>

<script>
import { getUserLevelList } from '@/api/member/level'

export default {
  name: 'member-user-level',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      table: [],
      loading: true
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 刷新列表页面
    handleRefresh() {
      this.$nextTick(() => {
        this.handleFormSubmit()
      })
    },
    // 确定查询
    handleSubmit() {
      this.loading = true
      getUserLevelList()
        .then(res => {
          this.table = res.data.length > 0 ? res.data : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
