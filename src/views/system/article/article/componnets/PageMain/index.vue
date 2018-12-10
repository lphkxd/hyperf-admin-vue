<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleCreate">
            <cs-icon name="plus"/>
            新增文章
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleTop(null, 1, true)">
            <cs-icon name="level-up"/>
            置顶
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleTop(null, 0, true)">
            <cs-icon name="level-down"/>
            撤顶
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleStatus(null, 1, true)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleStatus(null, 0, true)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleDelete(null)">
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
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.image"
            placement="top-start"
            trigger="hover"
            width="150">
            <img class="image" :src="scope.row.image" alt="">
            <cs-icon slot="reference" name="image"/>
          </el-popover>
          {{scope.row.title}}
        </template>
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
        min-width="70">
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
            style="cursor: pointer;"
            @click.native="handleTop(scope.$index)">
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
            style="cursor: pointer;"
            @click.native="handleStatus(scope.$index)">
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
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.$index)"
            type="text">
            <el-tooltip content="外部链接" placement="top">
              <cs-icon v-if="scope.row.url" name="link"/>
            </el-tooltip>
            预览</el-button>

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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="60%">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">

        <el-form-item
          label="标题"
          prop="title">
          <el-input
            v-model="form.title"
            clearable
            placeholder="请输入文章标题"/>
        </el-form-item>

        <el-form-item
          label="分类"
          prop="article_cat_id">
          <el-cascader
            v-model="form.article_cat_id"
            :options="catData"
            :props="cascaderProps"
            change-on-select
            filterable
            clearable
            style="width: 100%;"
            placeholder="试试搜索：分类">
          </el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update(form.index)"
          size="small">修改</el-button>
      </div>
    </el-dialog>
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
import util from '@/utils/util'

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
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑文章',
        create: '新增文章'
      },
      cascaderProps: {
        value: 'article_cat_id',
        label: 'cat_name',
        children: 'children'
      },
      form: {
      },
      rules: {
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
    // 获取列表中的文章编号
    _getArticleIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.article_id)
        })
      } else {
        idList.push(this.currentTableData[val].article_id)
      }

      return idList
    },
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
    handleStatus(val, status = 0, confirm = false) {
      let article_id = this._getArticleIdList(val)
      if (article_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(article_id, status, vm) {
        setArticleStatus(article_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (article_id.indexOf(value.article_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  status
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newStatus = oldData.status ? 0 : 1

        if (oldData.status > 1) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(article_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setStatus(article_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量设置置顶
    handleTop(val, is_top = 0, confirm = false) {
      let article_id = this._getArticleIdList(val)
      if (article_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setTop(article_id, is_top, vm) {
        setArticleTop(article_id, is_top)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (article_id.indexOf(value.article_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  is_top
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newTop = oldData.is_top ? 0 : 1

        if (oldData.is_top > 1) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, is_top: 2 })
        setTop(article_id, newTop, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTop(article_id, is_top, this)
        })
        .catch(() => {
        })
    },
    // 批量删除文章
    handleDelete(val) {
      let article_id = this._getArticleIdList(val)
      if (article_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delArticleList(article_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (article_id.indexOf(this.currentTableData[i].article_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh')
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 发送预览文章请求
    handlePreview(index) {
      if (this.currentTableData[index].url) {
        util.open(this.currentTableData[index].url)
        return
      }

      this.$router.push({
        name: 'system-article-preview',
        params: {
          article_id: this.currentTableData[index].article_id
        }
      })
    },
    // 新建文章
    handleCreate() {
      this.form = {
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .image {
    width: 100%;
    margin: 0 auto;
  }
</style>
