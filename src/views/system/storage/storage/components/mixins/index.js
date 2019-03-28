import util from '@/utils/util'
import { getHelpRouter } from '@/api/index/help'

export default {
  filters: {
    // 获取图片缩略图
    getImageThumb(url) {
      return util.getImageCodeUrl(url, 'storage_lists')
    }
  },
  methods: {
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    }
  }
}
