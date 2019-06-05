<template>
  <el-page-header @back="goBack">
    <template slot="content">
      <span>{{title ? `${title} 配送区域` : ''}}</span>
    </template>
  </el-page-header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'setting-logistics-delivery'
      })
    }
  }
}
</script>

<style scoped>
</style>
