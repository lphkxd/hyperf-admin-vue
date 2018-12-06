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
        :options="catTree"
        :props="cascaderProps"
        change-on-select
        filterable
        clearable
        :show-all-levels="false"
        style="width: 165px;"
        placeholder="试试搜索：分类">
      </el-cascader>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input
        v-model="form.title"
        clearable
        placeholder="文章标题"
        @keyup.enter.native="handleFormSubmit"
        style="width: 140px;"/>
    </el-form-item>

    <el-form-item label="关键词" prop="keywords">
      <el-input
        v-model="form.keywords"
        clearable
        placeholder="文章关键词"
        @keyup.enter.native="handleFormSubmit"
        style="width: 140px;"/>
    </el-form-item>

    <el-form-item label="置顶" prop="is_top">
      <el-select
        v-model="form.is_top"
        clearable
        placeholder="请选择"
        style="width: 100px;"
        value="">
        <el-option label="是" value="1"/>
        <el-option label="否" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        clearable
        placeholder="请选择"
        style="width: 100px;"
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
import util from '@/utils/util'

export default {
  props: {
    catData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      catTree: [],
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children'
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
  watch: {
    catData: {
      handler(val) {
        this.catTree = val.length ? util.formatDataToTree(val, 'article_cat_id') : []
      },
      immediate: true
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      let data = { ...this.form }
      let catId = data.article_cat_id

      if (catId) {
        data.article_cat_id = catId.length > 0 ? catId[catId.length - 1] : undefined
      }

      this.$emit('submit', data, isRestore)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
