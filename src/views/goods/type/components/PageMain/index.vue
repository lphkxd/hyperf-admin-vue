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
          新增模型
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
      @sort-change="sortChange">
      <el-table-column
        label="编号"
        prop="goods_type_id"
        sortable="custom"
        width="100">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="type_name"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="280">
        <template slot-scope="scope">
          <el-button
            v-if="auth.spec"
            @click="handleSpec(scope.row.goods_type_id)"
            size="small"
            type="text">规格列表</el-button>

          <el-button
            v-if="auth.attribute"
            @click="handleAttribute(scope.row.goods_type_id)"
            size="small"
            type="text">属性列表</el-button>

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
        label-width="80px"
        @submit.native.prevent>
        <el-form-item
          label="名称"
          prop="type_name">
          <el-input
            v-model="form.type_name"
            placeholder="请输入模型名称"
            @keyup.enter.native="dialogStatus === 'create' ? create() : update()"
            :clearable="true"
            ref="input"/>
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
  addGoodsTypeItem,
  delGoodsTypeList,
  setGoodsTypeItem
} from '@/api/goods/type'

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
      auth: {
        add: false,
        set: false,
        del: false,
        attribute: false,
        spec: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑模型',
        create: '新增模型'
      },
      form: {
        type_name: undefined
      },
      rules: {
        type_name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 60,
            message: '长度不能大于 60 个字符',
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
      this.auth.add = this.$has('/goods/setting/type/add')
      this.auth.set = this.$has('/goods/setting/type/set')
      this.auth.del = this.$has('/goods/setting/type/del')
      this.auth.attribute = this.$has('/goods/setting/type/attribute')
      this.auth.spec = this.$has('/goods/setting/type/spec')
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
      this.form = { type_name: '' }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        this.$refs.input.focus()
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
          addGoodsTypeItem(this.form.type_name)
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
    // 编辑链接
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        this.$refs.input.select()
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
          setGoodsTypeItem({ ...this.form })
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
    // 请求删除
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delGoodsTypeList([this.currentTableData[index].goods_type_id])
            .then(() => {
              this.currentTableData.splice(index, 1)
              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 打开属性页面
    handleAttribute(val) {
      this.$router.push({
        name: 'goods-setting-attribute',
        params: {
          goods_type_id: val
        }
      })
    },
    // 打开规格页面
    handleSpec(val) {
      this.$router.push({
        name: 'goods-setting-spec',
        params: {
          goods_type_id: val
        }
      })
    }
  }
}
</script>
