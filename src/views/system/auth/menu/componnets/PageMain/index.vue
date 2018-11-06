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
            @click="handleCreate('create')">
            <cs-icon name="plus"/>
            新增顶层菜单
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

    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          v-if="hackReset"
          v-loading="loading"
          :data="treeData"
          node-key="menu_id"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expand-all="isExpandAll"
          @node-click="handleNodeClick"
          draggable
          ref="tree">
          <span
            class="custom-tree-node action"
            slot-scope="{ node, data }">
            <span :class="`brother-showing ${!data.status ? 'status-tree' : ''}`">
              <i class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="node.icon" :class="`fa fa-${node.icon}`" style="width: 16px;"></i>
              <i v-else-if="data.children" class="fa fa-folder-o" style="width: 16px;"></i>
              <i v-else class="fa fa-file-o" style="width: 16px;"></i>
              {{ node.label }}
            </span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => handleAppend(data.menu_id)">
                新增
              </el-button>

              <el-button
                type="text"
                size="mini"
                @click.stop="() => handleUpdate(data.menu_id)">
                编辑
              </el-button>

              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(data.menu_id)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>

      <el-col :span="14">
        <el-card shadow="never">
          <div slot="header">
            <span>{{textMap[formStatus]}}</span>
          </div>

          <div>
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="80px">
              <el-form-item
                label="上级菜单"
                prop="parent_id">
                <el-cascader
                  v-model="form.parent_id"
                  :options="treeData"
                  :props="cascaderProps"
                  change-on-select
                  filterable
                  clearable
                  style="width: 100%;"
                  placeholder="不选择表示顶层菜单 试试搜索：首页">
                </el-cascader>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="名称"
                    prop="name">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入菜单名称"
                      clearable/>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label="别名"
                    prop="alias">
                    <el-input
                      v-model="form.alias"
                      placeholder="请输入菜单别名"
                      clearable/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="图标"
                    prop="icon">
                    <cs-icon-select
                      v-model="form.icon"
                      :user-input="true"
                      placeholder="请选择菜单图标"/>
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
                      controls-position="right"
                      label="请输入菜单排序值"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item
                label="模块">
                <el-radio-group v-model="module" size="small">
                  <el-radio-button
                    v-for="(name, index) in treeModule"
                    :key="index"
                    :label="index"
                    :disabled="module !== index">{{name}}</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="链接类型"
                    prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio label="0">模块</el-radio>
                      <el-radio label="1">外链</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label="打开方式"
                    prop="target">
                    <el-radio-group v-model="form.target">
                      <el-radio label="_self">当前窗口</el-radio>
                      <el-radio label="_blank">新窗口</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="是否导航"
                    prop="is_navi">
                    <el-switch
                      v-model="form.is_navi"
                      active-value="1"
                      inactive-value="0">
                    </el-switch>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label="菜单状态"
                    prop="status">
                    <el-switch
                      v-model="form.status"
                      active-value="1"
                      inactive-value="0">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item
                label="链接地址"
                prop="url">
                <el-input
                  v-model="form.url"
                  placeholder="请输入链接地址"
                  clearable/>
              </el-form-item>

              <el-form-item
                label="链接参数"
                prop="params">
                <el-input
                  v-model="form.params"
                  placeholder="请输入链接参数"
                  clearable/>
              </el-form-item>

              <el-form-item
                label="备注"
                prop="remark">
                <el-input
                  v-model="form.remark"
                  maxlength="255"
                  placeholder="请输入菜单备注"
                  clearable/>
              </el-form-item>
            </el-form>

            <div slot="footer" class="cs-text-center" v-show="isShowFormButton">
              <el-button
                v-if="formStatus === 'create'"
                type="primary"
                size="small"
                :loading="formLoading"
                @click="create">确定</el-button>

              <el-button
                v-else-if="formStatus === 'update'"
                type="primary"
                size="small"
                :loading="formLoading"
                @click="update">修改</el-button>

              <el-button
                size="small"
                @click="cancel">取消</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getMenuModule,
  delMenuItem,
  addMenuItem,
  setMenuItem,
  setMenuStatus
} from '@/api/auth/menu'

