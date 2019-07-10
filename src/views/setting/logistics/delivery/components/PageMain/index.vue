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
          新增方式
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

            <el-form-item label="首重运费">
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
        label="快递公司"
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
        min-width="140">
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
            v-if="auth.area"
            @click="handleArea(scope.$index)"
            size="small"
            type="text">配送区域</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="handleOpenSelect"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="95px">
        <el-form-item
          label="快递公司"
          prop="delivery_item_id">
          <el-select
            v-model="form.delivery_item_id"
            placeholder="请选择"
            style="width: 100%;"
            clearable
            value="">
            <el-option
              v-for="item in dialogCompany"
              :key="item.delivery_item_id"
              :label="item.name"
              :value="item.delivery_item_id"/>
          </el-select>
          <div class="help-block">只显示热门快递公司列表</div>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="content">
          <el-input
            v-model="form.content"
            placeholder="可输入配送方式描述"
            type="textarea"
            :rows="3">
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="排序值"
              prop="sort">
              <el-input-number
                v-model="form.sort"
                controls-position="right"
                style="width: 120px;"
                :min="0"
                :max="255"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="状态"
              prop="status">
              <el-switch
                v-model="form.status"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider>费用设置</el-divider>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="首重"
              prop="first_weight">
              <el-input-number
                v-model="form.first_weight"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="首重运费"
              prop="first_weight_price">
              <el-input-number
                v-model="form.first_weight_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="续重"
              prop="second_weight">
              <el-input-number
                v-model="form.second_weight"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="续重运费"
              prop="second_weight_price">
              <el-input-number
                v-model="form.second_weight_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="首件"
              prop="first_item">
              <el-input-number
                v-model="form.first_item"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="首件运费"
              prop="first_item_price">
              <el-input-number
                v-model="form.first_item_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="续件"
              prop="second_item">
              <el-input-number
                v-model="form.second_item"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="续件运费"
              prop="second_item_price">
              <el-input-number
                v-model="form.second_item_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="首体积量"
              prop="first_volume">
              <el-input-number
                v-model="form.first_volume"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="首体积运费"
              prop="first_volume_price">
              <el-input-number
                v-model="form.first_volume_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="续体积量"
              prop="second_volume">
              <el-input-number
                v-model="form.second_volume"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="续体积运费"
              prop="second_volume_price">
              <el-input-number
                v-model="form.second_volume_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>
          </el-col>
        </el-row>
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
  setDeliveryStatus,
  delDeliveryList,
  setDeliverySort,
  addDeliveryItem,
  setDeliveryItem
} from '@/api/logistics/delivery'
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
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        area: false,
        enable: false,
        disable: false
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
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogCompany: [],
      textMap: {
        update: '编辑方式',
        create: '新增方式'
      },
      form: {
        delivery_item_id: undefined,
        content: undefined,
        first_weight: undefined,
        first_weight_price: undefined,
        second_weight: undefined,
        second_weight_price: undefined,
        first_item: undefined,
        first_item_price: undefined,
        second_item: undefined,
        second_item_price: undefined,
        first_volume: undefined,
        first_volume_price: undefined,
        second_volume: undefined,
        second_volume_price: undefined,
        sort: undefined,
        status: undefined
      },
      rules: {
        delivery_item_id: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        content: [
          {
            max: 150,
            message: '长度不能大于 150 个字符',
            trigger: 'blur'
          }
        ],
        first_weight: [
          {
            required: true,
            message: '首重不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        first_weight_price: [
          {
            required: true,
            message: '首重运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_weight: [
          {
            required: true,
            message: '续重不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_weight_price: [
          {
            required: true,
            message: '续重运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        first_item: [
          {
            required: true,
            message: '首件不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        first_item_price: [
          {
            required: true,
            message: '首件运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_item: [
          {
            required: true,
            message: '续件不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_item_price: [
          {
            required: true,
            message: '续件运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        first_volume: [
          {
            required: true,
            message: '首体积量不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        first_volume_price: [
          {
            required: true,
            message: '首体积运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_volume: [
          {
            required: true,
            message: '续体积量不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        second_volume_price: [
          {
            required: true,
            message: '续体积运费不能为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '必须为数字值',
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
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/setting/logistics/delivery/add')
      this.auth.set = this.$has('/setting/logistics/delivery/set')
      this.auth.del = this.$has('/setting/logistics/delivery/del')
      this.auth.sort = this.$has('/setting/logistics/delivery/sort')
      this.auth.area = this.$has('/setting/logistics/delivery/area')
      this.auth.enable = this.$has('/setting/logistics/delivery/enable')
      this.auth.disable = this.$has('/setting/logistics/delivery/disable')
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

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(delivery_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
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
        type: 'warning',
        closeOnClickModal: false
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
        delivery_item_id: undefined,
        content: undefined,
        first_weight: 0,
        first_weight_price: 0,
        second_weight: 0,
        second_weight_price: 0,
        first_item: 0,
        first_item_price: 0,
        second_item: 0,
        second_item_price: 0,
        first_volume: 0,
        first_volume_price: 0,
        second_volume: 0,
        second_volume_price: 0,
        sort: 50,
        status: 1
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
          addDeliveryItem(this.form)
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                get_delivery_item: {
                  ...this.dialogCompany.find(item => item.delivery_item_id === this.form.delivery_item_id)
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
    // 获取快递公司列表
    handleOpenSelect() {
      if (this.dialogCompany.length) {
        return
      }

      getDeliveryCompanySelect(0)
        .then(res => {
          this.dialogCompany = res.data
        })
    },
    // 编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      // 处理el-select项不存在的bug
      if (this.dialogCompany.length) {
        if (!this.dialogCompany.find(item => item.delivery_item_id === this.form.delivery_item_id)) {
          this.form.delivery_item_id = undefined
        }
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
          setDeliveryItem(this.form)
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data,
                  get_delivery_item: {
                    ...this.dialogCompany.find(item => item.delivery_item_id === this.form.delivery_item_id)
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
    // 编辑配送区域
    handleArea(key) {
      const data = this.currentTableData[key]
      this.$router.push({
        name: 'setting-logistics-delivery-area',
        params: {
          delivery_id: data.delivery_id,
          delivery_item_id: data.delivery_item_id
        }
      })
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
  .help-block {
    color: #909399;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
</style>
