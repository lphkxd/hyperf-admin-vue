<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true"
    width="600px">
    <div style="margin-top: -25px;">
      <el-divider>所辖区域</el-divider>
      <el-tag
        v-for="item in value"
        :key="item.region_id"
        class="cs-mr-10"
        effect="plain"
        type="info"
        @close="handleClose(item)"
        closable>
        {{item.name}}
      </el-tag>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 外部v-model值
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    // 确认按钮事件
    confirm: {
      type: Function
    }
  },
  data() {
    return {
      areaId: 0,
      visible: false,
      loading: false
    }
  },
  methods: {
    // 初始化弹出对话框
    handleRegionDlg(id) {
      this.areaId = id
      this.loading = false
      this.visible = true
    },
    // 移除一个区域
    handleClose(tag) {
      this.value.splice(this.value.indexOf(tag), 1)
    }
  }
}
</script>
