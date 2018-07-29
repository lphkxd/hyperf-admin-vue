<template>
  <div>
    <el-tooltip effect="dark" content="主题" placement="bottom">
      <el-button class="cs-ml-0 cs-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <cs-icon name="diamond" style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog title="主题" width="600px" :visible.sync="dialogVisible">
      <cs-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    }
  }
</script>
