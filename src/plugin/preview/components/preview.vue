<template>
  <el-dialog :visible.sync="dialogVisible" :append-to-body="true" @close="close">
    <div style="text-align: center;">
      <el-image class="image" :src="dialogImageUrl" @click.native="$open(dialogImageUrl)"/>
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
    vertical-align: middle;
    cursor: pointer;
  }
</style>
