<template>
  <div>
    <label>
      <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    </label>
  </div>
</template>

<script>
import util from '@/utils/util'
import '@static/tinymce/tinymce.min'
import { config, plugins, toolbar } from './config/config'

export default {
  name: 'cs-tinymce',
  props: {
    // 外部v-model值
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: plugins
    },
    toolbar: {
      type: [String, Array],
      default: toolbar
    },
    menubar: {
      type: [String, Array, Boolean],
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 300
    }
  },
  data() {
    return {
      myEditor: null,
      tinymceId: this.id || util.guid()
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const self = this
      // https://juejin.im/entry/5be91af8f265da614f6fd529
      window.tinymce.baseURL = '/static/tinymce'
      window.tinymce.init({
        // 默认配置
        selector: `#${this.tinymceId}`,
        // language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        // skin_url: '/static/tinymce/skins/lightgray',
        height: this.height,
        plugins: 'visualblocks'
      })
    },
    destroyTinymce() {
      this.$emit('on-destroy')
      window.tinymce.remove(`#${this.tinymceId}`)
    },
    setContent(value) {
      this.myEditor.setContent(value)
    },
    getContent() {
      return this.myEditor.getContent()
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
  .tinymce-textarea {
    display: none;
    z-index: -1;
  }
</style>
