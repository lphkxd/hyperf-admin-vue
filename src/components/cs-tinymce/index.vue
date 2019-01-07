<template>
  <div class="tinymce-editor">
    <editor
      v-if="active"
      v-model="content"
      :disabled="disabled"
      :init="init">
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import plugins from './config/plugins'
import toolbar from './config/toolbar'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  name: 'cs-tinymce',
  components: {
    Editor
  },
  props: {
    // 外部v-model值
    value: {
      type: String,
      default: ''
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
    }
  },
  data() {
    return {
      active: true,
      // 富文本内容
      content: this.value,
      // 初始化配置
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false
      }
    }
  },
  mounted() {
    tinymce.init({})
  },
  activated() {
    this.active = true
  },
  deactivated() {
    this.active = false
  },
  methods: {
  },
  watch: {
    content(val) {
      this.$emit('input', val)
    }
  }
}
</script>
