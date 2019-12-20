<template>
  <div>
    <el-tooltip
      v-show="isBackToTop && $parent.csScroll.y > 200"
      content="返回顶部"
      placement="top"
      :open-delay="1000">
      <div class="cs-floating top" @click="$parent.$refs.component.backToTop()">
        <i class="el-icon-caret-top"/>
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="parentPath"
      content="返回上级"
      placement="top"
      :open-delay="1000">
      <div class="cs-floating parent" @click="$router.push({name: parentPath})">
        <i class="el-icon-caret-left"/>
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
    z-index: 1;
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
