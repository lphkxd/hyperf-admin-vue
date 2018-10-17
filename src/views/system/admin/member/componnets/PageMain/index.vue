<template>
  <div>
    <el-form
      :inline="true"
      size="mini">

      <el-form-item>
        <el-button-group>
          <el-button
            @click="() => {}">
            <cs-icon name="plus"/>
            新增
          </el-button>

          <el-button
            @click="() => {}">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            @click="() => {}">
            <cs-icon name="times"/>
            禁用
          </el-button>

          <el-button
            @click="() => {}">
            <cs-icon name="trash-o"/>
            删除
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-button
        size="mini"
        style="float: right"
        @click="() =>{}">
        <cs-icon name="refresh"/>
        刷新
      </el-button>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="账号">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>

      <el-table-column label="用户组">
        <template slot-scope="scope">
          {{scope.row.get_auth_group.name}}
        </template>
      </el-table-column>

      <el-table-column label="最后登陆">
        <template slot-scope="scope">
          {{scope.row.last_login}}
        </template>
      </el-table-column>

      <el-table-column label="登陆IP">
        <template slot-scope="scope">
          {{scope.row.last_ip}}
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
        </template>
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
      multipleSelection: []
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
