<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { orderApi } from '@/api/dashboard'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      default: 'lately7'
    }
  },
  data() {
    return {
      chart: null,
      horizontalAxis: [],
      PaymentAmount: [],
      orderNumber: [],
      user: []
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    date: {
      deep: true,
      handler(val) {
        this.date = val
        const params = { date: this.date }
        this.getOrderData(params)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions(this.chartData);
      this.getOrderData({ date: this.date })
    },
    getOrderData(params) {
      const that = this
      orderApi(params)
        .then(res => {
          that.horizontalAxis.splice(0, that.horizontalAxis.length)
          that.PaymentAmount.splice(0, that.PaymentAmount.length)
          that.orderNumber.splice(0, that.orderNumber.length)
          that.user.splice(0, that.user.length)
          res.map(item => {
            that.horizontalAxis.push(item.day)
            that.PaymentAmount.push(item.pay_price)
            that.orderNumber.push(item.total)
            that.user.push(item.user)
          })
          const horizontalAxis = that.horizontalAxis
          const PaymentAmount = that.PaymentAmount
          const orderNumber = that.orderNumber
          const user = that.user
          that.chart.setOption({
            xAxis: {
              data: horizontalAxis,
              axisLine: {
                lineStyle: {
                  color: '#dfdfdf'
                }
              },
              boundaryGap: false,
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0
              }
            },
            grid: {
              left: 50,
              right: 50,
              bottom: 20,
              top: 60,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [5, 10]
            },
            yAxis: {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#8c8c8c'
                }
              },
              axisLabel: {
                formatter: '{value}K'
              },
              axisTick: {
                show: false
              }
            },
            legend: {
              data: ['订单数', '支付金额', '支付人数'],
              left: 10
            },
            series: [
              {
                name: '订单数',
                markPoint: {
                  data: [{ type: 'max', name: '峰值' }]
                },
                itemStyle: {
                  normal: {
                    color: '#5b8ff9',
                    lineStyle: {
                      color: '#5b8ff9',
                      width: 2
                    }
                  }
                },
                smooth: true,
                type: 'line',
                data: orderNumber,
                animationDuration: 2800,
                animationEasing: 'cubicInOut'
              },
              {
                name: '支付金额',
                smooth: true,
                type: 'line',
                markPoint: {
                  data: [{ type: 'max', name: '峰值' }]
                },
                itemStyle: {
                  normal: {
                    color: '#5ad8a6',
                    lineStyle: {
                      color: '#5ad8a6',
                      width: 2
                    },
                    areaStyle: {
                      color: 'rgba(255,255,255,.4)'
                    }
                  }
                },
                data: PaymentAmount,
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
              },
              {
                name: '支付人数',
                smooth: true,
                type: 'line',
                markPoint: {
                  data: [{ type: 'max', name: '峰值' }]
                },
                itemStyle: {
                  normal: {
                    color: '#5d7092',
                    lineStyle: {
                      color: '#5d7092',
                      width: 2
                    },
                    areaStyle: {
                      color: 'rgba(255,255,255,.4)'
                    }
                  }
                },
                data: user,
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
              }
            ]
          })
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    setOptions({ expectedData, actualData, payer } = {}) {}
  }
}
</script>
