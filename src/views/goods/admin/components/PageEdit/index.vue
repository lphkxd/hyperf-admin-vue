<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{stateMap[state]}}</span>
      </div>

      <el-form
        ref="form"
        :model="currentForm"
        label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础设置" name="basic">
            基础设置
          </el-tab-pane>

          <el-tab-pane label="规格属性" name="type">
            规格属性
          </el-tab-pane>

          <el-tab-pane label="媒体设置" name="photo">
            媒体设置
          </el-tab-pane>

          <el-tab-pane label="商品详情" name="detail">
            <el-form-item
              label="详情描述"
              prop="content">
              <cs-tinymce
                ref="tinymce"
                v-model="currentForm.content"
                code="inside_content"
                :height="450"/>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="积分结算" name="integral">
            <el-form-item
              label="结算方式"
              prop="integral_type">
              <el-radio-group v-model="currentForm.integral_type">
                <el-radio :label="0">按百分比</el-radio>
                <el-radio :label="1">按固定值</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="赠送分值"
              prop="give_integral">
              <el-input-number
                v-model="currentForm.give_integral"
                :precision="currentForm.integral_type ? 0 : 2"
                :max="currentForm.integral_type ? undefined : 100"
                :min="0"
                controls-position="right"/>
            </el-form-item>

            <el-form-item
              label="可抵扣额"
              prop="is_integral">
              <el-input-number
                v-model="currentForm.is_integral"
                :min="0"
                controls-position="right"/>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import util from '@/utils/util'
// import { mapActions } from 'vuex'

export default {
  components: {
    'csTinymce': () => import('@/components/cs-tinymce')
  },
  props: {
    confirmLoading: {
      default: false
    },
    state: {
      type: String,
      required: true,
      default: 'create'
    }
  },
  data() {
    return {
      loading: false,
      activeName: 'basic',
      stateMap: {
        create: '新增商品',
        update: '编辑商品'
      },
      currentForm: {
        goods_category_id: [],
        name: '',
        short_name: '',
        product_name: '',
        goods_code: '',
        goods_spu: '',
        goods_sku: '',
        bar_code: '',
        brand_id: [],
        store_qty: 0,
        market_price: 0,
        shop_price: 0,
        integral_type: 0,
        give_integral: 0,
        is_integral: 0,
        least_sum: 0,
        purchase_sum: 0,
        keywords: '',
        description: '',
        content: '',
        attachment: [],
        video: [],
        unit: '',
        is_recommend: 0,
        is_new: 0,
        is_hot: 0,
        goods_type_id: undefined,
        sort: 50,
        status: 1,
        goods_attr_item: [],
        goods_spec_item: [],
        spec_image: [],
        is_postage: 0,
        measure: 0,
        measure_type: undefined
      },
      rules: {
      }
    }
  },
  methods: {
    // 确认新增或修改
    handleConfirm() {
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }
</style>
