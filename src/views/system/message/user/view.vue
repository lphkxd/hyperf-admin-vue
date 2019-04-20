<template>
  <cs-container
    :model="message_id"
    parentPath="system-message-user"
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">

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
import { getMessageUserItem } from '@/api/message/message'

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
      scrollTop: 0,
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

      getMessageUserItem(this.message_id)
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
    max-width: 980px;
    margin-left: auto!important;
    margin-right: auto!important;
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
