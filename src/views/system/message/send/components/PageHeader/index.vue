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
        clearable
        placeholder="消息标题"
        @keyup.enter.native="handleFormSubmit"
        style="width: 200px;"/>
    </el-form-item>

    <el-form-item label="成员组" prop="member">
      <el-select
        v-model="form.member"
        clearable
        placeholder="请选择"
        style="width: 120px;"
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
        clearable
        placeholder="请选择"
        style="width: 120px;"
        value="">
        <el-option label="草稿件" value="0"/>
        <el-option label="已发布" value="1"/>
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
        width="200"
        placement="bottom"
        trigger="click">

        <div class="more-filter">
          <el-form-item label="置顶" prop="is_top">
            <el-select
              v-model="form.is_top"
              clearable
              placeholder="请选择"
              value="">
              <el-option label="置顶" value="1"/>
              <el-option label="普通" value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item label="类型" prop="type">
            <el-select
              v-model="form.type"
              clearable
              placeholder="请选择"
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
  .more-filter>>>label {
    width: auto;
  }
  .more-filter>>>input {
    width: 160px;
  }
</style>
