<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-radio-group v-model="form.is_read" :disabled="loading">
          <el-radio-button :label="null">全部</el-radio-button>
          <el-radio-button label="0">未读</el-radio-button>
          <el-radio-button label="1">已读</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            标记已读
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            全部已读
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            批量删除
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            全部删除
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="$emit('refresh')">
            刷新
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-tabs
      v-model="tabPane"
      v-loading="loading"
      type="border-card"
      style="box-shadow: 0 0;">
      <el-tab-pane
        v-for="(item, index) in typeData"
        :key="index"
        :label="item.name"
        :name="index.toString()">
        {{item.name}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    unreadData: {
      default: () => {}
    },
    typeData: {
      default: () => []
    }
  },
  data() {
    return {
      tabPane: 0,
      form: {
        type: null,
        is_read: null
        // TODO: 刷新存在问题
      }
    }
  },
  watch: {
    form: {
      handler(val) {
        this.form = val
        this.$emit('submit', this.form, true)
      },
      deep: true
    },
    tabPane: {
      handler(index) {
        if (!this.typeData.hasOwnProperty(index)) {
          return
        }

        const tabType = this.typeData[index]
        this.form.type = tabType.value !== 'all' ? tabType.value : null
      }
    }
  }
}
</script>

<style scoped>
</style>
