<template>
  <el-page-header @back="goBack">
    <template slot="content">
      <span>{{title}}</span>
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
