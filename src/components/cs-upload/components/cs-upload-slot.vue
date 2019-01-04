<template>
  <div class="upload-control" @click="visible = true">
    <slot name="control"/>
    <el-dialog
      width="400px"
      :before-close="handleClose"
      :visible.sync="visible"
      :append-to-body="true">

      <el-upload
        ref="upload"
        list-type="text"
        :action="uploadUrl"
        :data="params"
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
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将资源拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">{{uploadTip}}大小不能超过 {{this.token.file_size}}</div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="handleClose"
          size="small">取消</el-button>

        <el-button
          @click="handleConfirm"
          type="primary"
          size="small">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true">
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
      default: '请选择资源进行(支持拖拽)上传，'
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      required: false,
      default: true
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
      default: true
    },
    // 接受上传的文件类型
    accept: {
      type: String,
      required: false,
      default: ''
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
      visible: false
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$refs.upload && this.$refs.upload.clearFiles()
    },
    handleConfirm() {
      this.$emit('confirm')
      this.handleClose()
    }
  }
}
</script>

<style scoped>
  .upload-control {
    width: auto;
    display: inline-block !important;
  }
</style>
