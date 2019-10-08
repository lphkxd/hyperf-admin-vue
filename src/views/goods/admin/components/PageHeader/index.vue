<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="分类" prop="goods_category_id">
      <el-cascader
        v-model="form.goods_category_id"
        placeholder="试试搜索：分类"
        :options="catData"
        :props="cascaderProps"
        :show-all-levels="false"
        style="width: 180px;"
        filterable
        clearable>
      </el-cascader>
    </el-form-item>

    <el-form-item label="关键词" prop="keywords">
      <el-input
        v-model="form.keywords"
        prefix-icon="el-icon-search"
        placeholder="商品关键词（可空格间隔）"
        @keyup.enter.native="handleFormSubmit(true)"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="编码" prop="goods_code">
      <el-input
        v-model="form.goods_code"
        prefix-icon="el-icon-search"
        placeholder="货号、条码、SKU、SPU"
        @keyup.enter.native="handleFormSubmit(true)"
        :clearable="true"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit(true)">
        <cs-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <cs-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-popover
        width="388"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="品牌" prop="brand_id">
            <el-select
              v-model="form.brand_id"
              placeholder="请选择"
              style="width: 320px;"
              multiple
              clearable
              value="">
              <el-option
                v-for="(item, index) in brandData"
                :key="index"
                :label="item.name"
                :value="item.brand_id">
                <span class="brand-name">{{item.name}}</span>
                <span class="brand-category">{{item.category_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="库存" prop="store_qty">
            <el-input-number
              v-model="form.store_qty[0]"
              controls-position="right"
              @keyup.enter.native="handleFormSubmit(true)"/>
            <span> 至 </span>
            <el-input-number
              v-model="form.store_qty[1]"
              controls-position="right"
              @keyup.enter.native="handleFormSubmit(true)"/>
          </el-form-item>

          <el-form-item label="是否包邮" prop="is_postage">
            <el-select
              v-model="form.is_postage"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="积分抵扣" prop="is_integral">
            <el-select
              v-model="form.is_integral"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="可抵扣" value="1"/>
              <el-option label="不抵扣" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否推荐" prop="is_recommend">
            <el-select
              v-model="form.is_recommend"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新品" prop="is_new">
            <el-select
              v-model="form.is_new"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否热卖" prop="is_hot">
            <el-select
              v-model="form.is_hot"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>
        </div>

        <el-button
          slot="reference"
          type="text">
          更多筛选
          <cs-icon name="angle-down"/>
        </el-button>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
import util from '@/utils/util'
import { getBrandSelect } from '@/api/goods/brand'
import { getGoodsCategoryList } from '@/api/goods/category'

export default {
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      brandData: [],
      catData: [],
      cascaderProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      form: {
        goods_category_id: undefined,
        keywords: undefined,
        goods_code: undefined,
        brand_id: undefined,
        store_qty: [],
        is_postage: undefined,
        is_integral: undefined,
        is_recommend: undefined,
        is_new: undefined,
        is_hot: undefined
      }
    }
  },
  mounted() {
    Promise.all([
      getBrandSelect({ order_field: 'phonetic' }),
      getGoodsCategoryList(null)
    ])
      .then(res => {
        this.brandData = res[0].data
        this.catData = res[1].data.length
          ? util.formatDataToTree(res[1].data, 'goods_category_id')
          : []
      })
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      let data = { ...this.form }
      const catId = data.goods_category_id

      if (catId) {
        data.goods_category_id = catId.length > 0 ? catId[catId.length - 1] : undefined
      }

      if (!data.store_qty[0] && !data.store_qty[1]) {
        data.store_qty = undefined
      }

      this.$emit('submit', data, isRestore)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
  .more-filter {
    margin-bottom: -18px;
  }
  .more-filter >>> label {
    width: 68px;
  }
  .brand-name {
    float: left;
  }
  .brand-category {
    float: right;
    color: #8492a6;
    font-size: 12px;
    padding-right: 15px;
  }
</style>
