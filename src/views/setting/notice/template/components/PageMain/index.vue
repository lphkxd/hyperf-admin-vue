<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleOpenSms">
            <cs-icon name="commenting-o"/>
            短信配置
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleOpenEmail">
            <cs-icon name="envelope-o"/>
            邮件配置
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-dialog
      title="短信配置"
      :visible.sync="smsVisible"
      :append-to-body="true"
      width="600px">
      <el-form
        v-loading="smsLoading"
        :model="smsForm"
        :rules="smsRules"
        label-width="140px"
        ref="smsForm">
        <el-form-item
          label="Access Key ID"
          prop="key_id">
          <el-input
            v-model="smsForm.key_id"
            placeholder="Access Key ID"
            clearable/>
        </el-form-item>

        <el-form-item
          label="Access Key Secret"
          prop="key_secret">
          <el-input
            v-model="smsForm.key_secret"
            placeholder="Access Key Secret"
            clearable/>
        </el-form-item>

        <el-form-item
          label="启用状态"
          prop="status">
          <el-switch
            v-model="smsForm.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="smsVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="smsButton"
          @click="saveSmsData"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getHelpRouter } from '@/api/index/help'
import { getNoticeItem, setNoticeItem } from '@/api/notice/notice'

export default {
  props: {
    loading: {
      default: false
    },
    tplCode: {
      default: 'sms'
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      helpContent: '',
      auth: {},
      smsVisible: false,
      smsLoading: false,
      smsButton: false,
      smsForm: {
        key_id: undefined,
        key_secret: undefined,
        status: '1'
      },
      smsRules: {
        key_id: [
          {
            required: true,
            message: 'Access Key ID 不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        key_secret: [
          {
            required: true,
            message: 'Access Key Secret 不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      },
      emailVisible: false,
      emailLoading: false,
      emailButton: false,
      emailForm: {},
      emailRules: {}
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    },
    // 打开短信配置对话框
    handleOpenSms() {
      this.smsForm = {
        key_id: undefined,
        key_secret: undefined,
        status: '1'
      }

      if (this.$refs.smsForm) {
        this.$nextTick(() => {
          this.$refs.smsForm.clearValidate()
        })
      }

      this.smsButton = false
      this.smsVisible = true
      this.smsLoading = true

      getNoticeItem('sms')
        .then(res => {
          const data = res.data.value
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              this.smsForm[key] = data[key].value
            }
          }
        })
        .finally(() => {
          this.smsLoading = false
        })
    },
    // 请求保存短信配置
    saveSmsData() {
      this.$refs.smsForm.validate(valid => {
        if (valid) {
          this.smsButton = true
          setNoticeItem({
            code: 'sms',
            ...this.smsForm
          })
            .then(() => {
              this.smsVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.smsButton = false
            })
        }
      })
    },
    // 打开邮件配置对话框
    handleOpenEmail() {
    }
  }
}
</script>
