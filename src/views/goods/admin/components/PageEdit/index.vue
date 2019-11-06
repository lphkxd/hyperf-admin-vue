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
        :rules="rules"
        label-width="80px">
      </el-form>
    </el-card>
  </div>
</template>

<script>
import util from '@/utils/util'
import { mapActions } from 'vuex'

export default {
  components: {
    'csTinymce': () => import('@/components/cs-tinymce')
  },
  props: {
    state: {
      type: String,
      required: true,
      default: 'create'
    }
  },
  data() {
    return {
      loading: false,
      stateMap: {
        create: '新增商品',
        update: '编辑商品'
      },
      stateButton: {
        create: '确定',
        update: '修改'
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
