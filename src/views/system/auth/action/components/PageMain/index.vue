<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true"
      @sort-change="sortChange">

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="账号类型"
        prop="client_type"
        sortable="custom">
        <template slot-scope="scope">
          {{group[scope.row.client_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="动作"
        prop="action"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="路径"
        prop="path"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="IP"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.ip"
            :content="scope.row.ip"
            placement="top">
            <i class="el-icon-location"/>
          </el-tooltip>
          {{scope.row.ip_region}}
        </template>
      </el-table-column>

      <el-table-column
        label="请求参数"
        align="center"
        width="80">
        <template slot-scope="scope">
          <el-tag
            @click.native="getObjectToJson(scope.$index, 'params')"
            class="cs-cp"
            size="mini"
            type="info">详细</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="处理结果"
        align="center"
        width="80">
        <template slot-scope="scope">
          <el-tag
            @click.native="getObjectToJson(scope.$index, 'result')"
            class="cs-cp"
            size="mini"
            type="info">详细</el-tag>
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
            :type="scope.row.status ? 'warning' : 'success'"
            effect="plain">
            {{statusMap[scope.row.status]}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
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
      :close-on-click-modal="false"
      width="600px">
      <cs-highlight :code="dialogJson" style="margin-top: -25px;"/>

      <div slot="footer" class="dialog-footer">
        <div class="cs-fl">
          <el-button
            @click="copyData(dialogJson)"
            size="small">复制</el-button>
        </div>

        <el-button
          @click.native="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          @click.native="dialogFormVisible = false"
          type="primary"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as clipboard from 'clipboard-polyfill'

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

      if (column && order) {
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
    },
    copyData(val) {
      clipboard.writeText(val)
        .then(() => {
          this.$message.success('已复制到剪贴板')
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>
