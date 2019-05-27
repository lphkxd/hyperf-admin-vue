<template>
  <div @click="visible = true">
    <slot name="control"/>

    <el-dialog
      width="600px"
      :visible.sync="visible"
      :append-to-body="true"
      @open="openDialog">
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import { getRegionSonList } from '@/api/logistics/region'

export default {
  name: 'cs-storage-all',
  props: {
    // 外部v-model值
    value: {
      type: Array,
      required: false,
      default: () => []
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
    // 打开对话框初始化
    openDialog() {
      console.log('okok')
    }
  }
}
</script>
