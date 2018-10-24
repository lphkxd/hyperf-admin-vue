<template>
  <cs-container>
    <page-header
      slot="header"
      :group="group"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :table-data="table"
      :loading="loading"
      :group="group"
      @refresh="handleRefresh"/>
    <page-footer
      slot="footer"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </cs-container>
</template>

<script>
import { getAuthGroupList } from '@/api/auth/group'
import { getAdminList } from '@/api/user/admin'

export default {
  name: 'system-admin-member',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      table: [],
      group: [],
      loading: false,
      page: {
        current: 1,
        size: 25,
        total: 0
      }
    }
  },
  mounted() {
    this.initialization()
    this.handleSubmit()
  },
  methods: {
    // 数据初始加载
    initialization() {
      getAuthGroupList({
        status: 1,
        exclude_id: [3, 4]
      })
        .then(res => {
          this.group = res.data
        })
    },
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
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      getAdminList({
        ...form,
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
