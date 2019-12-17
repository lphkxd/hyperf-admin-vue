<template>
  <el-dropdown placement="bottom" @command="handleChange" :show-timeout="50">
    <el-button class="btn-text can-hover" type="text" icon="el-icon-view"/>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in options"
        :key="item.value"
        :command="item.value"
        :icon="iconName(item.value)">
        {{item.label}}
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
  data() {
    return {
      options: [
        { label: '默认', value: 'default' },
        { label: '中', value: 'medium' },
        { label: '小', value: 'small' },
        { label: '最小', value: 'mini' }
      ]
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
      this.$message.success('操作成功')
    },
    iconName(name) {
      return name === this.value ? 'el-icon-check' : 'el-icon-minus'
    }
  }
}
</script>
