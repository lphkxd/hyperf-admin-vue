<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.sms_setting"
            :disabled="loading"
            @click="handleOpenSms">
            <cs-icon name="commenting-o"/>
            短信配置
          </el-button>

          <el-button
            v-if="auth.email_setting"
            :disabled="loading"
            @click="handleOpenEmail">
            <cs-icon name="envelope-o"/>
            邮件配置
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="handleStatus(null, 1, true)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="handleStatus(null, 0, true)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-tabs
      :value="tplCode"
      v-loading="loading"
      @tab-click="handleClick"
      class="tab-box">
      <el-tab-pane
        v-for="(item, index) in tplType"
        :key="index"
        :label="item"
        :name="index">

        <el-table
          v-if="index.toString() === tplCode"
          :data="currentTableData"
          :highlight-current-row="true"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="30"/>

          <el-table-column
            label="名称"
            prop="name"
            min-width="500">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-tag
                size="mini"
                :type="statusMap[scope.row.status].type"
                :style="auth.enable || auth.disable ? 'cursor: pointer;' : ''"
                :effect="auth.enable || auth.disable ? 'light' : 'plain'"
                @click.native="handleStatus(scope.$index)">
                {{statusMap[scope.row.status].text}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-button
                v-if="auth.tpl"
                @click="handleUpdate(scope.$index)"
                size="small"
                type="text">编辑模板</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="短信配置"
      :visible.sync="smsVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
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
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="Access Key Secret"
          prop="key_secret">
          <el-input
            v-model="smsForm.key_secret"
            placeholder="Access Key Secret"
            :clearable="true"/>
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

    <el-dialog
      title="邮件配置"
      :visible.sync="emailVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        v-loading="emailLoading"
        :model="emailForm"
        :rules="emailRules"
        label-width="140px"
        ref="emailForm">
        <el-form-item
          label="SMTP服务器"
          prop="email_host">
          <el-input
            v-model="emailForm.email_host"
            placeholder="SMTP服务器"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="SMTP端口"
          prop="email_port">
          <el-input
            v-model="emailForm.email_port"
            placeholder="SMTP端口"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="发信人邮箱地址"
          prop="email_addr">
          <el-input
            v-model="emailForm.email_addr"
            placeholder="发信人邮箱地址"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="SMTP用户名"
          prop="email_id">
          <el-input
            v-model="emailForm.email_id"
            placeholder="SMTP身份验证用户名"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="SMTP密码"
          prop="email_pass">
          <el-input
            v-model="emailForm.email_pass"
            placeholder="SMTP身份验证码"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="使用安全链接"
          prop="email_ssl">
          <el-switch
            v-model="smsForm.email_ssl"
            active-value="1"
            inactive-value="0">
          </el-switch>
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
          @click="emailVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="emailButton"
          @click="saveEmailData"
          size="small">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="`编辑 ${tplType[tplForm.code]}`"
      :visible.sync="tplVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="760px">
      <el-form
        v-loading="tplLoading"
        :model="tplForm"
        :rules="tplRules"
        label-width="90px"
        ref="tplForm">
        <el-form-item
          v-if="tplForm.code === 'sms'"
          label="模板编号"
          prop="sms_code">
          <el-input
            v-model="tplForm.sms_code"
            placeholder="阿里云短信模板编号"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="tplForm.code === 'sms'"
          label="短信签名"
          prop="sms_sign">
          <el-input
            v-model="tplForm.sms_sign"
            placeholder="阿里云短信签名"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="tplForm.code === 'email'"
          label="系统标题"
          prop="title">
          <el-input
            v-model="tplForm.title"
            placeholder="通知系统标题"
            maxlength="200"
            :show-word-limit="true"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="系统模板"
          prop="template">
          <div class="cs-mb-10">
            <el-tag
              v-for="(item, index) in tplForm.get_notice_item"
              :key="index"
              :disable-transitions="true"
              class="cs-cp cs-mr-10"
              effect="plain"
              @click="insertVariables(item.item_name)">
              {{item.item_name}}
            </el-tag>
          </div>

          <el-input
            v-if="tplForm.code === 'sms'"
            v-model="tplForm.template"
            type="textarea"
            placeholder="通知系统模板"
            :autosize="{minRows: 5}"
            :show-word-limit="true"
            maxlength="500"
            ref="textarea"/>

          <cs-tinymce
            v-else-if="tplVisible"
            v-model="tplForm.template"
            :height="180"
            ref="tinymce"/>

          <el-button
            v-if="tplForm.code === 'sms'"
            type="text"
            @click="copyAliyunSms">复制阿里云短信模板</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="tplVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="tplButton"
          @click="saveTplData"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as clipboard from 'clipboard-polyfill'
import { getNoticeItem, setNoticeItem } from '@/api/notice/notice'
import { setNoticeTplItem, setNoticeTplStatus } from '@/api/notice/template'

export default {
  components: {
    'csTinymce': () => import('@/components/cs-tinymce')
  },
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
      auth: {
        sms_setting: false,
        email_setting: false,
        enable: false,
        disable: false,
        tpl: false
      },
      tplType: {
        'sms': '短信模板',
        'email': '邮件模板'
      },
      statusMap: {
        0: {
          text: '禁用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
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
      emailForm: {
        email_host: undefined,
        email_port: undefined,
        email_addr: undefined,
        email_id: undefined,
        email_pass: undefined,
        email_ssl: '0',
        status: '1'
      },
      emailRules: {
        email_host: [
          {
            required: true,
            message: 'SMTP服务器不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        email_port: [
          {
            required: true,
            message: 'SMTP端口不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        email_addr: [
          {
            required: true,
            message: '发信人邮箱地址不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        email_id: [
          {
            required: true,
            message: 'SMTP身份验证用户名不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        email_pass: [
          {
            required: true,
            message: 'SMTP身份验证码不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      },
      tplVisible: false,
      tplLoading: false,
      tplButton: false,
      tplForm: {},
      tplRules: {
        sms_code: [
          {
            required: true,
            message: '阿里云短信模板编号不能为空',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度不能大于 20 个字符',
            trigger: 'blur'
          }
        ],
        sms_sign: [
          {
            required: true,
            message: '阿里云短信签名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 12,
            message: '长度在 2 到 12 个字符',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '通知系统标题不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ]
      }
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
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.sms_setting = this.$has('/setting/notice/template/sms_setting')
      this.auth.email_setting = this.$has('/setting/notice/template/email_setting')
      this.auth.enable = this.$has('/setting/notice/template/enable')
      this.auth.disable = this.$has('/setting/notice/template/disable')
      this.auth.tpl = this.$has('/setting/notice/template/tpl')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.notice_tpl_id)
        })
      } else {
        idList.push(this.currentTableData[val].notice_tpl_id)
      }

      return idList
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 打开短信配置对话框
    handleOpenSms() {
      this.smsForm = {
        key_id: undefined,
        key_secret: undefined,
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.smsForm.clearValidate()
      })

      this.smsButton = false
      this.smsVisible = true
      this.smsLoading = true

      getNoticeItem('sms')
        .then(res => {
          const data = res.data.value
          // eslint-disable-next-line no-unused-vars
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
      this.emailForm = {
        email_host: undefined,
        email_port: undefined,
        email_addr: undefined,
        email_id: undefined,
        email_pass: undefined,
        email_ssl: '0',
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.emailForm.clearValidate()
      })

      this.emailButton = false
      this.emailVisible = true
      this.emailLoading = true

      getNoticeItem('email')
        .then(res => {
          const data = res.data.value
          // eslint-disable-next-line no-unused-vars
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              this.emailForm[key] = data[key].value
            }
          }
        })
        .finally(() => {
          this.emailLoading = false
        })
    },
    // 请求保存邮件配置
    saveEmailData() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.emailButton = true
          setNoticeItem({
            code: 'email',
            ...this.emailForm
          })
            .then(() => {
              this.emailVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.emailButton = false
            })
        }
      })
    },
    // 点击选项卡时触发
    handleClick(tab) {
      this.multipleSelection = []
      this.$emit('update:tplCode', tab.name)
    },
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let notice_tpl_id = this._getIdList(val)
      if (notice_tpl_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(notice_tpl_id, status, vm) {
        setNoticeTplStatus(notice_tpl_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (notice_tpl_id.indexOf(value.notice_tpl_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  status
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newStatus = oldData.status ? 0 : 1

        if (oldData.status > 1) {
          return
        }

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(notice_tpl_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(notice_tpl_id, status, this)
        })
        .catch(() => {
        })
    },
    // 打开编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.tplForm = {
        ...data,
        sms_sign: data.code === 'sms' ? data.title : null
      }

      this.$nextTick(() => {
        this.$refs.tplForm.clearValidate()
      })

      this.tplButton = false
      this.tplVisible = true
      this.tplLoading = false
    },
    // 请求保存模板
    saveTplData() {
      this.$refs.tplForm.validate(valid => {
        if (valid) {
          this.tplButton = true
          setNoticeTplItem({ ...this.tplForm })
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data
                })

              this.tplVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.tplButton = false
            })
        }
      })
    },
    // 复制阿里云短信模板
    copyAliyunSms() {
      let template = this.tplForm.template
      const notice = this.tplForm.get_notice_item

      notice.forEach(value => {
        const regexp = new RegExp(value.item_name, 'g')
        template = template.replace(regexp, `\${${value.replace_name}}`)
      })

      clipboard.writeText(template)
        .then(() => {
          this.$message.success('已复制阿里云短信模板到剪贴板')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 插入变量
    insertVariables(val) {
      if (this.tplForm.code === 'email') {
        if (this.$refs.tinymce) {
          this.$refs.tinymce.handleEditor.insertContent(val)
        }
      }

      if (this.tplForm.code === 'sms') {
        if (this.$refs.textarea) {
          this.$refs.textarea.focus()
          const obj = this.$refs.textarea.$el.children[0]

          if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            const startPos = obj.selectionStart
            const endPos = obj.selectionEnd
            const tmpStr = this.tplForm.template

            this.tplForm.template = tmpStr.substring(0, startPos) + val + tmpStr.substring(endPos, tmpStr.length)
          } else {
            this.tplForm.template += val
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
</style>
