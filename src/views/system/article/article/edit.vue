<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-article"
    @scroll="(move) => {this.scrollTop = move.y}">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{article_id ? '编辑文章' : '新增文章'}}</span>
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
            filterable
            clearable
            change-on-select
            style="width: 100%;"
            placeholder="请选择文章分类 试试搜索：首页">
          </el-cascader>
        </el-form-item>

        <el-form-item
          label="封面"
          prop="image">
          <cs-upload
            v-model="form.image"
            v-bind:limit="1"/>
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
          label="内容"
          prop="content">
          <cs-tinymce
            ref="tinymce"
            v-model="form.content"
            code="article_content"/>
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
          label="外部连接"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="可输入文章外部连接"
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
          <el-button v-if="!article_id" type="primary" @click="() => {}">确定</el-button>
          <el-button v-else type="primary" @click="() => {}">修改</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { mapActions } from 'vuex'
import { getArticleCatList } from '@/api/article/cat'
import { getArticleItem } from '@/api/article/article'

export default {
  name: 'system-article-edit',
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csTinymce': () => import('@/components/cs-tinymce')
  },
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
      buffer: [],
      form: {},
      rules: {
      }
    }
  },
  mounted() {
    this.getCatList()
    this.getArticleData()
  },
  methods: {
    ...mapActions('careyshop/page', [
      'close'
    ]),
    // 多窗口缓存数据选择
    switchData(id) {
      let data = this.buffer[id]
      if (!data) {
        data = {}
        this.buffer[id] = data
      }

      if (this.$refs.tinymce) {
        this.$refs.tinymce.setContent(data.content)
      }

      this.form = data
    },
    // 关闭当前窗口
    handleClose() {
      this.close({
        tagName: this.$route.fullPath,
        vm: this
      })
    },
    // 获取文章分类
    getCatList() {
      if (this.catData.length <= 0) {
        getArticleCatList(null)
          .then(res => {
            this.catData = res.data.length
              ? util.formatDataToTree(res.data, 'article_cat_id')
              : []
          })
      }
    },
    // 获取文章数据
    getArticleData() {
      if (this.article_id > 0) {
        getArticleItem(this.article_id)
          .then(res => {
          })
      }
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    const id = to.params.article_id
    if (id >= 0) {
      next(vm => {
        vm.switchData(id)
      })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    const id = to.params.article_id
    if (id >= 0) {
      this.switchData(id)
      next()
    } else {
      next(new Error('未指定ID'))
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
