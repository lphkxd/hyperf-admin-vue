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
        <template slot="prepend" v-if="form.logo.value">
          <el-popover
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image :src="form.logo.value | getPreviewUrl"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('logo')"
          icon="el-icon-upload"/>
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
        <template slot="prepend" v-if="form.miitbeian_ico.value">
          <el-popover
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image :src="form.miitbeian_ico.value | getPreviewUrl"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('miitbeian_ico')"
          icon="el-icon-upload"/>
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
        <template slot="prepend" v-if="form.beian_ico.value">
          <el-popover
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image :src="form.beian_ico.value | getPreviewUrl"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('beian_ico')"
          icon="el-icon-upload"/>
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

    <el-divider>定义平台</el-divider>

    <el-form-item
      v-for="(platform, index) in platforms"
      :label="`${form.platform.description}${index}`"
      :key="`platform_${index}`">

      <el-input
        class="dynamic-platform-key"
        v-model="platforms[index].key"
        placeholder="序列值"
        clearable/>

      <el-input
        class="dynamic-platform-value"
        v-model="platforms[index].value"
        placeholder="平台名称"
        clearable/>

      <el-button
        v-if="platforms.length > 1"
        type="text"
        @click.prevent="removePlatform(platform)">删除</el-button>
    </el-form-item>

    <el-form-item size="small">
      <el-button @click="() => {}">新增平台</el-button>
    </el-form-item>

    <el-divider>跨域访问</el-divider>

    <el-form-item
      v-for="(domain, index) in domains"
      :label="`${form.allow_origin.description}${index}`"
      :key="`domain_${index}`">
      <el-input
        class="dynamic-domain"
        v-model="domains[index]"
        placeholder="域名地址(* 表示全部域名)"
        clearable/>

      <el-button
        v-if="domains.length > 1"
        type="text"
        @click.prevent="domains.splice(index, 1)">删除</el-button>
    </el-form-item>

    <el-form-item size="small">
      <el-button @click="domains.push('')">新增域名</el-button>
    </el-form-item>

    <el-divider>其他设置</el-divider>

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
        <template slot="prepend" v-if="form.qrcode_logo.value">
          <el-popover
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image :src="form.qrcode_logo.value | getPreviewUrl"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('qrcode_logo')"
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
      <el-button
        type="primary"
        :loading="loading"
        @click="handleFormSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from '@/utils/util'
import { getSettingList, setSystemList } from '@/api/config/setting'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  data() {
    return {
      loading: false,
      form: null,
      rules: {},
      domains: [],
      platforms: []
    }
  },
  filters: {
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val)
    }
  },
  methods: {
    // 获取上传文件
    _getUploadFileList(files, source) {
      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      this.form[source].value = ''
      if (source === 'qrcode_logo') {
        this.form[source].value += document.location.protocol
        this.form[source].value += '//'
      }

      this.form[source].value += response.data[0].url
    },
    // 获取配置信息
    getFormData() {
      return getSettingList('system_info')
    },
    // 设置配置数据
    setFormData(val) {
      this.form = val
      this.platforms = []
      this.domains = [...this.form.allow_origin.value]

      this.form.platform.value.forEach((value, index) => {
        this.platforms.push({
          'key': index,
          'value': value
        })
      })

      if (!this.domains.length) {
        this.domains = ['']
      }

      if (!this.platforms.length) {
        this.platforms = [{ 'key': 0, 'value': '' }]
      }
    },
    // 确定修改
    handleFormSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.loading = true
          console.log(this.form)
          console.log(this.domains)
        }
      })
    }
  }
}
</script>

<style scoped>
  .popover-image {
    text-align: center;
  }
  .popover-image >>> img {
    vertical-align: middle;
  }
  .dynamic-domain {
    margin-right: 10px;
    width: 320px;
  }
  .dynamic-platform-key {
    margin-right: 10px;
    width: 120px;
  }
  .dynamic-platform-value {
    margin-right: 10px;
    width: 200px;
  }
</style>
