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
        placeholder="广告位置名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="编码" prop="code">
      <el-input
        v-model="form.code"
        prefix-icon="el-icon-search"
        placeholder="广告位置编码"
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
        width="250"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="展示方式" prop="display">
            <el-select
              v-model="form.display"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="多个广告" value="0"/>
              <el-option label="单个广告" value="1"/>
              <el-option label="随机多个" value="2"/>
              <el-option label="随机单个" value="3"/>
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
    platformTable: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        type: undefined,
        display: undefined,
        status: undefined,
        platform: undefined
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
    width: 70px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 70px;
  }
</style>
