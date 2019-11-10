<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <div v-if="dialogVisible" class="image">
      <el-image :src="dialogImageUrl" fit="fill" @click.native="$open(dialogImageUrl)"/>
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
    getImageUrl(image) {
      let result = []
      if (Array.isArray(image)) {
        // eslint-disable-next-line no-unused-vars
        for (let item of image) {
          result.push(this.checkUrl(item))
        }
      } else {
        result.push(this.checkUrl(image))
      }

      return result
    },
    checkUrl(url) {
      const blob = /^(blob)[^\s]+/
      const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/

      if (!blob.test(url) && !reg.test(url)) {
        return document.location.protocol + '//' + url
      }

      return url
    },
    show(image) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.dialogImageUrl = Array.isArray(image) ? image[0] : image
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
