<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      stripe
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column
        label="编号"
        width="100"
        prop="action_log_id"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="账号类型"
        width="100"
        prop="client_type"
        sortable="custom">
        <template slot-scope="scope">
          {{group[scope.row.client_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        width="110"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="动作"
        prop="action">
      </el-table-column>

      <el-table-column
        label="路径"
        prop="path"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="请求参数"
        align="center"
        width="80"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="info"
            style="cursor: pointer;"
            @click.native="getObjectToJson(scope.$index, 'params')">
            详细
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="处理结果"
        align="center"
        width="80"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="info"
            style="cursor: pointer;"
            @click.native="getObjectToJson(scope.$index, 'result')">
            详细
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
        width="75"
        prop="status"
        sortable="custom">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.status ? 'warning' : 'success'">
            {{statusMap[scope.row.status]}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="IP"
        prop="ip"
        width="130">
      </el-table-column>

      <el-table-column
        label="创建时间"
        prop="create_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>

    </el-table>

    <el-dialog
      :title="jsonMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="600px">
      <el-card shadow="never">
        <cs-highlight :code="dialogJson"/>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    group: {
      default: () => []
    }
  },
  data() {
    return {
      statusMap: {
        0: '成功',
        1: '失败'
      },
      jsonMap: {
        params: '请求参数',
        result: '处理结果'
      },
      dialogJson: '',
      dialogStatus: '',
      dialogFormVisible: false
    }
  },
  methods: {
    // 获取排序字段
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 从结果集中获取JSON数据
    getObjectToJson(index, type) {
      this.dialogJson = JSON.stringify(this.tableData[index][type], null, 2)
      this.dialogStatus = type
      this.dialogFormVisible = true
    }
  }
}
</script>
