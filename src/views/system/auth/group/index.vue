<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :table-data="table"
      :loading="loading"/>
  </cs-container>
</template>

<script>
import { getAuthGroupList } from '@/api/auth/group'

export default {
  name: 'system-auth-group',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain')
  },
  data() {
    return {
      table: [],
      loading: false
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    handleSubmit(form) {
      this.loading = true
      getAuthGroupList(form)
        .then(res => {
          this.table = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
