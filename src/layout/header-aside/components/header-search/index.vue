<template>
  <el-tooltip effect="dark" content="搜索" placement="bottom">
    <el-button class="btn-text can-hover" type="text" @click="handleClick" icon="el-icon-search"/>
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
