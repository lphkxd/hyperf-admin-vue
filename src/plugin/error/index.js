import store from '@/store'
import util from '@/utils/util'

export default {
  install(Vue, options) {
    Vue.config.errorHandler = (error, instance, info) => {
      Vue.nextTick(() => {
        // store 追加 log
        store.dispatch('careyshop/log/push', {
          message: `${info}: ${error.message}`,
          type: 'danger',
          meta: {
            error,
            instance
          }
        })

        // 只在开发模式下打印 log
        if (process.env.NODE_ENV === 'development') {
          util.log.capsule('CareyShop', 'ErrorHandler', 'danger')
          util.log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          util.log.danger('>>>>>> Vue 实例 >>>>>>')
          console.log(instance)
          util.log.danger('>>>>>> Error >>>>>>')
          console.log(error)
        }
      })
    }
  }
}
