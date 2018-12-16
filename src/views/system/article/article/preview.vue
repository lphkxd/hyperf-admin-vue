<template>
  <cs-container
    :model="article_id"
    :scrollTop="scrollTop"
    @scroll="({x, y}) => {this.scrollTop = y}">
    <el-card shadow="never" v-loading="loading">
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
import { getArticleItem } from '@/api/article/article'

export default {
  props: {
    article_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      article: {},
      scrollTop: 0,
      loading: false
    }
  },
  mounted() {
    this.getArticleData()
  },
  watch: {
    article_id: {
      handler() {
        this.getArticleData()
      }
    }
  },
  methods: {
    resetArticleData() {
      this.article = {}
    },
    getArticleData() {
      this.loading = true
      this.resetArticleData()

      getArticleItem(this.article_id)
        .then(res => {
          this.article = res.data
        })
        .finally(() => {
          this.loading = false
        })
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
