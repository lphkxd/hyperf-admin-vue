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
            新增
          </el-button>

          <el-button
            :disabled="loading"
            @click="setStatusList(1)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="setStatusList(0)">
            <cs-icon name="close"/>
            禁用
          </el-button>

          <el-button
            :disabled="loading"
            @click="removeList">
            <cs-icon name="trash-o"/>
            删除
          </el-button>

        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="checkedNodes(true)">
            <cs-icon name="plus-square-o"/>
            展开
          </el-button>
          <el-button
            :disabled="loading"
            @click="checkedNodes(false)">
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
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          draggable
          show-checkbox
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{ node, data }">
            <span :class="`brother-showing ${!data.status ? 'status-tree' : ''}`">
              <i v-if="!data.system" class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" class="fa fa-folder-o"></i>
              <i v-else class="fa fa-file-o"></i>
              {{ node.label }}
            </span>

            <span
              v-if="!data.system"
              class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => setStatusItem(data.rule_id, data.status)">
                {{data.status ? '禁用' : '启用'}}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove([data.rule_id], false)">
                删除
              </el-button>
            </span>

            <span
              v-else
              class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => {}">
                新增
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
import {
  delAuthRuleList,
  setAuthRuleStatus,
  setAuthRuleIndex
} from '@/api/auth/rule'

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
    checkedNodes(isExpand) {
      this.filterText = ''
      this.expanded = []
      this.hackReset = false

      this.$nextTick(() => {
        this.isExpandAll = isExpand
        this.hackReset = true
      })
    },
    // 删除规则
    remove(key, checked = true) {
      if (!key || !key.length) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const list = key.filter(item => !this.module.hasOwnProperty(item))
          delAuthRuleList(list)
            .then(() => {
              list.forEach(value => {
                this.$refs.tree.remove(value)
              })

              if (checked) {
                this.$refs.tree.setCheckedKeys([])
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除规则
    removeList() {
      this.remove(this.$refs.tree.getCheckedKeys())
    },
    // 启用或禁用
    enable(key, val, checked = true) {
      if (!key || !key.length) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const list = key.filter(item => !this.module.hasOwnProperty(item))
          setAuthRuleStatus(list, val)
            .then(() => {
              list.forEach(value => {
                this.$refs.tree.getNode(value).data.status = val
              })

              if (checked) {
                this.$refs.tree.setCheckedKeys([])
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量设置规则状态
    setStatusList(val) {
      this.enable(this.$refs.tree.getCheckedKeys(), val)
    },
    // 快捷设置规则状态
    setStatusItem(key, val) {
      this.enable([key], val ? 0 : 1, false)
    },
    // 点击树节点事件
    handleNodeClick(data) {
    },
    // 判断节点是否能被拖动
    allowDrag(draggingNode) {
      return !this.module.hasOwnProperty(draggingNode.key)
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      return !(draggingNode.parent !== dropNode.parent || type === 'inner')
    },
    /**
     * 拖拽成功后操作
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode      结束拖拽时最后进入的节点
     */
    handleDrop(draggingNode, dropNode) {
      let ruleList = []
      dropNode.parent.childNodes.forEach((value, index) => {
        ruleList.push(value.key)
        value.data.sort = index + 1
      })

      setAuthRuleIndex(ruleList)
        .then(() => {
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.$emit('refresh')
        })
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
