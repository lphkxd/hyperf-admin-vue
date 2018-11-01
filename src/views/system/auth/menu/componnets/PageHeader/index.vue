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
        clearable
        placeholder="请选择"
        style="width: 120px;">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="导航属性" prop="is_navi">
      <el-select
        v-model="form.is_navi"
        clearable
        placeholder="请选择"
        style="width: 120px;">
        <el-option label="可见" value="1"/>
        <el-option label="隐藏" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="菜单深度" prop="level">
      <el-input-number
        v-model="form.level"
        controls-position="right"
        :min="0"
        label="请输入菜单深度值"
        @keyup.enter.native="handleFormSubmit"
        style="width: 100px;"/>
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
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        status: undefined,
        is_navi: undefined,
        level: 0
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
