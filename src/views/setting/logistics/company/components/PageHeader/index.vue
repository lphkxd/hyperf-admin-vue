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
        placeholder="快递公司名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="编码" prop="code">
      <el-input
        v-model="form.code"
        prefix-icon="el-icon-search"
        placeholder="快递公司编码"
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
        <el-option
          v-for="(item, index) in companyType"
          :key="index"
          :label="item"
          :value="index"/>
      </el-select>
    </el-form-item>

    <el-form-item label="获取已删" prop="company_all">
      <el-select
        v-model="form.company_all"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="是" value="1"/>
        <el-option label="否" value="0"/>
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
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    companyType: {
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        type: undefined,
        company_all: undefined
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
