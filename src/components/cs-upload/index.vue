<script>
// 组件
import csUploadComp from './components/cs-upload-comp'
import csUploadSlot from './components/cs-upload-slot'

export default {
  name: 'cs-upload',
  props: {
    // 外部v-model值
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    // 确认按钮事件
    confirm: {
      type: Function
    },
    // 上传类型
    type: {
      type: String,
      required: false,
      default: 'comp'
    }
  },
  data() {
    return {
      fileList: [],
      source: ''
    }
  },
  computed: {
    component() {
      // 组件模式
      if (this.type === 'comp') {
        return csUploadComp
      }

      // 插槽模式
      if (this.type === 'slot') {
        return csUploadSlot
      }

      return 'div'
    }
  },
  render(h) {
    const slots = [h('div', this.$slots.default)]
    if (this.$slots.control) {
      slots.push(h('div', { slot: 'control' }, [this.$slots.control]))
    }

    return h(
      // {String | Object | Function}
      // 一个 HTML 标签字符串，组件选项对象，或者
      // 解析上述任何一种的一个 async 异步函数，必要参数。
      'div',

      // {Object}
      // 一个包含模板相关属性的数据对象
      // 这样，您可以在 template 中使用这些属性。可选参数。
      {
      },

      // {String | Array}
      // 子节点 (VNodes)，由 `createElement()` 构建而成，
      // 或使用字符串来生成“文本节点”。可选参数。
      [
        h(this.component, {
          ref: 'upload',
          props: this.$attrs,
          on: {
            'upload': file => {
              if (this.type === 'comp') {
                this.$emit('input', this.getUploadData(file))
              }

              if (this.type === 'slot') {
                this.fileList = file
              }
            },
            'confirm': () => {
              if (this.type === 'slot') {
                this.$emit('confirm', this.fileList, this.source)
                this.fileList = []
              }
            }
          }
        }, slots)
      ]
    )
  },
  methods: {
    getUploadData(fileList) {
      let data = []
      fileList.forEach(val => {
        if (val.response) {
          data.push({
            name: val.response.data[0]['name'],
            source: val.response.data[0]['url'],
            url: '//' + val.response.data[0]['url']
          })
        } else {
          data.push({
            name: val.name,
            source: val.source,
            url: val.url
          })
        }
      })

      return data
    },
    handleUploadDlg(source = '') {
      if (this.type === 'slot') {
        this.$refs.upload.visible = true
        this.source = source
      }
    },
    setReplaceId(val) {
      this.$refs.upload.replaceId = val
      this.$refs.upload.updateToken = true
    },
    setModuleName(val) {
      this.$refs.upload.moduleName = val
      this.$refs.upload.updateToken = true
    }
  }
}
</script>
