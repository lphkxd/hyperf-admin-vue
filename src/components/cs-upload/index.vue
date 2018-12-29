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
    // 上传类型
    type: {
      type: String,
      required: false,
      default: 'comp'
    }
  },
  computed: {
    component() {
      if (this.type === 'comp') {
        return csUploadComp
      }

      if (this.type === 'slot') {
        return csUploadSlot
      }

      return 'div'
    }
  },
  render(h) {
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
          props: this.$attrs,
          on: {
            'upload': e => { this.$emit('input', this.getUploadData(e)) }
          }
        })
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
            url: val.response.data[0]['url']
          })
        }
      })

      return data
    }
  }
}
</script>
