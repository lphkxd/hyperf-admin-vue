<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="() => {}"
          type="warning"
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
          <el-form label-position="left" inline class="table-expand">
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
      traceType: 0,
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
  watch: {
    traceType: {
      handler(val) {
        getDeliveryCompanySelect(val)
          .then(res => {
            this.companyList = res.data.length ? res.data : []
          })
      },
      immediate: true
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
  .not-trace {
    font-size: 14px;
    color: #99a9bf;
    text-align: center;
  }
</style>
