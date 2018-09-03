<template>
  <el-button class="cs-mr btn-text can-hover" type="text" @click="handleClick">
    <cs-icon name="search" style="font-size: 18px;"/>
  </el-button>
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
