<template>
  <cs-container>
    <el-form
      v-loading="loading"
      class="form-box cs-m"
      label-width="150px"
      label-position="left">
      <el-form-item class="action" :label="version.name">
        <span>{{version.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(version.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="admin.name">
        <span>{{admin.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(admin.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="delivery.name">
        <span>{{delivery.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(delivery.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="qrcode.name">
        <span>{{qrcode.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(qrcode.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="alipay.notify.name">
        <span>{{alipay.notify.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(alipay.notify.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="alipay.return.name">
        <span>{{alipay.return.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(alipay.return.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="weixin.notify.name">
        <span>{{weixin.notify.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(weixin.notify.value)">复制</el-button>
      </el-form-item>

      <el-form-item class="action" :label="weixin.return.name">
        <span>{{weixin.return.value}}</span>
        <el-button
          class="form-button active"
          type="text"
          size="small"
          @click="copyData(weixin.return.value)">复制</el-button>
      </el-form-item>

      <el-form-item size="small">
        <el-button @click="getInfoData('操作成功')">刷新</el-button>
      </el-form-item>
    </el-form>
  </cs-container>
</template>

<script>
import { batchRequests } from '@/api/index'
import * as clipboard from 'clipboard-polyfill'

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
        name: '快递鸟推送回调URL',
        value: ''
      },
      qrcode: {
        name: '二维码调用URL',
        value: ''
      },
      alipay: {
        notify: {
          name: '支付宝异步URL',
          value: ''
        },
        return: {
          name: '支付宝同步URL',
          value: ''
        }
      },
      weixin: {
        notify: {
          name: '微信异步URL',
          value: ''
        },
        return: {
          name: '微信同步URL',
          value: ''
        }
      },
      loading: false
    }
  },
  mounted() {
    this.getInfoData()
  },
  methods: {
    getInfoData(message = null) {
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
                  if (value.data.to_payment === 2) {
                    this.alipay.notify.value = value.data.notify_url
                  }
                  if (value.data.to_payment === 3) {
                    this.weixin.notify.value = value.data.notify_url
                  }
                  break

                case 'get.payment.return':
                  if (value.data.to_payment === 2) {
                    this.alipay.return.value = value.data.return_url
                  }
                  if (value.data.to_payment === 3) {
                    this.weixin.return.value = value.data.return_url
                  }
                  break
              }
            }
          })

          if (message) {
            this.$message.success(message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    copyData(val) {
      clipboard.writeText(val)
        .then(() => {
          this.$message.success('已复制到剪贴板')
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style scoped>
  .form-box {
    padding: 20px;
    background-color: #FFF;
  }
  .form-button {
    padding-left: 5px;
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: inline;
  }
</style>
