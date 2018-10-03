<template>
  <el-dropdown placement="bottom" @command="handleChange">
    <el-button class="cs-mr btn-text can-hover" type="text">
      <cs-icon name="font" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="default">
        <cs-icon :name="iconName('default')" class="cs-mr-5"/>默认
      </el-dropdown-item>
      <el-dropdown-item command="medium">
        <cs-icon :name="iconName('medium')" class="cs-mr-5"/>中
      </el-dropdown-item>
      <el-dropdown-item command="small">
        <cs-icon :name="iconName('small')" class="cs-mr-5"/>小
      </el-dropdown-item>
      <el-dropdown-item command="mini">
        <cs-icon :name="iconName('mini')" class="cs-mr-5"/>最小
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'cs-header-size',
  computed: {
    ...mapState('careyshop/size', [
      'value'
    ])
  },
  watch: {
    // 注意 这里是关键
    // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
    value: {
      handler(val) {
        if (this.$ELEMENT.size !== val) {
          // 设置 element 全局尺寸
          this.$ELEMENT.size = val
          // 清空缓存设置
          this.pageKeepAliveClean()
          // 刷新此页面
          const { path, query } = this.$route
          this.$router.replace({
            path: '/redirect/' + JSON.stringify({ path, query })
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'careyshop/page/keepAliveClean'
    }),
    ...mapActions({
      sizeSet: 'careyshop/size/set'
    }),
    handleChange(value) {
      this.sizeSet(value)
    },
    iconName(name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    }
  }
}
</script>
