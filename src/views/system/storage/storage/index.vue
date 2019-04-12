<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :loading="loading"
      :table-data="table"
      :navi-data="navi"
      :storage-id="storageId"
      @refresh="handleRefresh"
      @clearName="handleClearName"/>

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
import { getStorageNavi, getStorageList } from '@/api/upload/storage'

export default {
  name: 'system-storage-storage',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      scrollTop: 0,
      loading: true,
      storageId: 0,
      table: [],
      navi: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      }
    }
  },
  mounted() {
    this.handleSubmit()
  },
  watch: {
    storageId: {
      handler(val) {
        getStorageNavi(val).then(res => { this.navi = res.data })
      }
    }
  },
  methods: {
    // 刷新列表页面
    handleRefresh(storageId = null, isRestore = false) {
      this.$nextTick(() => {
        this.$refs.header.form['storage_id'] = storageId || 0
        this.$refs.header.handleFormSubmit(isRestore)
      })
    },
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 清除搜索名称
    handleClearName() {
      this.$refs.header.form.name = null
    },
    // 查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      getStorageList({
        ...form,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data['total_result']
          this.table = res.data['total_result'] > 0 ? res.data['items'] : []
        })
        .finally(() => {
          this.loading = false
          this.storageId = form ? form.storage_id : 0
        })
    }
  }
}
</script>
