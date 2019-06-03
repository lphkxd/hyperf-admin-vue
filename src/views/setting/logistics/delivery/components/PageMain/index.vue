<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <cs-icon name="plus"/>
          新增方式
        </el-button>
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
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      stripe>

      <el-table-column type="selection" width="55"/>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="名称">
              <span>{{props.row.get_delivery_item.name}}</span>
            </el-form-item>

            <el-form-item label="状态">
              <el-tag
                :type="statusMap[props.row.status].type"
                size="mini">
                {{statusMap[props.row.status].text}}
              </el-tag>
            </el-form-item>

            <el-form-item label="首重">
              <span>{{props.row.first_weight}}</span>
            </el-form-item>

            <el-form-item label="首重费运">
              <span>{{props.row.first_weight_price}}</span>
            </el-form-item>

            <el-form-item label="续重">
              <span>{{props.row.second_weight}}</span>
            </el-form-item>

            <el-form-item label="续重运费">
              <span>{{props.row.second_weight_price}}</span>
            </el-form-item>

            <el-form-item label="首件">
              <span>{{props.row.first_item}}</span>
            </el-form-item>

            <el-form-item label="首件运费">
              <span>{{props.row.first_item_price}}</span>
            </el-form-item>

            <el-form-item label="续件">
              <span>{{props.row.second_item}}</span>
            </el-form-item>

            <el-form-item label="续件运费">
              <span>{{props.row.second_item_price}}</span>
            </el-form-item>

            <el-form-item label="首体积量">
              <span>{{props.row.first_volume}}</span>
            </el-form-item>

            <el-form-item label="首体积运费">
              <span>{{props.row.first_volume_price}}</span>
            </el-form-item>

            <el-form-item label="续体积量">
              <span>{{props.row.second_volume}}</span>
            </el-form-item>

            <el-form-item label="续体积运费">
              <span>{{props.row.second_volume_price}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        prop="get_delivery_item.name"
        sortable="custom"
        min-width="100">
      </el-table-column>

      <el-table-column
        label="描述"
        prop="content"
        min-width="250">
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        align="center"
        sortable="custom">
        <template slot-scope="scope">
          <el-input-number
            v-if="true"
            v-model="scope.row.sort"
            style="width: 88px;"
            size="mini"
            controls-position="right"
            :min="0"
            :max="255"
            @change="handleSort(scope.$index)">
          </el-input-number>
          <span v-else>
            {{scope.row.sort}}
          </span>
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
        min-width="140">
        <template slot-scope="scope">
          <el-button
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>

          <el-button
            @click="() => {}"
            size="small"
            type="text">配送区域</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  setDeliveryStatus,
  delDeliveryList,
  setDeliverySort,
  addDeliveryItem,
  setDeliveryItem
} from '@/api/logistics/delivery'
import { getHelpRouter } from '@/api/index/help'
import { getDeliveryCompanySelect } from '@/api/logistics/company'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      helpContent: '',
      auth: {},
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
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑方式',
        create: '新增方式'
      },
      form: {
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
  mounted() {
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.delivery_id)
        })
      } else {
        idList.push(this.currentTableData[val].delivery_id)
      }

      return idList
    },
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
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
      let delivery_id = this._getIdList(val)
      if (delivery_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(delivery_id, status, vm) {
        setDeliveryStatus(delivery_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (delivery_id.indexOf(value.delivery_id) !== -1) {
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

        // // 禁用权限检测
        // if (newStatus === 0 && !this.auth.disable) {
        //   return
        // }
        //
        // // 启用权限检测
        // if (newStatus === 1 && !this.auth.enable) {
        //   return
        // }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(delivery_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setStatus(delivery_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let delivery_id = this._getIdList(val)
      if (delivery_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delDeliveryList(delivery_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (delivery_id.indexOf(this.currentTableData[i].delivery_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 设置排序值
    handleSort(index) {
      setDeliverySort(
        this.currentTableData[index].delivery_id,
        this.currentTableData[index].sort
      )
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
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

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand >>> label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
