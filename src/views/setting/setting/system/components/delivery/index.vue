<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
    <el-divider>满额设置</el-divider>

    <el-form-item
      :label="form.money.description"
      prop="money">
      <el-input-number
        v-model="form.money.value"
        :placeholder="form.money.description"
        controls-position="right"
        :precision="2"
        :step="1"
        :min="0"/>
      <div class="help-block" v-html="form.money.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.money_status.description"
      prop="money_status">
      <el-switch
        v-model="form.money_status.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
      <div class="help-block" v-html="form.money_status.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.money_exclude.description"
      prop="money_exclude">
      <cs-region
        v-model="form.money_exclude.value"
        type="all">
        <el-button size="small" slot="control" icon="el-icon-place">编辑区域</el-button>
      </cs-region>
      <div class="help-block" v-html="form.money_exclude.help_text"></div>
    </el-form-item>

    <el-divider>满件设置</el-divider>

    <el-form-item
      :label="form.number.description"
      prop="number">
      <el-input-number
        v-model="form.number.value"
        :placeholder="form.number.description"
        controls-position="right"
        :min="0"/>
      <div class="help-block" v-html="form.number.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.number_status.description"
      prop="number_status">
      <el-switch
        v-model="form.number_status.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
      <div class="help-block" v-html="form.number_status.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.number_exclude.description"
      prop="number_exclude">
      <cs-region
        v-model="form.number_exclude.value"
        type="all">
        <el-button size="small" slot="control" icon="el-icon-place">编辑区域</el-button>
      </cs-region>
      <div class="help-block" v-html="form.number_exclude.help_text"></div>
    </el-form-item>

    <el-divider>满额减设置</el-divider>

    <el-form-item
      :label="form.quota.description"
      prop="quota">
      <el-input-number
        v-model="form.quota.value"
        :placeholder="form.quota.description"
        controls-position="right"
        :precision="2"
        :step="1"
        :min="0"/>
      <div class="help-block" v-html="form.quota.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.dec_money.description"
      prop="dec_money">
      <el-input-number
        v-model="form.dec_money.value"
        :placeholder="form.dec_money.description"
        controls-position="right"
        :precision="2"
        :step="1"
        :min="0"/>
      <div class="help-block" v-html="form.dec_money.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.dec_status.description"
      prop="dec_status">
      <el-switch
        v-model="form.dec_status.value"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
      <div class="help-block" v-html="form.dec_status.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.dec_exclude.description"
      prop="dec_exclude">
      <cs-region
        v-model="form.dec_exclude.value"
        type="all">
        <el-button size="small" slot="control" icon="el-icon-place">编辑区域</el-button>
      </cs-region>
      <div class="help-block" v-html="form.dec_exclude.help_text"></div>
    </el-form-item>

    <el-form-item size="small">
      <el-button
        type="primary"
        :loading="loading"
        @click="handleFormSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setDeliveryList } from '@/api/config/setting'

export default {
  components: {
    'csRegion': () => import('@/components/cs-region')
  },
  data() {
    return {
      loading: false,
      form: null
    }
  },
  methods: {
    // 设置配置数据
    setFormData(val) {
      this.form = val
    },
    // 确定修改
    handleFormSubmit() {
      let data = {}
      // eslint-disable-next-line no-unused-vars
      for (const index in this.form) {
        if (this.form.hasOwnProperty(index)) {
          data[index] = this.form[index].value
        }
      }

      this.loading = true
      setDeliveryList(data)
        .then(() => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
