import { getUploadToken, replaceUploadItem } from '@/api/upload/upload'
import { delStorageList, getStorageDirectorySelect } from '@/api/upload/storage'
import util from '@/utils/util'

export default {
  data() {
    return {
      token: {},
      params: {},
      uploadUrl: '',
      parentId: [],
      parentData: [],
      parentProps: {
        value: 'storage_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  watch: {
    watchToken: {
      handler(val) {
        this.getToken(val)
      },
      immediate: true
    }
  },
  mounted() {
    this.getDirectory()
  },
  computed: {
    watchToken() {
      const { moduleName, replaceId } = this
      return {
        moduleName,
        replaceId
      }
    }
  },
  methods: {
    // 获取 Token
    getToken(val) {
      this.params = {}
      if (this.replaceId) {
        replaceUploadItem(val['replaceId'])
          .then(res => {
            this.token = res.data ? res.data : {}
            this.uploadUrl = this.token['token']['upload_url']['upload_url']
          })
      } else {
        getUploadToken(val['moduleName'])
          .then(res => {
            this.token = res.data ? res.data : {}
            this.uploadUrl = this.token['token']['upload_url']['upload_url']
          })
      }
    },
    // 删除资源
    handleRemove(file, fileList) {
      if (file.status === 'success' && file.response) {
        const response = file.response.data
        if (response && response[0].storage_id) {
          const storageId = response[0].storage_id
          delStorageList(Array.isArray(storageId) ? storageId : [storageId])
        }
      }

      this.$emit('upload', fileList)
    },
    // 资源预览
    handlePreview(file) {
      if (file.status === 'success') {
        let imgObj = new Image()
        imgObj['src'] = file.url

        if (imgObj['fileSize'] > 0 || (imgObj['width'] > 0 && imgObj['height'] > 0)) {
          this.$preview(imgObj['src'])
          return
        }
      }

      this.$message.warning('当前模式或资源不支持预览')
    },
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      if (!this.token || !this.uploadUrl) {
        this.$message.error('上传组件初始化中或配置错误')
        return false
      }

      const fielMaxSize = util.stringToByte(this.token['file_size'])
      if (fielMaxSize > 0 && file.size > fielMaxSize) {
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

        // 填入接口返回的参数
        this.params[value.name] = this.token['token'].hasOwnProperty(value.name)
          ? this.token['token'][value.name]
          : value.default

        /**
         * 替换资源编号不存在时表示上传新资源
         * 此时需要对部分请求参数做特殊处理,而替换资源时不需要做处理
         */
        if (!this.replaceId) {
          if (value.name === 'x:filename') {
            this.params['x:filename'] = file.name
          }

          if (value.name === 'x:parent_id') {
            this.params['x:parent_id'] = 0
            if (this.storageId !== null) {
              this.params['x:parent_id'] = this.storageId
            } else if (this.parentId.length) {
              this.params['x:parent_id'] = this.parentId[this.parentId.length - 1]
            }
          }

          if (value.name === 'key') {
            const fileName = util.guid()
            this.params['key'] = `${this.token['token']['dir']}${fileName}.${suffix}`
          }
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

      // 自动上传时,"确定"按钮将改变状态
      if (this.autoUpload) {
        this.loading = true
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      if (response.status === 200 && response.data) {
        if (response.data[0]['status'] !== 200) {
          this.handleError(response.data[0]['message'], file, fileList)
          return
        }

        this.$emit('upload', fileList)
        this.handleChange(fileList)
        return
      }

      this.handleError(response.message, file, fileList)
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error(`资源：${file.name} 上传失败`)
      util.log.danger('资源上传失败：' + (err || file.response))

      for (let i = fileList.length - 1; i >= 0; i--) {
        if (file === fileList[i]) {
          fileList.splice(i, 1)
          this.$emit('upload', fileList)
          break
        }
      }

      this.handleChange(fileList)
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      if (fileList.length >= this.limit) {
        this.$message.warning(`最多只能上传 ${this.limit} 个文件`)
        return
      }

      if (files.length + fileList.length > this.limit) {
        const count = this.limit - fileList.length
        this.$message.warning(`上传数量超出限制，最多还能选择 ${count} 个文件`)
      }
    },
    // "确定"按钮状态转换
    handleChange(fileList) {
      if (this.autoUpload) {
        if (Object.keys(fileList).every(item => fileList[item].status === 'success')) {
          this.loading = false
        }
      }
    },
    // 获取可选目录(外部不传入storageId时启用)
    getDirectory() {
      if (this.storageId !== null) {
        return
      }

      getStorageDirectorySelect()
        .then(res => {
          this.parentData = res.data.list.length
            ? util.formatDataToTree(res.data.list, 'storage_id')
            : []

          this.parentData.unshift({
            storage_id: 0,
            parent_id: 0,
            name: '根目录'
          })

          let default_id = res.data.default
          do {
            let node = res.data.list.find(item => item.storage_id === default_id)
            if (node) {
              default_id = node.parent_id
              this.parentId.unshift(node.storage_id)
            } else {
              default_id = 0
              this.parentId = [0]
            }
          } while (default_id)
        })
    }
  }
}
