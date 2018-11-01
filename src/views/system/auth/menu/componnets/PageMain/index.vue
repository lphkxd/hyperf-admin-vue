<template>
  <div>
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.add"
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus"/>
            新增顶层菜单
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus-square-o"/>
            展开
          </el-button>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="minus-square-o"/>
            收起
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="菜单模型">
        <el-radio-group
          :disabled="loading"
          v-model="radio">
          <el-radio-button label="api">API</el-radio-button>
          <el-radio-button label="admin">后台</el-radio-button>
          <el-radio-button label="home">前台</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="200"
        trigger="hover"
        title="提示"
        :content="helpContent">
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      radio: 'admin',
      helpContent: '暂无帮助内容',
      auth: {
        add: true,
        del: true,
        set: true,
        enable: true,
        disable: true
      }
    }
  }
}
</script>
