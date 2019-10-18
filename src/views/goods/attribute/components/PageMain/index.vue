<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="handleCreate(null)">
          <cs-icon name="plus"/>
          新增主属性
        </el-button>
      </el-form-item>

      <el-form-item v-if="auth.search">
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleIndex(0)">
            <cs-icon name="ban"/>
            不检索
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleIndex(1)">
            <cs-icon name="bookmark-o"/>
            关键字
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleIndex(2)">
            <cs-icon name="circle-o-notch"/>
            范围
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
      row-key="goods_attribute_id"
      :tree-props="{children: 'get_attribute'}"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      ref="multipleTable">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="编号"
        prop="goods_attribute_id"
        sortable="custom"
        width="120">
      </el-table-column>

      <el-table-column
        width="55">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.icon"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.icon | getPreviewUrl"
                @click.native="$preview(scope.row.icon)"
                fit="fill"/>
            </div>
            <cs-icon class="cs-mr-5" slot="reference" name="image"/>
          </el-popover>

          <cs-icon
            v-if="scope.row.is_important"
            class="attribute-important"
            name="star"/>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        prop="attr_name"
        sortable="custom"
        min-width="140">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.description"
            :content="`描述：${scope.row.description}`"
            placement="top">
            <span>
              {{scope.row.attr_name}}
            </span>
          </el-tooltip>

          <span v-else>
            {{scope.row.attr_name}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="所属模型"
        prop="goods_type_id"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.parent_id">{{typeData[scope.row.goods_type_id]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="检索方式"
        width="90">
        <template slot-scope="scope">
          {{indexMap[scope.row.attr_index]}}
        </template>
      </el-table-column>

      <el-table-column
        label="录入方式"
        width="90">
        <template slot-scope="scope">
          {{inputMap[scope.row.attr_input_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="可选值"
        :show-overflow-tooltip="true"
        min-width="160">
        <template slot-scope="scope">
          {{scope.row.attr_values | getAttrValue}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        sortable="custom"
        align="center"
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
            @change="handleSort(scope.row)">
          </el-input-number>
          <span v-else>
            {{scope.row.sort}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="160">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.parent_id && auth.add_son"
            @click="handleCreate(scope.row)"
            size="small"
            type="text">新增子属性</el-button>

          <el-button
            v-if="scope.row.parent_id && auth.important"
            @click="handleImportant(scope.row)"
            size="small"
            type="text">{{importantMap[scope.row.is_important]}}</el-button>

          <el-button
            v-if="auth.set"
            @click="handleUpdate(scope.row)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.row.goods_attribute_id)"
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
        <el-form-item
          label="名称"
          prop="attr_name">
          <el-input
            v-model="form.attr_name"
            placeholder="请输入商品属性名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="form.description"
            placeholder="可输入商品属性描述"
            type="textarea"
            :rows="3"/>
        </el-form-item>

        <el-form-item
          v-if="!form.parent_id"
          label="所属模型"
          prop="goods_type_id">
          <el-select
            v-model="form.goods_type_id"
            placeholder="请选择所属商品模型"
            style="width: 100%;"
            clearable
            value="">
            <el-option
              v-for="(item, index) in typeData"
              :key="index"
              :label="item"
              :value="index"/>
          </el-select>
        </el-form-item>

        <el-form-item
          label="图标"
          prop="icon">
          <el-input
            v-model="form.icon"
            placeholder="可输入商品属性图标(图片)"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="form.icon"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="form.icon | getPreviewUrl"
                    @click.native="$preview(form.icon)"
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

        <div v-if="form.parent_id">
          <el-form-item
            label="检索方式"
            prop="attr_index">
            <el-radio-group v-model="form.attr_index">
              <el-radio
                v-for="(item, index) in indexMap"
                :key="index"
                :label="index">{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="录入方式"
            prop="attr_input_type">
            <el-radio-group v-model="form.attr_input_type">
              <el-radio
                v-for="(item, index) in inputMap"
                :key="index"
                :label="index">{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="可选值"
            prop="attr_values">
            <el-input
              v-model="form.attr_values"
              placeholder="请输入商品属性可选值，一行一个，手工填写可不填"
              type="textarea"
              :rows="5"/>
          </el-form-item>
        </div>

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
          v-if="form.parent_id"
          label="是否核心"
          prop="is_important">
          <el-switch
            v-model="form.is_important"
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
          v-if="dialogStatus === 'create' || dialogStatus === 'sonCreate'"
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
import util from '@/utils/util'
import {
  addGoodsAttributeBodyItem,
  addGoodsAttributeItem,
  delGoodsAttributeList,
  setGoodsAttributeBodyItem,
  setGoodsAttributeImportant,
  setGoodsAttributeItem,
  setGoodsAttributeKey,
  setGoodsAttributeSort
} from '@/api/goods/attribute'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  props: {
    loading: {
      default: false
    },
    typeData: {
      default: () => {}
    },
    tableData: {
      default: () => []
    },
    selectId: {
      default: null
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {
        add: false,
        add_son: false,
        set: false,
        del: false,
        important: false,
        not_important: false,
        sort: false,
        search: false
      },
      indexMap: {
        0: '不检索',
        1: '关键字',
        2: '范围'
      },
      inputMap: {
        0: '手工填写',
        1: '单选',
        2: '多选'
      },
      importantMap: {
        0: '设为核心',
        1: '取消核心'
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑主属性',
        create: '新增主属性',
        sonUpdate: '编辑子属性',
        sonCreate: '新增子属性'
      },
      form: {
        attr_name: undefined,
        description: undefined,
        icon: undefined,
        goods_type_id: undefined,
        sort: undefined,
        parent_id: undefined,
        attr_index: undefined,
        attr_input_type: undefined,
        attr_values: undefined,
        is_important: undefined
      },
      rules: {
        attr_name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 60,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        goods_type_id: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        attr_input_type: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
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
    getAttrValue(value) {
      if (value) {
        return value.join(',')
      }
    },
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'goods_attribute') : ''
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/goods/setting/attribute/add')
      this.auth.add_son = this.$has('/goods/setting/attribute/add_son')
      this.auth.set = this.$has('/goods/setting/attribute/set')
      this.auth.del = this.$has('/goods/setting/attribute/del')
      this.auth.important = this.$has('/goods/setting/attribute/important')
      this.auth.sort = this.$has('/goods/setting/attribute/sort')
      this.auth.search = this.$has('/goods/setting/attribute/search')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.goods_attribute_id)
        })
      } else {
        idList.push(this.currentTableData[val].goods_attribute_id)
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

      this.form.icon = response.data[0].url
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
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量设置检索
    handleIndex(val) {
      let attr_id = this._getIdList(null)
      if (attr_id.length === 0) {
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
          setGoodsAttributeKey(attr_id, val)
            .then(() => {
              this.multipleSelection.forEach(value => {
                if (value.parent_id) {
                  value.attr_index = val
                }
              })

              this.$refs.multipleTable.clearSelection()
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      // 值不存在表示多选,否则表示单选操作
      let attr_id = val ? [val] : this._getIdList(val)
      if (attr_id.length === 0) {
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
          delGoodsAttributeList(attr_id)
            .then(() => {
              const data = this.currentTableData
              for (let i = data.length - 1; i >= 0; i--) {
                if (attr_id.indexOf(data[i].goods_attribute_id) !== -1) {
                  data.splice(i, 1)
                  continue
                }

                const sonData = data[i]['get_attribute']
                if (sonData.length > 0) {
                  for (let n = sonData.length - 1; n >= 0; n--) {
                    if (attr_id.indexOf(sonData[n].goods_attribute_id) !== -1) {
                      sonData.splice(n, 1)
                    }
                  }
                }
              }

              if (data.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$refs.multipleTable.clearSelection()
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 设置是否为核心
    handleImportant(val) {
      const isImportant = val.is_important ? 0 : 1
      setGoodsAttributeImportant([val.goods_attribute_id], isImportant)
        .then(() => {
          val.is_important = isImportant
          this.$message.success('操作成功')
        })
    },
    // 设置排序值
    handleSort(val) {
      setGoodsAttributeSort(val.goods_attribute_id, val.sort)
    },
    // 弹出创建对话框
    handleCreate(item) {
      this.form = {
        attr_name: '',
        description: '',
        icon: '',
        goods_type_id: item ? item.goods_type_id : this.selectId,
        sort: 50,
        parent_id: item ? item.goods_attribute_id : 0,
        attr_index: '1',
        attr_input_type: '1',
        attr_values: '',
        is_important: 1
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = !item ? 'create' : 'sonCreate'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          const data = this.currentTableData

          if (this.dialogStatus === 'create') {
            addGoodsAttributeBodyItem({ ...this.form })
              .then(res => {
                data.unshift({ ...res.data, get_attribute: [] })
                this.dialogFormVisible = false
                this.$message.success('操作成功')
              })
              .catch(() => {
                this.dialogLoading = false
              })
          } else {
            addGoodsAttributeItem({
              ...this.form,
              attr_values: this.form.attr_values.trim().split('\n')
            })
              .then(res => {
                const sonData = data.find(item => item.goods_attribute_id === res.data.parent_id)
                sonData.get_attribute.push({ ...res.data })

                this.dialogFormVisible = false
                this.$message.success('操作成功')
              })
              .catch(() => {
                this.dialogLoading = false
              })
          }
        }
      })
    },
    // 弹出编辑对话框
    handleUpdate(val) {
      if (!val.parent_id) {
        this.form = {
          ...val,
          goods_type_id: val.goods_type_id.toString()
        }
      } else {
        this.form = {
          ...val,
          attr_index: val.attr_index.toString(),
          attr_input_type: val.attr_input_type.toString(),
          attr_values: val.attr_values.join('\n')
        }
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.currentData = val
      this.dialogStatus = !val.parent_id ? 'update' : 'sonUpdate'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          if (this.dialogStatus === 'update') {
            setGoodsAttributeBodyItem({ ...this.form })
              .then(res => {
                const pos = this.currentTableData.findIndex(item => {
                  return item.goods_attribute_id === this.currentData.goods_attribute_id
                })

                if (this.selectId && res.data.goods_type_id !== this.selectId) {
                  this.currentTableData.splice(pos, 1)
                  if (this.currentTableData.length <= 0) {
                    this.$emit('refresh', true)
                  }
                } else {
                  this.$set(this.currentTableData, pos, {
                    ...this.currentData,
                    ...res.data
                  })
                }

                this.dialogFormVisible = false
                this.$refs.multipleTable.clearSelection()
                this.$message.success('操作成功')
              })
              .catch(() => {
                this.dialogLoading = false
              })
          } else {
            setGoodsAttributeItem({
              ...this.form,
              attr_values: this.form.attr_values.trim().split('\n')
            })
              .then(res => {
                const pos = this.currentTableData.findIndex(item => {
                  return item.goods_attribute_id === this.currentData.parent_id
                })

                const sonData = this.currentTableData[pos].get_attribute
                const sonIndex = sonData.findIndex(item => {
                  return item.goods_attribute_id === this.currentData.goods_attribute_id
                })

                this.$set(sonData, sonIndex, {
                  ...this.currentData,
                  ...res.data
                })

                this.dialogFormVisible = false
                this.$refs.multipleTable.clearSelection()
                this.$message.success('操作成功')
              })
              .catch(() => {
                this.dialogLoading = false
              })
          }
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
  .attribute-important {
    color: #E6A23C;
  }
</style>
