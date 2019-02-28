<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-topic"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-edit
      state="update"
      :loading="loading"
      :formData="formData">
    </page-edit>

  </cs-container>
</template>

<script>
import { getTopicItem } from '@/api/article/topic'

export default {
  name: 'system-article-topic-update',
  components: {
    'PageEdit': () => import('./components/PageEdit')
  },
  props: {
    topic_id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      scrollTop: 0,
      // 加载状态
      loading: true,
      // 表单数据
      formData: {},
      // 表单数据缓存
      formBuffer: []
    }
  },
  methods: {
    switchData(id) {
      // 缓存存在则返回缓存数据(已加工数据)
      if (this.formBuffer[id]) {
        this.formData = this.formBuffer[id]
        return
      }

      // 否则从服务器上获取数据(未加工原始数据)
      this.$nextTick(() => {
        this.loading = true
      })

      getTopicItem(id)
        .then(res => {
          this.formBuffer[id] = {
            ...res.data,
            status: res.data.status.toString()
          }
          this.formData = this.formBuffer[id]
        })
        .finally(() => {
          this.$nextTick(() => {
            this.loading = false
          })
        })
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.topic_id) {
      next(instance => { instance.switchData(to.params.topic_id) })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.topic_id) {
      this.switchData(to.params.topic_id)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  }
}
</script>
