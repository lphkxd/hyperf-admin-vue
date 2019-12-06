<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true"
      @sort-change="sortChange">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="支付流水号">
              <span>{{props.row.payment_no}}</span>
            </el-form-item>

            <el-form-item label="交易号">
              <span>{{props.row.out_trade_no}}</span>
            </el-form-item>

            <el-form-item label="订单号">
              <span>{{props.row.order_no}}</span>
            </el-form-item>

            <el-form-item label="支付方式">
              <span>{{getToPayment(props.row.to_payment)}}</span>
            </el-form-item>

            <el-form-item label="支付账号">
              <span>{{props.row.get_user.username}}</span>
            </el-form-item>

            <el-form-item label="支付昵称">
              <span>{{props.row.get_user.nickname}}</span>
            </el-form-item>

            <el-form-item label="支付金额">
              <span>{{props.row.amount | getNumber}}</span>
            </el-form-item>

            <el-form-item label="支付日期">
              <span>{{props.row.payment_time}}</span>
            </el-form-item>

            <el-form-item label="支付类型">
              <span>{{typeMap[props.row.type]}}</span>
            </el-form-item>

            <el-form-item label="状态">
              <el-tag
                :type="statusMap[props.row.status].type"
                effect="plain"
                size="mini">
                {{statusMap[props.row.status].text}}
              </el-tag>
            </el-form-item>

            <el-form-item label="创建日期">
              <span>{{props.row.create_time}}</span>
            </el-form-item>

            <el-form-item label="最后更新">
              <span>{{props.row.update_time}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="支付流水号"
        prop="payment_no"
        width="240">
      </el-table-column>

      <el-table-column
        label="支付方式"
        prop="to_payment">
        <template slot-scope="scope">
          {{getToPayment(scope.row.to_payment)}}
        </template>
      </el-table-column>

      <el-table-column
        label="支付账号"
        prop="get_user.username">
      </el-table-column>

      <el-table-column
        label="支付金额"
        prop="amount">
        <template slot-scope="scope">
          {{scope.row.amount | getNumber}}
        </template>
      </el-table-column>

      <el-table-column
        label="支付日期"
        prop="payment_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="支付类型"
        prop="type"
        align="center"
        min-width="80">
        <template slot-scope="scope">
          {{typeMap[scope.row.type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        align="center"
        min-width="120"
        sortable="custom">
        <template slot-scope="scope">
          <el-tag
            :type="statusMap[scope.row.status].type"
            effect="plain"
            size="mini">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
        prop="create_time"
        align="center"
        width="160"
        sortable="custom">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  props: {
    loading: {
      default: false
    },
    toPayment: {
      default: () => {}
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      typeMap: {
        0: '充值',
        1: '订单'
      },
      statusMap: {
        0: {
          text: '待付款',
          type: 'info'
        },
        1: {
          text: '已完成',
          type: 'success'
        },
        2: {
          text: '已关闭',
          type: 'warning'
        }
      }
    }
  },
  filters: {
    getNumber(val) {
      return util.getNumber(val)
    }
  },
  methods: {
    getToPayment(val) {
      return val !== '' ? this.toPayment[val]['name'] : ''
    },
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
</style>
