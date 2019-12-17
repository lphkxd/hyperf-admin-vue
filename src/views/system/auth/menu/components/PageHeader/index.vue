<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="模块" prop="module">
      <el-select
        v-model="form.module"
        placeholder="请选择"
        style="width: 120px;"
        value="">
        <el-option label="后台" value="admin"/>
        <el-option label="前台" value="home"/>
        <el-option label="API" value="api"/>
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

    <el-form-item label="导航属性" prop="is_navi">
      <el-select
        v-model="form.is_navi"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="可见" value="1"/>
        <el-option label="隐藏" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="菜单深度" prop="level">
      <el-input-number
        v-model="form.level"
        controls-position="right"
        :min="0"
        style="width: 100px;"/>
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
        module: 'admin',
        status: undefined,
        is_navi: undefined,
        level: 0
      }
    }
  },
  methods: {
    handleFormSubmit() {
      // 对深度进行特殊处理
      this.$emit('submit', {
        ...this.form,
        level: this.form.level <= 0 ? undefined : this.form.level - 1
      })
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
