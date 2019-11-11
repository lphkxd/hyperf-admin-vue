<template>
  <div style="width: 99.75%;">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <cs-upload ref="upload" type="slot" style="display: none" @confirm="_getUploadFileList"/>
    <cs-storage ref="storage" style="display: none" @confirm="_getStorageFileList"/>
  </div>
</template>

<script>
import util from '@/utils/util'
import '@static/tinymce/tinymce.min'
import { plugins, toolbar } from './config/config'

export default {
  name: 'cs-tinymce',
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage')
  },
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
    code: {
      type: String,
      default: ''
    },
    plugins: {
      type: String,
      default: plugins
    },
    toolbar: {
      type: [Array, String, Boolean],
      default: () => { return toolbar }
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
        content_style: `
          *                   { padding:0; }
          html, body          { font-family:inherit; font-size:14px; line-height:inherit; }
          img                 { max-width:100%; display:block; height:auto; }
          a                   { text-decoration:none; }
          iframe              { width:100%; }
          p                   { line-height:1.6; }
          table               { word-wrap:break-word; word-break:break-all; max-width:100%; border:none #999; }
          .mce-object-iframe  { width:100%; box-sizing:border-box; padding:0; }
          ul,ol               { list-style-position:inside; }
        `,
        // IMAGE
        image_caption: true,
        image_advtab: true,
        // LINK
        default_link_target: '_blank',
        link_context_toolbar: true,
        // TAB
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
      window.tinymce.baseURL = 'static/tinymce'
      window.tinymce.init({
        // 默认配置
        ...this.defaultConfig,
        // 自定义配置
        ...this.config,
        // 挂载DOM对象
        selector: `#${this.tinymceId}`,
        setup: editor => {
          self.handleEditor = editor
          // 上传本地资源
          editor.addButton('upload', {
            tooltip: '从本地上传资源',
            icon: 'template',
            onclick: () => {
              self.$refs.upload.handleUploadDlg()
            }
          })
          // 资源管理选取
          editor.addButton('storage', {
            tooltip: '从资源管理选取',
            icon: 'browse',
            onclick: () => {
              self.$refs.storage.handleStorageDlg()
            }
          })
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
      this.$nextTick(() => {
        this.handleEditor.setContent(value || '')
      })
    },
    getContent() {
      return this.handleEditor.getContent()
    },
    _getUploadFileList(files) {
      let insert = ''
      // eslint-disable-next-line no-unused-vars
      for (const value of files) {
        if (value.status !== 'success') {
          continue
        }

        const response = value.response
        if (!response || response.status !== 200) {
          continue
        }

        if (response.data) {
          const file = response.data[0]
          switch (file.type) {
            case 0:
              insert += `<img src="${util.getImageCodeUrl(file.url, this.code)}" alt=""/>`
              break
            case 1:
              insert += `<p><a href="${util.getDownloadUrl(file, this.code)}">附件：${file.name}</a></p>`
              break
            case 3:
              let cover = file.cover ? util.getImageCodeUrl(file.cover) : ''
              insert += `<video poster="${cover}" controls="controls"><source src="//${file.url}" /></video>`
              break
          }
        }
      }

      if (insert.length > 0 && this.handleEditor) {
        this.handleEditor.insertContent(insert)
      }
    },
    _getStorageFileList(files) {
      let insert = ''
      // eslint-disable-next-line no-unused-vars
      for (const value of files) {
        switch (value.type) {
          case 0:
            insert += `<img src="${util.getImageCodeUrl(value.url, this.code)}" alt=""/>`
            break
          case 1:
            insert += `<p><a href="${util.getDownloadUrl(value, this.code)}">附件：${value.name}</a></p>`
            break
          case 3:
            let cover = value.cover ? util.getImageCodeUrl(value.cover) : ''
            insert += `<video poster="${cover}" controls="controls"><source src="//${value.url}" /></video>`
            break
        }
      }

      if (insert.length > 0 && this.handleEditor) {
        this.handleEditor.insertContent(insert)
      }
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
