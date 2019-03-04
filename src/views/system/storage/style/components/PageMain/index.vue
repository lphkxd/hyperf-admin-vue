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
            新增样式
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
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

    <el-row :gutter="20">
      <el-col :span="12">
        <el-table
          :data="currentTableData"
          v-loading="loading"
          stripe
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">

          <el-table-column
            type="selection"
            width="30">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name"
            sortable="custom"
            min-width="160"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            label="编码"
            prop="code"
            sortable="custom"
            min-width="100"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            label="平台"
            prop="platform"
            sortable="custom"
            min-width="80">
            <template slot-scope="scope">
              {{platformTable[scope.row.platform]}}
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
            min-width="100">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="updata(scope.$index)"
                type="text">编辑</el-button>

              <el-button
                size="small"
                @click="handleDelete(scope.$index)"
                type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => []
    },
    platformTable: {
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
      }
    }
  },
  methods: {
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.storage_style_id)
        })
      } else {
        idList.push(this.currentTableData[val].storage_style_id)
      }

      return idList
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
    }
  }
}
</script>
