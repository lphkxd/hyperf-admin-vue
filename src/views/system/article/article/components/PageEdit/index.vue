<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{stateMap[state]}}</span>
      </div>

      <el-form
        ref="form"
        :model="currentForm"
        :rules="rules"
        label-width="80px">

        <el-form-item
          label="标题"
          prop="title">
          <el-input
            v-model="currentForm.title"
            placeholder="请输入文章标题"
            clearable/>
        </el-form-item>

        <el-form-item
          label="分类"
          prop="article_cat_id">
          <el-cascader
            v-model="currentForm.article_cat_id"
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
            v-model="currentForm.image"
            :fileList="imageFile"
            v-bind:limit="1"/>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="currentForm.keywords"
            placeholder="可输入文章关键词"
            clearable/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="currentForm.description"
            placeholder="可输入文章描述"
            type="textarea"
            :rows="3"/>
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content">
          <cs-tinymce
            ref="tinymce"
            v-model="currentForm.content"
            code="inside_content"/>
        </el-form-item>

        <el-form-item
          label="文章来源"
          prop="source">
          <el-input
            v-model="currentForm.source"
            placeholder="可输入文章来源"
            clearable/>
        </el-form-item>

        <el-form-item
          label="来源地址"
          prop="source_url">
          <el-input
            v-model="currentForm.source_url"
            placeholder="可输入来源地址"
            clearable/>
        </el-form-item>

        <el-form-item
          label="外部连接"
          prop="url">
          <el-input
            v-model="currentForm.url"
            placeholder="可输入文章外部连接"
            clearable/>
        </el-form-item>

        <el-form-item
          label="打开方式"
          prop="target">
          <el-radio-group v-model="currentForm.target">
            <el-radio label="_self">当前窗口</el-radio>
            <el-radio label="_blank">新窗口</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="置顶"
          prop="is_top">
          <el-switch
            v-model="currentForm.is_top"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-switch
            v-model="currentForm.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { addArticleItem, setArticleItem } from '@/api/article/article'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csTinymce': () => import('@/components/cs-tinymce')
  },
  props: {
    // 编辑状态
    state: {
      type: String,
      required: true,
      default: 'create'
    },
    // 表单数据
    formData: {
      type: Object,
      required: false,
      default: () => {}
    },
    // 加载状态
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    // 分类源数据
    catList: {
      type: Array,
      required: true,
      default: () => []
    },
    // 整理后的分类数据
    catData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      dialogLoading: false,
      imageFile: [],
      stateMap: {
        create: '新增文章',
        update: '编辑文章'
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children'
      },
      currentForm: {
        title: '',
        article_cat_id: [],
        image: [],
        keywords: '',
        description: '',
        content: '',
        source: '',
        source_url: '',
        url: '',
        target: '_blank',
        is_top: '0',
        status: '1'
      },
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ],
        article_cat_id: [
          {
            required: true,
            message: '分类不能为空',
            trigger: 'change'
          }
        ],
        keywords: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }
        ],
        source: [
          {
            max: 60,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ],
        source_url: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        if (this.state === 'update') {
          // 更新数据
          this.currentForm = val
          this.imageFile = val.image || []

          // 更新富文本
          if (this.$refs.tinymce) {
            this.$refs.tinymce.destroyTinymce()
            this.$refs.tinymce.initTinymce()
            this.$refs.tinymce.setContent(val.content)
          }

          // 清除表单验证
          if (this.$refs.form) {
            this.$nextTick(() => {
              this.$refs.form.clearValidate()
            })
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('careyshop/page', [
      'close'
    ]),
    ...mapActions('careyshop/update', [
      'updateData'
    ]),
    // 关闭当前窗口
    handleClose() {
      this.close({
        tagName: this.$route.fullPath
      })
    },
    // 确认新增或修改
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.state === 'create' ? this.handleCreate() : this.handleUpdate()
        }
      })
    },
    getArticleCatId() {
      const { article_cat_id } = this.currentForm
      return article_cat_id.length > 0 ? article_cat_id[article_cat_id.length - 1] : 0
    },
    // 新增文章
    handleCreate() {
      addArticleItem({
        ...this.currentForm,
        article_cat_id: this.getArticleCatId()
      })
        .then(res => {
          this.updateData({
            type: 'add',
            name: 'system-article-article',
            data: {
              ...res.data,
              page_views: 0,
              get_article_cat: {
                ...this.catList.find(item => item.article_cat_id === res.data.article_cat_id)
              }
            }
          })

          this.$message.success('操作成功')
          this.handleClose()
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新文章
    handleUpdate() {
      setArticleItem({
        ...this.currentForm,
        article_cat_id: this.getArticleCatId()
      })
        .then(res => {
          this.updateData({
            type: 'set',
            name: 'system-article-article',
            srcId: res.data.article_id,
            data: {
              ...res.data,
              get_article_cat: {
                ...this.catList.find(item => item.article_cat_id === res.data.article_cat_id)
              }
            }
          })

          this.$message.success('操作成功')
          this.handleClose()
        })
        .finally(() => {
          this.dialogLoading = false
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
    border: 1px solid #DCDFE6;
  }
</style>
