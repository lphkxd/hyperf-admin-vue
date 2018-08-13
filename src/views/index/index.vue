<template>
  <cs-container>
    <cs-page-cover
      title="I AM CAREYSHOP-ADMIN"
      sub-title="追求简约美感的后台管理系统集成方案">
      <img src="~@/assets/image/logo@2x.png" alt="logo">
      <div slot="footer" class="index-btn-group">
        <span @click="$open('https://www.careyshop.cn')">主页</span> |
        <span @click="$open('https://doc.careyshop.cn')">文档</span> |
        <span @click="$open('https://bbs.careyshop.cn')">论坛</span>
      </div>
    </cs-page-cover>
  </cs-container>
</template>

<style lang="scss" scoped>
  @import '~@/assets/style/public.scss';

  .index-btn-group {
    color: $color-text-placehoder;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
</style>
