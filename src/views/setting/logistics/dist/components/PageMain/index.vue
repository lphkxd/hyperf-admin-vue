<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleTrace"
          type="primary"
          plain>
          <cs-icon name="map-marker"/>
          即时查询
        </el-button>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      @sort-change="sortChange"
      stripe>
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
      width="600px">
      <el-form label-width="80px">
        <el-form-item
          label="快递单号"
          prop="logistic_code">
          <el-autocomplete
            v-model="traceForm.logistic_code"
            :fetch-suggestions="querySearchAsync"
            class="input-with-select"
            style="width: 100%;"
            placeholder="请输入快递单号"
            clearable>
            <el-select
              v-model="traceType"
              style="width: 105px;"
              slot="prepend"
              placeholder="请选择"
              @change="getDeliveryCompany"
              value="">
              <el-option label="智能识别" :value="0"></el-option>
              <el-option label="手动获取" :value="1"></el-option>
            </el-select>

            <el-button
              slot="append"
              icon="el-icon-search"
              :loading="traceLoading"
              @click="trace"/>
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
            clearable
            filterable
            :filter-method="filterDelivery"
            @visible-change="handleVisibleChange"
            ref="deliverySelect"
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

        <el-timeline v-if="traceData.length">
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
import { getHelpRouter } from '@/api/index/help'
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
      helpContent: '',
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
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    },
    // 排序变更
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 手动获取快递公司列表
    getDeliveryCompany(value) {
      this.traceData = null
      if (!value || this.companyList.length > 0) {
        return
      }

      getDeliveryCompanySelect()
        .then(res => {
          this.companyList = res.data.length > 0 ? res.data : []
          this.companyCopy = this.companyList
        })
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
    // 即时查询
    trace() {
      this.traceData = null
      this.traceLoading = true

      getDeliveryDistTrace(this.traceForm)
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
      if (!queryString.length || this.traceType) {
        cb(data)
        return
      }

      getDeliveryCompanyRecognise(queryString)
        .then(res => {
          data = [
            { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
          ]
          // res.data.forEach(value => {
          //   data.push({
          //   })
          // })
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
