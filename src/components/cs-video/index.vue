<template>
  <video-player
    class="video-player vjs-custom-skin"
    ref="videoPlayer"
    :playsinline="true"
    :options="playerOptions">
  </video-player>
</template>

<script>
import 'video.js/dist/lang/zh-CN'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import util from '@/utils/util'

export default {
  name: 'cs-video',
  props: {
    // 视频海报
    poster: {
      type: String,
      required: false,
      default: ''
    },
    // 播放路径
    src: {
      type: String,
      required: false,
      default: ''
    },
    // 播放类型
    mime: {
      type: String,
      required: false,
      default: ''
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否静音
    muted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: this.autoplay,
        muted: this.muted,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: this.src ? [{ type: this.mime, src: this.src }] : [],
        poster: this.poster,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    }
  },
  methods: {
    checkUrl(url) {
      if (url) {
        const blob = /^(blob)[^\s]+/
        const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/

        if (!blob.test(url) && !reg.test(url)) {
          return document.location.protocol + '//' + url
        }
      }

      return url
    },
    // 更换视频源
    setSources(sources) {
      this.playerOptions.poster = sources['cover'] ? util.getImageStyleUrl(sources['cover']) : ''
      this.playerOptions.sources = [{ src: this.checkUrl(sources['url']), type: sources['mime'] }]
    },
    // 移除视频源
    delSources() {
      this.playerOptions.poster = ''
      this.playerOptions.sources = [{}]
    }
  }
}
</script>
