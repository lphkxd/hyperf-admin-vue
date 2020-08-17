<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <v-table
          ref="refTable"
          :key="table.key"
          :table-header="table.tableHeader"
          :table-data="table.tableData"
          :filter-rule="table.filterRule"
          :row-actions="table.rowActions"
          :selection-able="true"
          :options="table.options"
          :list-api="table.listApi"
        />
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import VTable from '@/components/scaffold/VTable.vue'

export default {
  components: { VTable },
  data() {
    return {
      editTabModel: false,
      tabs: [
        { value: 'inner_code', label: '设备编号' },
        { value: 'inner_code', label: '设备编号' },
        { value: 'inner_code', label: '设备编号' }
      ],
      fullTabs: [
      ],
      tabLoading: false,
      tableHeader: [
        { field: 'inner_code', title: '设备编号' },
        { field: 'node_address', title: '地址' },
        { field: 'status', title: '状态', type: 'switch' }
      ],
      tabCell: {},
      table: {
        listApi: '/machine/list',
        tableData: [],
        tableHeader: [
          { field: 'inner_code', title: '名称' },
          { field: 'status', title: '状态', type: 'switch' }
        ],
        rowActions: [
          {
            type: 'info',
            target: '/soagov/service/detail/{name}',
            text: '详情'
          }
        ],
        options: {
          createAble: false,
          exportAble: false,
          filterSyncToQuery: false
        },
        key: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
