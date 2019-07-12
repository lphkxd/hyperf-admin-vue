<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    @submit.native.prevent
    style="margin-bottom: -18px;">
    <el-form-item label="所属模型" prop="goods_type_id">
      <el-select
        v-show="typeData.length > 0"
        v-model="form.goods_type_id"
        @clear="form.goods_type_id = undefined"
        placeholder="请选择"
        clearable
        value="">
        <el-option
          v-for="(item, index) in typeData"
          :key="index"
          :label="item.type_name"
          :value="item.goods_type_id"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleSubmit">
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
    typeId: {
      default: undefined
    },
    typeData: {
      default: () => []
    }
  },
  data() {
    return {
      currentId: null,
      form: { goods_type_id: undefined }
    }
  },
  watch: {
    typeId: {
      handler(val) {
        if (this.currentId !== val) {
          this.form.goods_type_id = val
          this.currentId = val
          // this.$route.params.goods_type_id = val
          // this.handleFormSubmit(true)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      // this.$route.params.goods_type_id = this.form.goods_type_id
      // this.handleFormSubmit(true)
    },
    handleFormSubmit(isRestore = false) {
      // this.currentId = this.form.goods_type_id
      // this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      // this.form.goods_type_id = undefined
    }
  }
}
</script>
