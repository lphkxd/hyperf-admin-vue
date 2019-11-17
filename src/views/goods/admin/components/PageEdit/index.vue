<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{stateMap[state]}}</span>
      </div>

      <el-form
        ref="form"
        :model="currentForm"
        label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础设置" name="basic">
            基础设置
          </el-tab-pane>

          <el-tab-pane label="规格属性" name="type">
            规格属性
          </el-tab-pane>

          <el-tab-pane label="媒体设置" name="photo">
            <el-form-item
              label="商品相册"
              prop="attachment">
              <cs-photo v-model="currentForm.attachment">
                <template slot="upload">
                  <div
                    v-if="!currentForm.attachment.length"
                    tabindex="0"
                    style="margin-bottom: 8px;"
                    class="el-upload el-upload--picture-card"
                    @click="handleUpload(_getAttachmentFileList, 'photo', 'upload')">
                    <cs-icon name="image"/>
                  </div>
                </template>
              </cs-photo>

              <el-button
                @click="handleStorage(_getAttachmentFileList, [0, 2])"
                size="small">
                <cs-icon name="inbox"/>
                资源选择
              </el-button>

              <el-button
                @click="handleUpload(_getAttachmentFileList, 'photo', 'upload')"
                size="small">
                <cs-icon name="upload"/>
                上传图片
              </el-button>

              <div class="help-block">
                <span>第一张图片将作为商品主图，拖动可调整图片位置，建议图片尺寸800x800</span>
              </div>
            </el-form-item>

            <el-form-item
              label="视频上传"
              prop="video">
              <cs-video
                ref="goodsVideo"
                class="input-video"
                :mime="currentForm.video.mime"
                :src="currentForm.video.url"
                :poster="currentForm.video.cover">
              </cs-video>

              <el-button
                @click="handleStorage(_getVideoFileList, [2, 3])"
                size="small">
                <cs-icon name="inbox"/>
                资源选择
              </el-button>

              <el-button
                @click="handleUpload(_getVideoFileList, 'video', 'upload')"
                size="small">
                <cs-icon name="upload"/>
                上传视频
              </el-button>

              <el-button
                v-if="currentForm.video.url"
                @click="delVideoFile"
                size="small">
                <cs-icon name="trash"/>
                删除
              </el-button>

              <div class="help-block">
                <span>推荐使用mp4格式的视频，同时也支持ogg、webm等格式的视频</span>
              </div>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品详情" name="detail">
            <el-form-item
              label="详情描述"
              prop="content">
              <cs-tinymce
                ref="tinymce"
                v-model="currentForm.content"
                code="inside_content"
                :height="450"/>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="积分结算" name="integral">
            <el-form-item
              label="结算方式"
              prop="integral_type">
              <el-radio-group v-model="currentForm.integral_type">
                <el-radio :label="0">按百分比</el-radio>
                <el-radio :label="1">按固定值</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="赠送分值"
              prop="give_integral">
              <el-input-number
                v-model="currentForm.give_integral"
                :precision="currentForm.integral_type ? 0 : 2"
                :max="currentForm.integral_type ? undefined : 100"
                :min="0"
                controls-position="right"/>

              <div class="help-block">
                <span v-if="currentForm.integral_type">按赠送分值设定的值固定赠送积分，赠送分值需大于等于0</span>
                <span v-else>按实际支付金额百分比赠送，赠送分值的范围是0 ~ 100</span>
              </div>
            </el-form-item>

            <el-form-item
              label="可抵扣额"
              prop="is_integral">
              <el-input-number
                v-model="currentForm.is_integral"
                :min="0"
                controls-position="right"/>
              <div class="help-block">
                <span>商品最多允许抵扣多少积分，0为不可使用</span>
              </div>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <cs-storage
      ref="storage"
      style="display: none"
      @confirm="storageCallback">
    </cs-storage>

    <cs-upload
      style="display: none"
      ref="upload"
      type="slot"
      :multiple="uploadConfig.multiple"
      :accept="uploadConfig.accept"
      :limit="uploadConfig.limit"
      @confirm="uploadCallback">
    </cs-upload>
  </div>
