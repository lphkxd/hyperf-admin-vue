<template>
  <el-dropdown class="cs-mr">
    <span class="btn-text">您好 {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="$open('/')">
        <cs-icon name="external-link-square" class="cs-mr-10"/>打开前台
      </el-dropdown-item>
      <el-dropdown-item v-has="'/index/help/cache'" @click.native="clearCache">
        <cs-icon name="refresh" class="cs-mr-10"/>清空缓存
      </el-dropdown-item>
      <el-dropdown-item v-has="'/index/help/optimize'" @click.native="systemOptimize">
        <cs-icon name="magic" class="cs-mr-10"/>优化缓存
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="handleCreate">
        <cs-icon name="keyboard-o" class="cs-mr-10"/>修改密码
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="logOff">
        <cs-icon name="sign-out" class="cs-mr-10"/>退出账号
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog title="修改密码" width="600px" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form :model="form" :rules="rules" ref="dataForm" label-width="80px">
        <el-form-item label="原始密码" prop="passwordOld">
          <el-input v-model="form.passwordOld" @keyup.enter.native="setPassword" type="password" placeholder="原始密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" @keyup.enter.native="setPassword" type="password" placeholder="新密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" @keyup.enter.native="setPassword" type="password" placeholder="确认密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false" size="small">取消</el-button>
        <el-button type="primary" :loading="loading" @click.native="setPassword" size="small">确定</el-button>
      </div>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { clearCacheAll, setSystemOptimize } from '@/api/index'
import { setAdminPassword } from '@/api/user/admin'

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        password: '',
        passwordConfirm: '',
        passwordOld: ''
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
      'info'
    ])
  },
  methods: {
    ...mapActions('careyshop/account', [
      'logout'
    ]),
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
      this.loading = false
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
          this.loading = true
          const request = {
            client_id: this.info.admin.admin_id,
            password_old: this.form.passwordOld,
            password: this.form.password,
            password_confirm: this.form.passwordConfirm
          }

          setAdminPassword(request)
            .then(() => {
              this.dialogVisible = false
              this.$message.success('密码修改成功')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
