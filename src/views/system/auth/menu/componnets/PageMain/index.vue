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
            type="primary"
            plain
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus-square-o"/>
            展开
          </el-button>
          <el-button
            type="primary"
            plain
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="minus-square-o"/>
            收起
          </el-button>
        </el-button-group>
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

    <el-tabs v-model="activeName" @tab-click="() => {}">
      <el-tab-pane :label="menuModule.api" name="api"></el-tab-pane>
      <el-tab-pane :label="menuModule.admin" name="admin"></el-tab-pane>
      <el-tab-pane :label="menuModule.home" name="home"></el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getMenuModule } from '@/api/auth/menu'

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
      activeName: 'api',
      helpContent: '暂无帮助内容',
      menuModule: {},
      auth: {
        add: true,
        del: true,
        set: true,
        enable: true,
        disable: true
      }
    }
  },
  created() {
    getMenuModule().then(res => { this.menuModule = res })
  }
}
</script>
