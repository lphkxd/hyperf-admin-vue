<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-has="'/member/user/withdraw/add'">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <cs-icon name="plus"/>
          新增账户
        </el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData">
      <el-table-column
        label="收款人姓名"
        prop="name">
      </el-table-column>

      <el-table-column
        label="收款人手机号"
        prop="mobile">
      </el-table-column>

      <el-table-column
        label="收款账户"
        prop="bank_name">
      </el-table-column>

      <el-table-column
        label="收款账号"
        prop="account">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-has="'/member/user/withdraw/set'"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-has="'/member/user/withdraw/del'"
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
        label-width="110px">
        <el-form-item
          label="收款人姓名"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入收款人姓名"
            clearable/>
        </el-form-item>

        <el-form-item
          label="收款人手机号"
          prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入收款人手机号"
            clearable/>
        </el-form-item>

        <el-form-item
          label="收款账户"
          prop="bank_name">
          <el-input
            v-model="form.bank_name"
            placeholder="请输入收款账户"
            clearable/>
        </el-form-item>

        <el-form-item
          label="收款账号"
          prop="account">
          <el-input
            v-model="form.account"
            placeholder="请输入收款账号"
            clearable/>
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
  addWithdrawUserItem,
  delWithdrawUserList,
  isWithdrawUserMaximum,
  setWithdrawUserItem
} from '@/api/user/withdraw_user'

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
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑账户',
        create: '新增账户'
      },
      form: {
        client_id: undefined,
        name: undefined,
        mobile: undefined,
        bank_name: undefined,
        account: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '收款人姓名不能为空',
            trigger: 'blur'
          },
          {
            max: 32,
            message: '收款人姓名不能大于 32 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '收款人手机号不能为空',
            trigger: 'blur'
          },
          {
            min: 7,
            max: 15,
            message: '收款人手机号在 7 到 15 个字符',
            trigger: 'blur'
          }
        ],
        bank_name: [
          {
            required: true,
            message: '收款账户不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '收款账户不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        account: [
          {
            required: true,
            message: '收款账号不能为空',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '收款账号不能大于 50 个字符',
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
      }
    }
  },
  methods: {
    // 请求删除
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delWithdrawUserList(
            [this.currentTableData[index].withdraw_user_id],
            this.$route.params.client_id,
          )
            .then(() => {
              this.currentTableData.splice(index, 1)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 弹出创建对话框
    handleCreate() {
      const client_id = this.$route.params.client_id
      isWithdrawUserMaximum(client_id)
        .then(() => {
          this.form = {
            client_id,
            name: undefined,
            mobile: undefined,
            bank_name: undefined,
            account: undefined
          }

          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })

          this.dialogStatus = 'create'
          this.dialogLoading = false
          this.dialogFormVisible = true
        })
        .catch(() => {
          this.dialogFormVisible = false
        })
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addWithdrawUserItem(this.form)
            .then(res => {
              this.currentTableData.push(res.data)
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
      this.form = {
        ...this.currentTableData[index],
        client_id: this.$route.params.client_id
      }

      if (this.$refs.form) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          setWithdrawUserItem(this.form)
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
