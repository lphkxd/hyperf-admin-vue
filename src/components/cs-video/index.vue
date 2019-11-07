<template>
  <div id="vueVideoPlayer">
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
    </video-player>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import VueVideoPlayer from 'vue-video-player'

export default {
  name: 'vueVideoPlayer'
}
</script>
