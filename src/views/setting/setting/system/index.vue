<template>
  <cs-container :is-back-to-top="true">
    <div class="cs-p">
      <el-tabs
        class="tab-box"
        v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane
          label="系统配置"
          name="system_info">
          系统配置
        </el-tab-pane>

        <el-tab-pane
          label="购物系统"
          name="system_shopping">
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
          name="delivery_dist">
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
export default {
  name: 'setting-setting-system',
  data() {
    return {
      activeName: 'system_info'
    }
  },
  methods: {
    handleClick() {
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
