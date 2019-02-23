<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        clearable
        placeholder="广告列表名称"
        @keyup.enter.native="handleFormSubmit"
        style="width: 200px;"/>
    </el-form-item>

    <el-form-item label="编码" prop="code">
      <el-input
        v-model="form.code"
        clearable
        placeholder="广告列表编码"
        @keyup.enter.native="handleFormSubmit"
        style="width: 140px;"/>
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="form.type"
        clearable
        placeholder="请选择"
        style="width: 120px;"
        value="">
        <el-option label="图片" value="0"/>
        <el-option label="代码" value="1"/>
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
          <el-form-item label="时间段" prop="time_period">
            <el-date-picker
              v-model="form.time_period"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始投放时间"
              end-placeholder="投放结束时间"
              style="width: 320px;">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="广告位置" prop="ads_position_id">
            <el-select
              v-model="form.ads_position_id"
              clearable
              placeholder="请选择"
              style="width: 320px;"
              value="">
              <el-option
                v-for="(item, index) in positionTable"
                :key="index"
                :label="item.name"
                :value="item.ads_position_id"/>
            </el-select>
          </el-form-item>

          <el-form-item label="平台" prop="platform">
            <el-select
              v-model="form.platform"
              clearable
              placeholder="请选择"
              style="width: 160px;"
              value="">
              <el-option label="all" value="0"/>
              <el-option label="pc" value="1"/>
              <el-option label="mobile" value="2"/>
              <el-option label="ios" value="3"/>
              <el-option label="android" value="4"/>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select
              v-model="form.status"
              clearable
              placeholder="请选择"
              style="width: 160px;"
              value="">
              <el-option label="启用" value="1"/>
              <el-option label="禁用" value="0"/>
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
    positionTable: {
      default: () => []
    }
  },
  data() {
    return {
      form: {
        ads_position_id: undefined,
        code: undefined,
        platform: undefined,
        name: undefined,
        type: undefined,
        status: undefined,
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
        if (!this.form.hasOwnProperty(index) || !this.form[index]) {
          continue
        }

        // 时间段处理
        if (index === 'time_period') {
          if (this.form[index].length === 2) {
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
    width: 68px;
  }
</style>
