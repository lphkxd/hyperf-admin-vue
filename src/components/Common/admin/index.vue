<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;margin:20px 0;">
      <div class="panel-title">
        <el-col :span="12">
          <span>支付订单</span>
          <i class="el-icon-warning-outline el-icon-weibiaoti" />
        </el-col>
        <el-col :span="12" class="align-right">
          <i class="el-icon-date select-icon-date" />
          <el-select
            v-model="time3"
            placeholder="请选择"
            class="filter-item selWidth"
            popper-class="rewriteStyle"
            @change="((value)=>{getCurrentData(value)})"
          >
            <el-option
              v-for="item in timeList1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </div>
      <line-chart ref="lineChart" :chart-data="lineChartData" :date="time3" />
    </el-row>
    <el-row :gutter="20" class="panel-warp" style="height: 380px;">
      <el-col :xs="24" :sm="24" :lg="16">
        <el-row class="panel-title" style="background: #fff;padding: 20px;">
          <el-col :span="12">
            <span>成交客户</span>
            <i class="el-icon-warning-outline el-icon-weibiaoti" />
          </el-col>
          <el-col :span="12" class="align-right">
            <i class="el-icon-date select-icon-date" />
            <el-select
              v-model="time1"
              placeholder="请选择"
              class="filter-item selWidth"
              @change="getCustomerData"
            >
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <i class="el-icon-arrow-down" /> -->
          </el-col>
        </el-row>
        <div class="chart-wrapper">
          <!-- <raddar-chart /> -->
          <el-row style="background: #fff; height: 410px; padding: 0 20px; position: relative;">
            <span class="grid-floating" style="position: absolute;">
              访客-下单转化率：
              <span class="grid-conversion-number">{{ orderCustomer.orderRate }}%</span>
            </span>
            <span class="grid-floating">
              下单-支付转化率：
              <span class="grid-conversion-number">{{ orderCustomer.payOrderRate }}%</span>
            </span>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="18" class="bg-color bg-blue">
                  访客人数
                  <span class="grid-count">{{ orderCustomer.visitUser }}</span>
                </el-col>
                <el-col :span="10" class="blue-trapezoid bg-trapezoid">
                  <span>访客</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="4" class="bg-color bg-green">
                  下单人数
                  <span class="grid-count">{{ orderCustomer.payOrderUser }}</span>
                </el-col>
                <el-col :span="4" class="bg-color bg-green">
                  下单金额
                  <span class="grid-count">{{ orderCustomer.orderPrice }}</span>
                </el-col>
                <el-col :span="8" class="bg-color bg-green" style="height: 100px;" />
                <el-col :span="10" class="green-trapezoid bg-trapezoid">
                  <span>下单</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="4" class="bg-color bg-gray-dark">
                  支付人数
                  <span class="grid-count">{{ orderCustomer.payOrderUser }}</span>
                </el-col>
                <el-col :span="4" class="bg-color bg-gray-dark">
                  支付金额
                  <span class="grid-count">{{ orderCustomer.payOrderPrice }}</span>
                </el-col>
                <el-col :span="4" class="bg-color bg-gray-dark">
                  客单价
                  <span class="grid-count">{{ orderCustomer.userRate }}</span>
                </el-col>
                <el-col :span="2" class="bg-color bg-gray-dark" style="height: 100px;" />
                <el-col :span="10" class="gray-dark-trapezoid bg-trapezoid">
                  <span>支付</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-row class="panel-title" style="background: #fff;padding: 20px 20px 50px;">
          <el-col :span="8">
            <span>成交客户占比</span>
            <i class="el-icon-warning-outline el-icon-weibiaoti" />
          </el-col>
          <el-col :span="16" class="align-right">
            <i class="el-icon-date select-icon-date" />
            <el-select
              v-model="time2"
              placeholder="请选择"
              class="filter-item selWidth"
              @change="((value)=>{getCustomerRatioData(value)})"
            >
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-row class="pieChart-switch">
              <el-button :type="isAmount?'primary':''" value="金额" @click.native="chooseAmount">金额</el-button>
              <el-button
                :type="!isAmount?'primary':''"
                value="客户数"
                @click.native="chooseCustomers"
              >客户数</el-button>
            </el-row>
          </el-col>
        </el-row>

        <div class="chart-wrapper">
          <pie-chart ref="pieChart" :amount="isAmount" :date="time2" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 商品支付排行 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品支付排行</span>
            <i class="el-icon-warning-outline el-icon-weibiaoti" />
          </el-col>
          <el-col :span="16" class="align-right">
            <i class="el-icon-date select-icon-date" />
            <el-select
              v-model="rankingTime1"
              placeholder="请选择"
              class="filter-item selWidth"
              @change="((value)=>{getRankingData(value)})"
            >
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4" style="padding-left: 20px;">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">支付数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in commodityPaymentList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="index > 2 ?'gray':'navy-blue'">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.picSrc" alt>
              <span>{{ list.name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.count }}</el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 访客 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品访客排行</span>
            <i class="el-icon-warning-outline el-icon-weibiaoti" />
          </el-col>
          <el-col :span="16" class="align-right">
            <i class="el-icon-date select-icon-date" />
            <el-select
              v-model="rankingTime2"
              placeholder="请选择"
              class="filter-item selWidth"
              @change="((value)=>{getVisitorRankingData(value)})"
            >
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4" style="padding-left: 20px;">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">支付数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in visitorRankingList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="index > 2 ?'gray':'navy-blue'">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.image" alt>
              <span>{{ list.store_name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.total }}</el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 加购 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品加购排行</span>
            <i class="el-icon-warning-outline el-icon-weibiaoti" />
          </el-col>
          <el-col :span="16" class="align-right">
            <i class="el-icon-date select-icon-date" />
            <el-select
              v-model="rankingTime3"
              placeholder="请选择"
              class="filter-item selWidth"
              @change="((value)=>{getProductPlusData(value)})"
            >
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4" style="padding-left: 20px;">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">支付数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in productPlusList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="index > 2 ?'gray':'navy-blue'">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.picSrc" alt>
              <span>{{ list.store_name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.count }}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import {
  customerApi,
  rankingApi,
  visitorRankingApi,
  ProductPlusApi
} from '@/api/dashboard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    payer: [100, 120, 98, 130, 150, 140, 180]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  followers: {
    expectedData: [150, 90, 98, 130, 150, 140, 180],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    payer: [130, 140, 141, 142, 145, 150, 160]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      value1: '',
      value2: '',
      time1: 'lately7',
      time2: 'lately7',
      time3: 'lately7',
      rankingTime1: 'lately7',
      rankingTime2: 'lately7',
      rankingTime3: 'lately7',
      lineChartData: lineChartData.newVisitis,
      isAmount: true,
      timeList: [
        { value: 'lately7', label: '近7天' },
        { value: 'lately30', label: '近30天' },
        { value: 'month', label: '本月' },
        { value: 'year', label: '本年' }
      ],
      timeList1: [
        { value: 'lately7', label: '近7天' },
        { value: 'lately30', label: '近30天' },
        { value: 'month', label: '本月' }
      ],
      commodityPaymentList: [],
      visitorRankingList: [],
      productPlusList: [],
      orderCustomer: {}
    }
  },
  mounted() {
    this.getCurrentData({ date: this.time3 }) // 支付订单
    this.getCustomerData({ date: this.time1 }) // 成交客户
    this.getCustomerRatioData({ date: this.time2 }) // 成交客户占比
    this.getRankingData(this.rankingTime1) // 商品支付排行
    this.getVisitorRankingData(this.rankingTime2) // 商品访客排行
    this.getProductPlusData(this.rankingTime3) // 商品加购排行
  },
  methods: {
    chooseAmount() {
      if (this.isAmount) {
        return
      } else {
        this.isAmount = true
      }
    },
    chooseCustomers() {
      // this.isAmount = true;
      if (this.isAmount) {
        this.isAmount = false
      } else {
        return
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getCurrentData(date) {
      this.$refs.lineChart.getOrderData({ date: this.time3 })
    },
    getCustomerData(date) {
      const params = { date: date }
      customerApi(params)
        .then(res => {
          this.orderCustomer = res
        })
        .catch(res => {
          this.$message.error(res.error)
        })
    },
    getCustomerRatioData(params) {
      this.$refs.pieChart.getTurnoverRatio()
    },
    getRankingData(date) {
      const params = { date: date }
      rankingApi(params)
        .then(res => {
          this.commodityPaymentList.length = 0
          res.map(item => {
            this.commodityPaymentList.push({
              name: item.cart_info.product.store_name,
              picSrc: item.cart_info.product.image,
              count: item.total
            })
          })
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 商品访客排行
    getVisitorRankingData(date) {
      const params = { date: date }
      visitorRankingApi(params)
        .then(res => {
          this.visitorRankingList = res
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 商品加购排行
    getProductPlusData(date) {
      const params = { date: date }
      ProductPlusApi(params)
        .then(res => {
          this.productPlusList = res
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
$textColor: #8d8d8d;
.align-right {
  text-align: right;
}
.dashboard-editor-container {
  padding: 0px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    margin-bottom: 20px;
    height: 380px;
  }
}
.panel-title {
  padding: 20px;
  color: #000;
  // font-family: "Microsoft yahei";
  font-weight: bold;
  line-height: 36px;
}
.grid-content {
  margin-bottom: 2px;
  height: 100px;
  line-height: 30px;
  color: #2b2d2c;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  .bg-color {
    padding: 20px;
  }
  .grid-count {
    display: block;
    font-weight: bold;
  }
}
.el-icon-weibiaoti{
  opacity: .6;
  transform: rotate(180deg);
}
.grid-floating {
  position: absolute;
  right: 20px;
  font-size: 13px;
  font-weight: bold;
  z-index: 5;
  line-height: 35px;
  &:before {
    content: "";
    display: inline-block;
    width: 85px;
    height: 1px;
    background: #d8d8d8;
    position: absolute;
    top: 15px;
    left: -90px;
  }
  .grid-conversion-number {
    display: inline-block;
    width: 45px;
  }
  &:nth-child(1) {
    top: 85px;
  }
  &:nth-child(2) {
    top: 188px;
    &:before {
      width: 150px;
      left: -155px;
    }
  }
}
.grid-title-count {
  background: #fff;
}
.select-icon-date {
  opacity: 0.6;
}
.grid-title {
  font-weight: bold;
  padding: 20px 0;
  background: #fafafa;
  margin: 0 20px;
  font-size: 14px;
}
.bg-blue {
  background-color: #eff4fe;
}
.bg-green {
  background-color: #effbf6;
}
.bg-gray-dark {
  background-color: #eff1f4;
}
.grid-list-content {
  background: #fff;
  padding: 15px;
  height: 388px;
  overflow: hidden;
  .el-row{
    margin-bottom: 6px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .grid-list {
    padding: 13px;
    &:first-child {
      padding-left: 25px;
      span {
        display: block;
        width: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        font-size: 12px;
        &.gray {
          background: #b7bfc5;
        }
        &.navy-blue {
          background: #314659;
        }
      }
    }
    &:nth-child(2) {
      position: relative;
      padding-left: 50px;
      span {
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      img {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 0;
        top: 7px;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
      }
    }
    &:last-child {
      font-size: 14px;
    }
  }
}
.pieChart-switch {
  font-size: 0;
  background: #fff;
  text-align: right;
  padding: 10px 20px 0;
  position: absolute;
  top: 60px;
  right: 20px;
}
.pieChart-switch .el-button {
  display: inline-block;
  width: 50px;
  line-height: 22px;
  color: #cccccc;
  text-align: center;
  font-size: 12px;
  padding: 0;
  &.el-button--primary {
    color: #fff;
  }
  &:first-child {
    border-radius: 3px 0 0 3px;
    border-right: none;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
    border-left: none;
    margin-left: 0;
  }
}
/deep/ .align-right .el-input__inner {
  border: none;
  padding: 0 5px;
  width: 92px;
  color: $textColor;
}
.bg-trapezoid {
  position: absolute;
  left: 40%;
  top: 0;
  span {
    position: absolute;
    width: 50px;
    text-align: center;
  }
}
.blue-trapezoid {
  border-top: 100px solid #6395fa;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  span {
    color: #fff;
    top: -62px;
    left: 50%;
    margin-left: -30px;
  }
  &:hover {
    border-top-color: rgba(109, 156, 252, 1);
  }
}
.green-trapezoid {
  border-top: 400px solid #63daab;
  border-left: 75px solid transparent;
  border-right: 75px solid transparent;
  top: -265px;
  span {
    color: #fff;
    top: -103px;
    left: 50%;
    margin-left: -30px;
  }
  &:hover {
    border-top-color: rgba(109, 227, 180, 1);
  }
}
.gray-dark-trapezoid {
  border-top: 670px solid #657798;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  top: -510px;
  span {
    color: #fff;
    top: -125px;
    left: 50%;
    margin-left: -24px;
  }
  &:hover {
    border-top-color: rgba(123, 143, 179, 1);
  }
}
@media (max-width: 1800px) {
  .blue-trapezoid {
    border-top: 150px solid #6395fa;
    border-left-width: 70px;
    border-right-width: 70px;
    span {
      top: -109px;
    }
  }
  .green-trapezoid {
    border-top-width: 350px;
    border-left-width: 75px;
    border-right-width: 75px;
    top: -220px;
    span {
      top: -94px;
    }
  }
  .gray-dark-trapezoid {
    border-top-width: 545px;
    border-left-width: 85px;
    border-right-width: 85px;
    top: -443px;
    span {
      top: -72px;
    }
  }
}
@media (max-width: 1600px) {
  .blue-trapezoid {
    border-top: 150px solid #6395fa;
    border-left: 45px solid transparent;
    border-right: 45px solid transparent;
  }
  .green-trapezoid {
    border-top-width: 440px;
    border-left-width: 58px;
    border-right-width: 58px;
    top: -233px;
    span {
      top: -170px;
    }
  }
  .gray-dark-trapezoid {
    border-top-width: 455px;
    border-left-width: 60px;
    border-right-width: 60px;
    top: -332px;
    span {
      top: -85px;
    }
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
