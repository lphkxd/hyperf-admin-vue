<template>
  <div style="line-height: 0;">
    <draggable
      v-model="imageList"
      v-bind="{scroll: true, animation: 400}"
      class="el-upload-list el-upload-list--picture-card"
      tag="ul"
      :disabled="!isMove"
      @start="drag = true"
      @end="drag = false">
      <li
        v-for="(item, index) in value"
        :key="index"
        class="el-upload-list__item"
        :style="`width:${width}px; height:${height}px;`">
        <div class="thumbnail" :style="`width:${width}px; height:${height}px;`">
          <el-image :src="item.source | getPreviewUrl(width, height)" fit="fill"/>
        </div>

        <span v-show="!drag" :class="{'el-upload-list__item-actions': true, 'cs-cm': isMove}">
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
    },
    width: {
      default: 148
    },
    height: {
      default: 148
    },
    isMove: {
      default: true
    }
  },
  data() {
    return {
      drag: false
    }
  },
  filters: {
    getPreviewUrl(val, width, height) {
      return util.getImageStyleUrl(val, `&size[]=${width}&size[]=${height}`)
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

<style lang="scss" scoped>
  .thumbnail {
    @extend %flex-center-col;
  }
  .sortable-ghost {
    opacity: 0;
  }
</style>
