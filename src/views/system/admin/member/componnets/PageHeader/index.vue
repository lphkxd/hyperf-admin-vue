<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="账号" prop="account">
      <el-input
        v-model="form.account"
        placeholder="账号/昵称"
        style="width: 160px;"/>
    </el-form-item>

    <el-form-item label="所属用户组" prop="group_id">
      <el-select
        v-model="form.group_id"
        clearable
        placeholder="请选择">
        <el-option
          v-for="(item, index) in group"
          :key="index"
          :label="item.name"
          :value="item.group_id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否启用" prop="status">
      <el-select
        v-model="form.status"
        clearable
        placeholder="请选择"
        style="width: 100px;">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit">
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
    group: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        account: '',
        status: null,
        group_id: null
      },
      rules: {
      }
    }
  },
  methods: {
    handleFormSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$message.error('表单校验失败')
          return false
        }
      })
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
