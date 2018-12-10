<template>
  <cs-container
    v-loading="loading">
    <el-card
      shadow="never">
      <div slot="header" class="clearfix">
        <h1>{{article.title}}</h1>
      </div>
      <div v-html="article.content"></div>
    </el-card>
  </cs-container>
</template>

<script>
import { getArticleItem } from '@/api/article/article'

export default {
  name: 'system-article-preview',
  data() {
    return {
      loading: false,
      article: {}
    }
  },
  mounted() {
    this.loading = true
    getArticleItem(this.$route.params.article_id)
      .then(res => {
        this.article = res.data
      })
      .finally(() => {
        this.loading = false
      })
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
