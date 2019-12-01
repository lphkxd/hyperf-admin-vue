<template>
  <cs-container :is-back-to-top="true">
    <page-main
      :tree-data="tree"
      :loading="loading"
      @refresh="handleRefresh"
      ref="main"/>
  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getRegionSonList } from '@/api/logistics/region'

export default {
  name: 'setting-logistics-region',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: true
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 提交查询请求
    handleSubmit() {
      this.loading = true
      getRegionSonList({ region_id: 1 }) // 默认只获取中国区域
        .then(res => {
          const setParent = { key: 'parent_id', value: [1] }
          this.tree = util.formatDataToTree(res.data, 'region_id', 'parent_id', setParent)

          if (this.$refs.main) {
            this.$refs.main.filterText = ''
            this.$refs.main.resetForm()
            this.$refs.main.resetElements()
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
