<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      :module="module"
      :group="group"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :tree-data="tree"
      :loading="loading"
      :module="module"
      :group="group"
      @refresh="handleRefresh"/>
  </cs-container>
</template>

<script>
import { getMenuModule } from '@/api/auth/menu'
import { getAuthGroupList } from '@/api/auth/group'
import { getAuthRuleList } from '@/api/auth/rule'

export default {
  name: 'system-auth-rule',
  components: {
    'PageHeader': () => import('./componnets/PageHeader'),
    'PageMain': () => import('./componnets/PageMain')
  },
  data() {
    return {
      loading: false,
      tree: [],
      module: {},
      group: {}
    }
  },
  mounted() {
    this.initialization()
  },
  methods: {
    // 数据初始加载
    initialization() {
      Promise.all([
        getMenuModule(),
        getAuthGroupList({ status: 1 })
      ])
        .then(res => {
          this.module = res[0]
          res[1].data.forEach(value => {
            this.group[value.group_id] = value
          })
        })
        .then(() => {
          this.handleSubmit()
        })
    },
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form) {
      this.loading = true
      getAuthRuleList(form)
        .then(res => {
          this.tree = []
          let mapModule = []

          for (const index in this.module) {
            if (!this.module.hasOwnProperty(index)) {
              continue
            }

            if (form && form.module) {
              if (form.module !== index) {
                continue
              }
            }

            mapModule[index] = this.tree.push({
              rule_id: index,
              name: this.module[index],
              children: [],
              system: true,
              module: index,
              status: 1
            })
          }

          if (res.data.length > 0) {
            res.data.forEach(value => {
              this.tree[mapModule[value.module] - 1].children.push(value)
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
