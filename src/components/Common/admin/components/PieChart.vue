<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { customerRatioApi } from "@/api/dashboard";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    amount: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: "lately7"
    }
  },
  data() {
    return {
      chart: null,
      newData: "",
      oldData: "",
      Comment: []
    };
  },
  watch: {
    amount: {
      deep: true,
      handler(val) {
        this.amount = val;
        this.getTurnoverRatio();
      }
    },
    date: {
      deep: true,
      handler(val) {
        this.date = val;
        this.getTurnoverRatio();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {});
    this.getTurnoverRatio();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(data) {},
    getTurnoverRatio() {
      let that = this;
      customerRatioApi({ date: this.date })
        .then(res => {
          that.orderCustomer = res;
          that.newData = that.amount
            ? res.newTotalPrice
            : res.newUser;
          that.oldData = that.amount
            ? res.oldTotalPrice
            : res.oldUser;
          that.chart = echarts.init(that.$el, "macarons");
          that.chart.setOption({
            title: {
              text: "成交金额占比",
              left: "center",
              textStyle: {
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "bold",
                color: "#262626"
              }
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              // orient: "vertical",
              bottom: 0,
              left: "center",
              data: ["新成交客户", "老客户"]
            },
            series: [
              {
                name: "成交比",
                type: "pie",
                // roseType: "radius",
                radius: '55%',
                center: ["50%", "50%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "20",
                    fontWeight: "bold"
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  {
                    value: that.newData,
                    name: "新成交客户",
                    itemStyle: { color: "#39a1ff" }
                  },
                  {
                    value: that.oldData,
                    name: "老客户",
                    itemStyle: { color: "#4ecb73" }
                  }
                ],
                animationEasing: "cubicInOut",
                animationDuration: 2600
              }
            ]
          });
        })
        .catch(res => {
          that.$message.error(res.message);
        });
    }
  }
};
</script>
