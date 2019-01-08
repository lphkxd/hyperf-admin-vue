<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <label>
      <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    </label>
  </div>
</template>

<script>
import util from '@/utils/util'
import plugins from './config/plugins'
import toolbar from './config/toolbar'

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
    }
  },
  data() {
    return {
      fullscreen: false,
      tinymceId: this.id || util.guid()
    }
  }
}
</script>

<style scoped>
  .tinymce-container {
    position: relative;
  }
  .tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
