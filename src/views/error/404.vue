<template>
  <div class="page">
    <img src="~@/assets/image/404@2x.png" alt="404">
    <el-button class="cs-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
  @import '~@/assets/style/public.scss';
  .page {
    background: #303133;
    background-blend-mode: multiply, multiply;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .page_title {
      font-size: 20px;
      color: #FFF;
    }
  }
</style>
