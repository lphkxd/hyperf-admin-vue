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
            @click="handleExpand">
            <cs-icon name="plus-square-o"/>
            展开
          </el-button>
          <el-button
            :disabled="loading"
            @click="handleCollapse">
            <cs-icon name="minus-square-o"/>
            收起
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="菜单过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键字进行过滤"
          clearable
          style="width: 170px;">
        </el-input>
      </el-form-item>

      <el-form-item label="菜单模型">
        <el-radio-group
          :disabled="loading"
          v-model="radio"
          @change="handleRadio">
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

    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          v-loading="loading"
          :data="currentTreeData"
          node-key="menu_id"
          :props="defaultProps"
          @node-click="() => {}">
        </el-tree>
      </el-col>

      <el-col :span="14">
        word
      </el-col>
    </el-row>
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
      currentTreeData: [],
      helpContent: '暂无帮助内容',
      filterText: '',
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      auth: {
        add: true,
        del: true,
        set: true,
        enable: true,
        disable: true
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData: {
      handler(val) {
        this.currentTreeData = val
      },
      immediate: true
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) { return true }
      return data.label.indexOf(value) !== -1
    },
    // 切换模块
    handleRadio() {
      this.$emit('module', this.radio)
    },
    // 全部展开
    handleExpand() {
    },
    // 全部收起
    handleCollapse() {
    }
  }
}
</script>
