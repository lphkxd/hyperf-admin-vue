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
        this.uploadUrl = this.token['token']['upload_url']['upload_url']
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

      const suffix = file.name.toLowerCase().split('.').splice(-1).toString()
      const checkSuffix = this.token['file_ext'] + ',' + this.token['image_ext']
      if (checkSuffix.indexOf(suffix) === -1) {
        this.$message.error('上传资源的文件后缀不允许上传')
        return false
      }

      const nowTime = Math.round(new Date() / 1000) + 100
      if (this.token['expires'] !== 0 && nowTime > this.token['expires']) {
        this.$message.error('上传 Token 已过期')
        return false
      }

      // 生成上传请求参数
      let param = this.token['token']['upload_url']['param']
      param.forEach(value => {
        if (value.name === 'file') {
          return
        }

        this.params[value.name] = this.token['token'].hasOwnProperty(value.name)
          ? this.token['token'][value.name]
          : value.default

        if (value.name === 'key') {
          const fileName = util.guid()
          this.params['key'] = `${this.token['token']['dir']}${fileName}.${suffix}`
        }
      })

      // 本地上传所需要的权限参数
      if (this.token['token']['upload_url']['module'] === 'careyshop') {
        this.params['token'] = util.cookies.get('token')
        this.params['appkey'] = process.env.VUE_APP_KEY
        this.params['timestamp'] = nowTime
        this.params['format'] = 'json'
        this.params['method'] = 'add.upload.list'
        this.params['sign'] = util.getSign({ ...this.params })
      }
    }
  }
}
