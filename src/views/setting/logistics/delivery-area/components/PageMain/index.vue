<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate">新增区域</el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      :highlight-current-row="true">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="所辖区域">
              <el-tag
                v-for="item in props.row.region"
                :key="item.region_id"
                class="cs-mr-10"
                effect="plain"
                type="info">
                {{item.name}}
              </el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        min-width="160">
      </el-table-column>

      <el-table-column label="运费" align="center">
        <el-table-column
          label="首重运费"
          prop="first_weight_price"
          width="120">
        </el-table-column>

        <el-table-column
          label="续重运费"
          prop="second_weight_price"
          width="120">
        </el-table-column>

        <el-table-column
          label="首件运费"
          prop="first_item_price"
          width="120">
        </el-table-column>

        <el-table-column
          label="续件运费"
          prop="second_item_price"
          width="120">
        </el-table-column>

        <el-table-column
          label="首体积运费"
          prop="first_volume_price"
          width="120">
        </el-table-column>

        <el-table-column
          label="续体积运费"
          prop="second_volume_price"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <template
          v-if="scope.row.delivery_area_id"
          slot-scope="scope">
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
            v-if="auth.region"
            @click="handleArea(scope.$index)"
            size="small"
            type="text">所辖区域</el-button>
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
        label-width="95px">
        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入配送区域名称"
            :clearable="true"/>
        </el-form-item>

        <el-row>
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
              label="首件运费"
              prop="first_item_price">
              <el-input-number
                v-model="form.first_item_price"
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
              label="首体积运费"
              prop="first_volume_price">
              <el-input-number
                v-model="form.first_volume_price"
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

    <cs-region
      v-model="region"
      @confirm="handleRegion"
      ref="area"/>
  </div>
</template>

<script>
import {
  delDeliveryAreaList,
  addDeliveryAreaItem,
  setDeliveryAreaItem
} from '@/api/logistics/area'

export default {
  components: {
    'cs-region': () => import('./components/cs-region')
  },
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
      region: [],
      currentTableData: [],
      auth: {
        add: false,
        set: false,
        del: false,
        region: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑区域',
        create: '新增区域'
      },
      form: {
        name: undefined,
        first_weight_price: undefined,
        second_weight_price: undefined,
        first_item_price: undefined,
        second_item_price: undefined,
        first_volume_price: undefined,
        second_volume_price: undefined
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
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/setting/logistics/delivery/area/add')
      this.auth.set = this.$has('/setting/logistics/delivery/area/set')
      this.auth.del = this.$has('/setting/logistics/delivery/area/del')
      this.auth.region = this.$has('/setting/logistics/delivery/area/region')
    },
    // 删除选择项
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delDeliveryAreaList([this.currentTableData[index].delivery_area_id])
            .then(() => {
              this.currentTableData.splice(index, 1)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        name: undefined,
        first_weight_price: 0,
        second_weight_price: 0,
        first_item_price: 0,
        second_item_price: 0,
        first_volume_price: 0,
        second_volume_price: 0
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
          this.form.region = []

          addDeliveryAreaItem({
            ...this.form,
            delivery_id: this.$route.params.delivery_id
          })
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
    // 编辑对话框
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
          delete this.form.region
          this.dialogLoading = true

          setDeliveryAreaItem({ ...this.form })
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
    // 区域管理
    handleArea(index) {
      if (!this.$refs.area) {
        return
      }

      this.currentIndex = index
      const data = this.currentTableData[index]

      this.region = [...data.region]
      this.$refs.area.handleRegionDlg(data.delivery_area_id)
    },
    // 区域组件返回确定操作
    handleRegion(val) {
      this.$set(
        this.currentTableData,
        this.currentIndex,
        {
          ...this.currentTableData[this.currentIndex],
          region: val
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
    width: auto;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
</style>
