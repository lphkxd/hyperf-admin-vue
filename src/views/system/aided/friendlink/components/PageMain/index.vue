<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate">新增链接</el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            icon="el-icon-check"
            :disabled="loading"
            @click="handleStatus(null, 1, true)">启用</el-button>

          <el-button
            v-if="auth.disable"
            icon="el-icon-close"
            :disabled="loading"
            @click="handleStatus(null, 0, true)">禁用</el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item v-if="auth.del">
        <el-button
          icon="el-icon-delete"
          :disabled="loading"
          @click="handleDelete(null)">删除</el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      :highlight-current-row="true"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">
      <el-table-column type="selection" width="30"/>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="100">
      </el-table-column>

      <el-table-column
        label="Url"
        prop="url"
        min-width="150">
      </el-table-column>

      <el-table-column
        label="Logo"
        prop="logo"
        align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.logo"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.logo | getPreviewUrl"
                @click.native="$preview(scope.row.logo)"
                fit="fill"/>
            </div>
            <i slot="reference" class="el-icon-picture"/>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="打开方式"
        prop="target">
        <template slot-scope="scope">
          {{targetMap[scope.row.target].text}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        align="center"
        sortable="custom">
        <template slot-scope="scope">
          <el-input-number
            v-if="auth.sort"
            v-model="scope.row.sort"
            style="width: 88px;"
            size="mini"
            controls-position="right"
            :min="0"
            :max="255"
            @change="handleSort(scope.$index)">
          </el-input-number>
          <span v-else>
            {{scope.row.sort}}
          </span>
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
            :style="auth.enable || auth.disable ? 'cursor: pointer;' : ''"
            :effect="auth.enable || auth.disable ? 'light' : 'plain'"
            @click.native="handleStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="auth.set"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
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
            placeholder="请输入友情链接名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="Url"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="请输入友情链接Url"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="Logo"
          prop="logo">
          <el-input
            v-model="form.logo"
            placeholder="可输入友情链接Logo"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="form.logo"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="form.logo | getPreviewUrl"
                    @click.native="$preview(form.logo)"
                    fit="fill"/>
                </div>
                <i slot="reference" class="el-icon-picture"/>
              </el-popover>
            </template>

            <el-dropdown
              slot="append"
              :show-timeout="50"
              @command="handleCommand">
              <el-button icon="el-icon-upload"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="storage" icon="el-icon-finished">资源选择</el-dropdown-item>
                <el-dropdown-item command="upload" icon="el-icon-upload2">上传资源</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
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
          label="排序值"
          prop="sort">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="0"
            :max="255"
            style="width: 120px;"/>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-switch
            v-model="form.status"
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
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small">修改</el-button>
      </div>

      <cs-storage
        ref="storage"
        style="display: none"
        :limit="1"
        @confirm="_getStorageFileList">
      </cs-storage>

      <cs-upload
        style="display: none"
        ref="upload"
        type="slot"
        accept="image/*"
        :limit="1"
        :multiple="false"
        @confirm="_getUploadFileList">
      </cs-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  addFriendlinkItem,
  setFriendlinkStatus,
  delFriendlinkList,
  setFriendlinkSort,
  setFriendlinkItem
} from '@/api/aided/friendlink'
import util from '@/utils/util'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        enable: false,
        disable: false
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑客服',
        create: '新增客服'
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
      targetMap: {
        _self: {
          text: '当前窗口',
          value: '_self'
        },
        _blank: {
          text: '新窗口',
          value: '_blank'
        }
      },
      form: {
        name: undefined,
        url: undefined,
        logo: undefined,
        target: undefined,
        sort: undefined,
        status: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: 'Url不能为空',
            trigger: 'blur'
          },
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
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'link_image') : ''
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
      this.auth.add = this.$has('/system/aided/friendlink/add')
      this.auth.set = this.$has('/system/aided/friendlink/set')
      this.auth.del = this.$has('/system/aided/friendlink/del')
      this.auth.sort = this.$has('/system/aided/friendlink/sort')
      this.auth.enable = this.$has('/system/aided/friendlink/enable')
      this.auth.disable = this.$has('/system/aided/friendlink/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.friend_link_id)
        })
      } else {
        idList.push(this.currentTableData[val].friend_link_id)
      }

      return idList
    },
    // 资源下拉框事件
    handleCommand(command) {
      switch (command) {
        case 'storage':
          this.$refs.storage.handleStorageDlg([0, 2])
          break

        case 'upload':
          this.$refs.upload.handleUploadDlg()
          break
      }
    },
    // 获取上传资源
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      if (response.data[0].type === 0) {
        this.form.logo = response.data[0].url
      }
    },
    // 获取选择资源
    _getStorageFileList(files) {
      if (!files.length) {
        return
      }

      for (const value of files) {
        if (value.type === 0) {
          this.form.logo = value.url
          break
        }
      }
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
        name: undefined,
        url: undefined,
        target: '_blank',
        logo: '',
        sort: 50,
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addFriendlinkItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift(res.data)
              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let friend_link_id = this._getIdList(val)
      if (friend_link_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(friend_link_id, status, vm) {
        setFriendlinkStatus(friend_link_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (friend_link_id.indexOf(value.friend_link_id) !== -1) {
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

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(friend_link_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(friend_link_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let friend_link_id = this._getIdList(val)
      if (friend_link_id.length === 0) {
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
          delFriendlinkList(friend_link_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (friend_link_id.indexOf(this.currentTableData[i].friend_link_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 设置排序值
    handleSort(index) {
      setFriendlinkSort(
        this.currentTableData[index].friend_link_id,
        this.currentTableData[index].sort
      )
    },
    // 编辑链接
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.form = {
        ...data,
        status: data.status.toString()
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          setFriendlinkItem({ ...this.form })
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
    }
  }
}
</script>

<style scoped>
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
</style>
