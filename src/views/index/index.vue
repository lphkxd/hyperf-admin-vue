<template>
  <cs-container>
    <cs-page-cover
      title="CareyShop Admin"
      sub-title="商城后台管理系统集成方案(开发继续中...)">
      <img src="~@/assets/image/logo@2x.png" alt="logo">
      <div slot="footer" class="index-btn-group">
        <span @click="$open('https://www.careyshop.cn')">主页</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$open('https://doc.careyshop.cn')">文档</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$open('https://bbs.careyshop.cn')">论坛</span>
      </div>
    </cs-page-cover>
  </cs-container>
</template>

<script>
import CsPageCover from './components/cs-page-cover'

export default {
  components: {
    CsPageCover
  }
}
</script>

<style lang="scss" scoped>
  .index-btn-group {
    color: $color-text-placehoder;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
        cursor: pointer;
      }
    }
  }
</style>
