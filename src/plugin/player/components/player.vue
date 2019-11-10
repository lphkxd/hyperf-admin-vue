<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <div v-if="dialogVisible" class="player">
      <cs-video :src="dialogVideoUrl" :mime="dialogVideoMime"/>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'player',
  components: {
    'csVideo': () => import('@/components/cs-video')
  },
  data() {
    return {
      dialogVisible: false,
      dialogVideoUrl: '',
      dialogVideoMime: ''
    }
  },
  methods: {
    checkUrl(url) {
      const blob = /^(blob)[^\s]+/
      const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/

      if (!blob.test(url) && !reg.test(url)) {
        return document.location.protocol + '//' + url
      }

      return url
    },
    show(url, mime) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.dialogVideoUrl = this.checkUrl(url)
        this.dialogVideoMime = mime
      })
    },
    close() {
      this.dialogVisible = false
      this.dialogVideoUrl = ''
      this.dialogVideoMime = ''
    }
  }
}
</script>
