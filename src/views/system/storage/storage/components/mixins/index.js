import util from '@/utils/util'

export default {
  filters: {
    // 获取图片缩略图
    getImageThumb(val) {
      let imageUrl = null
      switch (val['type']) {
        case 0:
          imageUrl = util.getImageCodeUrl(val['url'], 'storage_lists')
          break

        case 1:
          imageUrl = 'image/storage/file.png'
          break

        case 2:
          if (val['cover']) {
            imageUrl = util.getImageCodeUrl(val['cover'], 'storage_lists')
          } else {
            imageUrl = val['is_default'] ? 'image/storage/default.png' : 'image/storage/folder.png'
          }
          break
      }

      return imageUrl
    }
  },
  methods: {
    // 切换目录
    switchFolder(storageId) {
      this.$emit('refresh', storageId, true)
    }
  }
}
