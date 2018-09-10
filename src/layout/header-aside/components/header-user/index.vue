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
      <el-dropdown-item divided @click.native="setPassWord">
        <cs-icon name="keyboard-o" class="cs-mr-10"/>修改密码
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="logOff">
        <cs-icon name="sign-out" class="cs-mr-10"/>退出账号
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
    },
    /**
     * 最优设置
     */
    systemOptimize() {
    }
  }
}
</script>
