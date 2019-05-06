<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="auto">
    <el-divider>基础设置</el-divider>

    <el-form-item
      :label="form.default.description"
      prop="default">
      <el-radio-group
        v-model="form.default.value">
        <el-radio
          v-for="(item, index) in uploadTable"
          :key="index"
          :label="item.module">{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item
      :label="form.oss.description"
      prop="oss">
      <el-input
        v-model="form.oss.value"
        :placeholder="form.oss.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.image_ext.description"
      prop="image_ext">
      <el-input
        v-model="form.image_ext.value"
        :placeholder="form.image_ext.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.file_ext.description"
      prop="file_ext">
      <el-input
        v-model="form.file_ext.value"
        :placeholder="form.file_ext.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.file_size.description"
      prop="file_size">
      <el-input
        v-model="form.file_size.value"
        :placeholder="form.file_size.description"
        style="width: 160px;"
        clearable/>
    </el-form-item>

    <el-divider>CareyShop(本地上传)</el-divider>

    <el-form-item
      :label="form.careyshop_url.description"
      prop="careyshop_url">
      <el-input
        v-model="form.careyshop_url.value"
        :placeholder="form.careyshop_url.description"
        clearable/>
    </el-form-item>

    <el-divider>七牛云 KODO</el-divider>

    <el-form-item
      :label="form.qiniu_access_key.code"
      prop="qiniu_access_key">
      <el-input
        v-model="form.qiniu_access_key.value"
        :placeholder="form.qiniu_access_key.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_secret_key.code"
      prop="qiniu_secret_key">
      <el-input
        v-model="form.qiniu_secret_key.value"
        :placeholder="form.qiniu_secret_key.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_bucket.code"
      prop="qiniu_bucket">
      <el-input
        v-model="form.qiniu_bucket.value"
        :placeholder="form.qiniu_bucket.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_url.code"
      prop="qiniu_url">
      <el-input
        v-model="form.qiniu_url.value"
        :placeholder="form.qiniu_url.description"
        clearable/>
    </el-form-item>

    <el-divider>阿里云 OSS</el-divider>

    <el-form-item
      :label="form.aliyun_access_key.code"
      prop="aliyun_access_key">
      <el-input
        v-model="form.aliyun_access_key.value"
        :placeholder="form.aliyun_access_key.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_secret_key.code"
      prop="aliyun_secret_key">
      <el-input
        v-model="form.aliyun_secret_key.value"
        :placeholder="form.aliyun_secret_key.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_bucket.code"
      prop="aliyun_bucket">
      <el-input
        v-model="form.aliyun_bucket.value"
        :placeholder="form.aliyun_bucket.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_url.code"
      prop="aliyun_url">
      <el-input
        v-model="form.aliyun_url.value"
        :placeholder="form.aliyun_url.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_endpoint.code"
      prop="aliyun_endpoint">
      <el-input
        v-model="form.aliyun_endpoint.value"
        :placeholder="form.aliyun_endpoint.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_rolearn.code"
      prop="aliyun_rolearn">
      <el-input
        v-model="form.aliyun_rolearn.value"
        :placeholder="form.aliyun_rolearn.description"
        clearable/>
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
import { setUploadList } from '@/api/config/setting'
import { getUploadModule } from '@/api/upload/upload'

export default {
  data() {
    return {
      loading: false,
      form: null,
      uploadTable: []
    }
  },
  mounted() {
    getUploadModule()
      .then(res => {
        this.uploadTable = res.data
      })
  },
  methods: {
    // 设置配置数据
    setFormData(val) {
      this.form = val
    },
    // 确定修改
    handleFormSubmit() {
      let data = {}
      for (const index in this.form) {
        if (this.form.hasOwnProperty(index)) {
          data[index] = this.form[index].value
        }
      }

      this.loading = true
      setUploadList(data)
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
