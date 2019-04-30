<script>
// 组件
import csBackToTop from './components/cs-back-to-top'
import csContainerFull from './components/cs-container-full'
import csContainerFullBs from './components/cs-container-full-bs'
import csContainerGhost from './components/cs-container-ghost'
import csContainerGhostBs from './components/cs-container-ghost-bs'
import csContainerCard from './components/cs-container-card'
import csContainerCardBs from './components/cs-container-card-bs'

export default {
  name: 'cs-container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      // 容器当前坐标
      csScroll: { x: 0, y: 0 }
    }
  },
  computed: {
    // 始终返回渲染组件
    component() {
      if (this.type === 'full') {
        return this.betterScroll ? csContainerFullBs : csContainerFull
      }

      if (this.type === 'card') {
        return this.betterScroll ? csContainerCardBs : csContainerCard
      }

      if (this.type === 'ghost') {
        return this.betterScroll ? csContainerGhostBs : csContainerGhost
      }

      return 'div'
    }
  },
  render(h) {
    // 默认插槽
    const slots = [this.$slots.default]

    if (this.$slots.header) {
      slots.push(h('template', { slot: 'header' }, [this.$slots.header]))
    }

    if (this.$slots.footer) {
      slots.push(h('template', { slot: 'footer' }, [this.$slots.footer]))
    }

    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => {
            this.csScroll = e
          }
        }
      }, slots),
      h(csBackToTop, {
        props: this.$attrs
      })
    ])
  },
  activated() {
    // 恢复滚动位置
    if (!this.betterScroll) {
      this.$refs.component.scrollTo(this.csScroll.x, this.csScroll.y)
    }
  }
}
</script>
