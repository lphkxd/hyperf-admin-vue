<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'player',
  data() {
    return {
      dialogVisible: false,
      dialogVideoUrl: '',
      dialogVideoMime: ''
    }
  },
  methods: {
    show(url, mime) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.dialogVideoUrl = url
        this.dialogVideoMime = mime
      })
    },
    close() {
      this.dialogVisible = false
      this.dialogVideoUrl = ''
      this.dialogVideoMime = ''
    }
  }
}
</script>

<style scoped>
</style>
