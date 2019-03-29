import util from '@/utils/util'
import { getHelpRouter } from '@/api/index/help'

export default {
  filters: {
    // 获取图片缩略图
    getImageThumb(val) {
      let imageUrl = null
      switch (val.type) {
        case 0:
          imageUrl = util.getImageCodeUrl(val.url, 'storage_lists')
          break

        case 1:
          imageUrl = 'image/storage/file.png'
          break

        case 2:
          imageUrl = val.cover ? util.getImageCodeUrl(val.cover, 'storage_lists') : 'image/storage/folder.png'
          break
      }

      return imageUrl
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
