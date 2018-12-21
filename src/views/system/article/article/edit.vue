<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{form.article_id ? '编辑文章' : '新增文章'}}</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px">

        <el-form-item
          label="标题"
          prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入文章标题"
            clearable/>
        </el-form-item>

        <el-form-item
          label="分类"
          prop="article_cat_id">
          <el-cascader
            v-model="form.article_cat_id"
            :options="catData"
            :props="cascaderProps"
            change-on-select
            filterable
            clearable
            style="width: 100%;"
            placeholder="请选择文章分类 试试搜索：首页">
          </el-cascader>
        </el-form-item>

        <el-form-item
          label="封面"
          prop="image">
          <el-input
            v-model="form.image"
            style="width: 40%;"
            placeholder="可选择上传文章封面图片"
            clearable>
            <template slot="prepend">
              <el-popover
                v-if="form.image"
                placement="top"
                trigger="hover"
                width="150">
                <a :href="form.image" target="_blank">
                  <img class="image" :src="form.image" alt="">
                </a>
                <cs-icon slot="reference" name="image"/>
              </el-popover>
            </template>

            <template slot="append">
              <el-button>
                <cs-icon name="cloud-upload"/>
                上传
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item
          label="文章来源"
          prop="source">
          <el-input
            v-model="form.source"
            placeholder="可输入文章来源"
            clearable/>
        </el-form-item>

        <el-form-item
          label="来源地址"
          prop="source_url">
          <el-input
            v-model="form.source_url"
            placeholder="可输入来源地址"
            clearable/>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="form.keywords"
            placeholder="可输入文章关键词"
            clearable/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="form.description"
            placeholder="可输入文章描述"
            type="textarea"
            :rows="3"/>
        </el-form-item>

        <el-form-item
          label="外部连接"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="可输入文章外部连接"
            clearable/>
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content">
          <el-input
            v-model="form.content"
            placeholder="请输入文章内容"
            clearable/>
        </el-form-item>

        <el-form-item
          label="打开方式"
          prop="target">
          <el-radio-group v-model="form.target">
            <el-radio label="_self">当前窗口</el-radio>
            <el-radio label="_blank">新窗口</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="置顶"
          prop="is_top">
          <el-switch
            v-model="form.is_top"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item size="small">
          <el-button v-if="!form.article_id" type="primary">确定</el-button>
          <el-button v-else type="primary">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>

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
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children'
      },
      tempData: [],
      form: {
        title: undefined
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
  .image {
    width: 100%;
    margin: 0 auto;
  }
</style>
