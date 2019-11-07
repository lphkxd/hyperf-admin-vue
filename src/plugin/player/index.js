import PlayerComponent from './components/player'

export default {
  install(Vue, options) {
    const PlayerConstructor = Vue.extend(PlayerComponent)
    const player = new PlayerConstructor()

    player.$mount(player.$el)
    Vue.prototype.$player = function(url, mime = 'video/*') {
      player.show(url, mime)
    }
  }
}
