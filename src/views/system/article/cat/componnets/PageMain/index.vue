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
        <el-card shadow="never">
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

          <div>
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
                  :options="treeData"
                  :props="cascaderProps"
                  change-on-select
                  filterable
                  clearable
                  style="width: 100%;"
                  placeholder="不选择表示顶层分类 试试搜索：首页">
                </el-cascader>
              </el-form-item>

              <el-row>
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
                      controls-position="right"
                      label="请输入文章分类类型"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
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
                      controls-position="right"
                      label="请输入文章分类排序值"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item
                label="关键词"
                prop="keywords">
                <el-input
                  v-model="form.keywords"
                  placeholder="请输入文章分类关键词"
                  clearable/>
              </el-form-item>

              <el-form-item
                label="描述"
                prop="description">
                <el-input
                  v-model="form.description"
                  placeholder="请输入文章分类描述"
                  clearable/>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
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
      },
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children'
      },
      formStatus: 'create',
      formLoading: false,
      textMap: {
        create: '新增分类',
        update: '编辑分类'
      },
      form: {
        parent_id: undefined,
        cat_name: undefined,
        cat_type: 0,
        keywords: undefined,
        description: undefined,
        sort: 50,
        is_navi: '0'
      },
      rules: {
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
