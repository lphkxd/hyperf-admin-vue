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
        <el-radio-group
          v-model="isFullName">
          <el-radio-button
            :disabled="loading"
            :label="true">
            <cs-icon name="circle"/>
            全名
          </el-radio-button>

          <el-radio-button
            :disabled="loading"
            :label="false">
            <cs-icon name="adjust"/>
            别名
          </el-radio-button>
        </el-radio-group>
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
            v-if="auth.del"
            :disabled="loading"
            @click="removeList">
            <cs-icon name="trash-o"/>
            删除
          </el-button>

          <el-button
            :disabled="loading"
            @click="refresh">
            <cs-icon name="refresh"/>
            刷新
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
          :clearable="true">
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
          class="tree-scroll"
          node-key="goods_category_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :default-expanded-keys="expanded"
          :show-checkbox="true"
          :draggable="true"
          :allow-drag="allowDrag"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span class="brother-showing" :class="{'status-tree': !data.status}">
              <i v-if="auth.move" class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" :class="`fa fa-folder-${node.expanded ? 'open-o' : 'o'}`"></i>
              <i v-else class="fa fa-file-o"></i>
              {{isFullName ? node.label : data.alias}}
            </span>

            <span class="active">
              <el-button
                v-if="auth.add"
                type="text"
                size="mini"
                @click.stop="handleAppend(data.goods_category_id)">
                新增
              </el-button>

              <el-button
                v-if="auth.disable || auth.enable"
                type="text"
                size="mini"
                @click.stop="setStatusItem(data.goods_category_id, data.status)">
                {{data.status ? '禁用' : '启用'}}
              </el-button>

              <el-button
                v-if="auth.del"
                type="text"
                size="mini"
                @click.stop="remove([data.goods_category_id])">
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
                placeholder="不选择表示顶层分类 试试搜索：手机"
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
                  prop="name">
                  <el-input
                    v-model="form.name"
                    placeholder="请输入商品分类名称"
                    :clearable="true"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="名称首拼"
                  prop="name_phonetic">
                  <el-input
                    v-model="form.name_phonetic"
                    placeholder="不填写系统将自动识别"
                    :clearable="true"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="别名"
                  prop="alias">
                  <el-input
                    v-model="form.alias"
                    placeholder="可输入商品分类别名"
                    :clearable="true"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="别名首拼"
                  prop="alias_phonetic">
                  <el-input
                    v-model="form.alias_phonetic"
                    placeholder="不填写系统将自动识别"
                    :clearable="true"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="图片"
                  prop="category_pic">
                  <el-input
                    v-model="form.category_pic"
                    placeholder="可输入商品分类图片"
                    :clearable="true">
                    <template slot="prepend">
                      <el-popover
                        v-if="form.category_pic"
                        width="150"
                        placement="top"
                        trigger="hover">
                        <div class="popover-image">
                          <el-image
                            :src="form.category_pic | getPreviewUrl"
                            @click.native="$preview(form.category_pic)"
                            fit="fill"/>
                        </div>
                        <cs-icon slot="reference" name="image"/>
                      </el-popover>
                    </template>
                    <cs-upload
                      slot="append"
                      type="slot"
                      accept="image/*"
                      :limit="1"
                      :multiple="false"
                      @confirm="_getUploadFileList">
                      <el-button slot="control"><cs-icon name="upload"/></el-button>
                    </cs-upload>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="图标"
                  prop="category_ico">
                  <el-input
                    v-model="form.category_ico"
                    placeholder="可输入商品分类图标"
                    :clearable="true"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              label="关键词"
              prop="keywords">
              <el-input
                v-model="form.keywords"
                placeholder="可输入商品分类关键词"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="描述"
              prop="description">
              <el-input
                v-model="form.description"
                placeholder="可输入商品分类描述"
                type="textarea"
                :rows="3"/>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="类型"
                  prop="category_type">
                  <el-input-number
                    v-model="form.category_type"
                    :min="-128"
                    :max="127"
                    style="width: 120px;"
                    controls-position="right"/>
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

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="导航"
                  prop="is_navi">
                  <el-switch
                    v-model="form.is_navi"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="状态"
                  prop="status">
                  <el-switch
                    v-model="form.status"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addGoodsCategoryItem,
  delGoodsCategoryList,
  setGoodsCategoryIndex,
  setGoodsCategoryItem,
  setGoodsCategoryStatus
} from '@/api/goods/category'
import util from '@/utils/util'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
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
      expanded: [],
      filterText: '',
      isFullName: true,
      treeProps: {
        label: 'name',
        children: 'children'
      },
      cascaderProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      formStatus: 'create',
      formLoading: false,
      textMap: {
        create: '新增分类',
        update: '编辑分类'
      },
      stateButton: {
        create: '确定',
        update: '修改'
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
        parent_id: undefined,
        name: undefined,
        name_phonetic: undefined,
        alias: undefined,
        alias_phonetic: undefined,
        category_pic: undefined,
        category_ico: undefined,
        keywords: undefined,
        description: undefined,
        category_type: 0,
        sort: 50,
        is_navi: 0,
        status: 1
      },
      rules: {
        name: [
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
        name_phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        alias: [
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        alias_phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        category_pic: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        category_ico: [
          {
            max: 50,
            message: '长度不能大于 50 个字符',
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
        category_type: [
          {
            type: 'number',
            message: '必须为数字值',
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
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'goods_category') : ''
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
      this.auth.add = this.$has('/goods/setting/category/add')
      this.auth.set = this.$has('/goods/setting/category/set')
      this.auth.del = this.$has('/goods/setting/category/del')
      this.auth.enable = this.$has('/goods/setting/category/enable')
      this.auth.disable = this.$has('/goods/setting/category/disable')
      this.auth.move = this.$has('/goods/setting/category/move')
    },
    // 获取上传文件
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      this.form.category_pic = response.data[0].url
    },
    // 获取上级编号
    _getParentId() {
      const treeId = this.form.parent_id

      if (!Array.isArray(treeId)) {
        return treeId
      }

      return treeId.length > 0 ? treeId[treeId.length - 1] : 0
    },
    // 重置表单
    resetForm() {
      this.form = {
        parent_id: [],
        name: '',
        name_phonetic: '',
        alias: '',
        alias_phonetic: '',
        category_pic: '',
        category_ico: '',
        keywords: '',
        description: '',
        category_type: 0,
        sort: 50,
        is_navi: 0,
        status: 1
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
    // 过滤分类
    filterNode(value, data) {
      if (!value) { return true }
      return data.name.indexOf(value) !== -1
    },
    // 批量设置状态
    setStatusList(val) {
      this.enable(this.$refs.tree.getCheckedKeys(), val)
    },
    // 快捷设置状态
    setStatusItem(key, val) {
      this.enable([key], val ? 0 : 1)
    },
    // 启用或禁用
    enable(key, val) {
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
          setGoodsCategoryStatus(key, val)
            .then(() => {
              this.expanded = [...key]
              this.$emit('refresh')
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
    // 删除分类
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
          delGoodsCategoryList(key)
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
    // 刷新
    refresh() {
      this.expanded = []
      this.$emit('refresh')
    },
    // 新增分类表单初始化
    handleCreate(status) {
      this.resetForm()
      this.resetElements(status)

      if (this.$refs.tree.getCurrentKey()) {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    // 新增分类
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          addGoodsCategoryItem({
            ...this.form,
            'parent_id': this._getParentId()
          })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.goods_category_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
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
      this.form = { ...data }
    },
    // 编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          setGoodsCategoryItem({
            ...this.form,
            'parent_id': this._getParentId()
          })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.goods_category_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 判断节点是否可移动
    allowDrag() {
      return this.auth.move
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
        goods_category_id: draggingNode.data.goods_category_id,
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

      setGoodsCategoryItem({ ...setCat })
        .then(res => {
          draggingNode.data.parent_id = res.data.parent_id
        })
        .catch(() => {
          this.$emit('refresh')
        })

      if (indexCat.length > 0) {
        setGoodsCategoryIndex(indexCat)
          .catch(() => {
            this.$emit('refresh')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-scroll {
    max-height: 640px;
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
  .status-tree {
    color: $color-text-placehoder;
    text-decoration: line-through
  }
  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
  }
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image /deep/ img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image /deep/ .el-image__error {
    line-height: 1.4;
  }
</style>
