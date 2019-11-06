<template>
  <cs-container :is-back-to-top="true" parent-path="goods-admin-list">
    <page-edit state="create">
    </page-edit>

    <template
      ref="footer"
      slot="footer">
      <div style="margin: -10px 0;">
        <el-button type="primary" size="small" @click="() => {}">确定</el-button>
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
    }
  },
  methods: {
    ...mapActions('careyshop/page', [
      'close'
    ]),
    // 关闭当前窗口
    handleClose() {
      this.close({
        tagName: this.$route.fullPath
      })
    }
  }
}
</script>
