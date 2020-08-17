<template>
  <div class="panel-container">
    <el-row class="panel-title">
      <el-col :span="12">
        <span style="font-weight:bold;">主要数据</span>
      </el-col>
      <el-col
        :span="12"
        class="align-right"
        style="color: #8c8c8c; font-family: cursive;"
      >{{ mainData.day }}</el-col>
    </el-row>
    <el-row class="panel-group">
      <el-col class="card-panel-col el-col-sm-4-8">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-description">
            <div class="card-panel-text">支付订单数</div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.orderNum"
              :duration="2600"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              <p>
                昨日：
                <span>{{ mainData.yesterday.orderNum }}</span>
              </p>
              <p>
                同比上周
                <span :class="{'isdecline':mainData.lastWeekRate.orderNum>0}">
                  {{ mainData.lastWeekRate.orderNum }}%
                  <i />
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col el-col-sm-4-8">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-description">
            <div class="card-panel-text">支付金额</div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.payPrice"
              :duration="3000"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              <p>
                昨日：
                <span>{{ mainData.yesterday.payPrice }}</span>
              </p>
              <p>
                同比上周
                <span :class="{'isdecline':mainData.lastWeekRate.payPrice>0}">
                  {{ mainData.lastWeekRate.payPrice }}%
                  <i />
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col el-col-sm-4-8">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-description">
            <div class="card-panel-text">支付人数</div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.payUser"
              :duration="3200"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              <p>
                昨日：
                <span>{{ mainData.yesterday.payUser }}</span>
              </p>
              <p>
                同比上周
                <span :class="{'isdecline':mainData.lastWeekRate.payUser>0}">
                  {{ mainData.lastWeekRate.payUser }}%
                  <i />
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col el-col-sm-4-8">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">访客数</div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.visitNum"
              :duration="3600"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              <p>
                昨日：
                <span>{{ mainData.yesterday.visitNum }}</span>
              </p>
              <p>
                同比上周
                <span :class="{'isdecline':mainData.lastWeekRate.visitNum>0}">
                  {{ mainData.lastWeekRate.visitNum }}%
                  <i />
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col el-col-sm-4-8">
        <div class="card-panel" @click="handleSetLineChartData('followers')">
          <div class="card-panel-description">
            <div class="card-panel-text">关注店铺</div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.likeStore"
              :duration="3600"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              <p>
                昨日：
                <span>{{ mainData.yesterday.likeStore }}</span>
              </p>
              <p>
                同比上周
                <span :class="{'isdecline':mainData.lastWeekRate.likeStore>0}">
                  {{ mainData.lastWeekRate.likeStore }}%
                  <i />
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { mainDataApi } from "@/api/dashboard";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      value2: "",
      decline: 1,
      mainData: {
        yesterday: {},
        today: {},
        lastWeekRate: {}
      },
      today: {},
      lastWeekRate: {},
      yesterday: {}
    };
  },
  components: {
    CountTo
  },
  mounted() {
    this.getMainData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    getMainData() {
      mainDataApi()
        .then(res => {
          this.mainData = res;
        })
        .catch(res => {
          this.$message.error(res.error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$textColor: #8d8d8d;
.panel-container {
  background: #fff;
  .panel-title {
    padding: 20px 20px 0 20px;
  }
}
.el-input__inner {
  border: none !important;
}
.align-right {
  text-align: right;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    // box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    position: relative;
    &:after {
      content: "";
      display: block;
      width: 1px;
      height: 100%;
      background: rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 0;
      right: 0;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      padding: 0 30px;
      font-weight: bold;
      margin: 12px 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: #262626;
        font-size: 14px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        color: #000;
      }
    }
  }
  .card-panel-compared {
    p {
      color: $textColor;
    }
    span {
      color: red;
      margin-left: 5px;
      i {
        display: inline-block;
        border: 5px solid transparent;
        border-bottom: 5px solid red;
        position: relative;
        bottom: 1px;
        left: 5px;
      }
      &.isdecline {
        color: green;
        i {
          border-bottom: none;
          border-top: 5px solid green;
        }
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
@media only screen and (min-width: 768px) {
  .el-col-sm-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 992px) {
  .el-col-md-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 1200px) {
  .el-col-lg-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 1920px) {
  .el-col-xl-4-8 {
    width: 20%;
  }
}
</style>
