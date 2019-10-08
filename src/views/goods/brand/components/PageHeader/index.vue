<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="所属分类" prop="goods_category_id">
      <el-cascader
        v-model="catId"
        placeholder="可选择所属商品分类 试试搜索：手机"
        :options="catData"
        :props="catProps"
        :show-all-levels="false"
        style="width: 245px;"
        filterable
        clearable>
      </el-cascader>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        prefix-icon="el-icon-search"
        placeholder="可输入品牌名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
      </el-select>
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
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    catData: {
      default: () => []
    }
  },
  data() {
    return {
      catId: [],
      form: {
        name: undefined,
        status: undefined
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      const length = this.catId.length
      this.form.goods_category_id = length > 0 ? this.catId[length - 1] : null

      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      this.catId = []
      this.$refs.form.resetFields()
    }
  }
}
</script>
