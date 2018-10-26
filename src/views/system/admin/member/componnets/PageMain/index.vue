<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.add"
            :disabled="loading"
            @click="handleCreate">
            <cs-icon name="plus"/>
            新增
          </el-button>

          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="handleState(multipleSelection, 1)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="handleState(multipleSelection, 0)">
            <cs-icon name="close"/>
            禁用
          </el-button>

          <el-button
            v-if="auth.del"
            :disabled="loading"
            @click="handleDelete(multipleSelection)">
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
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"/>

      <el-table-column
        label="账号"
        prop="username"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="昵称"
        prop="nickname"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="用户组"
        prop="get_auth_group.name"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="登陆IP"
        prop="last_ip"
        width="150">
      </el-table-column>

      <el-table-column
        label="最后登陆"
        prop="last_login"
        align="center"
        width="160">
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type"
            :style="auth.disable || auth.enable ? 'cursor: pointer;' : ''"
            @click.native="switchStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
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
            placeholder="请输入账号"/>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="密码"
          prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="确认密码"
          prop="password_confirm">
          <el-input
            type="password"
            v-model="form.password_confirm"
            placeholder="请再次输入密码"/>
        </el-form-item>

        <el-form-item
          label="昵称"
          prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请输入昵称"/>
        </el-form-item>

        <el-form-item
          label="用户组"
          prop="group_id">
          <el-select
            v-model="form.group_id"
            placeholder="请选择"
            style="width: 100%;">
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
          @click="update"
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
      currentIndex: null,
      currentTableData: [],
      multipleSelection: [],
      helpContent: '暂无帮助内容',
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
            trigger: 'blur'
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
    // 批量设置状态
    handleState(val, enable) {
      let clients = this._getClientIdList(val)
      if (clients.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setAdminStatus(clients, enable)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (clients.indexOf(value.admin_id) !== -1) {
                  // value.status = enable // 此修改可保持勾选状态
                  this.$set(this.currentTableData, index, {
                    ...value,
                    status: enable
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
        type: 'warning'
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
                this.$emit('refresh')
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
          addAdminItem(this.form)
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
      this.currentIndex = index
      let oldData = this.currentTableData[index]

      this.form = {
        client_id: oldData.admin_id,
        username: oldData.username,
        group_id: oldData.group_id,
        nickname: oldData.nickname
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求修改用户
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          const newData = {
            client_id: this.form.client_id,
            group_id: this.form.group_id,
            nickname: this.form.nickname
          }

          setAdminItem(newData)
            .then(() => {
              const oldValue = this.currentTableData[this.currentIndex]
              this.form['get_auth_group'] = this.group.find(item => item.group_id === this.form.group_id)

              this.$set(this.currentTableData, this.currentIndex, {
                ...oldValue,
                ...this.form
              })

              this.currentIndex = null
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
        type: 'warning'
      })
        .then(() => {
          resetAdminItem(admin.admin_id)
            .then(res => {
              this.$notify({
                title: '消息提示',
                dangerouslyUseHTMLString: true,
                message: `账号 ${admin.username} 的密码已重置为：</br>${res.data.password}`,
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
