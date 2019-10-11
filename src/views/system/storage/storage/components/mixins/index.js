import util from '@/utils/util'

export default {
  data() {
    return {
      isCheckDirectory: true
    }
  },
  filters: {
    // 获取图片缩略图
    getImageThumb(val) {
      let imageUrl = ''
      switch (val['type']) {
        case 0:
          imageUrl = val['url'] ? util.getImageCodeUrl(val['url'], 'storage_lists') : ''
          break

        case 1:
          imageUrl = 'image/storage/file.png'
          break

        case 2:
          if (val['cover']) {
            imageUrl = val['cover'] ? util.getImageCodeUrl(val['cover'], 'storage_lists') : ''
          } else {
            imageUrl = val['is_default'] ? 'image/storage/default.png' : 'image/storage/folder.png'
          }
          break
      }

      return imageUrl
    }
  },
  methods: {
    // 全部选择
    allCheckBox() {
      this.checkList = []
      // eslint-disable-next-line no-unused-vars
      for (const value of this.currentTableData) {
        if (!this.isCheckDirectory) {
          if (value.type === 2) {
            continue
          }
        }

        this.checkList.push(value.storage_id)
      }
    },
    // 反向选择
    reverseCheckBox() {
      let checkList = []
      // eslint-disable-next-line no-unused-vars
      for (const value of this.currentTableData) {
        if (!this.isCheckDirectory) {
          if (value.type === 2) {
            continue
          }
        }

        if (this.checkList.indexOf(value.storage_id) === -1) {
          checkList.push(value.storage_id)
        }
      }

      this.checkList = checkList
    },
    // 取消选择
    cancelCheckBox() {
      this.checkList = []
    }
  }
}
