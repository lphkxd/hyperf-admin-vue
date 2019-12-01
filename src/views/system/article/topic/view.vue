<template>
  <cs-container :is-back-to-top="true" parent-path="system-article-topic">
    <div class="cs-p">
      <el-card
        class="box-card"
        shadow="never"
        v-loading="loading">
        <div slot="header" class="clearfix">
          <h2>{{topic.title}}</h2>
          <span>创建日期：{{topic.create_time}}</span>
          <span>最后编辑：{{topic.update_time}}</span>
        </div>
        <div class="mce-content-body" v-html="topic.content"></div>
      </el-card>
    </div>
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
      loading: true
    }
  },
  watch: {
    topic_id: {
      handler() {
        this.getTopicData()
      },
      immediate: true
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
          this.topic = res.data || {}
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/fixed/tinymce.scss';

  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
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
