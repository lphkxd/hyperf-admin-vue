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
            placeholder="请输入专题标题"
            clearable/>
        </el-form-item>

        <el-form-item
          label="别名"
          prop="alias">
          <el-input
            v-model="currentForm.alias"
            placeholder="可输入专题别名"
            clearable/>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="currentForm.keywords"
            placeholder="可输入专题关键词"
            clearable/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="currentForm.description"
            placeholder="可输入专题描述"
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
import { addTopicItem, setTopicItem } from '@/api/article/topic'

export default {
  components: {
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
    }
  },
  data() {
    return {
      dialogLoading: false,
      stateMap: {
        create: '新增专题',
        update: '编辑专题'
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      currentForm: {
        title: '',
        alias: '',
        content: '',
        keywords: '',
        description: '',
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
        alias: [
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
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
    // 新增专题
    handleCreate() {
      addTopicItem({ ...this.currentForm })
        .then(res => {
          this.updateData({
            type: 'add',
            name: 'system-article-topic',
            data: { ...res.data }
          })

          this.$message.success('操作成功')
          this.handleClose()
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新专题
    handleUpdate() {
      setTopicItem({ ...this.currentForm })
        .then(res => {
          this.updateData({
            type: 'set',
            name: 'system-article-topic',
            srcId: res.data.topic_id,
            data: { ...res.data }
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
