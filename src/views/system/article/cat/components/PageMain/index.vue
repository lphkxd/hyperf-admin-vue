<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small"
      @submit.native.prevent>
      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="handleCreate('create')">
          <cs-icon name="plus"/>
          新增顶层分类
        </el-button>
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
          prefix-icon="el-icon-search"
          style="width: 180px;"
          clearable>
        </el-input>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="10" v-loading="loading">
        <el-tree
          v-if="hackReset"
          class="tree-scroll"
          node-key="article_cat_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :default-expand-all="isExpandAll"
          :default-expanded-keys="expanded"
          :allow-drag="allowDrag"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          draggable
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span class="brother-showing">
              <i v-if="auth.move" class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" :class="`fa fa-folder-${node.expanded ? 'open-o' : 'o'}`"></i>
              <i v-else class="fa fa-file-o"></i>
              {{node.label}}
            </span>

            <span class="active">
              <el-button
                v-if="auth.add"
                type="text"
                size="mini"
                @click.stop="handleAppend(data.article_cat_id)">
                新增
              </el-button>

              <el-button
                v-if="auth.del"
                type="text"
                size="mini"
                @click.stop="remove(data.article_cat_id)">
                删除
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
            <span>{{textMap[formStatus]}}</span>
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

          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="80px">
            <el-form-item
              label="上级分类"
              prop="parent_id">
              <el-cascader
                v-model="form.parent_id"
                placeholder="不选择表示顶层分类 试试搜索：首页"
                :options="treeData"
                :props="cascaderProps"
                style="width: 100%;"
                filterable
                clearable>
              </el-cascader>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="名称"
                  prop="cat_name">
                  <el-input
                    v-model="form.cat_name"
                    placeholder="请输入文章分类名称"
                    clearable/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="类型"
                  prop="cat_type">
                  <el-input-number
                    v-model="form.cat_type"
                    :min="-128"
                    :max="127"
                    style="width: 120px;"
                    controls-position="right"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="导航"
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

            <el-form-item
              label="关键词"
              prop="keywords">
              <el-input
                v-model="form.keywords"
                placeholder="可输入文章分类关键词"
                clearable/>
            </el-form-item>

            <el-form-item
              label="描述"
              prop="description">
              <el-input
                v-model="form.description"
                placeholder="可输入文章分类描述"
                type="textarea"
                :rows="3"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addArticleCatItem,
  setArticleCatItem,
  delArticleCatList,
  setArticleCatIndex
} from '@/api/article/cat'

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
      filterText: '',
      hackReset: true,
      isExpandAll: false,
      expanded: [],
      treeProps: {
        label: 'cat_name',
        children: 'children'
      },
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      formStatus: 'create',
      formLoading: false,
      textMap: {
        create: '新增分类',
        update: '编辑分类'
      },
      auth: {
        add: false,
        del: false,
        set: false,
        move: false
      },
      form: {
        parent_id: undefined,
        cat_name: undefined,
        cat_type: 0,
        keywords: undefined,
        description: undefined,
        sort: 50,
        is_navi: '1'
      },
      rules: {
        cat_name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
          }
        ],
        cat_type: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        keywords: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
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
      this.auth.add = this.$has('/system/article/cat/add')
      this.auth.set = this.$has('/system/article/cat/set')
      this.auth.del = this.$has('/system/article/cat/del')
      this.auth.move = this.$has('/system/article/cat/move')
    },
    // 获取上级编号
    _getParentId() {
      const treeId = this.form.parent_id

      if (!Array.isArray(treeId)) {
        return treeId
      }

      return treeId.length > 0 ? treeId[treeId.length - 1] : 0
    },
    // 过滤分类
    filterNode(value, data) {
      if (!value) { return true }
      return data.cat_name.indexOf(value) !== -1
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
    // 重置表单
    resetForm() {
      this.form = {
        parent_id: [],
        cat_name: '',
        cat_type: 0,
        keywords: '',
        description: '',
        sort: 50,
        is_navi: '1'
      }
    },
    // 重置元素
    resetElements(val = 'create') {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.formStatus = val
      this.formLoading = false
    },
    // 新增分类表单初始化
    handleCreate(status) {
      this.resetForm()
      this.resetElements(status)

      if (this.$refs.tree.getCurrentKey()) {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    // 追加分类
    handleAppend(key) {
      this.handleCreate('create')
      this.$refs.tree.setCurrentKey(key)
      this.form.parent_id = key
    },
    // 点击树节点事件
    handleNodeClick(data) {
      if (!this.auth.add && !this.auth.set) {
        return
      }

      this.resetForm()
      this.resetElements('update')

      this.form = {
        ...data,
        is_navi: data.is_navi.toString()
      }
    },
    // 新增分类
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          addArticleCatItem({
            ...this.form,
            'parent_id': this._getParentId()
          })
            .then(res => {
              if (!this.isExpandAll) {
                this.expanded = [res.data.parent_id || res.data.article_cat_id]
              }

              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 更新分类
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          setArticleCatItem({
            ...this.form,
            'parent_id': this._getParentId()
          })
            .then(res => {
              if (!this.isExpandAll) {
                this.expanded = [res.data.parent_id || res.data.article_cat_id]
              }

              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 删除分类
    remove(key) {
      let msg = '确定要执行该操作吗?'
      const node = this.$refs.tree.getNode(key)

      if (node.data.children_total > 0 || node.data.aricle_total > 0) {
        msg = `该分类下有 ${node.data.children_total} 个子分类，${node.data.aricle_total} 篇关联文章，是否删除?`
      }

      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delArticleCatList([key])
            .then(() => {
              this.$refs.tree.remove(node)
              this.handleCreate('create')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    /**
     * 拖拽成功后操作
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode      结束拖拽时最后进入的节点
     * @param dropType      被拖拽节点的放置位置（before、after、inner）
     * @param ev            event
     */
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // 获取原始数据
      let setCat = {
        article_cat_id: draggingNode.data.article_cat_id,
        parent_id: draggingNode.data.parent_id
      }

      // 待排序编号
      let indexCat = []

      // 处理插入到其他分类中
      if (dropType === 'inner') {
        setCat.parent_id = dropNode.key
      } else {
        setCat.parent_id = dropNode.data.parent_id
        dropNode.parent.childNodes.forEach((value, index) => {
          indexCat.push(value.key)
          value.data.sort = index + 1
        })
      }

      setArticleCatItem(setCat)
        .then(res => {
          draggingNode.data.parent_id = res.data.parent_id
        })
        .catch(() => {
          this.$emit('refresh')
        })

      if (indexCat.length > 0) {
        setArticleCatIndex(indexCat)
          .catch(() => {
            this.$emit('refresh')
          })
      }
    },
    // 判断节点是否可移动
    allowDrag() {
      return this.auth.move
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-scroll {
    max-height: 460px;
    overflow: auto;
    padding-bottom: 1px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .brother-showing i {
    width: 16px;
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
