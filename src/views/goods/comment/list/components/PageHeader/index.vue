<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="订单号" prop="order_no">
      <el-input
        v-model="form.order_no"
        prefix-icon="el-icon-search"
        placeholder="可输入订单号"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="评分" prop="score">
      <el-select
        v-model="form.score"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="好评" value="0"/>
        <el-option label="中评" value="1"/>
        <el-option label="差评" value="2"/>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="待处理" value="0"/>
        <el-option label="已处理" value="1"/>
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

    <el-form-item>
      <el-popover
        width="388"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="form.account"
              prefix-icon="el-icon-search"
              placeholder="可输入 账号/昵称"
              @keyup.enter.native="handleFormSubmit(true)"
              style="width: 320px;"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="评论内容" prop="content">
            <el-input
              v-model="form.content"
              prefix-icon="el-icon-search"
              placeholder="输入关键词对评价内容进行搜索"
              @keyup.enter.native="handleFormSubmit(true)"
              style="width: 320px;"
              :clearable="true"/>
          </el-form-item>

          <el-form-item label="追评类型" prop="is_append">
            <el-select
              v-model="form.is_append"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="主评" value="0"/>
              <el-option label="追评" value="1"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否显示" prop="is_show">
            <el-select
              v-model="form.is_show"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="显示" value="1"/>
              <el-option label="隐藏" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否置顶" prop="is_top">
            <el-select
              v-model="form.is_top"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="置顶" value="1"/>
              <el-option label="普通" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否有图" prop="is_image">
            <el-select
              v-model="form.is_image"
              placeholder="请选择"
              clearable
              value="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="排序类型" prop="order_field">
            <el-select
              v-model="form.order_field"
              placeholder="请选择"
              value="">
              <el-option label="编号" value="goods_comment_id"/>
              <el-option label="评分" value="score"/>
              <el-option label="状态" value="status"/>
              <el-option label="创建日期" value="create_time"/>
            </el-select>
          </el-form-item>

          <el-form-item label="排序方式" prop="order_type">
            <el-select
              v-model="form.order_type"
              placeholder="请选择"
              value="">
              <el-option label="升序" value="asc"/>
              <el-option label="降序" value="desc"/>
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
export default {
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        order_no: undefined,
        score: undefined,
        status: undefined,
        account: undefined,
        content: undefined,
        is_append: undefined,
        is_show: undefined,
        is_top: undefined,
        is_image: undefined,
        order_type: 'desc',
        order_field: 'goods_comment_id'
      }
    }
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
    width: 68px;
  }
</style>
