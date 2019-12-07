<template>
  <div style="max-width: 60%">
    <el-tag
      v-for="(item, index) in value"
      :key="index"
      :effect="effect"
      :type="type"
      :disable-transitions="disableTransitions"
      :hit="hit"
      :size="size"
      closable
      class="cs-mr-10"
      @close="handleClose(index)">
      {{item}}
    </el-tag>

    <el-input
      v-if="inputVisible"
      v-model="inputValue"
      class="input-new-tag"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm()"
      @blur="handleInputConfirm"/>

    <el-button
      v-else
      class="button-new-tag"
      size="small"
      @click="showInput">{{addName}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'cs-tab-edit',
  props: {
    // 外部v-model值
    value: {
      type: Array,
      default: () => []
    },
    // 新增按钮名称
    addName: {
      type: String,
      default: '+ New Tag'
    },
    // 主题样式
    type: {
      type: String,
      default: ''
    },
    // 主题风格
    effect: {
      type: String,
      default: 'light'
    },
    // 是否禁用渐变动画
    disableTransitions: {
      type: Boolean,
      default: true
    },
    // 是否有边框描边
    hit: {
      type: Boolean,
      default: false
    },
    // 尺寸
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: '',
      inputVisible: false
    }
  },
  methods: {
    handleClose(index) {
      let data = this.value
      data.splice(index, 1)
      this.$emit('input', data)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        let data = this.value
        data.push(inputValue)
        this.$emit('input', data)
      }

      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
</style>
