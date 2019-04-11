<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <a v-if="dialogImageUrl" :href="dialogImageUrl" target="_blank">
      <img class="image" :src="dialogImageUrl" alt="">
    </a>
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
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
</style>
