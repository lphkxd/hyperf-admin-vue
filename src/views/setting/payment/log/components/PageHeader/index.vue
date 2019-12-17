<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="账号" prop="account">
      <el-input
        v-model="form.account"
        prefix-icon="el-icon-search"
        placeholder="可输入 账号/昵称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="支付方式" prop="to_payment">
      <el-select
        v-model="form.to_payment"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option
          v-for="(item, index) in toPayment"
          :key="index"
          :label="item.name"
          :value="item.code"/>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="待付款" value="0"/>
        <el-option label="已完成" value="1"/>
        <el-option label="已关闭" value="2"/>
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
        width="397"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="支付流水号" prop="payment_no">
            <el-input
              v-model="form.payment_no"
              prefix-icon="el-icon-search"
              placeholder="可输入支付流水号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="订单号" prop="order_no">
            <el-input
              v-model="form.order_no"
              prefix-icon="el-icon-search"
              placeholder="可输入订单号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="交易号" prop="out_trade_no">
            <el-input
              v-model="form.out_trade_no"
              prefix-icon="el-icon-search"
              placeholder="可输入交易号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="时间段" prop="time_period">
            <el-date-picker
              v-model="form.time_period"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 315px;">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="支付类型" prop="type">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="充值" value="0"/>
              <el-option label="订单" value="1"/>
            </el-select>
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
    toPayment: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        payment_no: undefined,
        order_no: undefined,
        out_trade_no: undefined,
        to_payment: undefined,
        status: undefined,
        type: undefined,
        account: undefined,
        begin_time: undefined,
        end_time: undefined,
        time_period: null
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      let form = {}
      // eslint-disable-next-line no-unused-vars
      for (const index in this.form) {
        if (!this.form.hasOwnProperty(index)) {
          continue
        }

        // 时间段处理
        if (index === 'time_period') {
          if (this.form[index] && this.form[index].length === 2) {
            form['begin_time'] = this.form[index][0].toUTCString()
            form['end_time'] = this.form[index][1].toUTCString()
          }

          continue
        }

        form[index] = this.form[index]
      }

      this.$emit('submit', form, isRestore)
    },
    handleFormReset() {
      this.form.time_period = null
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
    width: 82px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 82px;
  }
</style>
