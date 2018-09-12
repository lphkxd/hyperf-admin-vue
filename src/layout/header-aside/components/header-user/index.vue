<template>
  <el-dropdown class="cs-mr">
    <span class="btn-text">您好 {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="$open('/')">
        <cs-icon name="external-link-square" class="cs-mr-10"/>打开前台
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="clearCache">
        <cs-icon name="refresh" class="cs-mr-10"/>清空缓存
      </el-dropdown-item>
      <el-dropdown-item @click.native="systemOptimize">
        <cs-icon name="magic" class="cs-mr-10"/>最优设置
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="dialogVisible = true">
        <cs-icon name="keyboard-o" class="cs-mr-10"/>修改密码
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="logOff">
        <cs-icon name="sign-out" class="cs-mr-10"/>退出账号
      </el-dropdown-item>
    </el-dropdown-menu>

    <el-dialog title="修改密码" width="600px" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form :model="form" :rules="passwordOld" ref="form" label-width="80px">
        <el-form-item label="原密码" prop="passwordOld">
          <el-input v-model="form.passwordOld" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { clearCacheAll, setSystemOptimize } from '@/api/index'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        password: '',
        passwordConfirm: '',
        passwordOld: ''
      },
      rules: {
        password: [
          {
            required: true
          }
        ],
        passwordConfirm: [
          {
            required: true
          }
        ],
        passwordOld: [
          {
            required: true,
            message: '原始密码',
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
    }
  }
}
</script>
