<template>
  <cs-container>
    <page-header slot="header" @submit="handleSubmit" ref="header"/>
  </cs-container>
</template>

<script>
import { getAuthGroupList } from '@/api/auth/group'
export default {
  name: 'system-admin-member',
  components: {
    'PageHeader': () => import('./componnets/PageHeader')
  },
  data() {
    return {
      table: [],
      group: [],
      loading: false,
      page: {
        current: 1,
        size: 20,
        total: 0
      }
    }
  },
  created() {
    this.initialization()
  },
  methods: {
    // 数据初始加载
    initialization() {
      getAuthGroupList({
        status: 1
      })
        .then(res => {
          console.log(res)
        })
    },
    // 提交查询请求
    handleSubmit(form) {
    }
  }
}
</script>
