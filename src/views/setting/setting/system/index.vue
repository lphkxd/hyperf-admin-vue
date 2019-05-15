<template>
  <cs-container :is-back-to-top="true">
    <div class="cs-p">
      <el-tabs
        class="tab-box"
        v-model="activeName"
        v-loading="loading">
        <el-tab-pane
          label="系统配置"
          name="system_info">
          <system-info ref="system_info"/>
        </el-tab-pane>

        <el-tab-pane
          label="购物系统"
          name="system_shopping">
          <system-shopping ref="system_shopping"/>
        </el-tab-pane>

        <el-tab-pane
          label="售后服务"
          name="service">
          <service ref="service"/>
        </el-tab-pane>

        <el-tab-pane
          label="支付页面"
          name="payment">
          <payment ref="payment"/>
        </el-tab-pane>

        <el-tab-pane
          label="配送优惠"
          name="delivery">
          <delivery ref="delivery"/>
        </el-tab-pane>

        <el-tab-pane
          label="配送轨迹"
          name="delivery_dist">
          <delivery-dist ref="delivery_dist"/>
        </el-tab-pane>

        <el-tab-pane
          label="上传配置"
          name="upload">
          <upload ref="upload"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </cs-container>
</template>

<script>
import { getSettingList } from '@/api/config/setting'
import systemInfo from './components/system-info'
import systemShopping from './components/system-shopping'
import service from './components/service'
import payment from './components/payment'
import delivery from './components/delivery'
import deliveryDist from './components/delivery-dist'
import upload from './components/upload'

export default {
  name: 'setting-setting-system',
  components: {
    'system-info': systemInfo,
    'system-shopping': systemShopping,
    'service': service,
    'payment': payment,
    'delivery': delivery,
    'delivery-dist': deliveryDist,
    'upload': upload
  },
  data() {
    return {
      loading: false,
      activeName: 'system_info'
    }
  },
  watch: {
    activeName: {
      handler() {
        this.systemInit()
      }
    }
  },
  mounted() {
    this.systemInit()
  },
  methods: {
    systemInit() {
      this.loading = true
      getSettingList(this.activeName)
        .then(res => {
          this.$refs[this.activeName].setFormData(res.data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
  .tab-box /deep/ .help-block {
    color: $color-info;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
</style>
