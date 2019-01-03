<template>
  <div style="width: 0;" @click="handleCreate">
    <slot name="control"/>
    <el-dialog
      width="600px"
      :visible.sync="visible"
      :append-to-body="true">

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="visible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          size="small">确定</el-button>
      </div>
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
  },
  methods: {
    handleCreate() {
      this.visible = true
    }
  }
}
</script>
