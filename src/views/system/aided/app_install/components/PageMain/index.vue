<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">

      <el-form-item v-if="auth.add">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate">新增安装包</el-button>
      </el-form-item>

      <el-form-item v-if="auth.del">
        <el-button
          icon="el-icon-delete"
          :disabled="loading"
          @click="handleDelete(null)">删除</el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      :highlight-current-row="true"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">
      <el-table-column type="selection" width="30"/>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="标识"
        prop="user_agent"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="版本号"
        prop="ver"
        width="75">
      </el-table-column>

      <el-table-column
        label="协议地址"
        prop="url"
        min-width="90"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="访问次数"
        prop="count"
        width="80">
      </el-table-column>

      <el-table-column
        label="创建日期"
        prop="create_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="最后更新"
        prop="update_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="90">
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
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入应用安装包名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="标识"
          prop="user_agent">
          <el-input
            v-model="form.user_agent"
            placeholder="请输入系统标识"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="版本号"
          prop="ver">
          <el-input
            v-model="form.ver"
            placeholder="请输入应用安装包版本号"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="协议地址"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="请输入应用安装包协议地址"
            type="textarea"
            :rows="3"/>
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
  addAppInstallItem,
  setAppInstallItem,
  delAppInstallList
} from '@/api/aided/app_install'

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
        del: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑安装包',
        create: '新增安装包'
      },
      form: {
        name: undefined,
        user_agent: undefined,
        ver: undefined,
        url: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 32,
            message: '长度不能大于 32 个字符',
            trigger: 'blur'
          }
        ],
        user_agent: [
          {
            required: true,
            message: '标识不能为空',
            trigger: 'blur'
          },
          {
            max: 64,
            message: '长度不能大于 64 个字符',
            trigger: 'blur'
          }
        ],
        ver: [
          {
            required: true,
            message: '版本号不能为空',
            trigger: 'blur'
          },
          {
            max: 16,
            message: '长度不能大于 16 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '协议地址不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
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
      this.auth.add = this.$has('/system/aided/app_install/add')
      this.auth.set = this.$has('/system/aided/app_install/set')
      this.auth.del = this.$has('/system/aided/app_install/del')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.app_install_id)
        })
      } else {
        idList.push(this.currentTableData[val].app_install_id)
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

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        name: undefined,
        user_agent: undefined,
        ver: undefined,
        url: undefined
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
          addAppInstallItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                count: 0
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
    // 批量删除
    handleDelete(val) {
      let app_install_id = this._getIdList(val)
      if (app_install_id.length === 0) {
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
          delAppInstallList(app_install_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (app_install_id.indexOf(this.currentTableData[i].app_install_id) !== -1) {
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
    // 编辑安装包
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

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
          setAppInstallItem({ ...this.form })
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
