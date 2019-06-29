<template>
  <cs-container :is-back-to-top="true" parent-path="member-user-client">
    <page-header
      slot="header"
      :username="username"/>

    <page-main
      :loading="loading"
      :table-data="table"
      :address-id.sync="addressId"/>
  </cs-container>
</template>

<script>
import { getUserInfo } from '@/api/user/client'
import { getUserAddressList } from '@/api/user/address'

export default {
  name: 'member-user-address',
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
        this.getUserAddressData(val)
      },
      immediate: true
    }
  },
  data() {
    return {
      table: [],
      loading: true,
      // 账户
      username: '',
      // 默认收货地址编号
      addressId: 0
    }
  },
  methods: {
    getUserAddressData(val) {
      this.$nextTick(() => {
        this.table = []
        this.loading = true
        this.username = ''
      })

      Promise.all([
        getUserInfo(val),
        getUserAddressList(val)
      ])
        .then(res => {
          if (res[0].data) {
            this.username = res[0].data.username
            this.addressId = res[0].data.user_address_id
          }

          this.table = res[1].data.length ? res[1].data : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
