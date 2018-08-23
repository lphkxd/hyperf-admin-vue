<template>
  <div class="cs-container-card">
    <div v-if="$slots.header" class="cs-container-card__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cs-container-card__body">
      <div class="cs-container-card__body-card">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="cs-container-card__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cs-container-card'
}
</script>
