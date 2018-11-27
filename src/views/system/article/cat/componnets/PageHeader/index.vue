<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="菜单深度" prop="level">
      <el-input-number
        v-model="form.level"
        controls-position="right"
        :min="0"
        label="请输入菜单深度值"/>
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
