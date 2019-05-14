<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="是否用于财务充值">
              <span>{{isMap[props.row.is_deposit]}}</span>
            </el-form-item>

            <el-form-item label="是否用于账号充值">
              <span>{{isMap[props.row.is_inpour]}}</span>
            </el-form-item>

            <el-form-item label="是否用于订单支付">
              <span>{{isMap[props.row.is_payment]}}</span>
            </el-form-item>

            <el-form-item label="是否支持原路退款">
              <span>{{isMap[props.row.is_refund]}}</span>
            </el-form-item>

            <el-form-item label="支付图片">
              <el-popover
                v-if="props.row.image.length"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="props.row.image[0].source | getPreviewUrl"
                    @click.native="$open(props.row.image[0].url)"/>
                </div>
                <cs-icon slot="reference" name="image"/>
              </el-popover>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="支付名称"
        prop="name">
      </el-table-column>

      <el-table-column
        label="支付编码"
        prop="code">
      </el-table-column>

      <el-table-column
        label="支付模型"
        prop="model">
        <template slot-scope="scope">
          {{scope.row.model || '-'}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        align="center">
        <template slot-scope="scope">
          <el-input-number
            v-if="true"
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
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type"
            style="cursor: pointer;"
            @click.native="handleStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="Object.keys(scope.row.setting).length"
            @click="handleConfig(scope.$index)"
            size="small"
            type="text">参数配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑支付"
      :visible.sync="updateFormVisible"
      :append-to-body="true"
      width="600px">
      <el-form
        :model="updateForm"
        ref="updateForm"
        label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updateForm.name" disabled/>
        </el-form-item>

        <el-form-item v-if="updateFormVisible" label="图片">
          <cs-upload
            v-model="updateForm.image"
            :fileList="imageFile"
            v-bind:limit="1"
            file-width="60%"/>
        </el-form-item>

        <el-form-item label="类型">
          <el-row>
            <el-col :span="12">
              <span class="cs-pr-10">是否用于财务充值</span>
              <el-switch
                v-model="updateForm.is_deposit"
                active-value="1"
                inactive-value="0"/>
            </el-col>

            <el-col :span="12">
              <span class="cs-pr-10">是否用于账号充值</span>
              <el-switch
                v-model="updateForm.is_inpour"
                active-value="1"
                inactive-value="0"/>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <span class="cs-pr-10">是否用于订单支付</span>
              <el-switch
                v-model="updateForm.is_payment"
                active-value="1"
                inactive-value="0"/>
            </el-col>

            <el-col :span="12">
              <span class="cs-pr-10">是否支持原路退款</span>
              <el-switch
                v-model="updateForm.is_refund"
                active-value="1"
                inactive-value="0"/>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="排序值">
          <el-input-number
            v-model="updateForm.sort"
            controls-position="right"
            :min="0"
            :max="255"
            style="width: 120px;"/>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="updateForm.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="updateFormVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="updateLoading"
          @click="update"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setPaymentSort,
  setPaymentStatus
} from '@/api/payment/payment'
import util from '@/utils/util'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
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
      imageFile: [],
      currentTableData: [],
      updateLoading: false,
      updateFormVisible: false,
      auth: {},
      updateForm: {},
      configForm: {},
      isMap: {
        0: '否',
        1: '是'
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
      }
    }
  },
  filters: {
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val)
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
    },
    // 设置排序值
    handleSort(index) {
      setPaymentSort(
        this.currentTableData[index].payment_id,
        this.currentTableData[index].sort
      )
    },
    // 设置状态
    handleStatus(index) {
      let oldData = this.currentTableData[index]
      const newStatus = oldData.status ? 0 : 1

      if (oldData.status > 1) {
        return
      }

      // // 禁用权限检测
      // if (newStatus === 0 && !this.auth.disable) {
      //   return
      // }
      //
      // // 启用权限检测
      // if (newStatus === 1 && !this.auth.enable) {
      //   return
      // }

      this.$set(this.currentTableData, index, { ...oldData, status: 2 })
      setPaymentStatus([oldData.payment_id], newStatus)
        .then(() => {
          this.$set(
            this.currentTableData,
            index,
            { ...oldData, status: newStatus }
          )
        })
    },
    // 编辑支付
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.updateForm = {
        ...data,
        is_deposit: data.is_deposit.toString(),
        is_inpour: data.is_inpour.toString(),
        is_payment: data.is_payment.toString(),
        is_refund: data.is_refund.toString(),
        status: data.status.toString()
      }

      if (this.$refs.updateForm) {
        this.$nextTick(() => {
          this.$refs.updateForm.clearValidate()
        })
      }

      this.imageFile = data.image
      this.updateLoading = false
      this.updateFormVisible = true
    }
  }
}
</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand >>> label {
    width: 160px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .popover-image {
    text-align: center;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
</style>
