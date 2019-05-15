<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :loading="loading"
      @refresh="handleRefresh"/>
  </cs-container>
</template>

<script>
import { getPaymentList } from '@/api/payment/payment'

export default {
  name: 'setting-payment-config',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
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
        this.$refs.header.handleFormSubmit()
      })
    },
    // 确定查询
    handleSubmit(form) {
      this.loading = true
      getPaymentList({ ...form })
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
