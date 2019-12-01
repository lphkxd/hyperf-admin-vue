<template>
  <cs-container :is-back-to-top="true" parent-path="member-user-client">
    <page-header
      slot="header"
      :username="username"/>

    <page-main
      :loading="loading"
      :table-data="table"/>
  </cs-container>
</template>

<script>
import { getUserInfo } from '@/api/user/client'
import { getWithdrawUserList } from '@/api/user/withdraw_user'

export default {
  name: 'member-user-withdraw',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain')
  },
  props: {
    client_id: {
      type: [Number, String],
      required: true
    }
  },
  watch: {
    client_id: {
      handler(val) {
        this.getUserWithdrawData(val)
      },
      immediate: true
    }
  },
  data() {
    return {
      table: [],
      loading: true,
      username: ''
    }
  },
  methods: {
    getUserWithdrawData(val) {
      this.$nextTick(() => {
        this.table = []
        this.loading = true
        this.username = ''
      })

      Promise.all([
        getUserInfo(val),
        getWithdrawUserList(this.client_id)
      ])
        .then(res => {
          this.username = res[0].data ? res[0].data.username : ''
          this.table = res[1].data || []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
