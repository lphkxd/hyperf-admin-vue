<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-has="'/setting/logistics/dist/trace'">
        <el-button
          type="primary"
          icon="el-icon-map-location"
          :disabled="loading"
          @click="handleTrace"
          plain>即时查询</el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true"
      @sort-change="sortChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-timeline v-if="Object.keys(props.row['trace']).length > 0">
              <el-timeline-item
                v-for="(activity, index) in props.row['trace']"
                :key="index"
                :timestamp="activity.accept_time"
                type="primary">
                {{activity.accept_station}}
              </el-timeline-item>
            </el-timeline>

            <div v-else class="not-trace">
              <span>暂无轨迹</span>
            </div>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="流水号"
        prop="order_code"
        min-width="210"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="快递公司"
        prop="get_delivery_item.name"
        min-width="120">
      </el-table-column>

      <el-table-column
        label="快递单号"
        prop="logistic_code"
        min-width="170"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="所属账号/昵称"
        min-width="160"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.get_user | getUserInfo}}
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="state"
        sortable="custom">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state | getStateType"
            effect="plain"
            size="mini">
            {{traceState[scope.row.state]}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
        prop="create_time"
        align="center"
        width="160">
      </el-table-column>
    </el-table>

    <el-dialog
      title="即时查询"
      :visible.sync="traceFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        label-width="80px"
        v-loading="traceLoading">
        <el-form-item
          label="快递单号"
          prop="logistic_code">
          <el-autocomplete
            v-if="traceFormVisible"
            v-model="traceForm.logistic_code"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            class="input-with-select"
            style="width: 100%;"
            placeholder="请输入快递单号"
            ref="logisticCode"
            :clearable="true">
            <el-select
              v-model="traceType"
              style="width: 105px;"
              slot="prepend"
              placeholder="请选择"
              @change="getDeliveryCompany"
              value="">
              <el-option label="智能识别" :value="0"/>
              <el-option label="手动获取" :value="1"/>
            </el-select>

            <template slot-scope="{item}">
              <span>{{item.value}} {{item.name}}</span>
            </template>

            <el-button
              v-if="traceType"
              slot="append"
              icon="el-icon-search"
              @click="trace">
            </el-button>
          </el-autocomplete>
        </el-form-item>

        <el-form-item
          v-show="traceType"
          label="快递公司"
          prop="delivery_code">
          <el-select
            v-model="traceForm.delivery_code"
            placeholder="请选择快递公司，试试搜索：顺丰 或 s"
            style="width: 100%;"
            filterable
            :filter-method="filterDelivery"
            @change="handleChange"
            @visible-change="handleVisibleChange"
            clearable
            value="">
            <el-option
              v-for="item in companyList"
              :key="item.delivery_item_id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div v-if="traceData !== null">
        <el-divider>物流轨迹</el-divider>

        <el-timeline v-if="traceData.length > 0">
          <el-timeline-item
            v-for="(trace, index) in traceData"
            :key="index"
            :timestamp="trace.accept_time"
            type="primary">
            {{trace.accept_station}}
          </el-timeline-item>
        </el-timeline>

        <div v-else class="not-trace">
          <span>暂无轨迹</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeliveryDistTrace } from '@/api/logistics/dist'
import { getDeliveryCompanySelect, getDeliveryCompanyRecognise } from '@/api/logistics/company'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    traceState: {
      default: () => {}
    }
  },
  data() {
    return {
      companyList: [],
      companyCopy: [],
      traceType: 0,
      traceData: null,
      traceLoading: false,
      traceFormVisible: false,
      traceForm: {
        delivery_code: undefined,
        logistic_code: undefined
      }
    }
  },
  filters: {
    getStateType(val) {
      switch (val) {
        case 3:
          return 'success'
        case 4:
          return 'danger'
        default:
          return 'info'
      }
    },
    getUserInfo(val) {
      const name = val.username || '-'
      const nick = val.nickname || '-'

      return `${name} / ${nick}`
    }
  },
  methods: {
    // 排序变更
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
    // 手动获取快递公司列表
    getDeliveryCompany(value) {
      this.traceData = null
      if (!value || this.companyList.length > 0) {
        this.$refs.logisticCode.focus()
        return
      }

      getDeliveryCompanySelect()
        .then(res => {
          this.companyList = res.data || []
          this.companyCopy = this.companyList
        })
    },
    // 快递公司值发生变化
    handleChange(value) {
      if (this.traceForm.logistic_code.length > 5) {
        this.traceForm.delivery_code = value
        this.trace()
      }
    },
    // 下拉框显示或隐藏触发
    handleVisibleChange(visible) {
      if (!visible) {
        setTimeout(() => {
          this.companyList = this.companyCopy
        }, 500)
      }
    },
    // 过滤快递公司
    filterDelivery(val) {
      if (val) {
        this.companyList = this.companyCopy.filter(item => {
          if (!!~item.name.indexOf(val) || !!~item.phonetic.toLowerCase().indexOf(val.toLowerCase())) {
            return true
          }
        })
      } else {
        this.companyList = this.companyCopy
      }
    },
    // 即时查询对话框
    handleTrace() {
      this.traceForm = { delivery_code: '', logistic_code: '' }
      this.traceType = 0
      this.traceData = null
      this.traceLoading = false
      this.traceFormVisible = true
    },
    // 选择框触发
    handleSelect(item) {
      this.traceForm = { delivery_code: item.code, logistic_code: item.value }
      this.trace()
    },
    // 即时查询
    trace() {
      this.traceData = null
      this.traceLoading = true

      getDeliveryDistTrace({ ...this.traceForm })
        .then(res => {
          this.traceData = res.data['trace']
        })
        .finally(() => {
          this.traceLoading = false
        })
    },
    // 根据面单查询快递公司
    querySearchAsync(queryString, cb) {
      let data = []
      this.traceData = null

      if (queryString.length < 5 || this.traceType) {
        cb(data)
        return
      }

      getDeliveryCompanyRecognise(queryString)
        .then(res => {
          res.data.shippers.forEach(value => {
            data.push({
              'value': queryString,
              'name': value.shipper_name,
              'code': value.shipper_code
            })
          })
        })
        .finally(() => {
          cb(data)
        })
    }
  }
}
</script>

<style scoped>
  .not-trace {
    color: #99a9bf;
    text-align: center;
  }
  .input-with-select >>> .el-input-group__prepend {
    background-color: #fff;
  }
</style>
