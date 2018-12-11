<template>
  <cs-container>
    <el-card
      :model="article"
      shadow="never">
      <div slot="header" class="clearfix">
        <h2>{{article.title}}</h2>
        <span>最后编辑：{{article.update_time}}</span>
        <span>来源：<a :href="article.source_url" target="_blank">{{article.source}}</a></span>
        <span>游览量：{{article.page_views}}</span>
      </div>
      <div v-html="article.content"></div>
    </el-card>
  </cs-container>
</template>

<script>
import base from './mixins/preview'

export default {
  mixins: [
    base
  ],
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.article_id) {
      next(vm => {
        vm.resetArticleData()
        vm.getArticleData(to.params.article_id)
      })
    } else {
      next(new Error('异常访问'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.article_id) {
      this.resetArticleData()
      this.getArticleData(to.params.article_id)
      next()
    } else {
      next(new Error('异常访问'))
    }
  }
}
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }
  .clearfix{
    text-align: center;
  }
  .clearfix span, a{
    color: #909399;
    font-size: 13px;
    margin-right: 15px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
