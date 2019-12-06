<template>
  <div style="line-height: 0;">
    <draggable
      v-model="imageList"
      class="el-upload-list el-upload-list--picture-card"
      tag="ul"
      @start="drag = true"
      @end="drag = false">
      <li
        v-for="(item, index) in value"
        :key="index"
        class="el-upload-list__item">
        <div class="thumbnail">
          <el-image :src="item.source | getPreviewUrl" fit="contain"/>
        </div>

        <span v-show="!drag" class="el-upload-list__item-actions cs-cm">
            <span class="el-upload-list__item-delete">
              <i class="el-icon-zoom-in" @click="preview(index)"/>
            </span>

            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete" @click="remove(index)"/>
            </span>
          </span>
      </li>
    </draggable>
    <slot name="upload"/>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  name: 'cs-photo',
  components: {
    'draggable': () => import('vuedraggable')
  },
  props: {
    // 外部v-model值
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drag: false
    }
  },
  filters: {
    getPreviewUrl(val) {
      const style = '&size[]=146'
      return util.getImageStyleUrl(val, style)
    }
  },
  computed: {
    imageList: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    preview(index) {
      this.$preview(this.imageList[index].url)
    },
    remove(index) {
      this.imageList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .thumbnail {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 146px;
    height: 146px;
    overflow: hidden;
  }
  .sortable-ghost {
    opacity: 0;
  }
</style>
