<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      :group="group"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :loading="loading"
      :group="group"
      @sort="handleSort"
      @refresh="handleRefresh"/>

    <page-footer
      slot="footer"
      :current="page.current"
      :loading="loading"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </cs-container>
</template>

<script>
import { getClientType } from '@/api/public'
import { getActionLogList } from '@/api/action/log'

export default {
  name: 'system-action-log',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      loading: false,
      group: [],
      table: [],
      page: {
        current: 1,
        size: 50,
        total: 0
      },
      order: {
        order_type: undefined,
        order_field: undefined
      }
    }
  },
  mounted() {
    getClientType()
      .then(res => {
        this.group = res
      })
      .then(() => {
        this.handleSubmit()
      })
  },
  methods: {
    // 刷新列表页面
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 排序刷新
    handleSort(val) {
      this.order = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      getActionLogList({
        ...form,
        ...this.order,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data.total_result
          this.table = res.data.total_result > 0 ? res.data.items : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
