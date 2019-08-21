<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
    <el-form-item
      :label="form.success.description"
      prop="success">
      <el-input
        v-model="form.success.value"
        :placeholder="form.success.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.success.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.error.description"
      prop="error">
      <el-input
        v-model="form.error.value"
        :placeholder="form.error.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.error.help_text"></div>
    </el-form-item>

    <el-form-item size="small">
      <el-button
        type="primary"
        :loading="loading"
        @click="handleFormSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setPaymentList } from '@/api/config/setting'

export default {
  data() {
    return {
      loading: false,
      form: null
    }
  },
  methods: {
    // 设置配置数据
    setFormData(val) {
      this.form = val
    },
    // 确定修改
    handleFormSubmit() {
      let data = {}
      // eslint-disable-next-line no-unused-vars
      for (const index in this.form) {
        if (this.form.hasOwnProperty(index)) {
          data[index] = this.form[index].value
        }
      }

      this.loading = true
      setPaymentList(data)
        .then(() => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
