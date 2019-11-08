<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      :position-table="positionTable"
      :platform-table="platformTable"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :loading="loading"
      :position-table="positionTable"
      :platform-table="platformTable"
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
import { getAdsList } from '@/api/ads/ads'
import { getSettingList } from '@/api/config/setting'
import { getAdsPositionSelect } from '@/api/ads/position'

export default {
  name: 'system-ads-ads',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      table: [],
      positionTable: [],
      platformTable: [],
      loading: true,
      page: {
        current: 1,
        size: 0,
        total: 0
      },
      order: {
        order_type: undefined,
        order_field: undefined
      }
    }
  },
  mounted() {
    Promise.all([
      getAdsPositionSelect(null),
      getSettingList('system_info', 'platform'),
      this.$store.dispatch('careyshop/db/databasePage', { user: true })
    ])
      .then(res => {
        this.positionTable = res[0].data
        this.platformTable = res[1].data['platform']['value']
        this.page.size = res[2].get('size').value() || 25
      })
      .then(() => {
        this.handleSubmit()
      })
  },
  methods: {
    // 刷新列表页面
    handleRefresh(isTurning = false) {
      if (isTurning) {
        !(this.page.current - 1) || this.page.current--
      }

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
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      getAdsList({
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
