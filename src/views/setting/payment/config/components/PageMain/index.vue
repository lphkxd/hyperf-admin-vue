<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true">
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
              <div v-if="props.row.image" class="popover-image">
                <el-image
                  :src="props.row.image | getPreviewUrl"
                  @click.native="$preview(props.row.image)"
                  fit="fill"/>
              </div>
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
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="auth.set"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.setting && Object.keys(scope.row.setting).length"
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
      :close-on-click-modal="false"
      width="600px">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updateForm.name" :disabled="true"/>
        </el-form-item>

        <el-form-item label="图片">
          <el-input
            v-model="updateForm.image"
            placeholder="可输入支付图片"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="updateForm.image"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="updateForm.image | getPreviewUrl"
                    @click.native="$preview(updateForm.image)"
                    fit="fill"/>
                </div>
                <i slot="reference" class="el-icon-picture"/>
              </el-popover>
            </template>

            <el-dropdown
              slot="append"
              :show-timeout="50"
              @command="handleCommand">
              <el-button icon="el-icon-upload"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="storage" icon="el-icon-finished">资源选择</el-dropdown-item>
                <el-dropdown-item command="upload" icon="el-icon-upload2">上传资源</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>

        <el-form-item label="类型">
          <div style="width: 300px">
            <el-checkbox
              v-model="updateForm.is_deposit"
              :true-label="1"
              :false-label="0">
              用于财务充值
            </el-checkbox>

            <el-checkbox
              v-model="updateForm.is_inpour"
              :true-label="1"
              :false-label="0">
              用于账号充值
            </el-checkbox>

            <el-checkbox
              v-model="updateForm.is_payment"
              :true-label="1"
              :false-label="0">
              用于订单支付
            </el-checkbox>

            <el-checkbox
              v-model="updateForm.is_refund"
              :true-label="1"
              :false-label="0">
              支持原路退款
            </el-checkbox>
          </div>
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
            :active-value="1"
            :inactive-value="0">
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

      <cs-storage
        ref="storage"
        style="display: none"
        :limit="1"
        @confirm="_getStorageFileList">
      </cs-storage>

      <cs-upload
        style="display: none"
        ref="upload"
        type="slot"
        accept="image/*"
        :limit="1"
        :multiple="false"
        @confirm="_getUploadFileList">
      </cs-upload>
    </el-dialog>

    <el-dialog
      title="参数配置"
      :visible.sync="configFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form label-width="110px">
        <el-form-item
          v-for="(item, index) in configForm"
          :key="index"
          :label="item.name">
          <el-input
            v-model="item.value"
            :placeholder="item.name"
            :clearable="true"/>
          <div class="help-block" v-html="item.remark"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="configFormVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="configLoading"
          @click="config"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setPaymentSort,
  setPaymentStatus,
  setPaymentItem
} from '@/api/payment/payment'
import { cloneDeep } from 'lodash'
import util from '@/utils/util'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage')
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
      currentTableData: [],
      updateLoading: false,
      updateFormVisible: false,
      configLoading: false,
      configFormVisible: false,
      auth: {
        set: false,
        setting: false,
        sort: false,
        enable: false,
        disable: false
      },
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
      return val ? util.getImageCodeUrl(val) : ''
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
      this.auth.set = this.$has('/setting/payment/config/set')
      this.auth.setting = this.$has('/setting/payment/config/setting')
      this.auth.sort = this.$has('/setting/payment/config/sort')
      this.auth.enable = this.$has('/setting/payment/config/enable')
      this.auth.disable = this.$has('/setting/payment/config/disable')
    },
    // 资源下拉框事件
    handleCommand(command) {
      switch (command) {
        case 'storage':
          this.$refs.storage.handleStorageDlg([0, 2])
          break

        case 'upload':
          this.$refs.upload.handleUploadDlg()
          break
      }
    },
    // 获取上传资源
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      if (response.data[0].type === 0) {
        this.updateForm.image = response.data[0].url
      }
    },
    // 获取选择资源
    _getStorageFileList(files) {
      if (!files.length) {
        return
      }

      for (const value of files) {
        if (value.type === 0) {
          this.updateForm.image = value.url
          break
        }
      }
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

      // 禁用权限检测
      if (newStatus === 0 && !this.auth.disable) {
        return
      }

      // 启用权限检测
      if (newStatus === 1 && !this.auth.enable) {
        return
      }

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
      this.updateForm = { ...this.currentTableData[index] }
      this.updateLoading = false
      this.updateFormVisible = true
    },
    // 请求编辑
    update() {
      this.updateLoading = true
      delete this.updateForm['setting']

      setPaymentItem(this.updateForm)
        .then(res => {
          this.$set(
            this.currentTableData,
            this.currentIndex,
            {
              ...this.currentTableData[this.currentIndex],
              ...res.data
            })

          this.updateFormVisible = false
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.updateLoading = false
        })
    },
    // 参数配置
    handleConfig(index) {
      this.currentIndex = index
      this.configForm = cloneDeep(this.currentTableData[index].setting)
      this.configLoading = false
      this.configFormVisible = true
    },
    // 请求配置
    config() {
      const index = this.currentIndex
      this.configLoading = true

      setPaymentItem({
        payment_id: this.currentTableData[index].payment_id,
        setting: this.configForm
      })
        .then(res => {
          this.$set(
            this.currentTableData,
            index,
            {
              ...this.currentTableData[index],
              ...res.data
            })

          this.configFormVisible = false
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.configLoading = false
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
    max-width: 150px;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
  .help-block {
    color: #909399;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
</style>
