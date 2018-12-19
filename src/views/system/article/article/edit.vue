<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="({x, y}) => {this.scrollTop = y}">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix">
        <span>{{form.article_id ? '编辑文章' : '新建文章'}}</span>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">
      </el-form>
    </el-card>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getArticleCatList } from '@/api/article/cat'

export default {
  name: 'system-article-edit',
  props: {
    article_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      scrollTop: 0,
      loading: false,
      catData: [],
      tempData: [],
      form: {
      },
      rules: {
      }
    }
  },
  mounted() {
    if (this.catData.length <= 0) {
      this.loading = true
      getArticleCatList(null)
        .then(res => {
          this.catData = res.data.length
            ? util.formatDataToTree(res.data, 'article_cat_id')
            : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    border-radius: 0;
  }
</style>
