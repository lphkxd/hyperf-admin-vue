<template>
  <div class="cs-container-full">
    <div v-if="$slots.header" class="cs-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cs-container-full__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="cs-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cs-container-full'
}
</script>
