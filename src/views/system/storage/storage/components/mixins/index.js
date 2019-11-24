import util from '@/utils/util'
import { union, xor, remove } from 'lodash'

export default {
  data() {
    return {
      isCheckDirectory: true
    }
  },
  filters: {
    // 获取图片缩略图
    getImageThumb(val) {
      let imageUrl = 'image/storage/file.png'
      switch (val['type']) {
        case 0:
          imageUrl = val['url'] ? util.getImageCodeUrl(val['url'], 'storage_lists') : ''
          break

        case 2:
          if (val['cover']) {
            imageUrl = util.getImageCodeUrl(val['cover'], 'storage_lists')
          } else {
            imageUrl = val['is_default'] ? 'image/storage/default.png' : 'image/storage/folder.png'
          }
          break

        case 3:
          if (val['cover']) {
            imageUrl = util.getImageCodeUrl(val['cover'], 'storage_lists')
          } else {
            imageUrl = 'image/storage/video.png'
          }
          break
      }

      return imageUrl
    },
    // 获取资源类型图标
    getFileTypeIocn(val) {
      switch (val) {
        case 0:
          return 'file-photo-o'

        case 1:
          return 'file-o'

        case 2:
          return 'folder-o'

        case 3:
          return 'file-video-o'
      }

      return 'question'
    }
  },
  methods: {
    // 获取当前页所有资源编号
    _getStorageIdList() {
      let checkList = []
      // eslint-disable-next-line no-unused-vars
      for (const value of this.currentTableData) {
        if (!this.isCheckDirectory) {
          if (value.type === 2) {
            continue
          }
        }

        checkList.push(value.storage_id)
      }

      return checkList
    },
    // 全部选择
    allCheckBox() {
      this.checkList = union(this.checkList, this._getStorageIdList())
    },
    // 反向选择
    reverseCheckBox() {
      this.checkList = xor(this.checkList, this._getStorageIdList())
    },
    // 取消选择
    cancelCheckBox() {
      let checkList = this._getStorageIdList()
      let currentCheckList = [...this.checkList]

      remove(currentCheckList, (item) => {
        return checkList.indexOf(item) !== -1
      })

      this.checkList = currentCheckList
    }
  }
}
