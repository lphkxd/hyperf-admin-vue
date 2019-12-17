<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate">新增公司</el-button>
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
        label="编号"
        prop="delivery_item_id"
        sortable="custom"
        width="100">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="首拼"
        prop="phonetic"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="类型"
        prop="type"
        align="center"
        sortable="custom"
        width="100">
        <template slot-scope="scope">
          <el-tag size="mini" effect="plain" :type="scope.row.type ? 'info' : 'warning'">
            {{companyType[scope.row.type]}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="120">
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

          <el-button
            v-if="auth.copy && scope.row.type !== 0"
            @click="copyToHot(scope.row.delivery_item_id)"
            size="small"
            type="text">复制为热门</el-button>
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
            placeholder="请输入快递公司名称"
            :clearable="true"/>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="首拼"
              prop="phonetic">
              <el-input
                v-model="form.phonetic"
                placeholder="新增不填写将自动识别"
                :clearable="true"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="编码"
              prop="code">
              <el-input
                v-model="form.code"
                placeholder="请输入快递公司编码"
                :clearable="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="类型"
          prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择"
            style="width: 150px;"
            clearable
            value="">
            <el-option
              v-for="(item, index) in companyType"
              :key="index"
              :label="item"
              :value="index"/>
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
  addDeliveryCompanyItem,
  delDeliveryCompanyList,
  setDeliveryCompanyItem,
  copyDeliveryCompanyHot
} from '@/api/logistics/company'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    companyType: {
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
        copy: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑公司',
        create: '新增公司'
      },
      form: {
        name: undefined,
        phonetic: undefined,
        code: undefined,
        type: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '编码不能为空',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于 30 个字符',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          },
          {
            type: 'enum',
            enum: ['0', '1', '2', '3'],
            message: '值的范围必须为 0 ~ 3',
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
      this.auth.add = this.$has('/setting/logistics/company/add')
      this.auth.set = this.$has('/setting/logistics/company/set')
      this.auth.del = this.$has('/setting/logistics/company/del')
      this.auth.copy = this.$has('/setting/logistics/company/copy')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.delivery_item_id)
        })
      } else {
        idList.push(this.currentTableData[val].delivery_item_id)
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
        phonetic: undefined,
        code: undefined,
        type: undefined
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
          addDeliveryCompanyItem({ ...this.form })
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
    // 批量删除
    handleDelete(val) {
      let company_id = this._getIdList(val)
      if (company_id.length === 0) {
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
          delDeliveryCompanyList(company_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (company_id.indexOf(this.currentTableData[i].delivery_item_id) !== -1) {
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
    // 编辑公司
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.form = {
        ...data,
        type: data.type.toString()
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
          setDeliveryCompanyItem({ ...this.form })
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
    },
    // 复制为热门
    copyToHot(id) {
      copyDeliveryCompanyHot(id)
        .then(res => {
          this.currentTableData.unshift(res.data)
          this.$message.success('操作成功')
        })
    }
  }
}
</script>
