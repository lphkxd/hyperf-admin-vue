<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      :type-id="goods_type_id"
      :type-data="typeList"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :loading="loading"
      :type-data="typeList"
      :select-id="selectTypeId"
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
import { getGoodsTypeSelect } from '@/api/goods/type'
import { getGoodsSpecPage } from '@/api/goods/spec'

export default {
  name: 'goods-setting-spec',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  props: {
    goods_type_id: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      table: [],
      loading: true,
      typeList: [],
      selectTypeId: null,
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
      getGoodsTypeSelect({ order_type: 'asc' }),
      this.$store.dispatch('careyshop/db/databasePage', { user: true })
    ])
      .then(res => {
        this.typeList = res[0].data.length > 0 ? res.data : []
        this.page.size = res[1].get('size').value() || 25
      })
      .then(() => {
        this.handleSubmit({ goods_type_id: this.goods_type_id }, true)
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
      this.selectTypeId = form.goods_type_id || null

      getGoodsSpecPage({
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
