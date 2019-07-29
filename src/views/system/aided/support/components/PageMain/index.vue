<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <cs-icon name="plus"/>
          新增客服
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="handleStatus(null, 1, true)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="handleStatus(null, 0, true)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item v-if="auth.del">
        <el-button
          :disabled="loading"
          @click="handleDelete(null)">
          <cs-icon name="trash-o"/>
          删除
        </el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      stripe>

      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="昵称"
        prop="nick_name"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="组名称"
        prop="type_name"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        align="center"
        sortable="custom">
        <template slot-scope="scope">
          <el-input-number
            v-if="auth.sort"
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
            :style="auth.enable || auth.disable ? 'cursor: pointer;' : ''"
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
            v-if="auth.set"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">
        <el-form-item
          label="昵称"
          prop="nick_name">
          <el-input
            v-model="form.nick_name"
            placeholder="请输入客服昵称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="组名称"
          prop="type_name">
          <el-input
            v-model="form.type_name"
            placeholder="请输入客服组名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="联系方式"
          prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入客服联系方式(自定义特征码)"
            type="textarea"
            :rows="5"/>
        </el-form-item>

        <el-form-item
          label="排序值"
          prop="sort">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="0"
            :max="255"
            style="width: 120px;"/>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addSupportItem,
  setSupportStatus,
  delSupportList,
  setSupportSort,
  setSupportItem
} from '@/api/aided/support'

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
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        enable: false,
        disable: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑客服',
        create: '新增客服'
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
        nick_name: undefined,
        type_name: undefined,
        code: undefined,
        sort: undefined,
        status: undefined
      },
      rules: {
        nick_name: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        type_name: [
          {
            required: true,
            message: '组名称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '联系方式不能为空',
            trigger: 'blur'
          },
          {
            max: 150,
            message: '长度不能大于 150 个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        status: [
          {
            type: 'enum',
            enum: ['0', '1'],
            message: '值的范围必须为 0 或 1',
            trigger: 'change'
          }
        ]
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
    this._validationAuth()
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
          idList.push(value.support_id)
        })
      } else {
        idList.push(this.currentTableData[val].support_id)
      }

      return idList
    },
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/aided/support/add')
      this.auth.set = this.$has('/system/aided/support/set')
      this.auth.del = this.$has('/system/aided/support/del')
      this.auth.sort = this.$has('/system/aided/support/sort')
      this.auth.enable = this.$has('/system/aided/support/enable')
      this.auth.disable = this.$has('/system/aided/support/disable')
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

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        nick_name: undefined,
        type_name: undefined,
        code: undefined,
        sort: 50,
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addSupportItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift(res.data)
              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let support_id = this._getIdList(val)
      if (support_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(support_id, status, vm) {
        setSupportStatus(support_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (support_id.indexOf(value.support_id) !== -1) {
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

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(support_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(support_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let support_id = this._getIdList(val)
      if (support_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delSupportList(support_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (support_id.indexOf(this.currentTableData[i].support_id) !== -1) {
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
      setSupportSort(
        this.currentTableData[index].support_id,
        this.currentTableData[index].sort
      )
    },
    // 编辑客服
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.form = {
        ...data,
        status: data.status.toString()
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          setSupportItem({ ...this.form })
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data
                })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    }
  }
}
</script>
