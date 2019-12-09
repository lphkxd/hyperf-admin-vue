import PlayerComponent from './components/player'
import videojs from 'vue-video-player'

export default {
  install(Vue, options) {
    const PlayerConstructor = Vue.extend(PlayerComponent)
    const player = new PlayerConstructor()

    player.$mount(player.$el)
    Vue.prototype.$player = (url, mime, poster = '') => {
      player.show(url, mime, poster)
    }

    Vue.use(videojs)
    window.videojs = videojs.videojs
  }
}
