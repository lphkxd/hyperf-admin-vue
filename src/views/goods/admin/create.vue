<template>
  <cs-container :is-back-to-top="true" parent-path="goods-admin-list">
    <page-edit
      ref="create"
      :confirm-loading.sync="loading"
      state="create"
      @close="handleClose">
    </page-edit>

    <template
      ref="footer"
      slot="footer">
      <div style="margin: -10px 0;">
        <el-button type="primary" :loading="loading" size="small" @click="handleConfirm">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </div>
    </template>
  </cs-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'goods-admin-create',
  components: {
    'PageEdit': () => import('./components/PageEdit')
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions('careyshop/page', [
      'close'
    ]),
    // 请求提交
    handleConfirm() {
      this.$refs.create.handleConfirm()
    },
    // 关闭当前窗口
    handleClose() {
      this.close({
        tagName: this.$route.fullPath
      })
    }
  }
}
</script>
