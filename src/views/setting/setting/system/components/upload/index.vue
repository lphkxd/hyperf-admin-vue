<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
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
      <div class="help-block" v-html="form.default.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.oss.description"
      prop="oss">
      <el-input
        v-model="form.oss.value"
        :placeholder="form.oss.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.oss.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.image_ext.description"
      prop="image_ext">
      <cs-tab-edit v-model="imageExt" type="info" effect="plain"/>
      <div class="help-block" v-html="form.image_ext.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.file_ext.description"
      prop="file_ext">
      <cs-tab-edit v-model="fileExt" type="info" effect="plain"/>
      <div class="help-block" v-html="form.file_ext.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.file_size.description"
      prop="file_size">
      <el-select
        v-model="form.file_size.value"
        placeholder="请选择"
        style="width: 180px;"
        value="">
        <el-option v-for="value of fileSize" :key="value" :value="value"/>
      </el-select>
      <div class="help-block" v-html="form.file_size.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.token_expires.description"
      prop="token_expires">
      <el-input-number
        v-model="form.token_expires.value"
        :placeholder="form.token_expires.description"
        controls-position="right"
        :min="0"/>
      <div class="help-block" v-html="form.token_expires.help_text"></div>
    </el-form-item>

    <el-divider>CareyShop(本地上传)</el-divider>

    <el-form-item
      :label="form.careyshop_url.description"
      prop="careyshop_url">
      <el-input
        v-model="form.careyshop_url.value"
        :placeholder="form.careyshop_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.careyshop_url.help_text"></div>
    </el-form-item>

    <el-divider>七牛云 KODO</el-divider>

    <el-form-item
      :label="form.qiniu_access_key.description"
      prop="qiniu_access_key">
      <el-input
        v-model="form.qiniu_access_key.value"
        :placeholder="form.qiniu_access_key.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.qiniu_access_key.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_secret_key.description"
      prop="qiniu_secret_key">
      <el-input
        v-model="form.qiniu_secret_key.value"
        :placeholder="form.qiniu_secret_key.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.qiniu_secret_key.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_bucket.description"
      prop="qiniu_bucket">
      <el-input
        v-model="form.qiniu_bucket.value"
        :placeholder="form.qiniu_bucket.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.qiniu_bucket.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.qiniu_url.description"
      prop="qiniu_url">
      <el-input
        v-model="form.qiniu_url.value"
        :placeholder="form.qiniu_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.qiniu_url.help_text"></div>
    </el-form-item>

    <el-divider>阿里云 OSS</el-divider>

    <el-form-item
      :label="form.aliyun_access_key.description"
      prop="aliyun_access_key">
      <el-input
        v-model="form.aliyun_access_key.value"
        :placeholder="form.aliyun_access_key.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_access_key.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_secret_key.description"
      prop="aliyun_secret_key">
      <el-input
        v-model="form.aliyun_secret_key.value"
        :placeholder="form.aliyun_secret_key.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_secret_key.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_bucket.description"
      prop="aliyun_bucket">
      <el-input
        v-model="form.aliyun_bucket.value"
        :placeholder="form.aliyun_bucket.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_bucket.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_url.description"
      prop="aliyun_url">
      <el-input
        v-model="form.aliyun_url.value"
        :placeholder="form.aliyun_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_url.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_endpoint.description"
      prop="aliyun_endpoint">
      <el-input
        v-model="form.aliyun_endpoint.value"
        :placeholder="form.aliyun_endpoint.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_endpoint.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.aliyun_rolearn.description"
      prop="aliyun_rolearn">
      <el-input
        v-model="form.aliyun_rolearn.value"
        :placeholder="form.aliyun_rolearn.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.aliyun_rolearn.help_text"></div>
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
  components: {
    'csTabEdit': () => import('@/components/cs-tab-edit')
  },
  data() {
    return {
      form: null,
      loading: false,
      uploadTable: [],
      imageExt: [],
      fileExt: [],
      fileSize: ['1M', '2M', '3M', '5M', '10M', '50M', '100M']
    }
  },
  mounted() {
    getUploadModule()
      .then(res => {
        this.uploadTable = res.data || []
      })
  },
  methods: {
    // 设置配置数据
    setFormData(val) {
      this.form = val
      this.imageExt = val.image_ext.value ? val.image_ext.value.split(',') : []
      this.fileExt = val.file_ext.value ? val.file_ext.value.split(',') : []
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
      data['image_ext'] = this.imageExt.join(',')
      data['file_ext'] = this.fileExt.join(',')

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
