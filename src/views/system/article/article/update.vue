<template>
  <cs-container
    :scrollTop="scrollTop"
    parentPath="system-article-article"
    @scroll="(move) => {this.scrollTop = move.y}">

    <page-edit
      state="update"
      :loading="loading"
      :catList="catList"
      :catData="catData"
      :formData="formData">
    </page-edit>

  </cs-container>
</template>

<script>
import util from '@/utils/util'
import { getArticleCatList } from '@/api/article/cat'
import { getArticleItem } from '@/api/article/article'

export default {
  name: 'system-article-update',
  components: {
    'PageEdit': () => import('./componnets/PageEdit')
  },
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      scrollTop: 0,
      // 加载状态
      loading: false,
      // 分类源数据
      catList: [],
      // 整理后的分类数据
      catData: [],
      // 表单数据
      formData: {},
      // 表单数据缓存
      formBuffer: []
    }
  },
  methods: {
    setArticleData(data) {
      const article = [...data]

      // 封面处理
      // if (article.image.length) {
      //   article.image.forEach(value => {
      //     value.url = '//' + value.url
      //   })
      // }

      // 分类处理

      return article
    },

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

      if (this.catList.length) {
        // 分类数据已存在时
        getArticleItem(id)
          .then(res => {
            this.formBuffer[id] = this.setArticleData(res.data)
            this.formData = this.formBuffer[id]
          })
          .finally(() => {
            this.$nextTick(() => {
              this.loading = false
            })
          })
      } else {
        // 分类数据不存在时
        Promise.all([
          getArticleCatList(null),
          getArticleItem(id)
        ])
          .then(res => {
            // 处理分类数据
            this.catList = res[0].data || []
            if (this.catList.length) {
              this.catData = util.formatDataToTree(this.catList, 'article_cat_id')
            }

            // 处理文章数据
            this.formBuffer[id] = this.setArticleData(res[1].data)
            this.formData = this.formBuffer[id]
          })
          .finally(() => {
            this.$nextTick(() => {
              this.loading = false
            })

            console.log(this)
          })
      }
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.article_id) {
      next(vm => {
        vm.switchData(to.params.article_id)
      })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.article_id) {
      this.switchData(to.params.article_id)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  }
}
</script>
