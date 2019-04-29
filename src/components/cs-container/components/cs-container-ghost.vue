<template>
  <div class="cs-container-ghost">
    <div v-if="$slots.header" class="cs-container-ghost__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cs-container-ghost__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="cs-container-ghost__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cs-container-ghost'
}
</script>
