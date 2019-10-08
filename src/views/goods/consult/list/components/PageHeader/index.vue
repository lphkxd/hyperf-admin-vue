<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="账号" prop="account">
      <el-input
        v-model="form.account"
        prefix-icon="el-icon-search"
        placeholder="可输入 账号/昵称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="form.type"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option
          v-for="(item, index) in typeList"
          :key="index"
          :label="item"
          :value="index"/>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="待回复" value="0"/>
        <el-option label="已回复" value="1"/>
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
          <el-form-item label="咨询内容" prop="content">
            <el-input
              v-model="form.content"
              prefix-icon="el-icon-search"
              placeholder="输入关键词对咨询内容进行搜索"
              @keyup.enter.native="handleFormSubmit(true)"
              style="width: 320px;"
              :clearable="true"/>
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

          <el-form-item label="排序类型" prop="order_field">
            <el-select
              v-model="form.order_field"
              placeholder="请选择"
              value="">
              <el-option label="编号" value="goods_consult_id"/>
              <el-option label="类型" value="type"/>
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
    },
    typeList: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        content: undefined,
        is_show: undefined,
        type: undefined,
        status: undefined,
        account: undefined,
        order_type: 'desc',
        order_field: 'goods_consult_id'
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
    width: auto;
  }
</style>
