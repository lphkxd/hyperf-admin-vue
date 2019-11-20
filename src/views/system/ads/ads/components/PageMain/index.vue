<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">

      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="create">
          <cs-icon name="plus"/>
          新增广告
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
      @sort-change="sortChange">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="180"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="广告位置"
        prop="ads_position_id"
        sortable="custom"
        min-width="180"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row['get_ads_position']['name']}}
        </template>
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        min-width="80">
      </el-table-column>

      <el-table-column
        label="平台"
        min-width="70">
        <template slot-scope="scope">
          {{platformTable[scope.row.platform]}}
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        align="center">
        <template slot-scope="scope">
          <cs-icon :name="typeMap[scope.row.type].type"/>
        </template>
      </el-table-column>

      <el-table-column
        label="背景色"
        min-width="90">
        <template slot-scope="scope">
          <span :style="`background-color:${scope.row.color}`">{{scope.row.color}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        align="center"
        sortable="custom"
        min-width="110">
        <template slot-scope="scope">
          <el-input-number
            v-if="auth.sort"
            size="mini"
            v-model="scope.row.sort"
            @change="handleSort(scope.$index)"
            style="width: 88px;"
            controls-position="right"
            :min="0"
            :max="255">
          </el-input-number>
          <span v-else>
            {{scope.row.sort}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="投放日期"
        prop="begin_time"
        align="center"
        sortable="custom"
        min-width="100">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">
              开始投放日期：{{scope.row.begin_time}}<br/>
              投放结束日期：{{scope.row.end_time}}
            </div>
            <el-tag size="mini" effect="plain" type="info">详细</el-tag>
          </el-tooltip>
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
            size="small"
            @click="handleView(scope.$index)"
            type="text">
            <el-tooltip placement="top">
              <div slot="content">
                打开方式：{{targetMap[scope.row.target]}}<br/>
                链接地址：{{scope.row.url}}
              </div>
              <cs-icon name="link"/>
            </el-tooltip>
            链接</el-button>

          <el-button
            v-if="auth.set"
            size="small"
            @click="updata(scope.$index)"
            type="text">编辑</el-button>

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
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入广告名称"
            :clearable="true"/>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="广告位置"
              prop="ads_position_id">
              <el-select
                v-model="form.ads_position_id"
                placeholder="请选择"
                style="width: 100%;"
                @change="switchPosition"
                value="">
                <el-option
                  v-for="(item, index) in positionTable"
                  :key="index"
                  :label="item.name"
                  :value="item.ads_position_id"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="编码"
              prop="code">
              <el-input
                v-model="form.code"
                placeholder="可输入广告编码"
                :clearable="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          v-if="dialogFormVisible"
          :label="adsType !== undefined ? typeMap[adsType]['text'] : '内容'"
          prop="content">
          <cs-upload
            v-if="adsType === 0"
            v-model="content.image"
            :fileList="imageFile"
            :multiple="true"/>

          <cs-tinymce
            v-if="adsType === 1"
            v-model="content.code"
            code="inside_content"
            :height="180"/>

          <el-alert
            v-if="adsType === undefined"
            title="请先选择广告位置"
            type="info"
            :closable="false"
            center>
          </el-alert>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="投放日期"
              prop="begin_time">
              <el-date-picker
                v-model="form.begin_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择广告开始投放日期"
                style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="结束日期"
              prop="end_time">
              <el-date-picker
                v-model="form.end_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择广告投放结束日期"
                style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="链接地址"
              prop="url">
              <el-input
                v-model="form.url"
                placeholder="请输入广告链接地址"
                :clearable="true"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="打开方式"
              prop="target">
              <el-radio-group v-model="form.target">
                <el-radio label="_self">当前窗口</el-radio>
                <el-radio label="_blank">新窗口</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
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

          <el-col :span="12">
            <el-form-item
              label="背景色"
              prop="color">
              <el-color-picker v-model="form.color">
              </el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>

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
          @click="handleCreate"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="handleUpdate"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setAdsStatus,
  delAdsList,
  setAdsSort,
  addAdsItem,
  setAdsItem
} from '@/api/ads/ads'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csTinymce': () => import('@/components/cs-tinymce')
  },
  props: {
    tableData: {
      default: () => []
    },
    positionTable: {
      default: () => []
    },
    platformTable: {
      default: () => []
    },
    loading: {
      default: false
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
  data() {
    return {
      adsType: undefined,
      imageFile: [],
      content: { image: [], code: '' },
      currentTableData: [],
      multipleSelection: [],
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      form: {},
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        enable: false,
        disable: false
      },
      textMap: {
        update: '编辑广告',
        create: '新增广告'
      },
      typeMap: {
        0: {
          text: '图片',
          type: 'file-image-o'
        },
        1: {
          text: '代码',
          type: 'file-code-o'
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
      targetMap: {
        _self: '当前窗口',
        _blank: '新窗口'
      },
      rules: {
        ads_position_id: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        code: [
          {
            max: 16,
            message: '长度不能大于 16 个字符',
            trigger: 'blur'
          }
        ],
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
        url: [
          {
            required: true,
            message: '链接地址不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        begin_time: [
          {
            required: true,
            message: '投放日期不能为空',
            trigger: 'change'
          }
        ],
        end_time: [
          {
            required: true,
            message: '结束日期不能为空',
            trigger: 'change'
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
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/ads/ads/add')
      this.auth.set = this.$has('/system/ads/ads/set')
      this.auth.del = this.$has('/system/ads/ads/del')
      this.auth.sort = this.$has('/system/ads/ads/sort')
      this.auth.enable = this.$has('/system/ads/ads/enable')
      this.auth.disable = this.$has('/system/ads/ads/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.ads_id)
        })
      } else {
        idList.push(this.currentTableData[val].ads_id)
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
      let ads_id = this._getIdList(val)
      if (ads_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(ads_id, status, vm) {
        setAdsStatus(ads_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (ads_id.indexOf(value.ads_id) !== -1) {
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
        setStatus(ads_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(ads_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let ads_id = this._getIdList(val)
      if (ads_id.length === 0) {
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
          delAdsList(ads_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (ads_id.indexOf(this.currentTableData[i].ads_id) !== -1) {
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
    // 打开链接地址
    handleView(index) {
      if (this.currentTableData[index].url) {
        this.$open(this.currentTableData[index].url)
        return
      }

      this.$message.warning('无效的链接地址')
    },
    // 设置排序值
    handleSort(index) {
      setAdsSort(
        this.currentTableData[index].ads_id,
        this.currentTableData[index].sort
      )
    },
    // 切换广告位置
    switchPosition(val) {
      // eslint-disable-next-line no-unused-vars
      for (const value of this.positionTable) {
        if (value.ads_position_id === val) {
          this.adsType = value.type
          if (this.adsType === 1) {
            this.imageFile = this.content.image
          }

          break
        }
      }
    },
    // 新建广告
    create() {
      this.form = {
        ads_position_id: undefined,
        code: '',
        name: '',
        url: '',
        target: '_blank',
        content: undefined,
        color: '#FFFFFF',
        begin_time: undefined,
        end_time: undefined,
        sort: 50,
        status: '1'
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.imageFile = []
      this.content = { image: [], code: '' }
      this.adsType = undefined

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 根据类型获取广告实际内容
    getFormContent() {
      return this.adsType === 0 ? this.content.image : this.content.code
    },
    // 请求创建广告
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.form.color = this.form.color || ''
          this.form.content = this.getFormContent()

          addAdsItem({ ...this.form })
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                get_ads_position: {
                  ...this.positionTable.find(item => item.ads_position_id === res.data.ads_position_id)
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
    // 编辑广告
    updata(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]
      this.adsType = data.type

      this.form = {
        ...data,
        status: data.status.toString()
      }

      // 处理el-select项不存在的bug
      if (!this.positionTable.find(item => item.ads_position_id === this.form.ads_position_id)) {
        this.form.ads_position_id = undefined
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      // 初始化组件数据
      this.content = { image: [], code: '' }
      if (this.adsType === 0) {
        this.imageFile = Array.isArray(this.form.content) ? this.form.content : []
        this.content = { image: [...this.imageFile], code: '' }
      } else {
        this.imageFile = []
        this.content.code = this.form.content.toString()
      }

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑广告
    handleUpdate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.form.color = this.form.color || ''
          this.form.content = this.getFormContent()

          setAdsItem({ ...this.form })
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data,
                  get_ads_position: {
                    ...this.positionTable.find(item => item.ads_position_id === this.form.ads_position_id)
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
    }
  }
}
</script>
