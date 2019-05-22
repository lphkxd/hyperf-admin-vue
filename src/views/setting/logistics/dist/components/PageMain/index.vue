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
      <el-form
        :model="traceForm"
        :rules="rules"
        ref="form"
        label-width="80px">
        <el-form-item
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
            value="">
            <el-option
              v-for="item in companyList"
              :key="item.delivery_item_id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="快递单号"
          prop="logistic_code">
          <el-input
            v-model="traceForm.logistic_code"
            placeholder="请输入快递单号"
            style="width: 260px;"
            clearable/>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="traceLoading"
            @click="trace"
            size="small">查询</el-button>
        </el-form-item>
      </el-form>

      <div v-if="traceData.length">
        <el-divider>物流轨迹</el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="(trace, index) in traceData"
            :key="index"
            :timestamp="trace.accept_time"
            type="primary">
            {{trace.accept_station}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeliveryDistTrace } from '@/api/logistics/dist'
import { getDeliveryCompanySelect } from '@/api/logistics/company'
import { getHelpRouter } from '@/api/index/help'

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
      traceData: [],
      traceLoading: false,
      traceFormVisible: false,
      traceForm: {
        delivery_code: undefined,
        logistic_code: undefined
      },
      rules: {
        delivery_code: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        logistic_code: [
          {
            required: true,
            message: '快递单号不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ]
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
  mounted() {
    getDeliveryCompanySelect()
      .then(res => {
        this.companyList = res.data.length > 0 ? res.data : []
        this.companyCopy = this.companyList
      })
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
      this.traceForm = {
        delivery_code: '',
        logistic_code: ''
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.traceData = []
      this.traceLoading = false
      this.traceFormVisible = true
    },
    // 即时查询
    trace() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.traceData = []
          this.traceLoading = true

          getDeliveryDistTrace(this.traceForm)
            .then(res => {
              this.traceData = res.data['trace']
            })
            .finally(() => {
              this.traceLoading = false
            })
        }
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
</style>
