<template>
  <div>
    <!--表单开始-->
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.add"
            :disabled="loading"
            @click="handleCreate('create')">
            <cs-icon name="plus"/>
            新增权限
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="setStatusList(1)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="setStatusList(0)">
            <cs-icon name="close"/>
            禁用
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

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.del"
            :disabled="loading"
            @click="removeList">
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
              <i v-if="!data.system && auth.move" class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" class="fa fa-folder-o"></i>
              <i v-else class="fa fa-file-o"></i>
              {{node.label}}
            </span>

            <span
              v-if="!data.system"
              class="active">
              <el-button
                v-if="auth.disable || auth.enable"
                type="text"
                size="mini"
                @click.stop="() => setStatusItem(data.rule_id, data.status)">
                {{data.status ? '禁用' : '启用'}}
              </el-button>
              <el-button
                v-if="auth.del"
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
                v-if="auth.add"
                type="text"
                size="mini"
                @click.stop="() => handleCreate('create', node.key)">
                新增
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>

      <el-col :span="14">
        <el-card
          v-if="auth.add || auth.set"
          class="box-card"
          shadow="never">
          <div slot="header">
            <span>{{formMap[formStatus]}}</span>
            <el-button
              v-if="formStatus === 'create' && auth.add"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="create">确定</el-button>

            <el-button
              v-else-if="formStatus === 'update' && auth.set"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="update">修改</el-button>
          </div>

          <div>
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="80px">
              <el-form-item
                label="名称"
                prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入权限名称"
                  clearable/>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="模块"
                    prop="module">
                    <el-select
                      v-model="form.module"
                      placeholder="请选择"
                      style="width: 100%;"
                      value="">
                      <el-option
                        v-for="(item, index) in module"
                        :key="index"
                        :label="item"
                        :value="index"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="用户组"
                    prop="group_id">
                    <el-select
                      v-model="form.group_id"
                      placeholder="请选择"
                      style="width: 100%;"
                      value="">
                      <el-option
                        v-for="item in group"
                        :key="item.group_id"
                        :label="item.name"
                        :value="item.group_id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="排序"
                    prop="sort">
                    <el-input-number
                      v-model="form.sort"
                      :min="0"
                      :max="255"
                      controls-position="right"
                      label="可输入权限排序值"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="状态"
                    prop="status">
                    <el-switch
                      v-model="form.status"
                      active-value="1"
                      inactive-value="0">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <div v-loading="treeLoading">
              <el-collapse>
                <el-collapse-item title="菜单权限">
                  <el-tree
                    node-key="menu_id"
                    :data="menuData"
                    :props="treeProps"
                    :default-checked-keys="form.menu_auth"
                    show-checkbox
                    ref="menuTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span :class="`brother-showing ${!data.status ? 'status-tree' : ''}`">
                        <i v-if="data.icon" :class="`fa fa-${data.icon}`" style="width: 16px;"></i>
                        <i v-else-if="data.children" class="fa fa-folder-o" style="width: 16px;"></i>
                        <i v-else class="fa fa-file-o" style="width: 16px;"></i>
                        {{node.label}}
                        <i v-if="data.url" class="fa fa-link" style="font-size: 12px;">
                          {{data.url}}
                        </i>
                      </span>
                    </span>
                  </el-tree>
                </el-collapse-item>

                <el-collapse-item v-if="form.module === 'api'" title="记录权限">
                  <el-tree
                    node-key="menu_id"
                    :data="menuData"
                    :props="treeProps"
                    :default-checked-keys="form.log_auth"
                    show-checkbox
                    ref="logTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span :class="`brother-showing ${!data.status ? 'status-tree' : ''}`">
                        <i v-if="data.icon" :class="`fa fa-${data.icon}`" style="width: 16px;"></i>
                        <i v-else-if="data.children" class="fa fa-folder-o" style="width: 16px;"></i>
                        <i v-else class="fa fa-file-o" style="width: 16px;"></i>
                        {{node.label}}
                        <i v-if="data.url" class="fa fa-link" style="font-size: 12px;">
                          {{data.url}}
                        </i>
                      </span>
                    </span>
                  </el-tree>
                </el-collapse-item>
              </el-collapse>
            </div>

          </div>
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
  setAuthRuleIndex,
  addAuthRuleItem,
  setAuthRuleItem
} from '@/api/auth/rule'
import { getMenuList } from '@/api/auth/menu'
import util from '@/utils/util'

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
      treeLoading: false,
      treeProps: {
        label: 'name',
        children: 'children'
      },
      auth: {
        add: false,
        del: false,
        set: false,
        enable: false,
        disable: false,
        move: false
      },
      form: {
        module: undefined,
        group_id: undefined,
        name: undefined,
        menu_auth: [],
        log_auth: [],
        sort: 50,
        status: '1'
      },
      menuData: [],
      formStatus: 'create',
      formLoading: false,
      formMap: {
        create: '新增权限',
        update: '编辑权限'
      },
      menuAuth: [],
      logAuth: [],
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 32,
            message: '长度不能大于 32 个字符',
            trigger: 'blur'
          }
        ],
        module: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'blur'
          }
        ],
        group_id: [
          {
            required: true,
            message: '至少选择一项',
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
    },
    'form.module': {
      handler(val) {
        this.switchModule(val)
      },
      deep: true
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/auth/rule/add')
      this.auth.del = this.$has('/system/auth/rule/del')
      this.auth.set = this.$has('/system/auth/rule/set')
      this.auth.enable = this.$has('/system/auth/rule/enable')
      this.auth.disable = this.$has('/system/auth/rule/disable')
      this.auth.move = this.$has('/system/auth/rule/move')
    },
    // 过滤节点
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
      this.remove(this.$refs.tree.getCheckedKeys(true))
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
      this.enable(this.$refs.tree.getCheckedKeys(true), val)
    },
    // 快捷设置规则状态
    setStatusItem(key, val) {
      this.enable([key], val ? 0 : 1, false)
    },
    // 点击树节点事件
    handleNodeClick(data) {
      if (!this.auth.add && !this.auth.set) {
        return
      }

      if (data.system) {
        this.handleCreate('create', data.module)
        return
      }

      this.resetForm()
      this.resetElements('update')

      this.menuAuth = data.menu_auth
      this.logAuth = data.log_auth

      this.form = {
        ...data,
        status: data.status.toString()
      }
    },
    // 判断节点是否能被拖动
    allowDrag(draggingNode) {
      return !this.module.hasOwnProperty(draggingNode.key) && this.auth.move
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
    },
    // 切换模块菜单
    switchModule(val) {
      if (!val) {
        this.menuData = []
        return
      }

      this.treeLoading = true
      getMenuList({ module: val })
        .then(res => {
          this.menuData = res.data.length ? util.formatDataToTree(res.data) : []
          if (this.formStatus === 'update' && res.data.length) {
            if (!this.menuAuth.length && !this.logAuth.length) {
              return
            }

            let nodeId = []
            res.data.forEach(value => {
              if (value['children_total'] <= 0) {
                nodeId.push(value.menu_id)
              }
            })

            if (!nodeId.length) {
              return
            }

            this.form.menu_auth = this.menuAuth.filter(item => nodeId.includes(item))

            if (val === 'api') {
              this.form.log_auth = this.logAuth.filter(item => nodeId.includes(item))
            }
          }
        })
        .finally(() => {
          this.treeLoading = false
        })
    },
    // 重置表单
    resetForm() {
      this.form = {
        module: '',
        group_id: '',
        name: '',
        menu_auth: [],
        log_auth: [],
        sort: 50,
        status: '1'
      }
    },
    // 重置元素
    resetElements(val = 'create') {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })

      this.menuData = []
      this.menuAuth = []
      this.logAuth = []
      this.formStatus = val
      this.formLoading = false
    },
    // 新增表单初始化
    handleCreate(status, module = null) {
      this.resetForm()
      this.resetElements(status)

      if (module) {
        this.form.module = module
      }
    },
    // 获取勾选节点
    _getCheckedKeys() {
      this.form.menu_auth = [
        ...this.$refs.menuTree.getCheckedKeys(),
        ...this.$refs.menuTree.getHalfCheckedKeys()
      ]

      if (this.form.module === 'api') {
        this.form.log_auth = [
          ...this.$refs.logTree.getCheckedKeys(),
          ...this.$refs.logTree.getHalfCheckedKeys()
        ]
      }
    },
    // 新增权限
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          this._getCheckedKeys()

          addAuthRuleItem(this.form)
            .then(() => {
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 编辑权限
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          this._getCheckedKeys()

          setAuthRuleItem(this.form)
            .then(() => {
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
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
  .status-tree {
    color: $color-text-placehoder;
    text-decoration: line-through
  }
  .box-card {
    border-radius: 0;
  }
</style>
