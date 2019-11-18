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
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="分类"
          prop="article_cat_id">
          <el-cascader
            v-model="currentForm.article_cat_id"
            placeholder="请选择文章分类 试试搜索：首页"
            :options="catData"
            :props="cascaderProps"
            style="width: 100%;"
            filterable
            clearable>
          </el-cascader>
        </el-form-item>

        <el-form-item
          label="封面"
          prop="image">
          <el-input
            v-model="currentForm.image"
            placeholder="可输入文章图片"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="currentForm.image"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="currentForm.image | getPreviewUrl"
                    @click.native="$preview(currentForm.image)"
                    fit="fill"/>
                </div>
                <cs-icon slot="reference" name="image"/>
              </el-popover>
            </template>
            <cs-upload
              slot="append"
              type="slot"
              accept="image/*"
              :limit="1"
              :multiple="false"
              @confirm="_getUploadFileList">
              <el-button slot="control"><cs-icon name="upload"/></el-button>
            </cs-upload>
          </el-input>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="currentForm.keywords"
            placeholder="可输入文章关键词"
            :clearable="true"/>
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
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="来源地址"
          prop="source_url">
          <el-input
            v-model="currentForm.source_url"
            placeholder="可输入来源地址"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="外部连接"
          prop="url">
          <el-input
            v-model="currentForm.url"
            placeholder="可输入文章外部连接"
            :clearable="true"/>
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
import util from '@/utils/util'

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
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      currentForm: {
        title: '',
        article_cat_id: null,
        image: '',
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
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'article_lists') : ''
    }
  },
  watch: {
    formData: {
      handler(val) {
        if (this.state === 'update') {
          // 更新数据
          this.currentForm = val

          // 更新富文本
          if (this.$refs.tinymce) {
            this.$refs.tinymce.destroyTinymce()
            this.$refs.tinymce.initTinymce()
            this.$refs.tinymce.setContent(val.content)
          }

          // 清除表单验证
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
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
    // 获取上传文件
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      this.currentForm.image = response.data[0].url
    },
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
    // 新增文章
    handleCreate() {
      addArticleItem({ ...this.currentForm })
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
      setArticleItem({ ...this.currentForm })
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
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
</style>
