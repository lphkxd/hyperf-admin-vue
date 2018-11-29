<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="导航属性" prop="is_navi">
      <el-select
        v-model="form.is_navi"
        clearable
        placeholder="请选择"
        style="width: 150px;"
        value="">
        <el-option label="可见" value="1"/>
        <el-option label="隐藏" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="分类深度" prop="level">
      <el-input-number
        v-model="form.level"
        controls-position="right"
        :min="0"
        label="请输入文章分类深度值"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit">
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
    }
  },
  data() {
    return {
      form: {
        is_navi: undefined,
        level: 0
      }
    }
  },
  methods: {
    handleFormSubmit() {
      // 对深度进行特殊处理
      this.$emit('submit', {
        ...this.form,
        level: this.form.level <= 0 ? undefined : this.form.level - 1
      })
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
