<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :tree-data="tree"
      :loading="loading"/>
  </cs-container>
</template>

<script>
export default {
  name: 'system-auth-menu',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: false
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 提交查询请求
    handleSubmit(form) {
    }
  }
}
</script>
