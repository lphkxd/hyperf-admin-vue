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

      const response = file.response.data[0]
      if (response && response.storage_id) {
        this.removeStorage(response.storage_id)
      }
    },
    // 资源预览
    handlePreview(file) {
      if (file.status === 'success') {
        const response = file.response.data[0]
        if (response && response.type === 0) {
          this.dialogVisible = true
          this.dialogImageUrl = file.url
          return
        }
      }

      this.$message.warning('正在上传或资源不可预览')
    }
  }
}
</script>