export default {
  props: {
    treeData: {
      default: () => []
    },
    loading: {
      default: false
    },
    module: {
      default: ''
    }
  },
  data() {
    return {
      hackReset: true,
      isExpandAll: false,
      helpContent: '暂无帮助内容',
      filterText: '',
      treeModule: {},
      treeProps: {
        label: 'name',
        children: 'children'
      },
      cascaderProps: {
        value: 'menu_id',
        label: 'name',
        children: 'children'
      },
      auth: {
        add: true,
        del: true,
        set: true,
        enable: true,
        disable: true
      },
      form: {
        parent_id: undefined,
        name: undefined,
        alias: undefined,
        icon: undefined,
        remark: undefined,
        type: '0',
        url: undefined,
        params: undefined,
        target: '_self',
        is_navi: '0',
        sort: 50,
        status: '1'
      },
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
        alias: [
          {
            max: 16,
            message: '长度不能大于 16 个字符',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            max: 16,
            message: '长度不能大于 16 个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '链接类型不能为空',
            trigger: 'blur'
          }
        ],
        url: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        params: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      },
      formStatus: 'review',
      formLoading: false,
      isShowFormButton: false,
      textMap: {
        create: '新增菜单',
        update: '编辑菜单',
        review: '查看菜单'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this._getMenuModule()
  },
  methods: {
    // 过滤菜单
    filterNode(value, data) {
      if (!value) { return true }
      return data.name.indexOf(value) !== -1
    },
    // 获取菜单模块
    _getMenuModule() {
      getMenuModule().then(res => { this.treeModule = res })
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
    // 展开或收起节点
    checkedNodes(isExpand = false) {
      this.hackReset = false
      this.$nextTick(() => {
        this.isExpandAll = isExpand
        this.hackReset = true
      })
    },
    // 重置表单
    resetForm() {
      this.form = {
        parent_id: [],
        name: '',
        alias: '',
        icon: '',
        remark: '',
        type: '0',
        url: '',
        params: '',
        target: '_self',
        is_navi: '0',
        sort: 50,
        status: '1'
      }
    },
    // 重置元素
    resetElements() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.formStatus = 'review'
      this.formLoading = false
      this.isShowFormButton = false
    },
    // 取消添加或编辑
    cancel() {
      this.resetElements()
      this.resetForm()
    },
    // 点击树节点事件
    handleNodeClick(data) {
      this.resetForm()
      this.resetElements()

      this.form = {
        ...data,
        parent_id: this._getParentId(data.parent_id),
        type: String(data.type),
        is_navi: String(data.is_navi),
        status: String(data.status)
      }
    },
    // 新增菜单表单初始化
    handleCreate(status, key = null) {
      this.resetForm()
      this.formStatus = status
      this.formLoading = false
      this.isShowFormButton = true
      this.$refs.tree.setCurrentKey(key)
    },
    // 追加菜单
    handleAppend(key) {
      this.handleCreate('create', key)
      this.form.parent_id = this._getParentId(key)
    },
    // 编辑菜单
    handleUpdate(key) {
      this.handleCreate('update', key)
      const oldData = this.$refs.tree.getNode(key).data

      console.log(oldData)
      this.form = {
        ...oldData,
        parent_id: this._getParentId(oldData.parent_id),
        type: String(oldData.type),
        is_navi: String(oldData.is_navi),
        status: String(oldData.status)
      }
    },
    // 新增菜单
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          const { parent_id } = this.form

          addMenuItem({
            ...this.form,
            'parent_id': parent_id.length > 0 ? parent_id[parent_id.length - 1] : 0,
            'module': this.module
          })
            .then(res => {
              const tree = this.$refs.tree
              let parent = tree.getNode(res.data.parent_id)
              tree.append(res.data, parent)
              tree.setCurrentKey(res.data.menu_id)

              if (parent) {
                parent.expanded = true
              }

              this.resetElements()
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 删除菜单
    remove(key) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delMenuItem(key)
            .then(() => {
              let tree = this.$refs.tree.getNode(key)
              this.$refs.tree.remove(tree)
              this.cancel()
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 更新菜单
    update(key) {
    }
  }
}
</script>

<style>
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
  .el-card__header {
    padding: 10px 20px;
  }
  .status-tree {
    color: #C0C4CC;
    text-decoration: line-through
  }
</style>
