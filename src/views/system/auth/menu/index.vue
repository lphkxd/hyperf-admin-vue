<template>
  <cs-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :tree-data="tree"
      :loading="loading"
      :module="module"
      @refresh="handleRefresh"
      ref="main"/>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getMenuList } from '@/api/auth/menu'

export default {
  name: 'system-auth-menu',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: true,
      module: undefined
    }
  },
  mounted() {
    this.handleSubmit({ module: 'admin' })
  },
  methods: {
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getMenuList({ ...form })
        .then(res => {
          this.module = form.module
          this.tree = util.formatDataToTree(res.data)

          if (this.$refs.main) {
            this.$refs.main.filterText = ''
            this.$refs.main.resetForm()
            this.$refs.main.resetElements()
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
