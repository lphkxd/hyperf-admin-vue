<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="plus"/>
          新增账号
        </el-button>
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
      @sort-change="sortChange"
      stripe>

      <el-table-column type="selection" width="55"/>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            class="table-expand">
            <el-form-item label="账号">
              <span>{{props.row.username}}</span>
            </el-form-item>

            <el-form-item label="昵称">
              <span>{{props.row.nickname}}</span>
            </el-form-item>

            <el-form-item label="手机号">
              <span v-if="props.row.mobile">
                {{props.row.mobile}}
                <el-tag
                  :type="legalizeMap[props.row.is_mobile].type"
                  size="mini">
                  {{legalizeMap[props.row.is_mobile].text}}
                </el-tag>
              </span>
            </el-form-item>

            <el-form-item label="邮箱">
              <span v-if="props.row.email">
                {{props.row.email}}
                <el-tag
                  :type="legalizeMap[props.row.is_email].type"
                  size="mini">
                  {{legalizeMap[props.row.is_email].text}}
                </el-tag>
              </span>
            </el-form-item>

            <el-form-item label="账号等级">
              <span>{{props.row.get_user_level.name}}</span>
            </el-form-item>

            <el-form-item label="用户组">
              <span>{{props.row.get_auth_group.name}}</span>
            </el-form-item>

            <el-form-item label="性别">
              <span>{{sexMap[props.row.sex]}}</span>
            </el-form-item>

            <el-form-item label="生日">
              <span>{{props.row.birthday}}</span>
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item label="创建日期">
              <span>{{props.row.create_time}}</span>
            </el-form-item>

            <el-form-item label="最后登陆">
              <span>{{props.row.last_login}}</span>
            </el-form-item>

            <el-form-item label="登陆IP">
              <span>{{props.row.last_ip}}</span>
            </el-form-item>

            <el-form-item label="状态">
              <el-tag
                :type="statusMap[props.row.status].type"
                size="mini">
                {{statusMap[props.row.status].text}}
              </el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.head_pic"
            width="150"
            placement="right"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.head_pic | getPreviewUrl"
                @click.native="$preview(scope.row.head_pic)"/>
            </div>
            <cs-icon slot="reference" name="user-circle"/>
          </el-popover>
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column
        label="昵称"
        prop="nickname"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="手机号"
        prop="mobile"
        sortable="custom"
        min-width="100">
      </el-table-column>

      <el-table-column
        label="账号等级"
        prop="user_level_id"
        sortable="custom"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.get_user_level.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="性别"
        prop="sex"
        width="70">
        <template slot-scope="scope">
          {{sexMap[scope.row.sex]}}
        </template>
      </el-table-column>

      <el-table-column
        label="最后登陆"
        prop="last_login"
        align="center"
        width="160">
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
        label="操作"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="() => {}"
            type="text">编辑</el-button>

          <el-button
            size="small"
            @click="handleDelete(scope.$index)"
            type="text">删除</el-button>

          <el-dropdown
            size="small"
            :show-timeout="50">
            <el-button
              class="cs-ml-10"
              size="small"
              type="text">更多操作</el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>提现账户</el-dropdown-item>
              <el-dropdown-item>收货地址</el-dropdown-item>
              <el-dropdown-item>账户资金</el-dropdown-item>
              <el-dropdown-item>调整资金</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from '@/utils/util'
import { delUserList, setUserStatus } from '@/api/user/client'

export default {
  props: {
    loading: {
      default: false
    },
    group: {
      default: () => []
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {},
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑账号',
        create: '新增账号'
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
      sexMap: {
        0: '保密',
        1: '男',
        2: '女'
      },
      legalizeMap: {
        0: {
          text: '未认证',
          type: 'warning'
        },
        1: {
          text: '已认证',
          type: ''
        }
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
  filters: {
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val, 'head_pic')
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.user_id)
        })
      } else {
        idList.push(this.currentTableData[val].user_id)
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
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let clients = this._getIdList(val)
      if (clients.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(clients, status, vm) {
        setUserStatus(clients, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (clients.indexOf(value.user_id) !== -1) {
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

        // // 禁用权限检测
        // if (newStatus === 0 && !this.auth.disable) {
        //   return
        // }
        //
        // // 启用权限检测
        // if (newStatus === 1 && !this.auth.enable) {
        //   return
        // }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(clients, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(clients, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let clients = this._getIdList(val)
      if (clients.length === 0) {
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
          delUserList(clients)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (clients.indexOf(this.currentTableData[i].user_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
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
  .table-expand {
    font-size: 0;
    /*height: 350px;*/
    /*overflow: auto;*/
  }
  .table-expand >>> label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
</style>
