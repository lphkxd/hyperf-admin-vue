<template>
  <label>
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
  </label>
</template>

<script>
import util from '@/utils/util'
import '@static/tinymce/tinymce.min'
import { plugins, toolbar } from './config/config'

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
    plugins: {
      type: String,
      default: plugins
    },
    toolbar: {
      type: [String, Boolean],
      default: toolbar
    },
    menubar: {
      type: [String, Boolean],
      default: true
    },
    height: {
      type: Number,
      default: 300
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      handleEditor: null,
      tinymceId: this.id || util.guid(),
      defaultConfig: {
        // GLOBAL
        theme: 'modern',
        language: 'zh_CN',
        branding: false,
        height: this.height,
        menubar: this.menubar,
        toolbar: this.toolbar,
        plugins: this.plugins,
        // CONFIG
        forced_root_block: '',
        force_p_newlines: false,
        importcss_append: false,
        nonbreaking_force_tab: true,
        toolbar_items_size: 'small',
        autosave_ask_before_unload: false,
        content_style: 'html, body { font-family:inherit; font-size: 14px; line-height:inherit; }',
        // IMAGE
        image_caption: true,
        image_advtab: true,
        // LINK
        default_link_target: '_blank',
        link_context_toolbar: true,
        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // FontSize
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 36px',
        // FontSelect
        font_formats: `
          微软雅黑=微软雅黑;
          宋体=宋体;
          黑体=黑体;
          仿宋=仿宋;
          楷体=楷体;
          隶书=隶书;
          幼圆=幼圆;
          Andale Mono=andale mono,times;
          Arial=arial, helvetica,
          Arial Black=arial black, avant garde;
          Comic Sans MS=comic sans ms,sans-serif;
          Impact=impact,chicago;
          Times New Roman=times new roman,times`
      }
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
        ...this.defaultConfig,
        // 自定义配置
        ...this.config,
        // 挂载DOM对象
        selector: `#${this.tinymceId}`,
        setup: editor => {
          self.handleEditor = editor
          editor.on(
            'init', () => {
              self.loading = true
              self.$emit('on-ready') // 抛出 'on-ready' 事件钩子
              editor.setContent(self.value)
              self.loading = false
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.$emit('input', editor.getContent())
            }
          )
        }
      })
    },
    destroyTinymce() {
      this.$emit('on-destroy')
      window.tinymce.remove(`#${this.tinymceId}`)
    },
    setContent(value) {
      this.handleEditor.setContent(value)
    },
    getContent() {
      return this.handleEditor.getContent()
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
