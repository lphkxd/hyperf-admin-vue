<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">

      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <cs-icon name="plus"/>
          新增消息
        </el-button>
      </el-form-item>

      <el-form-item v-if="auth.del">
        <el-button
          :disabled="loading"
          @click="handleDelete(null)">
          <cs-icon name="trash-o"/>
          删除
        </el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="标题"
        prop="title"
        min-width="350"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="类型"
        prop="type"
        sortable="custom">
        <template slot-scope="scope">
          {{typeData[scope.row.type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="成员组"
        prop="member">
        <template slot-scope="scope">
          {{groupData[scope.row.member]}}
        </template>
      </el-table-column>

      <el-table-column
        label="日期"
        prop="create_time"
        align="center"
        width="160"
        sortable="custom">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">
              创建日期：{{scope.row.create_time}}<br/>
              最后更新：{{scope.row.update_time}}
            </div>
            <span>{{scope.row.create_time}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="置顶"
        prop="is_top"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag size="mini" effect="plain" :type="topMap[scope.row.is_top].type">
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
          <el-tag size="mini" effect="plain" :type="statusMap[scope.row.status].type">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="160">
        <template slot-scope="scope">
          <el-button
            v-if="auth.view"
            size="small"
            @click="handleView(scope.$index)"
            type="text">
            <el-tooltip
              v-if="scope.row.url"
              :content="scope.row.url"
              placement="top">
              <div slot="content">
                打开方式：{{targetMap[scope.row.target]}}<br/>
                链接地址：{{scope.row.url}}
              </div>
              <cs-icon name="link"/>
            </el-tooltip>
            {{scope.row.url ? '外链' : '预览'}}</el-button>

          <el-button
            v-if="auth.set && scope.row.status === 0"
            size="small"
            @click="handleUpdate(scope.$index)"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.status && scope.row.status === 0"
            size="small"
            @click="handleSubmit(scope.$index)"
            type="text">发布</el-button>

          <el-button
            v-if="auth.del"
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
      :close-on-click-modal="false"
      width="760px">
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
            placeholder="请输入消息标题"/>
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content">
          <cs-tinymce
            v-if="dialogFormVisible"
            v-model="form.content"
            code="inside_content"
            :height="180"/>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="类型"
              prop="type">
              <el-select
                v-model="form.type"
                placeholder="请选择"
                style="width: 100%;"
                value="">
                <el-option
                  v-for="(item, index) in typeData"
                  :key="index"
                  :label="item"
                  :value="index"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="成员组"
              prop="member">
              <el-select
                v-model="form.member"
                :disabled="dialogStatus === 'update'"
                placeholder="请选择"
                style="width: 100%;"
                value="">
                <el-option
                  v-for="(item, index) in groupData"
                  :key="index"
                  :label="item"
                  :value="index"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="外部链接"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="可输入外部链接"/>
        </el-form-item>

        <el-form-item
          label="打开方式"
          prop="target">
          <el-radio-group v-model="form.target">
            <el-radio label="_self">当前窗口</el-radio>
            <el-radio label="_blank">新窗口</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="发布状态"
          prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="0">草稿件</el-radio>
            <el-radio label="1">正式发布</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否置顶"
          prop="is_top">
          <el-switch
            v-model="form.is_top"
            active-value="1"
            inactive-value="0">
          </el-switch>
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
          @click="submit"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="updata"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addMessageItem,
  setMessageStatus,
  delMessageList,
  setMessageItem
} from '@/api/message/message'

export default {
  components: {
    'csTinymce': () => import('@/components/cs-tinymce')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    typeData: {
      default: () => {}
    },
    groupData: {
      default: () => {}
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑消息',
        create: '新增消息'
      },
      form: {
        type: undefined,
        member: undefined,
        title: undefined,
        content: undefined,
        url: undefined,
        target: undefined,
        is_top: undefined,
        status: undefined
      },
      auth: {
        add: false,
        set: false,
        del: false,
        status: false,
        view: false
      },
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        member: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        url: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      },
      topMap: {
        0: {
          text: '普通',
          type: 'info'
        },
        1: {
          text: '置顶',
          type: 'warning'
        }
      },
      statusMap: {
        0: {
          text: '草稿件',
          type: 'danger'
        },
        1: {
          text: '已发布',
          type: 'success'
        }
      },
      targetMap: {
        _self: '当前窗口',
        _blank: '新窗口'
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
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/message/send/add')
      this.auth.set = this.$has('/system/message/send/set')
      this.auth.del = this.$has('/system/message/send/del')
      this.auth.status = this.$has('/system/message/send/status')
      this.auth.view = this.$has('/system/message/send/view')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.message_id)
        })
      } else {
        idList.push(this.currentTableData[val].message_id)
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

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        type: undefined,
        member: undefined,
        title: undefined,
        content: undefined,
        url: undefined,
        target: '_blank',
        is_top: '0',
        status: '0'
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 提交创建请求
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addMessageItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                page_views: 0
              })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 正式发布
    handleSubmit(index) {
      let idList = this._getIdList(index)
      if (idList.length === 0) {
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
          setMessageStatus(idList)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (idList.indexOf(value.message_id) !== -1) {
                  this.$set(this.currentTableData, index, {
                    ...value,
                    status: 1
                  })
                }
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(index) {
      let idList = this._getIdList(index)
      if (idList.length === 0) {
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
          delMessageList(idList)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (idList.indexOf(this.currentTableData[i].message_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.form = {
        ...this.currentTableData[index],
        type: this.currentTableData[index].type.toString(),
        member: this.currentTableData[index].member.toString(),
        is_top: this.currentTableData[index].is_top.toString(),
        status: this.currentTableData[index].status.toString()
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.currentIndex = index
      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    updata() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          setMessageItem({ ...this.form })
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data
                })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 预览消息
    handleView(index) {
      if (this.currentTableData[index].url) {
        this.$open(this.currentTableData[index].url)
        return
      }

      this.$router.push({
        name: 'system-message-send-view',
        params: {
          message_id: this.currentTableData[index].message_id
        }
      })
    }
  }
}
</script>
