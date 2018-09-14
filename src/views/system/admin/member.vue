<template>
  <cs-container>
    <template slot="header">header</template>
    Hello Member
    <el-button v-has="'/index/help/text'" @click.native="dialogVisible = false">测试</el-button>
    <template slot="footer">footer</template>
  </cs-container>
</template>

<script>
export default {
  name: 'test'
}
</script>

<style scoped>

</style>
