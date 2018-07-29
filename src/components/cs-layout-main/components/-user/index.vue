<template>
  <el-dropdown class="cs-mr">
    <span class="btn-text">您好 {{username}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff"><cs-icon name="power-off"/> 注销</el-dropdown-item>
      <el-dropdown-item><cs-icon name="user-circle-o"/> 个人中心</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  // 插件
  import Cookies from 'vue-cookies'
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState({
        username: state => state.careyshop.username
      })
    },
    methods: {
      ...mapMutations([
        'dbRemoveByUuid'
      ]),
      logOff() {
        this.$confirm('注销此账户吗?', '注销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除用户名
          this.dbRemoveByUuid({
            key: 'username',
            emptyValue: ''
          })
          // 删除cookie
          Cookies.remove('token')
          Cookies.remove('uuid')
          // 跳转路由
          this.$router.push({
            name: 'login'
          })
        }).catch(() => {
          // 取消了注销
        })
      }
    }
  }
</script>
