<template>
  <cs-container :is-back-to-top="true">
    <div class="cs-p">
      <el-tabs
        class="tab-box"
        v-model="activeName"
        v-loading="loading">
        <el-tab-pane
          label="系统配置"
          name="systemInfo">
          <system-info ref="systemInfo"></system-info>
        </el-tab-pane>

        <el-tab-pane
          label="购物系统"
          name="systemShopping">
          购物系统
        </el-tab-pane>

        <el-tab-pane
          label="售后服务"
          name="service">
          售后服务
        </el-tab-pane>

        <el-tab-pane
          label="支付页面"
          name="payment">
          支付页面
        </el-tab-pane>

        <el-tab-pane
          label="配送轨迹"
          name="deliveryDist">
          配送轨迹
        </el-tab-pane>

        <el-tab-pane
          label="上传配置"
          name="upload">
          上传配置
        </el-tab-pane>
      </el-tabs>
    </div>
  </cs-container>
</template>

<script>
import systemInfo from './components/system-info'

export default {
  name: 'setting-setting-system',
  components: {
    'system-info': systemInfo
  },
  data() {
    return {
      loading: false,
      activeName: 'systemInfo'
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
      this.$refs[this.activeName].getFormData()
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

<style scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
</style>
