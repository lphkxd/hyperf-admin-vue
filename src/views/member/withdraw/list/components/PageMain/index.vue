<template>
  <div class="cs-p">
    <cs-help
      :router="$route.path"
      style="padding-bottom: 19px;">
    </cs-help>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @sort-change="sortChange"
      highlight-current-row
      stripe>
      <el-table-column
        label="提现单号"
        prop="withdraw_no"
        min-width="160"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="提现金额"
        prop="money">
        <template slot-scope="scope">
          <b>{{scope.row.money}}</b>
        </template>
      </el-table-column>

      <el-table-column
        label="手续费(%)"
        prop="fee">
      </el-table-column>

      <el-table-column
        label="合计金额"
        prop="amount">
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        align="center"
        sortable="custom"
        min-width="100">
        <template slot-scope="scope">
          <el-tag
            :type="statusMap[scope.row.status].type"
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

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleWithdraw(scope.$index)"
            type="text">提单详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提单详细"
      :visible.sync="infoVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">

      <div style="margin-top: -25px;"></div>

      <div v-if="infoVisible" ref="print">
        <table style="width: 100%;">
          <caption><p style="background-color: #f8f8f9">提现单据</p></caption>
          <tr>
            <td><b>提现单号：</b>{{infoForm.withdraw_no}}</td>
            <td><b>账号/昵称：</b>{{infoForm.get_user.username}} / {{infoForm.get_user.nickname}}</td>
          </tr>
          <tr>
            <td>创建日期：{{infoForm.create_time}}</td>
          </tr>
        </table>

        <table style="width: 100%;">
          <colgroup>
            <col style="width: 20%;">
            <col style="width: 80%;">
          </colgroup>
          <caption><p style="background-color: #f8f8f9">收款明细</p></caption>
          <tr><td>收款人姓名：</td><td>{{infoForm.name}}</td></tr>
          <tr><td>收款人手机：</td><td>{{infoForm.mobile}}</td></tr>
          <tr><td>收款账户：</td><td>{{infoForm.bank_name}}</td></tr>
          <tr><td>收款账号：</td><td>{{infoForm.account}}</td></tr>
          <tr><td>&nbsp;</td></tr>
          <tr><td><b>提现金额：</b></td><td>{{infoForm.money}}</td></tr>
          <tr><td>手续费：</td><td>{{infoForm.fee}} %</td></tr>
          <tr><td>合计金额：</td><td>{{infoForm.amount}}</td></tr>
        </table>

        <table style="width: 100%;">
          <caption><p style="background-color: #f8f8f9">其他内容</p></caption>
          <tbody>
          <tr>
            <td>状态：{{statusMap[infoForm.status].text}}</td>
            <td rowspan="2">
              <el-image
                v-if="qrcodeUrl"
                style="float: right;"
                :src="`${qrcodeUrl}?text=${infoForm.withdraw_no}`"/>
            </td>
          </tr>
          <tr>
            <td style="width: 70%;">备注：{{infoForm.remark}}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div slot="footer" class="dialog-footer">
        <div style="float: left">
          <el-button
            @click="$print($refs.print)"
            size="small">
            <cs-icon name="print"/>
            打印</el-button>
        </div>

        <el-button
          type="primary"
          @click="infoVisible = false"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQrcodeCallurl } from '@/api/aided/qrcode'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
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
  data() {
    return {
      infoForm: {},
      infoVisible: false,
      currentTableData: [],
      qrcodeUrl: '',
      statusMap: {
        0: {
          text: '待处理',
          type: 'info'
        },
        1: {
          text: '处理中',
          type: ''
        },
        2: {
          text: '已取消',
          type: 'warning'
        },
        3: {
          text: '已完成',
          type: 'success'
        },
        4: {
          text: '已拒绝',
          type: 'danger'
        }
      }
    }
  },
  mounted() {
    getQrcodeCallurl()
      .then(res => {
        this.qrcodeUrl = res.data['call_url']
      })
  },
  methods: {
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
    // 弹出提单详细对话框
    handleWithdraw(index) {
      this.infoForm = this.currentTableData[index]
      this.infoVisible = true
    }
  }
}
</script>

<style scoped>
</style>
