<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="close">
    <div class="image">
      <el-image :src="dialogImageUrl" @click.native="$open(dialogImageUrl)"/>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    showImagePreview(imageUrl = '') {
      const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      if (!reg.test(imageUrl)) {
        imageUrl = document.location.protocol + '//' + imageUrl
      }

      this.$nextTick(() => {
        this.dialogVisible = true
        this.dialogImageUrl = imageUrl
      })
    },
    close() {
      this.dialogVisible = false
      this.dialogImageUrl = ''
    }
  }
}
</script>

<style scoped>
  .image {
    text-align: center;
  }
  .image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
</style>
