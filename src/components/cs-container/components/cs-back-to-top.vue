<template>
  <div>
    <el-tooltip
      v-show="isBackToTop && $parent.csScroll.y > 200"
      content="返回顶部"
      placement="top"
      :open-delay="1000">
      <div class="cs-floating top" @click="$parent.scrollToTop()">
        <cs-icon name="angle-double-up"/>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'cs-back-to-top',
  props: {
    isBackToTop: {
      type: Boolean,
      default: false
    },
    parentPath: {
      type: String,
      default: null
    }
  },
  methods: {
    test() {
      // console.log(this.$parent.$refs.component.backToTop())
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    bottom: 107px;
  }
  .parent {
    bottom: 74px;
  }
  .cs-floating {
    position: absolute;
    right: 58px;
    width: 32px;
    border-radius: 4px;
    background-color: rgba($color-text-sub, .7);
    color: #FFF;
    line-height: 25px;
    text-align: center;
    transition: all .3s;
    @extend %unable-select;
    &:hover {
      background-color: rgba($color-text-normal, .9);
    }
  }
</style>
