<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="账号" prop="username">
      <el-input
        v-model="form.username"
        prefix-icon="el-icon-search"
        placeholder="可输入账号"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="账号类型" prop="client_type">
      <el-select
        v-model="form.client_type"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option
          v-for="(item, index) in group"
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
        width="370"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="路径" prop="path">
            <el-input
              v-model="form.path"
              prefix-icon="el-icon-search"
              placeholder="可输入路径"
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
    group: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        client_type: undefined,
        username: undefined,
        path: undefined,
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
    width: 54px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 54px;
  }
</style>
