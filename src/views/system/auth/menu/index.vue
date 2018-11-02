<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :tree-data="tree"
      :loading="loading"
      @module="handleModule"/>
  </cs-container>
</template>

<script>
import { getMenuList } from '@/api/auth/menu'

export default {
  name: 'system-auth-menu',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: false,
      module: 'admin'
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getMenuList({
        ...form,
        module: this.module
      })
        .then(res => {
          this.tree = res.data.length ? res.data : []
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 切换模块
    handleModule(val) {
      this.module = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    }
  }
}
</script>
