<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      :type-id="typeId"
      :type-data="typeList"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :loading="loading"
      :type-data="typeList"
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
  data() {
    return {
      table: [],
      loading: true,
      typeId: undefined,
      typeList: [],
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
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    next(instance => {
      instance.typeId = to.params.goods_type_id
    })
  },
  mounted() {
    getGoodsTypeSelect({ order_type: 'asc' })
      .then(res => {
        this.typeList = res.data.length > 0 ? res.data : []
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
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      this.typeId = form ? form.goods_type_id : undefined

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
