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
      :module="module"
      ref="main"/>
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
      module: undefined
    }
  },
  mounted() {
    this.handleSubmit({ module: 'admin' })
  },
  methods: {
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getMenuList(form)
        .then(res => {
          this.module = form.module
          this.$refs.main.resetForm()
          this.tree = res.data.length ? res.data : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
