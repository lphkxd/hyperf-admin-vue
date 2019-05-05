<template>
  <el-dialog :visible.sync="dialogVisible" :append-to-body="true" @close="close">
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
