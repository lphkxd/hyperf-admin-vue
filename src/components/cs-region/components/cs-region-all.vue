<template>
  <div class="region-control" @click="visible = true">
    <slot name="control"/>

    <el-dialog
      width="600px"
      :visible.sync="visible"
      :append-to-body="true"
      @open="handleOpen">

      <el-tree
        v-if="visible"
        v-loading="loading"
        node-key="region_id"
        :data="treeData"
        :props="treeProps"
        :default-checked-keys="checkedKeys"
        :close-on-click-modal="false"
        :show-checkbox="true"
        style="margin-top: -15px;"
        ref="tree"/>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="visible = false"
          size="small">取消</el-button>

        <el-button
          @click="handleConfirm"
          type="primary"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import { getRegionSonList } from '@/api/logistics/region'

export default {
  name: 'cs-storage-all',
  props: {
    // 选中节点
    checkedKeys: {
      type: Array,
      required: false,
      default: () => []
    },
    // 默认上级编号
    regionId: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      treeData: [],
      treeProps: {
        label: 'region_name',
        children: 'children'
      }
    }
  },
  methods: {
    // 打开对话框
    handleOpen() {
      if (this.treeData.length > 0) {
        return
      }

      this.loading = true
      getRegionSonList({ region_id: this.regionId })
        .then(res => {
          const setParent = { key: 'parent_id', value: [this.regionId] }
          this.treeData = util.formatDataToTree(res.data, 'region_id', 'parent_id', setParent)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 确认提交
    handleConfirm() {
      // 向父级组件返回数据
      if (this.$refs.tree) {
        this.$emit('confirm', this.$refs.tree.getCheckedKeys())
      }
    }
  }
}
</script>

<style scoped>
  .region-control {
    width: auto;
    display: inline;
  }
</style>
