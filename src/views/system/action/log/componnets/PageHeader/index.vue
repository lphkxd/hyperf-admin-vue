<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="账号类型" prop="client_type">
      <el-select
        v-model="form.client_type"
        clearable
        placeholder="请选择"
        style="width: 160px;"
        value="">
        <el-option label="管理组" value="1"/>
        <el-option label="顾客组" value="0"/>
        <el-option label="游客" value="-1"/>
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    group: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
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
