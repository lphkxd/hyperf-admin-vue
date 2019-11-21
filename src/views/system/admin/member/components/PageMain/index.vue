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
          新增用户
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="handleState(1)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="handleState(0)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item v-if="auth.del">
        <el-button
          :disabled="loading"
          @click="handleDelete(multipleSelection)">
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
      :data="currentTableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="昵称"
        prop="nickname"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="用户组"
        prop="group_id"
        sortable="custom"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.get_auth_group.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="登陆IP"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.last_ip"
            :content="scope.row.last_ip"
            placement="top">
            <cs-icon name="map-marker"/>
          </el-tooltip>
          {{scope.row.last_ip_region}}
        </template>
      </el-table-column>

      <el-table-column
        label="最后登陆"
        prop="last_login"
        sortable="custom"
        align="center"
        width="160">
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
            :effect="auth.enable || auth.disable ? 'light' : 'plain'"
            @click.native="switchStatus(scope.$index)">
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
            v-if="auth.set"
            size="small"
            @click="handleUpdate(scope.$index)"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            size="small"
            @click="handleDelete(scope.$index)"
            type="text">删除</el-button>

          <el-button
            v-if="auth.reset"
            size="small"
            @click="reset(scope.$index)"
            type="text">重置密码</el-button>
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
          label="账号"
          prop="username">
          <el-input
            v-model="form.username"
            :disabled="dialogStatus !== 'create'"
            placeholder="请输入账号"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="密码"
          prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="确认密码"
          prop="password_confirm">
          <el-input
            type="password"
            v-model="form.password_confirm"
            placeholder="请再次输入密码"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="昵称"
          prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请输入昵称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="用户组"
          prop="group_id">
          <el-select
            v-model="form.group_id"
            placeholder="请选择"
            style="width: 100%;"
            value="">
            <el-option
              v-for="item in group"
              :key="item.group_id"
              :label="item.name"
              :value="item.group_id"/>
          </el-select>
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
          @click="update(form.index)"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setAdminStatus,
  delAdminList,
  addAdminItem,
  setAdminItem,
  resetAdminItem
} from '@/api/user/admin'

export default {
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    },
    group: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {
        add: false,
        del: false,
        set: false,
        enable: false,
        disable: false,
        reset: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '新增用户'
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
        index: undefined,
        client_id: undefined,
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        group_id: undefined,
        nickname: undefined
      },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        password_confirm: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        nickname: [
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
        group_id: [
          {
            required: true,
            message: '至少选择一项',
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
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/admin/member/add')
      this.auth.del = this.$has('/system/admin/member/del')
      this.auth.set = this.$has('/system/admin/member/set')
      this.auth.enable = this.$has('/system/admin/member/enable')
      this.auth.disable = this.$has('/system/admin/member/disable')
      this.auth.reset = this.$has('/system/admin/member/reset')
    },
    // 获取列表中的用户编号
    _getClientIdList(val) {
      let clients = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          clients.push(value.admin_id)
        })
      } else {
        clients.push(this.currentTableData[val].admin_id)
      }

      return clients
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
    // 批量设置状态
    handleState(state) {
      let clients = this._getClientIdList(this.multipleSelection)
      if (clients.length === 0) {
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
          setAdminStatus(clients, state)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (clients.indexOf(value.admin_id) !== -1) {
                  // value.status = enable // 此修改可保持勾选状态
                  this.$set(this.currentTableData, index, {
                    ...value,
                    status: state
                  })
                }
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let clients = this._getClientIdList(val)
      if (clients.length === 0) {
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
          delAdminList(clients)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (clients.indexOf(this.currentTableData[i].admin_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        group_id: undefined,
        nickname: undefined
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求新建用户
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addAdminItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                status: 1,
                get_auth_group: {
                  ...this.group.find(item => item.group_id === res.data.group_id)
                }
              })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.form = {
        index: index,
        client_id: this.currentTableData[index].admin_id,
        username: this.currentTableData[index].username,
        group_id: this.currentTableData[index].group_id,
        nickname: this.currentTableData[index].nickname
      }

      // 处理el-select项不存在的bug
      if (!this.group.find(item => item.group_id === this.form.group_id)) {
        this.form.group_id = undefined
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求修改用户
    update(index) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          setAdminItem({ ...this.form })
            .then(res => {
              this.$set(this.currentTableData, index, {
                ...this.currentTableData[index],
                ...res.data,
                get_auth_group: this.group.find(item => item.group_id === this.form.group_id)
              })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 重置密码
    reset(index) {
      const admin = this.currentTableData[index]
      this.$confirm(`确定要重置 ${admin.username} 的密码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          resetAdminItem(admin.admin_id)
            .then(res => {
              this.$notify({
                title: '重置密码',
                dangerouslyUseHTMLString: true,
                message: `${admin.username} 的密码已重置为：</br>${res.data.password}`,
                type: 'success',
                position: 'bottom-right',
                duration: 0
              })
            })
        })
        .catch(() => {
        })
    },
    // 切换状态
    switchStatus(index) {
      let oldData = this.currentTableData[index]
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

      this.$set(this.currentTableData, index, { ...oldData, status: 2 })
      setAdminStatus([oldData.admin_id], newStatus)
        .then(() => {
          this.$message.success('操作成功')
          this.$set(this.currentTableData, index, {
            ...oldData,
            status: newStatus
          })
        })
        .catch(() => {
          this.$set(this.currentTableData, index, oldData)
        })
    }
  }
}
</script>
