<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
      @sort-change="sortChange">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="来源订单号">
              <span>{{props.row.source_no}}</span>
            </el-form-item>

            <el-form-item label="交易账号">
              <span>{{props.row.get_user.username}}</span>
            </el-form-item>

            <el-form-item label="收支类型">
              <el-tag
                :type="typeMap[props.row.type].type"
                size="mini">
                {{typeMap[props.row.type].text}}
              </el-tag>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="来源订单号"
        prop="source_no"
        width="240">
      </el-table-column>

      <el-table-column
        label="交易账号"
        prop="get_user">
        <template slot-scope="scope">
          {{scope.row.get_user.username}}
        </template>
      </el-table-column>

      <el-table-column
        label="收支金额"
        prop="type"
        sortable="custom">
        <template slot-scope="scope">
          <el-tag
            :type="typeMap[scope.row.type].type"
            size="mini">
            {{`${typeMap[scope.row.type].symbol} ${scope.row.amount}`}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="剩余余额"
        prop="balance">
      </el-table-column>

      <el-table-column
        label="交易来源"
        prop="to_payment">
        <template slot-scope="scope">
          {{getToPayment(scope.row.to_payment)}}
        </template>
      </el-table-column>

      <el-table-column
        label="收支模型"
        prop="module">
        <template slot-scope="scope">
          {{moduleMap[scope.row.module]}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作人"
        prop="action">
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
        0: {
          text: '收入',
          type: 'success',
          symbol: '+'
        },
        1: {
          text: '支出',
          type: 'danger',
          symbol: '-'
        }
      },
      moduleMap: { points: '积分', money: '余额', card: '购物卡' }
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
  .table-expand>>>label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
