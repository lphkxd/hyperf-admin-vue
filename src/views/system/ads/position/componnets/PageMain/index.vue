<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="create">
            <cs-icon name="plus"/>
            新增位置
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
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.description" placement="top">
            <span>{{scope.row.name}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        min-width="80">
      </el-table-column>

      <el-table-column
        label="平台"
        min-width="60">
        <template slot-scope="scope">
          {{platformMap[scope.row.platform]}}
        </template>
      </el-table-column>

      <el-table-column
        label="展示方式"
        min-width="100">
        <template slot-scope="scope">
          {{displayMap[scope.row.display]}}
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
        label="宽度"
        prop="width"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="高度"
        prop="height"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="背景色">
        <template slot-scope="scope">
          <span :style="`background-color:${scope.row.color}`">{{scope.row.color}}</span>
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
          <el-button
            size="small"
            @click="edit(scope.$index)"
            type="text">编辑</el-button>

          <el-button
            size="small"
            @click="handleDelete(scope.$index)"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true">

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="handleCreate"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="handleUpdate(form.index)"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setAdsPositionStatus,
  delAdsPositionList
} from '@/api/ads/position'

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
      multipleSelection: [],
      helpContent: '暂无帮助内容',
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑位置',
        create: '新增位置'
      },
      platformMap: {
        0: 'all',
        1: 'pc',
        2: 'mobile',
        3: 'ios',
        4: 'android'
      },
      displayMap: {
        0: '多个广告',
        1: '单个广告',
        2: '随机多个广告',
        3: '随机单个广告'
      },
      typeMap: {
        0: {
          text: '图片',
          type: 'file-image-o'
        },
        1: {
          text: '代码',
          type: 'file-code-o'
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
        name: undefined,
        code: undefined,
        platform: undefined,
        description: undefined,
        width: undefined,
        height: undefined,
        content: undefined,
        color: undefined,
        type: undefined,
        display: undefined,
        status: undefined
      },
      rules: {
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
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.ads_position_id)
        })
      } else {
        idList.push(this.currentTableData[val].ads_position_id)
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
      let ads_position_id = this._getIdList(val)
      if (ads_position_id.length === 0) {
        this.$message.error('请选择要操作的数据')
      }

      function setStatus(ads_position_id, status, vm) {
        setAdsPositionStatus(ads_position_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (ads_position_id.indexOf(value.ads_position_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  status
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newStatus = oldData.status ? 0 : 1

        if (oldData.status > 1) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(ads_position_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setStatus(ads_position_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let ads_position_id = this._getIdList(val)
      if (ads_position_id.length === 0) {
        this.$message.error('请选择要操作的数据')
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delAdsPositionList(ads_position_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (ads_position_id.indexOf(this.currentTableData[i].ads_position_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh')
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 新建位置
    create() {
      this.form = {
        name: '',
        code: '',
        platform: 0,
        description: '',
        width: 0,
        height: 0,
        content: '',
        color: '#ffffff',
        type: '0',
        display: '0',
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    }
  }
}
</script>
