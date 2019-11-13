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
      required: true,
      default: ''
    },
    // 播放类型
    mime: {
      type: String,
      required: true,
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
        sources: [{
          src: this.src,
          type: this.mime
        }],
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
    // 更换视频源
    setSources(src, mime, poster = '') {
      this.playerOptions.poster = poster
      this.playerOptions.sources = [{ src: src, type: mime }]
    }
  }
}
</script>
