<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
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
  name: 'cs-single',
  mixins: [
    upload
  ],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 删除资源
    handleRemove(file, fileList) {
      const response = file.response.data
      if (response) {
        this.removeStorage(response.storage_id)
      }
    },
    // 资源预览
    handlePictureCardPreview(file) {
      const response = file.response.data
      if (response && response.type === 0) {
        this.dialogVisible = true
        this.dialogImageUrl = file.url
        return
      }

      this.$message.error('上传未完成或资源不可预览')
    }
  }
}
</script>
