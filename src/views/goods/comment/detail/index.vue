<template>
  <cs-container :is-back-to-top="true" parent-path="goods-opinion-comment">
    <page-main
      :loading="loading"
      :table-data="table"
      @reply="addReply">
    </page-main>
  </cs-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getGoodsCommentItem } from '@/api/goods/comment'

export default {
  name: 'goods-opinion-comment-detail',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  props: {
    goods_comment_id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      // 加载状态
      loading: true,
      // 表格数据
      table: this.getInitData(),
      // 表格缓存数据
      tableBuffer: [],
      // 判断是否路由进入
      isSourceRoute: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.isSourceRoute && !this.tableBuffer.length) {
        this.switchData(this.goods_comment_id)
      }
    })
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.goods_comment_id) {
      next(instance => {
        instance.switchData(to.params.goods_comment_id)
        instance.isSourceRoute = true
      })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.goods_comment_id) {
      this.switchData(to.params.goods_comment_id)
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
        status: null,
        create_time: '',
        get_user: {},
        get_order_goods: {}
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

      getGoodsCommentItem(id)
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
      if (data.type === 1) {
        this.tableBuffer[id].get_main_reply.push({ ...data })
      }

      if (data.type === 3) {
        this.tableBuffer[id].get_addition_reply.push({ ...data })
      }

      this.tableBuffer[id].status = 1
      this.updateData({
        type: 'set',
        name: 'goods-opinion-comment',
        srcId: id,
        data: {
          status: 1
        }
      })
    }
  }
}
</script>
