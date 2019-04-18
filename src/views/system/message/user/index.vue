<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-main
      :loading="loading"
      :table-data="table"
      :unread-data="unread"
      :type-data="type"
      @sort="handleSort"
      @refresh="handleRefresh"
      @submit="handleSubmit"/>

    <page-footer
      slot="footer"
      :loading="loading"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </cs-container>
</template>

<script>
import { getMessageType } from '@/api/public'
import { getMessageUserList } from '@/api/message/message'

export default {
  name: 'system-message-user',
  components: {
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      scrollTop: 0,
      loading: true,
      table: [],
      unread: {},
      type: [],
      form: {
        type: undefined,
        is_read: undefined,
        is_unread: 1
      },
      page: {
        current: 1,
        size: 25,
        total: 0
      },
      order: {
        order_type: undefined,
        order_field: undefined
      }
    }
  },
  mounted() {
    getMessageType()
      .then(res => {
        this.type.unshift({
          name: '全部消息',
          value: 'all'
        })

        for (const index in res) {
          if (!res.hasOwnProperty(index)) {
            continue
          }

          this.type.push({
            name: res[index],
            value: index
          })
        }
      })
      .then(() => {
        this.handleSubmit()
      })
  },
  methods: {
    // 刷新列表页面
    handleRefresh() {
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 排序刷新
    handleSort(val) {
      this.order = val
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      this.form = {
        ...form,
        is_unread: 1
      }

      getMessageUserList({
        ...this.form,
        ...this.order,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data.total_result
          this.table = res.data.total_result > 0 ? res.data.items : []
          this.unread = res.data.unread_count || {}
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
