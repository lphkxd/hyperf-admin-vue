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
          新增账号
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            :disabled="loading"
            @click="handleStatus(null, 1, true)">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            v-if="auth.disable"
            :disabled="loading"
            @click="handleStatus(null, 0, true)">
            <cs-icon name="close"/>
            禁用
          </el-button>
        </el-button-group>
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
      @sort-change="sortChange"
      stripe>
      <el-table-column type="selection" width="35"/>

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
                  effect="plain"
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
                  effect="plain"
                  size="mini">
                  {{legalizeMap[props.row.is_email].text}}
                </el-tag>
              </span>
            </el-form-item>

            <el-form-item label="账号等级">
              <span>{{props.row.get_user_level.name}}</span>
              <el-image
                v-if="props.row.get_user_level.icon"
                class="level-icon"
                :src="props.row.get_user_level.icon">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
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
                effect="plain"
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
          <el-tooltip
            v-if="scope.row.get_user_level.icon"
            :content="scope.row.get_user_level.name"
            placement="top">
            <el-image
              class="level-icon"
              :src="scope.row.get_user_level.icon">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-tooltip>

          <span v-else>{{scope.row.get_user_level.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户组"
        prop="group_id"
        sortable="custom"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.get_auth_group.name}}
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
        min-width="140">
        <template slot-scope="scope">
          <el-button
            v-if="auth.set"
            size="small"
            @click="handleUpdate(scope.$index)"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            size="small"
            @click="handleDelete(scope.$index)"
            type="text">删除</el-button>

          <el-dropdown
            v-if="auth.more"
            :show-timeout="50"
            size="small">
            <el-button
              class="cs-ml-10"
              size="small"
              type="text">更多操作</el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="auth.reset"
                @click.native="handleReset(scope.$index)">
                重置密码
              </el-dropdown-item>

              <el-dropdown-item
                v-if="auth.withdraw"
                @click.native="handleWithdraw(scope.row.user_id)"
                divided>
                提现账户
              </el-dropdown-item>

              <el-dropdown-item
                v-if="auth.address"
                @click.native="handleAddress(scope.row.user_id)">
                收货地址
              </el-dropdown-item>

              <el-dropdown-item
                v-if="auth.money"
                @click.native="handleMoney(scope.$index)"
                divided>
                账户资金
              </el-dropdown-item>

              <el-dropdown-item
                v-if="auth.finance"
                @click.native="handleFinance(scope.row.user_id)">
                调整资金
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
          label="账号"
          prop="username">
          <el-input
            v-model="form.username"
            :disabled="dialogStatus !== 'create'"
            placeholder="请输入账号"
            :clearable="true"/>
        </el-form-item>

        <div v-if="dialogStatus === 'create'">
          <el-form-item
            label="密码"
            prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              :clearable="true"/>
          </el-form-item>

          <el-form-item
            label="确认密码"
            prop="password_confirm">
            <el-input
              type="password"
              v-model="form.password_confirm"
              placeholder="请再次输入密码"
              :clearable="true"/>
          </el-form-item>
        </div>

        <el-form-item
          label="昵称"
          prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="可输入昵称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="头像"
          prop="head_pic">
          <el-input
            v-model="form.head_pic"
            placeholder="可输入头像图片"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="form.head_pic"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="form.head_pic | getPreviewUrl"
                    @click.native="$preview(form.head_pic)"/>
                </div>
                <cs-icon slot="reference" name="user-circle"/>
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

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="手机号"
          prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus === 'create'"
          label="邮箱"
          prop="email">
          <el-input
            v-model="form.email"
            placeholder="可输入邮箱地址"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="用户组"
          prop="group_id">
          <el-select
            v-model="form.group_id"
            placeholder="请选择"
            value="">
            <el-option
              v-for="item in group"
              :key="item.group_id"
              :label="item.name"
              :value="item.group_id"/>
          </el-select>
        </el-form-item>

        <el-form-item
          label="生日"
          prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="可选择出生日期"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="性别"
          prop="sex">
          <el-radio-group
            v-model="form.sex">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
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
    </el-dialog>

    <el-dialog
      title="调整资金"
      :visible.sync="financeVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="getPaymentSelect"
      width="600px">
      <el-form
        :model="financeForm"
        :rules="financeRules"
        ref="finance"
        label-width="90px">

        <el-form-item
          label="支付方式"
          prop="to_payment">
          <el-select
            v-model="financeForm.to_payment"
            placeholder="请选择"
            clearable
            style="width: 100%;"
            value="">
            <el-option
              v-for="(item, index) in toPayment"
              :key="index"
              :label="item.name"
              :value="item.code"/>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="金额"
              prop="money">
              <el-input-number
                v-model="financeForm.money"
                placeholder="可输入调整金额"
                controls-position="right"
                style="width: 90%;"
                :precision="2"/>

              <el-tooltip content="正数增加，负数减少" placement="top">
                <cs-icon name="question" class="cs-pl-5"/>
              </el-tooltip>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="积分"
              prop="points">
              <el-input-number
                v-model="financeForm.points"
                placeholder="可输入调整积分"
                controls-position="right"
                style="width: 90%;"/>

              <el-tooltip content="正数增加，负数减少" placement="top">
                <cs-icon name="question" class="cs-ml-5"/>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="来源订单号"
          prop="source_no">
          <el-input
            v-model="financeForm.source_no"
            placeholder="可输入来源订单号"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="操作原因"
          prop="cause">
          <el-input
            v-model="financeForm.cause"
            placeholder="请输入操作原因"
            type="textarea"
            :autosize="{minRows: 3}"
            :show-word-limit="true"
            maxlength="255">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="financeVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="financeLoading"
          @click="finance"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUserItem,
  delUserList,
  setUserItem,
  setUserPassword,
  setUserStatus
} from '@/api/user/client'
import dayjs from 'dayjs'
import util from '@/utils/util'
import { getUserMoneyInfo } from '@/api/user/money'
import { getPaymentList, setPaymentFinance } from '@/api/payment/payment'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
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
      auth: {
        add: false,
        set: false,
        del: false,
        enable: false,
        disable: false,
        more: false,
        reset: false,
        withdraw: false,
        address: false,
        money: false,
        finance: false
      },
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
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        group_id: undefined,
        mobile: undefined,
        email: undefined,
        nickname: undefined,
        head_pic: undefined,
        sex: undefined,
        birthday: undefined
      },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        password_confirm: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度不能少于 6 个字符',
            trigger: 'blur'
          }
        ],
        group_id: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            min: 7,
            max: 15,
            message: '长度在 7 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            max: 60,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        head_pic: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ]
      },
      toPayment: {},
      financeLoading: false,
      financeVisible: false,
      financeForm: {
        client_id: undefined,
        money: undefined,
        points: undefined,
        to_payment: undefined,
        source_no: undefined,
        cause: undefined
      },
      financeRules: {
        to_payment: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        source_no: [
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
          }
        ],
        cause: [
          {
            required: true,
            message: '操作原因不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
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
      this.auth.add = this.$has('/member/user/client/add')
      this.auth.set = this.$has('/member/user/client/set')
      this.auth.del = this.$has('/member/user/client/del')
      this.auth.enable = this.$has('/member/user/client/enable')
      this.auth.disable = this.$has('/member/user/client/disable')
      this.auth.more = this.$has('/member/user/client/more')
      this.auth.reset = this.$has('/member/user/client/reset')
      this.auth.withdraw = this.$has('/member/user/client/withdraw')
      this.auth.address = this.$has('/member/user/client/address')
      this.auth.money = this.$has('/member/user/client/money')
      this.auth.finance = this.$has('/member/user/client/finance')
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
    // 获取上传文件
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      this.form.head_pic = response.data[0].url
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

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

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
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        group_id: undefined,
        mobile: undefined,
        email: undefined,
        nickname: undefined,
        head_pic: undefined,
        sex: 0,
        birthday: null
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
          if (!this.form.birthday) {
            delete this.form.birthday
          }

          addUserItem({ ...this.form })
            .then(() => {
              this.dialogFormVisible = false
              this.$message.success('操作成功')
              this.$emit('refresh')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      this.form = {
        client_id: data.user_id,
        username: data.username,
        nickname: data.nickname,
        head_pic: data.head_pic,
        group_id: data.group_id,
        birthday: data.birthday,
        sex: data.sex
      }

      // 处理el-select项不存在的bug
      if (!this.group.find(item => item.group_id === this.form.group_id)) {
        this.form.group_id = undefined
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
          setUserItem({ ...this.form })
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data,
                  get_auth_group: {
                    ...this.group.find(item => item.group_id === this.form.group_id)
                  }
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
    // 重置密码
    handleReset(index) {
      const data = this.currentTableData[index]
      this.$confirm(`确定要重置 ${data.username} 的密码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          // 生成随机密码
          const newPass = util.randomLenNum(6)
          setUserPassword(data.user_id, newPass, newPass)
            .then(() => {
              this.$notify({
                title: '重置密码',
                dangerouslyUseHTMLString: true,
                message: `${data.username} 的密码已重置为：</br>${newPass}`,
                type: 'success',
                position: 'bottom-right',
                duration: 0
              })
            })
        })
        .catch(() => {
        })
    },
    // 提现账户
    handleWithdraw(user_id) {
      this.$router.push({
        name: 'member-user-withdraw',
        params: {
          client_id: user_id
        }
      })
    },
    // 收货地址
    handleAddress(user_id) {
      this.$router.push({
        name: 'member-user-address',
        params: {
          client_id: user_id
        }
      })
    },
    // 账户资金
    handleMoney(index) {
      getUserMoneyInfo(this.currentTableData[index].user_id)
        .then(res => {
          this.$notify({
            title: '账户资金',
            dangerouslyUseHTMLString: true,
            message: `
              <p>${this.currentTableData[index].username} 的账户资金</p>
              <p>查询时间：${dayjs().format('YYYY-MM-DD HH:mm:ss')}</p></br>
              <p>累计消费：${res.data.total_money || 0}</p>
              <p>可用余额：${res.data.balance || 0}</p>
              <p>锁定余额：${res.data.lock_balance || 0}</p>
              <p>账号积分：${res.data.points || 0}</p>
              <p>锁定积分：${res.data.lock_points || 0}</p>
            `,
            type: 'success',
            position: 'bottom-right',
            duration: 0
          })
        })
    },
    // 获取支付方式列表
    getPaymentSelect() {
      if (!this.toPayment.length) {
        getPaymentList({ is_select: 1, type: 'deposit' })
          .then(res => {
            this.toPayment = res.data
          })
      }
    },
    // 调整资金
    handleFinance(user_id) {
      this.financeForm = {
        client_id: user_id,
        money: 0,
        points: 0,
        to_payment: undefined,
        source_no: undefined,
        cause: undefined
      }

      this.$nextTick(() => {
        this.$refs.finance.clearValidate()
      })

      this.financeLoading = false
      this.financeVisible = true
    },
    // 请求调整金额
    finance() {
      this.$refs.finance.validate(valid => {
        if (valid) {
          this.financeLoading = true
          setPaymentFinance(this.financeForm)
            .then(() => {
              this.financeVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.financeLoading = false
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
  .level-icon {
    margin-left: 5px;
    line-height: 0;
    vertical-align: text-top;
  }
</style>
