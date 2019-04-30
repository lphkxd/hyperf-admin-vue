<template>
  <cs-container :is-back-to-top="true" parent-path="system-message-send">
    <div class="cs-p">
      <el-card
        class="box-card"
        shadow="never"
        v-loading="loading">
        <div slot="header" class="clearfix">
          <h2>{{message.title}}</h2>
          <span>最后编辑：{{message.update_time}}</span>
          <span>游览量：{{message.page_views}}</span>
        </div>
        <div class="mce-content-body" v-html="message.content"></div>
      </el-card>
    </div>
  </cs-container>
</template>

<script>
import { getMessageItem } from '@/api/message/message'

export default {
  props: {
    message_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      message: {},
      loading: true
    }
  },
  watch: {
    message_id: {
      handler() {
        this.getMessageData()
      },
      immediate: true
    }
  },
  methods: {
    resetMessageData() {
      this.message = {}
    },
    getMessageData() {
      this.loading = true
      this.resetMessageData()

      getMessageItem(this.message_id)
        .then(res => {
          this.message = res.data
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
