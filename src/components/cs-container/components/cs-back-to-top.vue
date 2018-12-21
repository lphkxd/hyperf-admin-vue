<template>
  <div>
    <el-tooltip content="返回顶部" placement="top" :open-delay="1000">
      <div
        class="cs-floating top"
        :class="{'cs-floating--active top': scrollTop > 200}"
        @click="$parent.scrollToTop">
        <cs-icon name="angle-double-up"/>
      </div>
    </el-tooltip>

    <el-tooltip content="返回上级" placement="top" :open-delay="1000">
      <div
        class="cs-floating parent"
        :class="{'cs-floating--active parent': parentPath}"
        @click="$router.push({name: parentPath})">
        <cs-icon name="angle-double-left"/>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
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
    opacity: 0;
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
    &.cs-floating--active {
      opacity: 1;
    }
    &:hover {
      background-color: rgba($color-text-normal, .9);
    }
  }
</style>
