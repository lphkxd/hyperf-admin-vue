<script>
import csRegionAll from './components/cs-region-all'
import csRegionLazy from './components/cs-region-lazy'

export default {
  name: 'cs-region',
  props: {
    // 外部v-model值
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    // 插槽类型
    type: {
      type: String,
      required: false,
      default: 'all'
    }
  },
  computed: {
    component() {
      // 全部加载
      if (this.type === 'all') {
        return csRegionAll
      }

      // 懒加载
      if (this.type === 'lazy') {
        return csRegionLazy
      }

      return 'div'
    }
  },
  render(h) {
    // 默认插槽
    const slots = [this.$slots.default]

    // 自定义插槽
    if (this.$slots.control) {
      slots.push(h('template', { slot: 'control' }, [this.$slots.control]))
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
          ref: 'region',
          props: {
            checkedKeys: this.value,
            ...this.$attrs
          },
          on: {
            'confirm': res => {
              this.$emit('input', res)
              this.$refs.region.visible = false
            }
          }
        }, slots)
      ]
    )
  }
}
</script>
