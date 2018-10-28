<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button
          v-if="auth.add"
          :disabled="loading"
          plain
          type="primary">
          <cs-icon name="plus"/>
          新增
        </el-button>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="200"
        trigger="hover"
        title="提示"
        :content="helpContent">
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      style="width: 100%;">

      <el-table-column
        label="ID"
        prop="group_id"
        align="center"
        width="100">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="描述"
        prop="description"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="所属类型"
        align="center">
        <template slot-scope="scope">
          {{scope.row.system ? '系统保留' : '自行添加'}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        width="100">
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
        width="100">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      currentTableData: [],
      helpContent: '暂无帮助内容',
      auth: {
        add: true,
        del: false,
        set: false
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.system) {
        return 'warning-row'
      }

      if (rowIndex % 2 !== 0) {
        return 'spacer-row'
      }

      return ''
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .spacer-row {
    background: #FAFAFA;
  }
</style>
