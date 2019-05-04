<template>
  <el-form
    v-if="form"
    ref="form"
    :model="form"
    :rules="rules"
    label-width="auto">
    <cs-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"/>

    <el-divider>基础设置</el-divider>

    <el-form-item
      :label="form.name.description"
      prop="name">
      <el-input
        v-model="form.name.value"
        :placeholder="form.name.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.title.description"
      prop="title">
      <el-input
        v-model="form.title.value"
        :placeholder="form.title.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.keywords.description"
      prop="keywords">
      <el-input
        v-model="form.keywords.value"
        :placeholder="form.keywords.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.description.description"
      prop="description">
      <el-input
        v-model="form.description.value"
        :placeholder="form.description.description"
        type="textarea"
        :rows="5"/>
    </el-form-item>

    <el-form-item
      :label="form.logo.description"
      prop="logo">
      <el-input
        v-model="form.logo.value"
        :placeholder="form.logo.description"
        clearable>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg()"
          icon="el-icon-upload"></el-button>
      </el-input>
    </el-form-item>

    <el-divider>备案许可</el-divider>

    <el-form-item
      :label="form.miitbeian.description"
      prop="miitbeian">
      <el-input
        v-model="form.miitbeian.value"
        :placeholder="form.miitbeian.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.miitbeian_url.description"
      prop="miitbeian_url">
      <el-input
        v-model="form.miitbeian_url.value"
        :placeholder="form.miitbeian_url.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.miitbeian_ico.description"
      prop="miitbeian_ico">
      <el-input
        v-model="form.miitbeian_ico.value"
        :placeholder="form.miitbeian_ico.description"
        clearable>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg()"
          icon="el-icon-upload"></el-button>
      </el-input>
    </el-form-item>

    <el-form-item
      :label="form.beian.description"
      prop="beian">
      <el-input
        v-model="form.beian.value"
        :placeholder="form.beian.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.beian_url.description"
      prop="beian_url">
      <el-input
        v-model="form.beian_url.value"
        :placeholder="form.beian_url.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.beian_ico.description"
      prop="beian_ico">
      <el-input
        v-model="form.beian_ico.value"
        :placeholder="form.beian_ico.description"
        clearable>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg()"
          icon="el-icon-upload"></el-button>
      </el-input>
    </el-form-item>

    <el-divider>状态设置</el-divider>

    <el-form-item
      :label="form.open_index.description"
      prop="open_index">
      <el-switch
        v-model="form.open_index.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-form-item>

    <el-form-item
      :label="form.open_mobile.description"
      prop="open_mobile">
      <el-switch
        v-model="form.open_mobile.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-form-item>

    <el-form-item
      :label="form.open_api.description"
      prop="open_api">
      <el-switch
        v-model="form.open_api.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-form-item>

    <el-form-item
      :label="form.close_reason.description"
      prop="close_reason">
      <el-input
        v-model="form.close_reason.value"
        :placeholder="form.close_reason.description"
        clearable/>
    </el-form-item>

    <el-divider>其他设置</el-divider>

    <el-form-item
      :label="form.withdraw_fee.description"
      prop="withdraw_fee">
      <el-input-number
        v-model="form.withdraw_fee.value"
        controls-position="right"
        :precision="2"
        :step="0.1"
        :min="0"
        :max="100"/>
    </el-form-item>

    <el-form-item
      :label="form.weixin_url.description"
      prop="weixin_url">
      <el-input
        v-model="form.weixin_url.value"
        :placeholder="form.weixin_url.description"
        clearable/>
    </el-form-item>

    <el-form-item
      :label="form.qrcode_logo.description"
      prop="qrcode_logo">
      <el-input
        v-model="form.qrcode_logo.value"
        :placeholder="form.qrcode_logo.description"
        clearable>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg()"
          icon="el-icon-upload"></el-button>
      </el-input>
    </el-form-item>

    <el-form-item
      :label="form.third_count.description"
      prop="third_count">
      <el-input
        v-model="form.third_count.value"
        :placeholder="form.third_count.description"
        type="textarea"
        :rows="8"/>
    </el-form-item>

    <el-form-item size="small">
      <el-button type="primary" :loading="loading" @click="() => {}">保存</el-button>
      <el-button @click="() => {}">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from '@/utils/util'
import { getSettingList } from '@/api/config/setting'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  data() {
    return {
      loading: false,
      form: null,
      rules: {}
    }
  },
  filters: {
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val, 'link_image')
    }
  },
  methods: {
    // 获取上传文件
    _getUploadFileList(files) {
      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      this.form.logo.value = document.location.protocol
      this.form.logo.value += '//'
      this.form.logo.value += response.data[0].url
    },
    // 获取配置信息
    getFormData() {
      return getSettingList('system_info')
    },
    // 设置配置数据
    setFormData(val) {
      this.form = val
    }
  }
}
</script>
