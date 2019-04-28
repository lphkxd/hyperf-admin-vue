<template>
  <cs-container
    :model="article_id"
    parentPath="system-article-article"
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">

    <div class="cs-p">
      <el-card
        class="box-card"
        shadow="never"
        v-loading="loading">
        <div slot="header" class="clearfix">
          <h2>{{article.title}}</h2>
          <span>最后编辑：{{article.update_time}}</span>
          <span>来源：<a :href="article.source_url" target="_blank">{{article.source}}</a></span>
          <span>游览量：{{article.page_views}}</span>
        </div>
        <div class="mce-content-body" v-html="article.content"></div>
      </el-card>
    </div>
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
      loading: true
    }
  },
  watch: {
    article_id: {
      handler() {
        this.getArticleData()
      },
      immediate: true
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

<style lang="scss" scoped>
  .box-card {
    border-radius: 0;
  }
  .clearfix{
    text-align: center;
  }
  .clearfix span, a{
    color: $color-text-sub;
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
  .mce-content-body {
    max-width: 980px;
    margin-left: auto!important;
    margin-right: auto!important;
  }
  .mce-content-body /deep/ html, body {
    font-family: inherit;
    font-size: 14px;
    line-height: inherit;
  }
  .mce-content-body /deep/ img {
    max-width: 100%;
    display: block;
    height: auto;
  }
  .mce-content-body /deep/ a {
    text-decoration: none;
  }
  .mce-content-body /deep/ iframe {
    width: 100%;
  }
  .mce-content-body /deep/ p {
    line-height: 1.6;
  }
  .mce-content-body /deep/ table {
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
    border: none #999;
  }
  .mce-content-body /deep/ .mce-object-iframe{
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }
  .mce-content-body /deep/ ul, ol{
    list-style-position: inside;
  }
</style>
