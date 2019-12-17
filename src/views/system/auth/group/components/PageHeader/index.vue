<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleFormSubmit">查询</el-button>
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
    }
  },
  data() {
    return {
      form: {
        status: undefined,
        exclude_id: undefined
      }
    }
  },
  methods: {
    handleFormSubmit() {
      this.$emit('submit', this.form)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
