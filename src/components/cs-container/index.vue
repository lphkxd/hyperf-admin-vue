<script>
// 组件
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
        props: this.$attrs
      }, slots)
    ])
  }
}
</script>
