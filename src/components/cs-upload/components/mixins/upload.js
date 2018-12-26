import { getUploadToken } from '@/api/upload/upload'
import { delStorageList } from '@/api/upload/storage'
import util from '@/utils/util'

export default {
  data() {
    return {
      token: {},
      params: {},
      uploadUrl: ''
    }
  },
  mounted() {
    getUploadToken()
      .then(res => {
        this.token = res.data ? res.data : {}
        this.uploadUrl = this.token.token.upload_url.upload_url
      })
  },
  methods: {
    // 批量删除资源
    removeStorage(storage_id) {
      delStorageList(Array.isArray(storage_id) ? storage_id : [storage_id])
    },
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      if (!this.token || !this.uploadUrl) {
        this.$message.error('上传组件初始化中或配置错误')
        return false
      }

      const fielMaxSize = util.stringToByte(this.token['file_size'])
      if (file.size > fielMaxSize) {
        this.$message.error(`上传资源大小不能超过 ${this.token['file_size']}`)
        return false
      }

      let suffix = file.name.toLowerCase().split('.').splice(-1)
    }
  }
}
