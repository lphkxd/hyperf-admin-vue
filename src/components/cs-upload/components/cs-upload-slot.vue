<template>
  <div>
    <slot name="control"/>
    <el-dialog :visible.sync="visible">
      okok
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'cs-upload-slot',
  data() {
    return {
      visible: false
    }
  }
}
</script>
