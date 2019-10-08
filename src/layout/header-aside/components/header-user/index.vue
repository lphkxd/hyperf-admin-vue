<template>
  <el-dropdown class="cs-mr">
    <span class="btn-text">
      <el-badge :hidden="!unreadMessage" :value="unreadMessage" :max="99">
        {{info.name ? `您好 ${info.name}` : '未登录'}}
      </el-badge>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="$open('/')">
        <cs-icon name="external-link-square" class="cs-mr-10"/>打开前台
      </el-dropdown-item>
      <el-dropdown-item v-if="auth.cache" @click.native="clearCache">
        <cs-icon name="refresh" class="cs-mr-10"/>清空缓存
      </el-dropdown-item>
      <el-dropdown-item v-if="auth.optimize" @click.native="systemOptimize">
        <cs-icon name="magic" class="cs-mr-10"/>优化缓存
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="handleCreate">
        <cs-icon name="keyboard-o" class="cs-mr-10"/>修改密码
      </el-dropdown-item>
      <el-dropdown-item v-if="auth.unread" @click.native="handleMessage">
        <cs-icon name="bell-o" class="cs-mr-10"/>未读消息
        <el-badge :hidden="!unreadMessage" :value="unreadMessage" :max="99"/>
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="logOff">
        <cs-icon name="sign-out" class="cs-mr-10"/>退出账号
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog
      title="修改密码"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false">
      <el-form
        :model="form"
        :rules="rules"
        ref="dataForm"
        label-width="80px">
        <el-form-item
          label="原始密码"
          prop="passwordOld">
          <el-input
            v-model="form.passwordOld"
            @keyup.enter.native="setPassword()"
            type="password"
            placeholder="原始密码"
            :clearable="true"/>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password">
          <el-input
            v-model="form.password"
            @keyup.enter.native="setPassword()"
            type="password"
            placeholder="新密码"
            :clearable="true"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="passwordConfirm">
          <el-input
            v-model="form.passwordConfirm"
            @keyup.enter.native="setPassword()"
            type="password"
            placeholder="确认密码"
            :clearable="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click.native="dialogVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="dialogLoading"
          @click.native="setPassword"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { clearCacheAll, setSystemOptimize } from '@/api/index'
import { setAdminPassword } from '@/api/user/admin'
import { getMessageUserUnread } from '@/api/message/message'

export default {
  data() {
    return {
      timer: null,
      dialogVisible: false,
      dialogLoading: false,
      form: {
        password: '',
        passwordConfirm: '',
        passwordOld: ''
      },
      auth: {
        cache: false,
        optimize: false,
        unread: false
      },
      rules: {
        password: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        passwordConfirm: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        passwordOld: [
          {
            required: true,
            message: '原始密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('careyshop/user', [
      'info',
      'unreadMessage'
    ])
  },
  mounted() {
    this._validationAuth()
    this.getMessageUnread()
    this.timer = setInterval(this.getMessageUnread, 1000 * 60 * 5)
  },
  methods: {
    ...mapActions('careyshop/account', [
      'logout'
    ]),
    /**
     * 权限检测
     */
    _validationAuth() {
      this.auth.cache = this.$has('/index/help/cache')
      this.auth.optimize = this.$has('/index/help/optimize')
      this.auth.unread = this.$has('/system/message/unread')
    },
    /**
     * 获取未读消息数
     */
    getMessageUnread() {
      if (!this.auth.unread) {
        return
      }

      getMessageUserUnread(null)
        .then(res => {
          if (res.data['total'] > this.unreadMessage) {
            const h = this.$createElement
            this.$notify.info({
              title: '消息提示',
              message: h('p', { style: 'cursor: pointer' }, '您有新的消息，请注意查收。'),
              position: 'bottom-right',
              onClick: () => { this.handleMessage() }
            })
          }

          this.$store.commit('careyshop/user/setMessage', res.data['total'])
        })
    },
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      })
    },
    /**
     * 清空缓存
     */
    clearCache() {
      clearCacheAll()
        .then(() => {
          this.$message.success('缓存更新成功')
        })
    },
    /**
     * 最优设置
     */
    systemOptimize() {
      setSystemOptimize()
        .then(() => {
          this.$message.success('正式环境下已调至最优状态')
        })
    },
    /**
     * 初始化成员变量
     */
    resetTemp() {
      this.dialogLoading = false
      this.form = { password: '', passwordConfirm: '', passwordOld: '' }
    },
    /**
     * 创建修改密码对话框
     */
    handleCreate() {
      this.resetTemp()
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 修改密码
     */
    setPassword() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          const request = {
            client_id: this.info.admin.admin_id,
            password_old: this.form.passwordOld,
            password: this.form.password,
            password_confirm: this.form.passwordConfirm
          }

          setAdminPassword({ ...request })
            .then(() => {
              this.dialogVisible = false
              this.$message.success('密码修改成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    /**
     * 打开未读消息
     */
    handleMessage() {
      this.$router.push({
        name: 'system-message-user'
      })
        .catch(() => {
        })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
