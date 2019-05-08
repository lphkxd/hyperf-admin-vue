<template>
  <cs-container>
  </cs-container>
</template>

<script>
import { batchRequests } from '@/api/index'

export default {
  name: 'setting-setting-info',
  data() {
    return {
      form: [],
      loading: false
    }
  },
  mounted() {
    let data = [
      {
        version: 'v1',
        controller: 'index',
        method: 'get.system.version'
      },
      {
        version: 'v1',
        controller: 'delivery_dist',
        method: 'get.delivery.dist.callback'
      },
      {
        version: 'v1',
        controller: 'qrcode',
        method: 'get.qrcode.callurl'
      },
      {
        version: 'v1',
        controller: 'payment',
        method: 'get.payment.notify'
      },
      {
        version: 'v1',
        controller: 'payment',
        method: 'get.payment.return'
      }
    ]

    this.loading = true
    batchRequests(data)
      .then(res => {
        console.log(res)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
