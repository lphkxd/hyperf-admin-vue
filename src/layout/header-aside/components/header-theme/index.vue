<template>
  <div>
    <el-tooltip effect="dark" content="主题" placement="bottom">
      <el-button class="cs-ml-0 cs-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <cs-icon name="diamond" style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      title="主题"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false">
      <cs-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/cs-theme-list'
export default {
  components: {
    'cs-theme-list': themeList
  },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
