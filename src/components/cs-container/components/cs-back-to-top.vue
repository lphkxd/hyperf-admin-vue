<template>
  <div
    class="cs-back-to-top"
    :class="{'cs-back-to-top--active': scrollTop > 200}"
    @click="$parent.scrollToTop">
    <cs-icon name="angle-double-up"/>
  </div>
</template>

<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .cs-back-to-top {
    opacity: 0;
    position: absolute;
    right: 58px;
    bottom: 74px;
    border-radius: 4px;
    padding: 5px 13px;
    background-color: rgba($color-text-sub, .7);
    color: #FFF;
    transition: all .3s;
    @extend %unable-select;
    &.cs-back-to-top--active {
      opacity: 1;
    }
    &:hover {
      background-color: rgba($color-text-normal, .9);
    }
  }
</style>
