<template>
  <div class="cs-p">
    <!--表单开始-->
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus"/>
            新增区域
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="trash-o"/>
            删除
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键字进行过滤"
          clearable
          prefix-icon="el-icon-search"
          style="width: 180px;">
        </el-input>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>
    <!--表单结束-->

    <!--内容开始-->
    <el-row :gutter="20">
      <el-col :span="10">
        A
      </el-col>

      <el-col :span="14">
        B
      </el-col>
    </el-row>
    <!--内容结束-->
  </div>
</template>

<script>
import { getHelpRouter } from '@/api/index/help'

export default {
  props: {
    loading: {
      default: false
    },
    treeData: {
      default: () => []
    }
  },
  data() {
    return {
      filterText: '',
      helpContent: ''
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    }
  }
}
</script>
