import { getUploadToken } from '@/api/upload/upload'
import { delStorageList } from '@/api/upload/storage'

export default {
  data() {
    return {
      token: {},
      uploadUrl: ''
    }
  },
  mounted() {
    getUploadToken()
      .then(res => {
        this.token = res.data
        this.uploadUrl = this.token.token.upload_url.upload_url
      })
  },
  methods: {
    // 批量删除资源
    removeStorage(storage_id) {
      delStorageList(Array.isArray(storage_id) ? storage_id : [storage_id])
    }
  }
}
