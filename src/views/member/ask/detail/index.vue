<template>
  <cs-container :is-back-to-top="true" parent-path="member-ask-list">
    <page-main
      :loading="loading"
      :table-data="table"
      @reply="addReply">
    </page-main>
  </cs-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getAskItem } from '@/api/user/ask'

export default {
  name: 'member-ask-detail',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      // 加载状态
      loading: true,
      // 表格数据
      table: this.getInitData(),
      // 表格缓存数据
      tableBuffer: []
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.ask_id) {
      next(instance => { instance.switchData(to.params.ask_id) })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.ask_id) {
      this.switchData(to.params.ask_id)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  },
  methods: {
    ...mapActions('careyshop/update', [
      'updateData'
    ]),
    getInitData() {
      return {
        type: null,
        status: null
      }
    },
    switchData(id) {
      // 缓存存在则返回缓存数据
      if (this.tableBuffer[id]) {
        this.table = this.tableBuffer[id]
        return
      }

      // 否则从服务器上获取数据
      this.$nextTick(() => {
        this.loading = true
        this.table = { ...this.getInitData() }
      })

      getAskItem(id)
        .then(res => {
          this.tableBuffer[id] = { ...res.data }
          this.table = this.tableBuffer[id]
        })
        .finally(() => {
          this.$nextTick(() => {
            this.loading = false
          })
        })
    },
    addReply(id, data) {
      this.tableBuffer[id].status = 1
      this.tableBuffer[id].get_items.push({ ...data })

      this.updateData({
        type: 'set',
        name: 'member-ask-list',
        srcId: id,
        data: {
          status: 1
        }
      })
    }
  }
}
</script>
