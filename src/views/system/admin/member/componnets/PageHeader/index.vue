<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="账号" prop="account">
      <el-input
        v-model="form.account"
        clearable
        placeholder="账号/昵称"
        @keyup.enter.native="handleFormSubmit"
        style="width: 160px;"/>
    </el-form-item>

    <el-form-item label="用户组" prop="group_id">
      <el-select
        v-model="form.group_id"
        clearable
        placeholder="请选择"
        value="">
        <el-option
          v-for="item in group"
          :key="item.group_id"
          :label="item.name"
          :value="item.group_id"/>
      </el-select>
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
        account: undefined,
        status: undefined,
        group_id: undefined
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
