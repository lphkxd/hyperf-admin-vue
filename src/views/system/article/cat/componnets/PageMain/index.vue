<template>
  <div>
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus"/>
            新增顶层分类
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
          v-if="hackReset"
          v-loading="loading"
          node-key="article_cat_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expand-all="isExpandAll"
          :default-expanded-keys="expanded"
          @node-click="() => {}"
          @node-drop="() => {}"
          draggable
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{ node, data }">
            <span class="brother-showing">
              <i class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" class="fa fa-folder-o" style="width: 16px;"></i>
              <i v-else class="fa fa-file-o" style="width: 16px;"></i>
              {{node.label}}
            </span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => {}">
                新增
              </el-button>

              <el-button
                type="text"
                size="mini"
                @click.stop="() => {}">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>

      <el-col :span="14">
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
      helpContent: '暂无帮助内容',
      filterText: '',
      hackReset: true,
      isExpandAll: false,
      expanded: [],
      treeProps: {
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 过滤菜单
    filterNode(value, data) {
      if (!value) { return true }
      return data.cat_name.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: block;
  }
  .move-tree {
    color: #C0C4CC;
    cursor: move;
  }
  .el-card {
    border-radius: 0;
  }
</style>
