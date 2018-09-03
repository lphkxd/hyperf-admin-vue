<template>
  <el-tooltip effect="dark" content="搜索" placement="bottom">
    <el-button class="cs-mr btn-text can-hover" type="text" @click="handleClick">
      <cs-icon name="search" style="font-size: 18px;"/>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
