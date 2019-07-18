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
        v-show="Object.keys(typeData).length > 0"
        v-model="form.goods_type_id"
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
    typeId: {
      default: null
    },
    typeData: {
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        goods_type_id: undefined
      }
    }
  },
  watch: {
    typeId: {
      handler(val) {
        this.form.goods_type_id = val ? val.toString() : null
      },
      immediate: true
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      this.form.goods_type_id = undefined
    }
  }
}
</script>
