<template>
  <cs-container>
    <page-header
      slot="header"
      :group="group"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
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
export default {
  name: 'system-admin-member',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      table: [],
      group: [],
      loading: false,
      page: {
        current: 1,
        size: 20,
        total: 0
      }
    }
  },
  created() {
    this.initialization()
  },
  methods: {
    // 数据初始加载
    initialization() {
      getAuthGroupList({
        status: 1
      })
        .then(res => {
          this.group = res.data
        })
    },
    // 分页变化改动
    handlePaginationChange(val) {
    },
    // 提交查询请求
    handleSubmit(form) {
    }
  }
}
</script>
