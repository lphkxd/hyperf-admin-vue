<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
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
        :clearable="true"/>
      <div class="help-block" v-html="form.name.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.title.description"
      prop="title">
      <el-input
        v-model="form.title.value"
        :placeholder="form.title.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.title.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.keywords.description"
      prop="keywords">
      <el-input
        v-model="form.keywords.value"
        :placeholder="form.keywords.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.keywords.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.description.description"
      prop="description">
      <el-input
        v-model="form.description.value"
        :placeholder="form.description.description"
        type="textarea"
        :rows="5"/>
      <div class="help-block" v-html="form.description.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.logo.description"
      prop="logo">
      <el-input
        v-model="form.logo.value"
        :placeholder="form.logo.description"
        :clearable="true">
        <template slot="prepend">
          <el-popover
            v-if="form.logo.value"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="form.logo.value | getPreviewUrl"
                @click.native="$preview(form.logo.value)"
                fit="fill"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('logo')">
          <cs-icon name="upload"/>
        </el-button>
      </el-input>
      <div class="help-block" v-html="form.logo.help_text"></div>
    </el-form-item>

    <el-divider>备案许可</el-divider>

    <el-form-item
      :label="form.miitbeian.description"
      prop="miitbeian">
      <el-input
        v-model="form.miitbeian.value"
        :placeholder="form.miitbeian.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.miitbeian.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.miitbeian_url.description"
      prop="miitbeian_url">
      <el-input
        v-model="form.miitbeian_url.value"
        :placeholder="form.miitbeian_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.miitbeian_url.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.miitbeian_ico.description"
      prop="miitbeian_ico">
      <el-input
        v-model="form.miitbeian_ico.value"
        :placeholder="form.miitbeian_ico.description"
        :clearable="true">
        <template slot="prepend">
          <el-popover
            v-if="form.miitbeian_ico.value"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="form.miitbeian_ico.value | getPreviewUrl"
                @click.native="$preview(form.miitbeian_ico.value)"
                fit="fill"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('miitbeian_ico')">
          <cs-icon name="upload"/>
        </el-button>
      </el-input>
      <div class="help-block" v-html="form.miitbeian_ico.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.beian.description"
      prop="beian">
      <el-input
        v-model="form.beian.value"
        :placeholder="form.beian.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.beian.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.beian_url.description"
      prop="beian_url">
      <el-input
        v-model="form.beian_url.value"
        :placeholder="form.beian_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.beian_url.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.beian_ico.description"
      prop="beian_ico">
      <el-input
        v-model="form.beian_ico.value"
        :placeholder="form.beian_ico.description"
        :clearable="true">
        <template slot="prepend">
          <el-popover
            v-if="form.beian_ico.value"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="form.beian_ico.value | getPreviewUrl"
                @click.native="$preview(form.beian_ico.value)"
                fit="fill"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
        </template>
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('beian_ico')">
          <cs-icon name="upload"/>
        </el-button>
      </el-input>
      <div class="help-block" v-html="form.beian_ico.help_text"></div>
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
      <div class="help-block" v-html="form.open_index.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.open_mobile.description"
      prop="open_mobile">
      <el-switch
        v-model="form.open_mobile.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
      <div class="help-block" v-html="form.open_mobile.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.open_api.description"
      prop="open_api">
      <el-switch
        v-model="form.open_api.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
      <div class="help-block" v-html="form.open_api.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.close_reason.description"
      prop="close_reason">
      <el-input
        v-model="form.close_reason.value"
        :placeholder="form.close_reason.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.close_reason.help_text"></div>
    </el-form-item>

    <el-divider>定义平台</el-divider>

    <el-form-item
      v-for="(platform, index) in platforms"
      :label="`${form.platform.description}${index}`"
      :key="`platform_${index}`">

      <el-input
        class="dynamic-platform-key"
        v-model="platform.key"
        placeholder="序列值"
        :clearable="true"/>

      <el-input
        class="dynamic-platform-value"
        v-model="platform.value"
        placeholder="平台名称"
        :clearable="true"/>

      <el-button
        v-if="platforms.length > 1"
        size="small"
        type="text"
        @click.prevent="platforms.splice(index, 1)">删除</el-button>
    </el-form-item>

    <el-form-item size="small">
      <el-button @click="platforms.push({'key': null, 'value': ''})">新增平台</el-button>
      <div class="help-block" v-html="form.platform.help_text"></div>
    </el-form-item>

    <el-divider>跨域访问</el-divider>

    <el-form-item
      v-for="(domain, index) in form.allow_origin.value"
      :label="`${form.allow_origin.description}${index}`"
      :key="`domain_${index}`">
      <el-input
        class="dynamic-domain"
        v-model="form.allow_origin.value[index]"
        placeholder="域名地址"
        :clearable="true"/>

      <el-button
        v-if="form.allow_origin.value.length > 1"
        size="small"
        type="text"
        @click.prevent="form.allow_origin.value.splice(index, 1)">删除</el-button>
    </el-form-item>

    <el-form-item size="small">
      <el-button @click="form.allow_origin.value.push('')">新增域名</el-button>
      <div class="help-block" v-html="form.allow_origin.help_text"></div>
    </el-form-item>

    <el-divider>其他设置</el-divider>

    <el-form-item
      :label="form.weixin_url.description"
      prop="weixin_url">
      <el-input
        v-model="form.weixin_url.value"
        :placeholder="form.weixin_url.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.weixin_url.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.qrcode_logo.description"
      prop="qrcode_logo">
      <el-input
        v-model="form.qrcode_logo.value"
        :placeholder="form.qrcode_logo.description"
        :clearable="true">
        <el-button
          slot="append"
          @click="$refs.upload.handleUploadDlg('qrcode_logo')">
          <cs-icon name="upload"/>
        </el-button>
      </el-input>
      <div class="help-block" v-html="form.qrcode_logo.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.third_count.description"
      prop="third_count">
      <el-input
        v-model="form.third_count.value"
        :placeholder="form.third_count.description"
        type="textarea"
        :rows="8"/>
      <div class="help-block" v-html="form.third_count.help_text"></div>
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
import { setSystemList } from '@/api/config/setting'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  data() {
    return {
      loading: false,
      form: null,
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
      if (!files.length) {
        return
      }

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
    // 设置配置数据
    setFormData(val) {
      this.form = val
      this.platforms = []

      // eslint-disable-next-line no-unused-vars
      for (const key in this.form.platform.value) {
        if (this.form.platform.value.hasOwnProperty(key)) {
          this.platforms.push({
            'key': key,
            'value': this.form.platform.value[key]
          })
        }
      }

      if (!this.form.allow_origin.value.length) {
        this.form.allow_origin.value = ['']
      }

      if (!this.platforms.length) {
        this.platforms = [{ 'key': null, 'value': '' }]
      }
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

      let platform = {}
      // eslint-disable-next-line no-unused-vars
      for (const item of this.platforms) {
        platform[item.key] = item.value
      }

      this.loading = true
      data['platform'] = JSON.stringify(platform)

      setSystemList(data)
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

<style scoped>
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
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
    width: 190px;
  }
</style>
