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

    <el-form-item label="交易来源" prop="to_payment">
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

    <el-form-item label="收支类型" prop="type">
      <el-select
        v-model="form.type"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="收入" value="0"/>
        <el-option label="支出" value="1"/>
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
        width="397"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
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

          <el-form-item label="操作人账号" prop="action">
            <el-input
              v-model="form.action"
              prefix-icon="el-icon-search"
              placeholder="可输入操作人账号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="来源订单号" prop="source_no">
            <el-input
              v-model="form.source_no"
              prefix-icon="el-icon-search"
              placeholder="可输入来源订单号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="购物卡卡号" prop="card_number">
            <el-input
              v-model="form.card_number"
              prefix-icon="el-icon-search"
              placeholder="可输入购物卡卡号"
              @keyup.enter.native="handleFormSubmit(true)"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="收支模型" prop="module">
            <el-select
              v-model="form.module"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="积分" value="points"/>
              <el-option label="余额" value="money"/>
              <el-option label="购物卡" value="card"/>
            </el-select>
          </el-form-item>
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
        action: undefined,
        type: undefined,
        source_no: undefined,
        module: undefined,
        to_payment: undefined,
        account: undefined,
        card_number: undefined,
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
