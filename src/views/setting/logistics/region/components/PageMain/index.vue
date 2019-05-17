<template>
  <div class="cs-p">
    <!--表单开始-->
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleCreate('create')">
          <cs-icon name="plus"/>
          新增区域
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="$emit('refresh')">
            <cs-icon name="refresh"/>
            刷新
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
        <el-tree
          v-loading="loading"
          node-key="region_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expanded-keys="expanded"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          draggable
          show-checkbox
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{ node, data }">
            <span class="brother-showing">
              <i class="fa fa-align-justify move-tree" style="width: 16px;"></i>
              {{node.label}}
            </span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => handleAppend(data.region_id)">
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
        <el-card
          class="box-card"
          shadow="never">

          <div slot="header">
            <span>{{textMap[formStatus]}}</span>
            <el-button
              v-if="formStatus === 'create'"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="() => {}">确定</el-button>

            <el-button
              v-else-if="formStatus === 'update'"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="() => {}">修改</el-button>
          </div>

          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="80px">
            <el-form-item
              label="上级区域"
              prop="parent_id">
              <el-cascader
                v-model="form.parent_id"
                :disabled="formStatus === 'update'"
                :options="treeData"
                :props="cascaderProps"
                change-on-select
                filterable
                clearable
                style="width: 100%;"
                placeholder="不选择表示顶层区域 试试搜索：浙江">
              </el-cascader>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="名称"
                  prop="region_name">
                  <el-input
                    v-model="form.region_name"
                    placeholder="请输入区域名称"
                    clearable/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="排序"
                  prop="sort">
                  <el-input-number
                    v-model="form.sort"
                    :min="0"
                    :max="255"
                    style="width: 120px;"
                    controls-position="right"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
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
      helpContent: '',
      expanded: [1],
      treeLoading: false,
      treeProps: {
        label: 'region_name',
        children: 'children'
      },
      cascaderProps: {
        value: 'region_id',
        label: 'region_name',
        children: 'children'
      },
      formStatus: 'create',
      formLoading: false,
      textMap: {
        create: '新增区域',
        update: '编辑区域'
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      auth: {
        add: false,
        del: false,
        set: false,
        move: false
      },
      form: {
        parent_id: undefined,
        region_name: undefined,
        sort: 50
      },
      rules: {
        parent_id: [
          {
            required: true,
            message: '上级区域不能为空',
            trigger: 'blur'
          }
        ],
        region_name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 120,
            message: '长度不能大于 120 个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 根据父ID获取所有上级编号
    _getParentId(parent_id) {
      let id_list = []
      let node = this.$refs.tree.getNode(parent_id)

      while (node) {
        if (node.key) {
          id_list.unshift(node.key)
        }

        if (!node.parent) {
          break
        }

        node = node.parent
      }

      return id_list
    },
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) { return true }
      return data.region_name.indexOf(value) !== -1
    },
    // 重置表单
    resetForm() {
      this.form = {
        parent_id: [],
        region_name: '',
        sort: 50
      }
    },
    // 重置元素
    resetElements(val = 'create') {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })

      this.formStatus = val
      this.formLoading = false
    },
    // 点击树节点事件
    handleNodeClick(data) {
      this.resetForm()
      this.resetElements('update')

      this.form = {
        ...data,
        parent_id: this._getParentId(data.parent_id)
      }
    },
    // 新增菜单表单初始化
    handleCreate(status, key = null) {
      this.resetForm()
      this.resetElements(status)
      this.$refs.tree.setCurrentKey(key)
    },
    // 追加菜单
    handleAppend(key) {
      this.handleCreate('create', key)
      this.form.parent_id = this._getParentId(key)
    },
    // 判断节点是否能被拖动
    allowDrag(draggingNode) {
      return false
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      return false
    },
    /**
     * 拖拽成功后操作
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode      结束拖拽时最后进入的节点
     */
    handleDrop(draggingNode, dropNode) {
    }
  }
}
</script>

<style lang="scss" scoped>
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
    color: $color-text-placehoder;
    cursor: move;
  }
  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
  }
</style>
