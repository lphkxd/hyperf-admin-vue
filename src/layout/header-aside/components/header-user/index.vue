<template>
  <el-dropdown class="cs-mr">
    <span class="btn-text">您好 {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <cs-icon name="power-off" class="cs-mr-5"/>
        注销
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
    }
  }
}
</script>
