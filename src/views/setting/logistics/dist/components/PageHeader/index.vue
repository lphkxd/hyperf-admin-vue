<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="流水号" prop="order_code">
      <el-input
        v-model="form.order_code"
        prefix-icon="el-icon-search"
        placeholder="订单号、售后单号等"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 170px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="快递单号" prop="logistic_code">
      <el-input
        v-model="form.logistic_code"
        prefix-icon="el-icon-search"
        placeholder="可输入快递单号"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 150px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="状态" prop="state">
      <el-select
        v-model="form.state"
        placeholder="请选择"
        style="width: 130px;"
        clearable
        value="">
        <el-option
          v-for="(item, index) in traceState"
          :key="index"
          :label="item"
          :value="index"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleFormSubmit(true)">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        icon="el-icon-refresh"
        @click="handleFormReset">重置</el-button>
    </el-form-item>

    <el-form-item>
      <el-popover
        width="270"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="账号/昵称" prop="account">
            <el-input
              v-model="form.account"
              prefix-icon="el-icon-search"
              placeholder="可输入 账号/昵称"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="是否订阅" prop="is_sub">
            <el-select
              v-model="form.is_sub"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="超时配送(天)" prop="timeout">
            <el-input-number
              v-model="form.timeout"
              controls-position="right"
              :min="0"/>
          </el-form-item>
        </div>

        <el-button
          slot="reference"
          type="text">
          <span>更多筛选</span>
          <i class="el-icon-arrow-down cs-pl-5"/>
        </el-button>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    traceState: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        account: undefined,
        order_code: undefined,
        logistic_code: undefined,
        state: undefined,
        is_sub: undefined,
        timeout: 0,
        is_trace: 1
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
  .more-filter {
    margin-bottom: -18px;
  }
  .more-filter >>> label {
    width: 92px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 92px;
  }
</style>
