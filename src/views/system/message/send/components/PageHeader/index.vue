<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="标题" prop="title">
      <el-input
        v-model="form.title"
        prefix-icon="el-icon-search"
        placeholder="消息标题"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="成员组" prop="member">
      <el-select
        v-model="form.member"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option
          v-for="(item, index) in groupData"
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
        <el-option label="草稿件" value="0"/>
        <el-option label="已发布" value="1"/>
      </el-select>
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

          <el-form-item label="类型" prop="type">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              clearable
              value="">
              <el-option
                v-for="(item, index) in typeData"
                :key="index"
                :label="item"
                :value="index"/>
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
    },
    typeData: {
      default: () => {}
    },
    groupData: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        type: undefined,
        member: undefined,
        title: undefined,
        is_top: undefined,
        status: undefined
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
    width: 40px;
  }
  .more-filter >>> .el-form-item__content {
    margin-left: 40px;
  }
</style>
