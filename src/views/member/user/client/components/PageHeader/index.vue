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
        prefix-icon="el-icon-search"
        placeholder="可输入 账号/昵称/手机号"
        @keyup.enter.native="handleFormSubmit"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="用户组" prop="group_id">
      <el-select
        v-model="form.group_id"
        placeholder="请选择"
        style="width: 140px;"
        clearable
        value="">
        <el-option
          v-for="item in group"
          :key="item.group_id"
          :label="item.name"
          :value="item.group_id"/>
      </el-select>
    </el-form-item>

    <el-form-item label="等级" prop="user_level_id">
      <el-select
        v-model="form.user_level_id"
        placeholder="请选择"
        style="width: 140px;"
        clearable
        value="">
        <el-option
          v-for="item in level"
          :key="item.user_level_id"
          :label="item.name"
          :value="item.user_level_id"/>
      </el-select>
    </el-form-item>

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
    level: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        user_level_id: undefined,
        group_id: undefined,
        account: undefined,
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
