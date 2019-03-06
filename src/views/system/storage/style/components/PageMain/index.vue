<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="create">
            <cs-icon name="plus"/>
            新增样式
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

      <el-table-column
        type="selection"
        width="30">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="180"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        sortable="custom"
        min-width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="平台"
        prop="platform"
        sortable="custom">
        <template slot-scope="scope">
          {{platformTable[scope.row.platform]}}
        </template>
      </el-table-column>

      <el-table-column
        label="输出格式"
        prop="suffix">
        <template slot-scope="scope">
          {{scope.row.suffix || '原图格式'}}
        </template>
      </el-table-column>

      <el-table-column
        label="图片质量"
        prop="quality">
        <template slot-scope="scope">
          {{scope.row.quality || '系统默认'}}
        </template>
      </el-table-column>

      <el-table-column
        label="缩放方式"
        prop="resize"
        min-width="100">
        <template slot-scope="scope">
          {{resizeMap[scope.row.resize].text}}
        </template>
      </el-table-column>

      <el-table-column
        label="第三方样式"
        prop="style"
        min-width="120"
        :show-overflow-tooltip="true">
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
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="updata(scope.$index)"
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
      width="760px">

      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入样式名称"
                clearable/>
            </el-form-item>

            <el-form-item
              label="编码"
              prop="code">
              <el-input
                v-model="form.code"
                placeholder="请输入样式编码"
                clearable/>
            </el-form-item>

            <el-form-item
              label="平台"
              prop="platform">
              <el-select
                v-model="form.platform"
                placeholder="请选择"
                style="width: 100%;"
                value="">
                <el-option
                  v-for="(item, index) in platformTable"
                  :key="index"
                  :label="item"
                  :value="index"/>
              </el-select>
            </el-form-item>

            <el-form-item
              label="输出格式"
              prop="suffix">
              <el-select
                v-model="form.suffix"
                placeholder="请选择"
                style="width: 100%;"
                value="">
                <el-option label="原图格式" value=""/>
                <el-option label="jpg" value="jpg"/>
                <el-option label="png" value="png"/>
                <el-option label="svg" value="svg"/>
                <el-option label="gif" value="gif"/>
                <el-option label="bmp" value="bmp"/>
                <el-option label="tiff" value="tiff"/>
                <el-option label="webp" value="webp"/>
              </el-select>
            </el-form-item>

            <el-form-item
              label="图片质量"
              prop="quality">
              <el-slider
                v-model="form.quality">
              </el-slider>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <span>image</span>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="() => {}"
          size="small">确定</el-button>

        <el-button
          v-else
          type="primary"
          :loading="dialogLoading"
          @click="() => {}"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setStorageStyleStatus,
  delStorageStyleList
} from '@/api/upload/style'

export default {
  props: {
    tableData: {
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
      currentTableData: [],
      multipleSelection: [],
      helpContent: '暂无帮助内容',
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      form: {},
      rules: {},
      textMap: {
        update: '编辑样式',
        create: '新增样式'
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
      resizeMap: {
        scaling: {
          text: '指定宽高缩放',
          type: 'scaling'
        },
        proportion: {
          text: '按百分比缩小',
          type: 'proportion'
        },
        pad: {
          text: '固定宽高填充',
          type: 'pad'
        }
      }
    }
  },
  methods: {
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.storage_style_id)
        })
      } else {
        idList.push(this.currentTableData[val].storage_style_id)
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
      let styleId = this._getIdList(val)
      if (styleId.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(styleId, status, vm) {
        setStorageStyleStatus(styleId, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (styleId.indexOf(value.storage_style_id) !== -1) {
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
        setStatus(styleId, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setStatus(styleId, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let styleId = this._getIdList(val)
      if (styleId.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delStorageStyleList(styleId)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (styleId.indexOf(this.currentTableData[i].storage_style_id) !== -1) {
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
    // 新建样式
    create() {
      this.form = {
        name: '',
        code: '',
        platform: undefined,
        scale: undefined,
        resize: '',
        quality: 90,
        suffix: '',
        style: '',
        status: 1
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
