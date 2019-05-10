<template>
  <cs-container>
    <el-form
      v-loading="loading"
      class="form-box cs-m"
      label-width="150px"
      label-position="left">
      <el-form-item :label="version.name">
        <span>{{version.value}}</span>
      </el-form-item>

      <el-form-item :label="admin.name">
        <span>{{admin.value}}</span>
      </el-form-item>

      <el-form-item :label="delivery.name">
        <span>{{delivery.value}}</span>
      </el-form-item>

      <el-form-item :label="qrcode.name">
        <span>{{qrcode.value}}</span>
      </el-form-item>

      <el-form-item :label="alipay.notify.name">
        <span>{{alipay.notify.value}}</span>
      </el-form-item>

      <el-form-item :label="alipay.return.name">
        <span>{{alipay.return.value}}</span>
      </el-form-item>

      <el-form-item label="微信回调">
        <p>{{weixin.notify.name}} {{weixin.notify.value}}</p>
        <p>{{weixin.return.name}} {{weixin.return.value}}</p>
      </el-form-item>
    </el-form>
  </cs-container>
</template>

<script>
import { batchRequests } from '@/api/index'

export default {
  name: 'setting-setting-info',
  data() {
    return {
      version: {
        name: '框架内核版本号',
        value: ''
      },
      admin: {
        name: '后台管理版本号',
        value: process.env.VUE_APP_VERSION
      },
      delivery: {
        name: '配送回调URL',
        value: ''
      },
      qrcode: {
        name: '二维码调用URL',
        value: ''
      },
      alipay: {
        notify: {
          name: '支付宝异步(notify)URL',
          value: ''
        },
        return: {
          name: '支付宝同步(return)URL',
          value: ''
        }
      },
      weixin: {
        notify: {
          name: '微信异步(notify)URL',
          value: ''
        },
        return: {
          name: '微信同步(return)URL',
          value: ''
        }
      },
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
        method: 'get.payment.notify',
        to_payment: 2
      },
      {
        version: 'v1',
        controller: 'payment',
        method: 'get.payment.return',
        to_payment: 2
      },
      {
        version: 'v1',
        controller: 'payment',
        method: 'get.payment.notify',
        to_payment: 3
      },
      {
        version: 'v1',
        controller: 'payment',
        method: 'get.payment.return',
        to_payment: 3
      }
    ]

    this.loading = true
    batchRequests(data)
      .then(res => {
        res.data.forEach(value => {
          console.log(value)
          if (value.status === 200) {
            switch (value.method) {
              case 'get.system.version':
                this.version.value = value.data.version
                break

              case 'get.delivery.dist.callback':
                this.delivery.value = value.data.callback_url
                break

              case 'get.qrcode.callurl':
                this.qrcode.value = value.data.call_url
                break

              case 'get.payment.notify':
                if (value.data.to_payment) {
                }
            }
          }
        })
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped>
  .form-box {
    padding: 20px;
    background-color: #FFF;
  }
</style>
