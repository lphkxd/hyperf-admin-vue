<template>
  <cs-container
    :model="topic_id"
    parentPath="system-article-topic"
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div
        slot="header"
        class="clearfix">
        <h2>{{topic.title}}</h2>
        <span>创建日期：{{topic.create_time}}</span>
        <span>最后编辑：{{topic.update_time}}</span>
      </div>
      <div class="mce-content-body" v-html="topic.content"></div>
    </el-card>
  </cs-container>
</template>

<script>
import { getTopicItem } from '@/api/article/topic'

export default {
  props: {
    topic_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      topic: {},
      scrollTop: 0,
      loading: false
    }
  },
  mounted() {
    this.getTopicData()
  },
  watch: {
    topic_id: {
      handler() {
        this.getTopicData()
      }
    }
  },
  methods: {
    resetTopicData() {
      this.topic = {}
    },
    getTopicData() {
      this.loading = true
      this.resetTopicData()

      getTopicItem(this.topic_id)
        .then(res => {
          this.topic = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    border-radius: 0;
  }
  .clearfix{
    text-align: center;
  }
  .clearfix span, a{
    color: $color-text-sub;
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

<style scoped>
  .mce-content-body {
    padding: 0;
  }
  .mce-content-body>>>html, body {
    font-family: inherit;
    font-size: 14px;
    line-height: inherit;
  }
  .mce-content-body>>>img {
    max-width: 100%;
    display: block;
    height: auto;
  }
  .mce-content-body>>>a {
    text-decoration: none;
  }
  .mce-content-body>>>iframe {
    width: 100%;
  }
  .mce-content-body>>>p {
    line-height: 1.6;
  }
  .mce-content-body>>>table {
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
    border: none #999;
  }
  .mce-content-body>>>.mce-object-iframe{
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }
  .mce-content-body>>>ul, ol{
    list-style-position: inside;
  }
</style>
