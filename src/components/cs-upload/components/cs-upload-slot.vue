<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :data="params"
      :file-list="fileList"
      :list-type="listType"
      :multiple="multiple"
      :show-file-list="showFileList"
      :drag="drag"
      :accept="accept"
      :limit="limit"
      :auto-upload="autoUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">{{uploadTip}}大小不能超过 {{this.token.file_size}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import upload from './mixins/upload'

export default {
  name: 'cs-upload-slot',
  mixins: [upload],
  props: {
    // 自定义信息
    uploadTip: {
      type: String,
      required: false,
      default: '请选择需要上传的资源，'
    },
    // 文件列表的类型
    listType: {
      type: String,
      required: false,
      default: 'picture-card'
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否显示已上传列表
    showFileList: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否开启拖拽上传
    drag: {
      type: Boolean,
      required: false,
      default: false
    },
    // 接受上传的文件类型
    accept: {
      type: String,
      required: false,
      default: 'image/*'
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      required: false,
      default: 0
    },
    // 是否选取后立即上传
    autoUpload: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传的文件列表
      fileList: []
    }
  },
  methods: {
    // 删除资源
    handleRemove(file, fileList) {
      if (file.status === 'success' && file.response) {
        const response = file.response.data
        if (response && response[0].storage_id) {
          this.removeStorage(response[0].storage_id)
        }
      }

      // 更新本地列表
      this.fileList = fileList
    },
    // 资源预览
    handlePreview(file) {
      if (file.status === 'success') {
        let imgObj = new Image()
        imgObj.src = file.url

        if (imgObj.fileSize > 0 || (imgObj.width > 0 && imgObj.height > 0)) {
          this.dialogVisible = true
          this.dialogImageUrl = file.url
          return
        }
      }

      this.$message.warning('该资源不支持预览')
    }
  }
}
</script>
