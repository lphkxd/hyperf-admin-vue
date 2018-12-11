<template>
  <cs-container>
    <el-card
      :model="article"
      shadow="never">
      <div slot="header" class="clearfix">
        <h2>{{article.title}}</h2>
        <span>最后编辑：{{article.update_time}}</span>
        <span>来源：<a :href="article.source_url" target="_blank">{{article.source}}</a></span>
        <span>游览量：{{article.page_views}}</span>
      </div>
      <div v-html="article.content"></div>
    </el-card>
  </cs-container>
</template>

<script>
import { mapActions } from 'vuex'
import base from './mixins/preview'

export default {
  mixins: [
    base
  ],
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter(to, from, next) {
    if (to.params.article_id) {
      // next(async vm => {
      //   await vm.loadDataFromDb(to)
      //   if (!vm.article.article_id) {
      //     vm.getArticleData(to.params.article_id)
      //       .then(() => {
      //         vm.saveDataToDb()
      //       })
      //   }
      // })
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate(to, from, next) {
    if (to.params.article_id) {
      this.loadDataFromDb(to)
      next()
    }
  },
  methods: {
    ...mapActions('careyshop/db', [
      'pageSet',
      'pageGet',
      'pageClear'
    ]),
    // 将页面数据同步到持久化存储
    saveDataToDb() {
      this.pageSet({ vm: this, user: true })
    },
    // 从持久化存储恢复数据到页面
    async loadDataFromDb(to) {
      const vm = {
        $route: { fullPath: to.fullPath },
        $data: {}
      }

      const data = await this.pageGet({ vm, user: true })
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key]
        }
      }
    }
  }
}
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }
  .clearfix{
    text-align: center;
  }
  .clearfix span, a{
    color: #909399;
    font-size: 13px;
    margin-right: 15px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
