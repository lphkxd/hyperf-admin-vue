<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        prefix-icon="el-icon-search"
        placeholder="资源名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 280px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleSearch">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        icon="el-icon-refresh"
        @click="handleFormReset">重置</el-button>
    </el-form-item>

    <el-form-item>
      <el-popover
        width="250"
        placement="bottom"
        trigger="click">
        <div class="more-filter">
          <el-form-item label="排序类型" prop="order_field">
            <el-select
              v-model="form.order_field"
              placeholder="请选择"
              value="">
              <el-option label="编号" value="storage_id"/>
              <el-option label="名称" value="name"/>
              <el-option label="类型" value="type"/>
              <el-option label="创建日期" value="create_time"/>
              <el-option label="最后更新" value="update_time"/>
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
          <span>更多筛选</span>
          <i class="el-icon-arrow-down cs-pl-5"/>
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
        name: undefined,
        order_type: 'desc',
        order_field: 'storage_id',
        storage_id: 0
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    },
    handleSearch() {
      this.form.storage_id = 0
      this.handleFormSubmit(true)
    }
  }
}
</script>

<style scoped>
  .more-filter {
    margin-bottom: -18px;
  }
  .more-filter >>> label {
    width: 70px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 70px;
  }
</style>
