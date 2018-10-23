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
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column
        label="昵称"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>

      <el-table-column
        label="用户组"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.get_auth_group.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="最后登陆"
        width="160">
        <template slot-scope="scope">
          {{scope.row.last_login}}
        </template>
      </el-table-column>

      <el-table-column
        label="登陆IP"
        width="160">
        <template slot-scope="scope">
          {{scope.row.last_ip}}
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
        width="50">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
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
            <el-option label="区域一" value="shanghai"/>
            <el-option label="区域二" value="beijing"/>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create" size="small">确定</el-button>
        <el-button v-else type="primary" @click="update" size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setAdminStatus, delAdminList } from '@/api/user/admin'

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
  created() {
    this.validationAuth()
  },
  data() {
    return {
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
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '新增用户'
      },
      form: {
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        group_id: undefined,
        nickname: undefined,
        head_pic: undefined
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
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 验证权限
    validationAuth() {
      this.auth.add = this.$has('/system/admin/member/add')
      this.auth.del = this.$has('/system/admin/member/del')
      this.auth.set = this.$has('/system/admin/member/set')
      this.auth.enable = this.$has('/system/admin/member/enable')
      this.auth.disable = this.$has('/system/admin/member/disable')
      this.auth.reset = this.$has('/system/admin/member/reset')
    },
    // 批量设置状态
    handleState(val, enable) {
      let clients = []
      val.forEach(value => {
        clients.push(value.admin_id)
      })

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
              this.currentTableData.forEach(value => {
                if (clients.indexOf(value.admin_id) !== -1) {
                  value.status = enable
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
      let clients = []
      val.forEach(value => {
        clients.push(value.admin_id)
      })

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
      // this.form = {
      //   username: undefined,
      //   password: undefined,
      //   password_confirm: undefined,
      //   group_id: undefined,
      //   nickname: undefined
      // }

      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 请求新建用户
    create() {
    }
  }
}
</script>
