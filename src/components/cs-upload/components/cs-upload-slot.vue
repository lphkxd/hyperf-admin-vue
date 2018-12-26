<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :data="params"
      :file-list="fileList"
      :list-type="listType"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload">
      <i class="el-icon-plus"></i>
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
    // 文件列表的类型
    listType: {
      type: String,
      required: false,
      default: 'picture-card'
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
    handleRemove(file/** , fileList**/) {
      if (file.status !== 'success') {
        return
      }

      const response = file.response.data
      if (response && response[0].storage_id) {
        this.removeStorage(response[0].storage_id)
      }
    },
    // 资源预览
    handlePreview(file) {
      const response = file.response.data
      if (file.status === 'success' && response) {
        if (response[0].type === 0) {
          this.dialogVisible = true
          this.dialogImageUrl = file.url
          return
        }
      }

      this.$message.warning('上传尚未完成或资源不可预览')
    }
  }
}
</script>
