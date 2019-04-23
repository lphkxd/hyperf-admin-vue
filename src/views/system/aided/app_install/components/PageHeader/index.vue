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
        clearable
        placeholder="可输入应用安装包名称"
        @keyup.enter.native="handleFormSubmit"/>
    </el-form-item>

    <el-form-item label="系统标识" prop="user_agent">
      <el-input
        v-model="form.user_agent"
        prefix-icon="el-icon-search"
        clearable
        placeholder="可输入系统标识"
        @keyup.enter.native="handleFormSubmit"/>
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
        name: undefined,
        user_agent: undefined
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
