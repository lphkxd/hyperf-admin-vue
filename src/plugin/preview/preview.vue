<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <img v-if="dialogImageUrl" width="100%" :src="dialogImageUrl" alt="">
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
