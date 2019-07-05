<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small"
      @submit.native.prevent>
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="() => {}">
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
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="close"/>
            禁用
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

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="trash-o"/>
            删除
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
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
          clearable>
        </el-input>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          v-loading="loading"
          class="tree-scroll"
          node-key="goods_category_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :show-checkbox="true"
          :draggable="true"
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span class="brother-showing" :class="{'status-tree': !data.status}">
              <i class="fa fa-align-justify move-tree cs-mr-10"></i>
              <i v-if="data.children" :class="`fa fa-folder-${node.expanded ? 'open-o' : 'o'}`"></i>
              <i v-else class="fa fa-file-o"></i>
              {{isFullName ? node.label : data.alias}}
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
                {{data.status ? '禁用' : '启用'}}
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
      filterText: '',
      isFullName: true,
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
  mounted() {
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 过滤菜单
    filterNode(value, data) {
      if (!value) { return true }
      return data.name.indexOf(value) !== -1
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
</style>
