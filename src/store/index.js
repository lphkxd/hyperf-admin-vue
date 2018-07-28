import Vue from 'vue'
import Vuex from 'vuex'

import careyshop from './modules/careyshop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    careyshop
  }
})
