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
          新增品牌
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
      v-loading="loading"
      :data="currentTableData"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      stripe>
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="120">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.logo"
            width="150"
            placement="right"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.logo | getPreviewUrl"
                @click.native="$preview(scope.row.logo)"
                fit="fill"/>
            </div>
            <cs-icon slot="reference" name="image"/>
          </el-popover>
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="首拼"
        prop="phonetic"
        sortable="custom"
        min-width="90">
      </el-table-column>

      <el-table-column
        label="所属分类"
        prop="category_name"
        :show-overflow-tooltip="true"
        min-width="140">
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
        min-width="140">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.url && auth.url"
            @click="handleView(scope.$index)"
            size="small"
            type="text">
            <el-tooltip placement="top">
              <div slot="content">
                打开方式：{{targetMap[scope.row.target].text}}<br/>
                链接地址：{{scope.row.url}}
              </div>
              <cs-icon name="link"/>
            </el-tooltip>
            链接
          </el-button>

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
        label-width="80px"
        ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入品牌名称"
                :clearable="true"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="首拼"
              prop="phonetic">
              <el-input
                v-model="form.phonetic"
                placeholder="不填写系统将自动识别"
                :clearable="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="所属分类"
          prop="goods_category_id">
          <el-cascader
            v-model="form.goods_category_id"
            placeholder="可选择品牌所属的分类 试试搜索：手机"
            :options="catData"
            :props="catProps"
            style="width: 100%;"
            filterable
            clearable>
          </el-cascader>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="form.description"
            placeholder="可输入品牌描述"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="Logo"
          prop="logo">
          <el-input
            v-model="form.logo"
            placeholder="可输入品牌Logo"
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

        <el-form-item
          label="链接"
          prop="url">
          <el-input
            v-model="form.url"
            placeholder="可输入品牌链接地址"
            :clearable="true"/>
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
            :active-value="1"
            :inactive-value="0">
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
    </el-dialog>
  </div>
</template>

<script>
import {
  addBrandItem,
  delBrandList,
  setBrandItem,
  setBrandSort,
  setBrandStatus
} from '@/api/goods/brand'
import util from '@/utils/util'
import { getGoodsCategoryItem } from '@/api/goods/category'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    catData: {
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
        url: false,
        enable: false,
        disable: false
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
        update: '编辑品牌',
        create: '新增品牌'
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      form: {
        goods_category_id: undefined,
        name: undefined,
        phonetic: undefined,
        description: undefined,
        logo: undefined,
        url: undefined,
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
        phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
          }
        ],
        logo: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        url: [
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
      return val ? util.getImageCodeUrl(val, 'goods_brand') : ''
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
      this.auth.add = this.$has('/goods/setting/brand/add')
      this.auth.set = this.$has('/goods/setting/brand/set')
      this.auth.del = this.$has('/goods/setting/brand/del')
      this.auth.sort = this.$has('/goods/setting/brand/sort')
      this.auth.url = this.$has('/goods/setting/brand/url')
      this.auth.enable = this.$has('/goods/setting/brand/enable')
      this.auth.disable = this.$has('/goods/setting/brand/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.brand_id)
        })
      } else {
        idList.push(this.currentTableData[val].brand_id)
      }

      return idList
    },
    // 获取上级编号
    _getParentId() {
      const catId = this.form.goods_category_id

      if (!Array.isArray(catId)) {
        return catId
      }

      return catId.length > 0 ? catId[catId.length - 1] : 0
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

      this.form.logo = response.data[0].url
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
        goods_category_id: [],
        name: '',
        phonetic: '',
        description: '',
        logo: '',
        url: '',
        target: '_blank',
        sort: 50,
        status: 1
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
          const catId = this._getParentId()

          Promise.all([
            addBrandItem({ ...this.form, goods_category_id: catId }),
            getGoodsCategoryItem(catId)
          ])
            .then(res => {
              this.currentTableData.unshift({
                ...res[0].data,
                category_name: res[1].data.name
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
    // 弹出编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

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
          const catId = this._getParentId()

          Promise.all([
            setBrandItem({ ...this.form, goods_category_id: catId }),
            getGoodsCategoryItem(catId)
          ])
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res[0].data,
                  category_name: res[1].data.name
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
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let brand_id = this._getIdList(val)
      if (brand_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(brand_id, status, vm) {
        setBrandStatus(brand_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (brand_id.indexOf(value.brand_id) !== -1) {
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
        setStatus(brand_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(brand_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let brand_id = this._getIdList(val)
      if (brand_id.length === 0) {
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
          delBrandList(brand_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (brand_id.indexOf(this.currentTableData[i].brand_id) !== -1) {
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
      setBrandSort(
        this.currentTableData[index].brand_id,
        this.currentTableData[index].sort
      )
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
