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
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="账号类型"
        prop="client_type"
        width="100"
        sortable="custom">
        <template slot-scope="scope">
          {{group[scope.row.client_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="访问路径"
        prop="path"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="模型"
        prop="module"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="请求参数"
        prop="params"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.params}}
        </template>
      </el-table-column>

      <el-table-column
        label="处理结果"
        prop="result"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.result}}
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        align="center"
        sortable="custom">
        <template slot-scope="scope">
          {{statusMap[scope.row.status]}}
        </template>
      </el-table-column>

      <el-table-column
        label="IP"
        prop="ip"
        width="150">
      </el-table-column>

      <el-table-column
        label="创建时间"
        prop="create_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>

    </el-table>
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
      }
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
    tmep() {
      // util.objectToString = (data, length = 0, omitted = '...') => {
      //   if (typeof data !== 'object') {
      //     return data
      //   }
      //
      //   let jsonText = ''
      //   try {
      //     jsonText = JSON.stringify(data)
      //     if (length > 0) {
      //       jsonText = jsonText.slice(0, length) + omitted
      //     }
      //   } catch (e) {
      //     return e.message
      //   }
      //
      //   return jsonText
      // }
    }
  }
}
</script>
