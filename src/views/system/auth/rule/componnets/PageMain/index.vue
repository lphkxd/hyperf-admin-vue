<template>
  <div>
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
            新增权限
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-radio-group
          v-model="isExpandAll"
          @change="checkedNodes">
          <el-radio-button
            :disabled="loading"
            :label="true">
            <cs-icon name="plus-square-o"/>
            展开
          </el-radio-button>
          <el-radio-button
            :disabled="loading"
            :label="false">
            <cs-icon name="minus-square-o"/>
            收起
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键字进行过滤"
          clearable
          style="width: 170px;">
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
    <!--表单结束-->

    <!--实际内容开始-->
    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          v-if="hackReset"
          v-loading="loading"
          node-key="rule_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expand-all="isExpandAll"
          :default-expanded-keys="expanded"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          @node-expand="handleExpand"
          @node-collapse="handleCollapse"
          draggable
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{ node, data }">
            <span :class="`brother-showing ${!data.status ? 'status-tree' : ''}`">
              <i class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" class="fa fa-folder-o"></i>
              <i v-else class="fa fa-file-o"></i>
              {{ node.label }}
            </span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => enable(data.rule_id, data.status)">
                {{data.status ? '禁用' : '启用'}}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(data.rule_id)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>

      <el-col :span="14">
        <el-card shadow="never">
        </el-card>
      </el-col>
    </el-row>
    <!--实际内容结束-->
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    treeData: {
      default: () => []
    },
    module: {
      default: () => {}
    },
    group: {
      default: () => {}
    }
  },
  data() {
    return {
      hackReset: true,
      isExpandAll: true,
      expanded: [],
      helpContent: '暂无帮助内容',
      filterText: '',
      treeProps: {
        label: 'name',
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
      return data.name.indexOf(value) !== -1
    },
    // 展开或收起节点
    checkedNodes(isExpand = false) {
      this.filterText = ''
      this.expanded = []
      this.hackReset = false

      this.$nextTick(() => {
        this.isExpandAll = isExpand
        this.hackReset = true
      })

      console.log(this.treeData)
    },
    // 点击树节点事件
    handleNodeClick(data) {
    },
    /**
     * 拖拽成功后操作
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode      结束拖拽时最后进入的节点
     * @param dropType      被拖拽节点的放置位置（before、after、inner）
     * @param ev            event
     */
    handleDrop(draggingNode, dropNode, dropType, ev) {
    },
    // 菜单展开时触发
    handleExpand(data) {
    },
    // 菜单关闭时触发
    handleCollapse(data) {
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
  .status-tree {
    color: #C0C4CC;
    text-decoration: line-through
  }
</style>
