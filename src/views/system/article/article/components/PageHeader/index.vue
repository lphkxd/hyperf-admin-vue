<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="分类" prop="article_cat_id">
      <el-cascader
        v-model="form.article_cat_id"
        placeholder="试试搜索：分类"
        :options="catData"
        :props="cascaderProps"
        :show-all-levels="false"
        style="width: 180px;"
        filterable
        clearable>
      </el-cascader>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input
        v-model="form.title"
        prefix-icon="el-icon-search"
        placeholder="文章标题"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="关键词" prop="keywords">
      <el-input
        v-model="form.keywords"
        prefix-icon="el-icon-search"
        placeholder="文章关键词"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 140px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleFormSubmit(true)">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        icon="el-icon-refresh"
        @click="handleFormReset">重置</el-button>
    </el-form-item>

    <el-form-item>
      <el-popover
        width="219"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="置顶" prop="is_top">
            <el-select
              v-model="form.is_top"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="置顶" value="1"/>
              <el-option label="普通" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="启用" value="1"/>
              <el-option label="禁用" value="0"/>
            </el-select>
          </el-form-item>
        </div>

        <el-button
          slot="reference"
          type="text">
          <span>更多筛选</span>
          <i class="el-icon-arrow-down cs-pl-5"/>
        </el-button>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
import util from '@/utils/util'
import { getArticleCatList } from '@/api/article/cat'

export default {
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      catData: [],
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      form: {
        article_cat_id: undefined,
        title: undefined,
        keywords: undefined,
        is_top: undefined,
        status: undefined
      }
    }
  },
  mounted() {
    getArticleCatList(null)
      .then(res => {
        this.catData = util.formatDataToTree(res.data, 'article_cat_id')
      })
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
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
    width: 40px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 40px;
  }
</style>
