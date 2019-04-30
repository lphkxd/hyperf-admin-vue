<template>
  <cs-container :is-back-to-top="true" parent-path="system-article-article">
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
  @import '~@/assets/style/fixed/tinymce.scss';

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
</style>
