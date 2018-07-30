<template>
  <div class="container-component" ref="container">
    <!-- [card] 卡片容器 -->
    <cs-container-card v-if="type === 'card' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-card>
    <!-- [card] 卡片容器 滚动优化 -->
    <cs-container-card-bs v-bind="$attrs" v-if="type === 'card' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-card-bs>
    <!-- [ghost] 隐形容器 -->
    <cs-container-ghost v-if="type === 'ghost' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-ghost>
    <!-- [ghost] 隐形容器 滚动优化 -->
    <cs-container-ghost-bs v-bind="$attrs" v-if="type === 'ghost' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-ghost-bs>
    <!-- [container-full] 填充 -->
    <cs-container-full v-if="type === 'full' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-full>
    <!-- [container-full-bs] 填充 滚动优化 -->
    <cs-container-full-bs v-bind="$attrs" v-if="type === 'full' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </cs-container-full-bs>
  </div>
</template>

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
  components: {
    'cs-container-full': csContainerFull,
    'cs-container-full-bs': csContainerFullBs,
    'cs-container-ghost': csContainerGhost,
    'cs-container-ghost-bs': csContainerGhostBs,
    'cs-container-card': csContainerCard,
    'cs-container-card-bs': csContainerCardBs
  },
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
  }
}
</script>
