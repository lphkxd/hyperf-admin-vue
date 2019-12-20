<template>
  <div class="cs-p">
    <!--表单开始-->
    <el-form
      :inline="true"
      size="small"
      @submit.native.prevent>
      <el-form-item v-if="auth.add">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate('create')">新增顶层区域</el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.del"
            icon="el-icon-delete"
            :disabled="loading"
            @click="removeList">删除</el-button>

          <el-button
            icon="el-icon-refresh"
            :disabled="loading"
            @click="refresh">刷新</el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键词进行过滤"
          prefix-icon="el-icon-search"
          style="width: 240px;"
          :clearable="true">
        </el-input>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>
    <!--表单结束-->

    <!--内容开始-->
    <el-row :gutter="20">
      <el-col :span="10" v-loading="loading">
        <el-tree
          class="tree-scroll"
          node-key="region_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :default-expanded-keys="expanded"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          :draggable="true"
          :show-checkbox="true"
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span class="brother-showing">
              <i v-if="auth.move" class="el-icon-sort move-tree cs-mr-5"/>
              {{node.label}}
            </span>

            <span class="active">
              <el-button
                v-if="auth.add"
                type="text"
                size="mini"
                @click.stop="handleAppend(data.region_id)">
                新增
              </el-button>

              <el-button
                v-if="auth.del"
                type="text"
                size="mini"
                @click.stop="remove([data.region_id])">
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
              label="上级区域"
              prop="parent_id">
              <el-cascader
                v-model="form.parent_id"
                placeholder="不选择表示顶层区域 试试搜索：浙江"
                :disabled="formStatus === 'update'"
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
                  prop="region_name">
                  <el-input
                    v-model="form.region_name"
                    placeholder="请输入区域名称"
                    :clearable="true"/>
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
import {
  addRegionItem,
  delRegionList,
  setRegionItem,
  setRegionIndex
} from '@/api/logistics/region'

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
      expanded: [],
      treeProps: {
        label: 'region_name',
        children: 'children'
      },
      cascaderProps: {
        value: 'region_id',
        label: 'region_name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
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
      this.auth.add = this.$has('/setting/logistics/region/add')
      this.auth.set = this.$has('/setting/logistics/region/set')
      this.auth.del = this.$has('/setting/logistics/region/del')
      this.auth.move = this.$has('/setting/logistics/region/move')
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) { return true }
      return data.region_name.indexOf(value) !== -1
    },
    // 重置表单
    resetForm() {
      this.form = {
        // 默认指定中国区域
        parent_id: 1,
        region_name: '',
        sort: 50
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
    // 刷新
    refresh() {
      this.expanded = []
      this.$emit('refresh')
    },
    // 点击树节点事件
    handleNodeClick(data) {
      if (!this.auth.add && !this.auth.set) {
        return
      }

      this.resetForm()
      this.resetElements('update')
      this.form = { ...data }
    },
    // 新增菜单表单初始化
    handleCreate(status) {
      this.resetForm()
      this.resetElements(status)

      if (this.$refs.tree.getCurrentKey()) {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    // 追加菜单
    handleAppend(key) {
      this.handleCreate('create')
      this.$refs.tree.setCurrentKey(key)
      this.form.parent_id = key
    },
    // 新增
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          addRegionItem({ ...this.form })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.region_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          delete this.form['parent_id']

          setRegionItem({ ...this.form })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.region_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 删除
    remove(key) {
      if (!key || !key.length) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delRegionList(key)
            .then(() => {
              key.forEach(value => {
                this.$refs.tree.remove(value)
              })

              this.$refs.tree.setCheckedKeys([])
              this.handleCreate('create')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    removeList() {
      this.remove(this.$refs.tree.getCheckedKeys())
    },
    // 判断节点是否能被拖动
    allowDrag() {
      return this.auth.move
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
      let regionList = []
      dropNode.parent.childNodes.forEach((value, index) => {
        regionList.push(value.key)
        value.data.sort = index + 1
      })

      setRegionIndex(regionList)
        .catch(() => {
          this.$emit('refresh')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-scroll {
    max-height: 520px;
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
