<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
    <el-form-item
      :label="form.address.description"
      prop="address">
      <el-input
        v-model="form.address.value"
        :placeholder="form.address.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.address.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.consignee.description"
      prop="consignee">
      <el-input
        v-model="form.consignee.value"
        :placeholder="form.consignee.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.consignee.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.zipcode.description"
      prop="zipcode">
      <el-input
        v-model="form.zipcode.value"
        :placeholder="form.zipcode.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.zipcode.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.mobile.description"
      prop="mobile">
      <el-input
        v-model="form.mobile.value"
        :placeholder="form.mobile.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.mobile.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.days.description"
      prop="days">
      <el-input-number
        v-model="form.days.value"
        :placeholder="form.days.description"
        controls-position="right"
        :min="0"/>
      <div class="help-block" v-html="form.days.help_text"></div>
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
import { setServiceList } from '@/api/config/setting'

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
      setServiceList(data)
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
