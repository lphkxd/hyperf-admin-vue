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
        clearable
        placeholder="可输入 账号/昵称"
        @keyup.enter.native="handleFormSubmit"
        style="width: 200px;"/>
    </el-form-item>

    <el-form-item label="支付方式" prop="to_payment">
      <el-select
        v-model="form.to_payment"
        clearable
        placeholder="请选择"
        style="width: 120px;"
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
        clearable
        placeholder="请选择"
        style="width: 120px;"
        value="">
        <el-option label="待付款" value="0"/>
        <el-option label="已完成" value="1"/>
        <el-option label="已关闭" value="2"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit(true)">
        <cs-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <cs-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-popover
        width="388"
        placement="bottom"
        trigger="click">

        <div class="more-filter">
        </div>

        <el-button
          slot="reference"
          type="text">
          更多筛选
          <cs-icon name="angle-down"/>
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
  .more-filter>>>label {
    width: 54px;
  }
</style>
