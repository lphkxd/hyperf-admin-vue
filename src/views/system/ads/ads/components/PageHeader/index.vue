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
        prefix-icon="el-icon-search"
        placeholder="广告列表名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="编码" prop="code">
      <el-input
        v-model="form.code"
        prefix-icon="el-icon-search"
        placeholder="广告列表编码"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 140px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="form.type"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="图片" value="0"/>
        <el-option label="代码" value="1"/>
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
        width="383"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="投放日期" prop="time_period">
            <el-date-picker
              v-model="form.time_period"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始投放日期"
              end-placeholder="投放结束日期"
              style="width: 315px;">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="广告位置" prop="ads_position_id">
            <el-select
              v-model="form.ads_position_id"
              placeholder="可选择广告位置，试试搜索：广告"
              style="width: 315px;"
              filterable
              clearable
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
              placeholder="请选择"
              clearable
              value="">
              <el-option
                v-for="(item, index) in platformTable"
                :key="index"
                :label="item"
                :value="index"/>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="启用" value="1"/>
              <el-option label="禁用" value="0"/>
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
    positionTable: {
      default: () => []
    },
    platformTable: {
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
  .more-filter >>> label {
    width: 70px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 70px;
  }
</style>
