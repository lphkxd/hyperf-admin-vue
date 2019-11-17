<template>
  <div style="line-height: 0;">
    <ul class="el-upload-list el-upload-list--picture-card">
      <draggable v-model="imageList" class="dragArea">
        <li
          v-for="(item, index) in value"
          :key="index"
          class="el-upload-list__item is-success animated">
          <div class="thumbnail">
            <el-image :src="item.source | getPreviewUrl" fit="contain"/>
          </div>

          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-delete">
              <i class="el-icon-zoom-in" @click="preview(index)"></i>
            </span>

            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete" @click="remove(index)"></i>
            </span>
          </span>
        </li>
      </draggable>
    </ul>
    <slot name="upload"></slot>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import util from '@/utils/util'

export default {
  name: 'cs-photo',
  components: {
    draggable
  },
  props: {
    // 外部v-model值
    value: {
      type: Array,
      default: () => []
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
</style>
