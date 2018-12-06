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
            新增文章
          </el-button>
        </el-button-group>
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
            <cs-icon name="level-up"/>
            置顶
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="level-down"/>
            撤顶
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
        </el-button-group>
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

    <el-table
      :data="currentTableData"
      v-loading="loading"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">

      <el-table-column type="selection" width="55"/>

      <el-table-column
        label="标题"
        prop="title"
        sortable="custom"
        min-width="200"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="分类"
        prop="article_cat_id"
        sortable="custom">
        <template slot-scope="scope">
          {{scope.row.get_article_cat.cat_name}}
        </template>
      </el-table-column>

      <el-table-column
        label="游览量"
        prop="page_views"
        min-width="65">
      </el-table-column>

      <el-table-column
        label="置顶"
        prop="is_top"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="topMap[scope.row.is_top].type"
            :style="true ? 'cursor: pointer;' : ''"
            @click.native="switchTop(scope.$index)">
            {{topMap[scope.row.is_top].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type"
            :style="true ? 'cursor: pointer;' : ''"
            @click.native="switchStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        prop="create_time"
        sortable="custom"
        align="center"
        width="160">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="() => {}"
            type="text">预览</el-button>

          <el-button
            size="small"
            @click="() => {}"
            type="text">编辑</el-button>

          <el-button
            size="small"
            @click="handleDelete(scope.$index)"
            type="text">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import {
  addArticleItem,
  setArticleItem,
  delArticleList,
  setArticleTop,
  setArticleStatus
} from '@/api/article/article'

export default {
  props: {
    catData: {
      default: () => []
    },
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      helpContent: '暂无帮助内容',
      auth: {},
      topMap: {
        0: {
          text: '普通',
          type: 'info'
        },
        1: {
          text: '置顶',
          type: 'warning'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
      statusMap: {
        0: {
          text: '禁用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取排序字段
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 批量设置状态
    handleStatus(index, status, confirm = false) {
    },
    // 批量设置置顶
    handleTop(index, is_top, confirm = false) {
    },
    // 批量删除文章
    handleDelete(index) {
    }
  }
}
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
