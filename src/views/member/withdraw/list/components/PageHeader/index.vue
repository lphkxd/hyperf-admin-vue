<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="提现单号" prop="withdraw_no">
      <el-input
        v-model="form.withdraw_no"
        prefix-icon="el-icon-search"
        placeholder="提现单号"
        @keyup.enter.native="handleFormSubmit"
        style="width: 230px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="账号" prop="account">
      <el-input
        v-model="form.account"
        prefix-icon="el-icon-search"
        placeholder="可输入 账号/昵称"
        @keyup.enter.native="handleFormSubmit"
        style="width: 170px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="待处理" value="0"/>
        <el-option label="处理中" value="1"/>
        <el-option label="已取消" value="2"/>
        <el-option label="已完成" value="3"/>
        <el-option label="已拒绝" value="4"/>
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
        width="402"
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
              style="width: 320px;">
            </el-date-picker>
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
    }
  },
  data() {
    return {
      form: {
        withdraw_no: undefined,
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
  .more-filter >>> label {
    width: 82px;
  }
</style>
