<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="标题" prop="title">
      <el-input
        v-model="form.title"
        clearable
        placeholder="专题标题"
        @keyup.enter.native="handleFormSubmit"
        style="width: 250px;"/>
    </el-form-item>

    <el-form-item label="别名" prop="title">
      <el-input
        v-model="form.alias"
        clearable
        placeholder="专题别名"
        @keyup.enter.native="handleFormSubmit"
        style="width: 150px;"/>
    </el-form-item>

    <el-form-item label="关键词" prop="keywords">
      <el-input
        v-model="form.keywords"
        clearable
        placeholder="专题关键词"
        @keyup.enter.native="handleFormSubmit"
        style="width: 150px;"/>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        clearable
        placeholder="请选择"
        style="width: 100px;"
        value="">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
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
        title: undefined,
        alias: undefined,
        keywords: undefined,
        status: undefined
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
