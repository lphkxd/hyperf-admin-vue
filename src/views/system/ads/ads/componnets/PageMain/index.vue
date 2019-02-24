<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus"/>
            新增广告
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleStatus(null, 1, true)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleStatus(null, 0, true)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleDelete(null)">
            <cs-icon name="trash-o"/>
            删除
          </el-button>
        </el-button-group>
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
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">

      <el-table-column type="selection" width="55"/>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="180">
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        min-width="80">
      </el-table-column>

      <el-table-column
        label="平台"
        min-width="70">
        <template slot-scope="scope">
          {{platformMap[scope.row.platform]}}
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        align="center">
        <template slot-scope="scope">
          <cs-icon :name="typeMap[scope.row.type].type"/>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type"
            style="cursor: pointer;"
            @click.native="handleStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="80">
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
    positionTable: {
      default: () => []
    },
    loading: {
      default: false
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
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      helpContent: '暂无帮助内容',
      platformMap: {
        0: 'all',
        1: 'pc',
        2: 'mobile',
        3: 'ios',
        4: 'android'
      },
      typeMap: {
        0: {
          text: '图片',
          type: 'image'
        },
        1: {
          text: '代码',
          type: 'code'
        }
      },
      statusMap: {
        0: {
          text: '禁用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
      form: {
      },
      rules: {
      }
    }
  }
}
</script>
