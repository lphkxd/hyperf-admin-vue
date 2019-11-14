<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <div v-if="dialogVisible" class="player">
      <cs-video :src="dialogVideoUrl" :mime="dialogVideoMime" :poster="dialogVidePoster"/>
    </div>
  </el-dialog>
</template>

<script>
import util from '@/utils/util'

export default {
  name: 'player',
  components: {
    'csVideo': () => import('@/components/cs-video')
  },
  data() {
    return {
      dialogVisible: false,
      dialogVideoMime: '',
      dialogVideoUrl: '',
      dialogVidePoster: ''
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
    show(url, mime, poster) {
      this.$nextTick(() => {
        this.dialogVideoMime = mime
        this.dialogVideoUrl = this.checkUrl(url)
        this.dialogVidePoster = poster ? util.getImageStyleUrl(poster) : ''
        this.dialogVisible = true
      })
    },
    close() {
      this.dialogVisible = false
      this.dialogVideoMime = ''
      this.dialogVideoUrl = ''
      this.dialogVidePoster = ''
    }
  }
}
</script>
