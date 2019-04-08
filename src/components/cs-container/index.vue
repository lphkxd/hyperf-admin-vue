<script>
// 组件
import csContainerFull from './components/cs-container-full'
import csContainerFullBs from './components/cs-container-full-bs'
import csContainerGhost from './components/cs-container-ghost'
import csContainerGhostBs from './components/cs-container-ghost-bs'
import csContainerCard from './components/cs-container-card'
import csContainerCardBs from './components/cs-container-card-bs'
import csBackToTop from './components/cs-back-to-top'

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
  computed: {
    // 始终返回渲染组件
    component() {
      if (this.type === 'full' && !this.betterScroll) return csContainerFull
      if (this.type === 'full' && this.betterScroll) return csContainerFullBs
      if (this.type === 'card' && !this.betterScroll) return csContainerCard
      if (this.type === 'card' && this.betterScroll) return csContainerCardBs
      if (this.type === 'ghost' && !this.betterScroll) return csContainerGhost
      if (this.type === 'ghost' && this.betterScroll) return csContainerGhostBs
      else {
        return 'div'
      }
    }
  },
  render(h) {
    const slots = [this.$slots.default]
    if (this.$slots.header) slots.push(h('template', { slot: 'header' }, [this.$slots.header]))
    if (this.$slots.footer) slots.push(h('template', { slot: 'footer' }, [this.$slots.footer]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => this.$emit('scroll', e)
        }
      }, slots),
      h(csBackToTop, {
        props: this.$attrs
      })
    ])
  },
  activated() {
    // 恢复滚动位置
    if (this.$parent.scrollTop) {
      this.scrollTop(this.$parent.scrollTop)
    }
  },
  methods: {
    // 返回顶部
    scrollToTop() {
      this.$refs.component.scrollToTop()
      // 如果开启了 better scroll 还需要手动触发一遍 scroll 事件
      const bs = this.$refs.component.BS
      if (bs) this.$refs.component.scroll()
    },
    // 用法同原生方法 scrollBy
    scrollBy(x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollBy(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollBy(x, y)
      }
    },
    // 用法同原生方法 scrollTo
    scrollTo(x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTo(x, y)
      }
    },
    // 用法同原生方法 scrollTop
    scrollTop(top = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(bs.x, -top, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTop = top
      }
    }
  }
}
</script>