</template>

<script>
// import util from '@/utils/util'
// import { mapActions } from 'vuex'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage'),
    'csTinymce': () => import('@/components/cs-tinymce'),
    'csVideo': () => import('@/components/cs-video'),
    'csPhoto': () => import('@/components/cs-photo')
  },
  props: {
    confirmLoading: {
      default: false
    },
    state: {
      type: String,
      required: true,
      default: 'create'
    }
  },
  data() {
    return {
      loading: false,
      activeName: 'basic',
      stateMap: {
        create: '新增商品',
        update: '编辑商品'
      },
      storageCallback: '',
      uploadCallback: '',
      uploadConfig: {},
      currentForm: {
        goods_category_id: [],
        name: '',
        short_name: '',
        product_name: '',
        goods_code: '',
        goods_spu: '',
        goods_sku: '',
        bar_code: '',
        brand_id: [],
        store_qty: 0,
        market_price: 0,
        shop_price: 0,
        integral_type: 0,
        give_integral: 0,
        is_integral: 0,
        least_sum: 0,
        purchase_sum: 0,
        keywords: '',
        description: '',
        content: '',
        attachment: [],
        video: {},
        unit: '',
        is_recommend: 0,
        is_new: 0,
        is_hot: 0,
        goods_type_id: undefined,
        sort: 50,
        status: 1,
        goods_attr_item: [],
        goods_spec_item: [],
        spec_image: [],
        is_postage: 0,
        measure: 0,
        measure_type: undefined
      },
      rules: {
      }
    }
  },
  methods: {
    // 确认新增或修改
    handleConfirm() {
      console.log(this.currentForm)
    },
    // 打开资源选择框
    handleStorage(callback, type = []) {
      this.storageCallback = callback
      this.$refs.storage.storageType = type
      this.$refs.storage.handleStorageDlg()
    },
    // 打开上传对话框
    handleUpload(callback, type, source) {
      if (type === 'video') {
        this.uploadConfig = {
          accept: 'video/*',
          multiple: false,
          limit: 1
        }
      }

      if (type === 'photo') {
        this.uploadConfig = {
          accept: 'image/*',
          multiple: true,
          limit: 0
        }
      }

      this.uploadCallback = callback
      this.$refs.upload.handleUploadDlg(source)
    },
    // 筛选过滤选择的资源
    _getFileList(files, source) {
      if (!source) {
        return files
      }

      let fileList = []
      for (const value of files) {
        if (value.status !== 'success') {
          continue
        }

        const response = value.response
        if (!response || response.status !== 200) {
          continue
        }

        if (response.data) {
          fileList.push(response.data[0])
        }
      }

      return fileList
    },
    // 获取视频选择资源
    _getVideoFileList(files, source) {
      if (!files.length) {
        return
      }

      const fileList = this._getFileList(files, source)

      // eslint-disable-next-line no-unused-vars
      for (const value of fileList) {
        if (value.type === 3) {
          this.currentForm.video = {
            url: value.url,
            mime: value.mime,
            cover: value.cover
          }

          this.$refs.goodsVideo.setSources(this.currentForm.video)
          break
        }
      }
    },
    // 清除视频资源
    delVideoFile() {
      this.currentForm.video = {}
      this.$refs.goodsVideo.delSources()
    },
    // 获取商品相册资源
    _getAttachmentFileList(files, source) {
      if (!files.length) {
        return
      }

      const fileList = this._getFileList(files, source)
      fileList.forEach(value => {
        this.currentForm.attachment.push({
          name: value.name,
          source: value.url,
          url: '//' + value.url
        })
      })
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }
  .input-video {
    width: 350px;
    margin-bottom: 10px;
  }
  .help-block {
    color: #909399;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
</style>
