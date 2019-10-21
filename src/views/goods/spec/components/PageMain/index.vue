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
          新增规格
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.index"
            :disabled="loading"
            @click="handleIndex(null, 1, true)">
            <cs-icon name="check"/>
            设为检索
          </el-button>

          <el-button
            v-if="auth.close"
            :disabled="loading"
            @click="handleIndex(null, 0, true)">
            <cs-icon name="close"/>
            取消检索
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
      @sort-change="sortChange">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="编号"
        prop="spec_id"
        sortable="custom"
        width="100">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="所属模型"
        prop="get_goods_type.type_name">
      </el-table-column>

      <el-table-column
        label="规格项"
        prop="spec_item"
        :show-overflow-tooltip="true"
        min-width="200">
        <template slot-scope="scope">
          {{scope.row.spec_item | getSpecItem}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        sortable="custom"
        align="center"
        min-width="110">
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
        label="是否检索"
        prop="spec_index"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="indexMap[scope.row.spec_index].type"
            :style="auth.index || auth.close ? 'cursor: pointer;' : ''"
            :effect="auth.index || auth.close ? 'light' : 'plain'"
            @click.native="handleIndex(scope.$index)">
            {{indexMap[scope.row.spec_index].text}}
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
        label-width="80px"
        ref="form">
        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入商品规格名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="所属模型"
          prop="goods_type_id">
          <el-select
            v-model="form.goods_type_id"
            placeholder="请选择所属商品模型"
            style="width: 100%;"
            clearable
            value="">
            <el-option
              v-for="(item, index) in typeData"
              :key="index"
              :label="item.type_name"
              :value="item.goods_type_id"/>
          </el-select>
        </el-form-item>

        <el-form-item
          label="规格项"
          prop="spec_item">
          <el-input
            v-model="form.spec_item"
            placeholder="请输入商品规格项，一行一个"
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
          label="是否检索"
          prop="spec_index">
          <el-switch
            v-model="form.spec_index"
            :active-value="1"
            :inactive-value="0">
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
  addGoodsSpecItem,
  delGoodsSpecList,
  setGoodsSpecItem,
  setGoodsSpecKey,
  setGoodsSpecSort
} from '@/api/goods/spec'

export default {
  props: {
    loading: {
      default: false
    },
    typeData: {
      default: () => []
    },
    tableData: {
      default: () => []
    },
    selectId: {
      default: null
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
        index: false,
        close: false
      },
      indexMap: {
        0: {
          text: '否',
          type: 'danger'
        },
        1: {
          text: '是',
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
        update: '编辑规格',
        create: '新增规格'
      },
      form: {
        goods_type_id: undefined,
        name: undefined,
        spec_item: undefined,
        spec_index: undefined,
        sort: undefined
      },
      rules: {
        name: [
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
        ],
        goods_type_id: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        spec_item: [
          {
            required: true,
            message: '规格项不能为空',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
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
  filters: {
    getSpecItem(value) {
      if (value) {
        return value.join(',')
      }
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/goods/setting/spec/add')
      this.auth.set = this.$has('/goods/setting/spec/set')
      this.auth.del = this.$has('/goods/setting/spec/del')
      this.auth.sort = this.$has('/goods/setting/spec/sort')
      this.auth.index = this.$has('/goods/setting/spec/index')
      this.auth.close = this.$has('/goods/setting/spec/close')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.spec_id)
        })
      } else {
        idList.push(this.currentTableData[val].spec_id)
      }

      return idList
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
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        goods_type_id: this.selectId,
        name: '',
        spec_item: '',
        spec_index: 1,
        sort: 50
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
          addGoodsSpecItem({
            ...this.form,
            spec_item: this.form.spec_item.trim().split('\n')
          })
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                get_goods_type: {
                  ...this.typeData.find(item => item.goods_type_id === res.data.goods_type_id)
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
      const data = this.currentTableData[index]

      this.form = {
        ...data,
        spec_item: data.spec_item.join('\n')
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
          setGoodsSpecItem({
            ...this.form,
            spec_item: this.form.spec_item.trim().split('\n')
          })
            .then(res => {
              if (this.selectId && this.form.goods_type_id !== this.selectId) {
                this.currentTableData.splice(this.currentIndex, 1)
                if (this.currentTableData.length <= 0) {
                  this.$emit('refresh', true)
                }
              } else {
                this.$set(
                  this.currentTableData,
                  this.currentIndex,
                  {
                    ...this.currentTableData[this.currentIndex],
                    ...res.data,
                    get_goods_type: {
                      ...this.typeData.find(item => item.goods_type_id === res.data.goods_type_id)
                    }
                  })
              }

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 批量设置是否检索
    handleIndex(val, key = 0, confirm = false) {
      let spec_id = this._getIdList(val)
      if (spec_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setIndex(spec_id, key, vm) {
        setGoodsSpecKey(spec_id, key)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (spec_id.indexOf(value.spec_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  spec_index: key
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newIndex = oldData.spec_index ? 0 : 1

        if (oldData.spec_index > 1) {
          return
        }

        // 禁用权限检测
        if (newIndex === 0 && !this.auth.close) {
          return
        }

        // 启用权限检测
        if (newIndex === 1 && !this.auth.index) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, spec_index: 2 })
        setIndex(spec_id, newIndex, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setIndex(spec_id, key, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let spec_id = this._getIdList(val)
      if (spec_id.length === 0) {
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
          delGoodsSpecList(spec_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (spec_id.indexOf(this.currentTableData[i].spec_id) !== -1) {
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
    // 设置排序值
    handleSort(index) {
      setGoodsSpecSort(
        this.currentTableData[index].spec_id,
        this.currentTableData[index].sort
      )
    }
  }
}
</script>
