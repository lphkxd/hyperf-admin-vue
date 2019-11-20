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
          新增样式
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

      <el-table-column
        type="selection"
        width="30">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
        min-width="140"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="编码"
        prop="code"
        sortable="custom"
        min-width="160"
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
        min-width="120">
        <template slot-scope="scope">
          {{resizeMap[scope.row.resize].text}}
        </template>
      </el-table-column>

      <el-table-column
        label="第三方样式"
        prop="style"
        min-width="90"
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
        label-width="85px"
        style="margin-top: -35px;">

        <el-row :gutter="20">
          <el-col :span="13">
            <el-divider>基础</el-divider>

            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入样式名称"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="编码"
              prop="code">
              <el-input
                v-model="form.code"
                placeholder="请输入样式编码"
                :clearable="true"/>
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
              label="状态"
              prop="status">
              <el-switch
                v-model="form.status"
                active-value="1"
                inactive-value="0">
              </el-switch>
            </el-form-item>

            <el-divider>图片</el-divider>

            <template v-if="!form.style">
              <el-form-item
                label="缩放方式"
                prop="resize">
                <el-select
                  v-model="form.resize"
                  placeholder="请选择"
                  style="width: 100%;"
                  value="">
                  <el-option
                    v-for="(item, index) in resizeMap"
                    :key="index"
                    :label="item.text"
                    :value="item.type"/>
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="form.resize !== ''"
                label="缩放规格"
                prop="scale">
                <el-tabs v-model="scaleTab">
                  <el-tab-pane label="Pc" name="Pc">
                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          缩略
                          <el-tooltip :content="scaleHelp.help" placement="top">
                           <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <div v-if="form.resize === 'proportion'">
                          <el-slider
                            v-model="slider.pc"
                            @change="(val) => {scale.pc.slider = val}"
                            class="proportion">
                          </el-slider>
                        </div>

                        <div v-else>
                          <el-row :gutter="5">
                            <el-col :span="12">
                              <span>宽 </span>
                              <el-input-number
                                v-model="scale.pc.size.width"
                                controls-position="right"
                                :min="0"
                                size="mini"
                                class="size-input">
                              </el-input-number>
                            </el-col>

                            <el-col :span="12">
                              <span>高 </span>
                              <el-input-number
                                v-model="scale.pc.size.height"
                                controls-position="right"
                                :min="0"
                                size="mini"
                                class="size-input">
                              </el-input-number>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          裁剪
                          <el-tooltip :content="scaleHelp.help" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <span>宽 </span>
                            <el-input-number
                              v-model="scale.pc.crop.width"
                              controls-position="right"
                              :min="0"
                              size="mini"
                              class="size-input">
                            </el-input-number>
                          </el-col>

                          <el-col :span="12">
                            <span>高 </span>
                            <el-input-number
                              v-model="scale.pc.crop.height"
                              controls-position="right"
                              :min="0"
                              size="mini"
                              class="size-input">
                            </el-input-number>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>

                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          顺序
                          <el-tooltip :content="scaleHelp.order" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <el-radio-group v-model="scale.pc.order">
                          <el-radio :label="true">先缩后裁</el-radio>
                          <el-radio :label="false">先裁后缩</el-radio>
                        </el-radio-group>
                      </el-col>
                    </el-row>
                  </el-tab-pane>

                  <el-tab-pane label="Mobile" name="Mobile">
                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          缩略
                          <el-tooltip :content="scaleHelp.help" placement="top">
                           <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <div v-if="form.resize === 'proportion'">
                          <el-slider
                            v-model="slider.mobile"
                            @change="(val) => {scale.mobile.slider = val}"
                            class="proportion">
                          </el-slider>
                        </div>

                        <div v-else>
                          <el-row :gutter="5">
                            <el-col :span="12">
                              <span>宽 </span>
                              <el-input-number
                                v-model="scale.mobile.size.width"
                                controls-position="right"
                                :min="0"
                                size="mini"
                                class="size-input">
                              </el-input-number>
                            </el-col>

                            <el-col :span="12">
                              <span>高 </span>
                              <el-input-number
                                v-model="scale.mobile.size.height"
                                controls-position="right"
                                :min="0"
                                size="mini"
                                class="size-input">
                              </el-input-number>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          裁剪
                          <el-tooltip :content="scaleHelp.help" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <span>宽 </span>
                            <el-input-number
                              v-model="scale.mobile.crop.width"
                              controls-position="right"
                              :min="0"
                              size="mini"
                              class="size-input">
                            </el-input-number>
                          </el-col>

                          <el-col :span="12">
                            <span>高 </span>
                            <el-input-number
                              v-model="scale.mobile.crop.height"
                              controls-position="right"
                              :min="0"
                              size="mini"
                              class="size-input">
                            </el-input-number>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>

                    <el-row :gutter="5">
                      <el-col :span="5">
                        <span>
                          顺序
                          <el-tooltip :content="scaleHelp.order" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="19">
                        <el-radio-group v-model="scale.mobile.order">
                          <el-radio :label="true">先缩后裁</el-radio>
                          <el-radio :label="false">先裁后缩</el-radio>
                        </el-radio-group>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
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
                  <el-option
                    v-for="(item, index) in suffixMap"
                    :key="index"
                    :label="item"
                    :value="item"/>
                </el-select>
              </el-form-item>

              <el-form-item
                label="图片质量"
                prop="quality">
                <el-slider
                  v-model="quality"
                  @change="(val) => {form.quality = val}">
                </el-slider>
              </el-form-item>
            </template>

            <template v-else>
              <el-alert
                title="启用第三方样式后本地样式将失效"
                type="warning"
                :closable="false"
                center>
              </el-alert>
            </template>

            <el-divider>高级</el-divider>

            <el-form-item
              label="第三方样式"
              prop="style">
              <el-input
                v-model="form.style"
                placeholder="可输入第三方样式"
                type="textarea"
                :rows="3"/>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-divider>效果预览</el-divider>
            <el-card :body-style="{padding: '0px'}" shadow="never">
              <el-alert
                title="原始图片"
                :closable="false"
                style="border-radius: 0"
                center>
              </el-alert>

              <div class="image">
                <el-image
                  v-if="imageUrl"
                  :src="imageUrl | getPreviewUrl"
                  @click.native="$open(imageUrl)"
                  fit="fill"/>
              </div>

              <div style="padding: 10px;">
                <div class="bottom clearfix">
                  <span class="image-info">{{imageInfo}}</span>
                </div>

                <cs-upload
                  type="slot"
                  accept="image/*"
                  :limit="1"
                  :multiple="false"
                  :module-name="uploadModule"
                  @confirm="_getUploadFileList">
                  <el-button type="text" class="button" slot="control">上传原图</el-button>
                </cs-upload>

                <el-popover
                  placement="top"
                  trigger="click">
                  <el-select
                    v-model="uploadModule"
                    placeholder="请选择"
                    value="">
                    <el-option
                      v-for="(item, index) in uploadTable"
                      :key="index"
                      :label="item.name"
                      :value="item.module"/>
                  </el-select>
                  <el-button type="text" class="button" slot="reference">更换模块</el-button>
                </el-popover>
              </div>
            </el-card>

            <el-card
              v-loading="imageLoading"
              :body-style="{padding: '0px'}"
              shadow="never"
              style="margin-top: 20px;">
              <el-alert
                :title="`实际结果 ${form.style || !form.resize ? '' : scaleTab}`"
                :closable="false"
                style="border-radius: 0"
                center>
              </el-alert>

              <div class="image">
                <el-image
                  v-if="imageResult['url_prefix']"
                  :src="imageResult['url_prefix']"
                  @click.native="$open(imageResult['url_prefix'])"
                  fit="fill"/>
              </div>

              <div style="padding: 10px;">
                <div class="bottom clearfix">
                  <span class="image-info">{{imageResultInfo}}</span>
                </div>
                <el-button type="text" class="button" @click="getThumbUrl">刷新效果</el-button>
              </div>
            </el-card>

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
          @click="handleEdit(true)"
          size="small">确定</el-button>

        <el-button
          v-else
          type="primary"
          :loading="dialogLoading"
          @click="handleEdit(false)"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  setStorageStyleStatus,
  delStorageStyleList,
  addStorageStyleItem,
  setStorageStyleItem
} from '@/api/upload/style'
import { getUploadModule } from '@/api/upload/upload'
import { getStorageThumbUrl, getStorageThumbInfo } from '@/api/upload/storage'
import util from '@/utils/util'
import { debounce } from 'lodash'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
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
  computed: {
    // 图片处理参数变化监控
    changeData() {
      const { scaleTab, imageUrl, scale } = this
      const { resize, suffix, quality, style } = this.form

      return {
        resize,
        suffix,
        quality,
        style,
        scaleTab,
        imageUrl,
        scale
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    },
    changeData: {
      handler() {
        this.$nextTick(() => {
          this.getThumbUrl()
        })
      },
      deep: true
    }
  },
  filters: {
    getPreviewUrl(val) {
      const style = '&size[]=350'
      return util.getImageStyleUrl(val, style)
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      scaleTab: 'Pc',
      imageUrl: '',
      imageResult: {},
      imageInfo: '',
      imageResultInfo: '',
      imageLoading: false,
      uploadModule: '',
      uploadTable: [],
      quality: 90,
      slider: {
        pc: 0,
        mobile: 0
      },
      scale: {
        pc: {
          slider: 0,
          size: { width: 0, height: 0 },
          crop: { width: 0, height: 0 },
          order: true
        },
        mobile: {
          slider: 0,
          size: { width: 0, height: 0 },
          crop: { width: 0, height: 0 },
          order: true
        }
      },
      form: {},
      auth: {
        add: false,
        set: false,
        del: false,
        enable: false,
        disable: false
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 64,
            message: '长度不能大于 64 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '编码不能为空',
            trigger: 'blur'
          },
          {
            max: 32,
            message: '长度不能大于 32 个字符',
            trigger: 'blur'
          }
        ],
        platform: [
          {
            required: true,
            message: '至少选择一项',
            trigger: 'change'
          }
        ],
        style: [
          {
            max: 64,
            message: '长度不能大于 64 个字符',
            trigger: 'blur'
          }
        ]
      },
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
        '': {
          text: '不使用缩放',
          type: ''
        },
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
      },
      suffixMap: [
        'jpg',
        'png',
        'svg',
        'gif',
        'bmp',
        'tiff',
        'webp'
      ],
      scaleHelp: {
        help: '宽或高的某一项值为 0 时，该项会进行自适应',
        order: '缩略与裁剪的先后顺序会影响最终的成图'
      }
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/system/storage/style/add')
      this.auth.set = this.$has('/system/storage/style/set')
      this.auth.del = this.$has('/system/storage/style/del')
      this.auth.enable = this.$has('/system/storage/style/enable')
      this.auth.disable = this.$has('/system/storage/style/disable')
    },
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
    // 资源上传成功后处理
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      const data = response.data[0]
      this.imageInfo = `大小: ${util.bytesFormatter(data.size)} `
      this.imageInfo += `宽: ${data['pixel']['width']} PX `
      this.imageInfo += `高: ${data['pixel']['height']} PX`
      this.imageUrl = data.url
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

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(styleId, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
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
        type: 'warning',
        closeOnClickModal: false
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
                this.$emit('refresh', true)
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
        platform: 0,
        scale: {},
        resize: '',
        quality: 90,
        suffix: '',
        style: '',
        status: '1'
      }

      // 部分数据进行初始
      this.scale = {
        pc: {
          slider: 0,
          size: { width: 0, height: 0 },
          crop: { width: 0, height: 0 },
          order: true
        },
        mobile: {
          slider: 0,
          size: { width: 0, height: 0 },
          crop: { width: 0, height: 0 },
          order: true
        }
      }

      this.quality = 90
      this.slider = { pc: 0, mobile: 0 }

      this.scaleTab = 'Pc'
      this.imageUrl = ''
      this.imageResult = {}
      this.imageInfo = ''
      this.imageResultInfo = ''
      this.imageLoading = false
      this.uploadModule = ''

      if (!this.uploadTable.length) {
        getUploadModule()
          .then(res => {
            this.uploadTable = res.data
            this.uploadTable.unshift({ name: '使用系统默认', module: '' })
          })
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 创建或修改样式
    handleEdit(isCreate) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let scale = {
            pc: {},
            mobile: {}
          }

          // eslint-disable-next-line no-unused-vars
          for (const key in this.scale) {
            if (!this.scale.hasOwnProperty(key)) {
              continue
            }

            const temp = this.scale[key]
            const order = temp.order ? ['size', 'crop'] : ['crop', 'size']

            order.forEach(value => {
              if (this.form.resize === 'proportion' && value === 'size') {
                scale[key]['size'] = [temp['slider']]
              } else {
                scale[key][value] = [temp[value]['width'], temp[value]['height']]
              }
            })

            scale[key]['slider'] = temp['slider']
            scale[key]['order'] = temp['order']
          }

          this.dialogLoading = true
          if (isCreate) {
            addStorageStyleItem({
              ...this.form,
              scale
            })
              .then(res => {
                this.currentTableData.unshift(res.data)
                this.dialogFormVisible = false
                this.$message.success('操作成功')
              })
              .catch(() => {
                this.dialogLoading = false
              })
          } else {
            setStorageStyleItem({
              ...this.form,
              scale
            })
              .then(res => {
                this.$set(this.currentTableData, this.currentIndex, res.data)
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
    getThumbUrl: debounce(function() {
      if (!this.imageUrl) {
        return
      }

      let data = {
        url: this.imageUrl,
        quality: this.form.quality,
        suffix: this.form.suffix,
        style: this.form.style
      }

      if (this.form.resize && !this.form.style) {
        // 给予缩放方式
        data.resize = this.form.resize

        // 根据当前选项卡获得缩放数据
        const scale = this.scale[this.scaleTab.toLowerCase()]
        const order = scale.order ? ['size', 'crop'] : ['crop', 'size']

        order.forEach(value => {
          if (this.form.resize === 'proportion' && value === 'size') {
            data['size'] = [scale['slider']]
          } else {
            data[value] = [scale[value]['width'], scale[value]['height']]
          }
        })
      }

      this.imageLoading = true
      this.imageResult['url_prefix'] = ''

      getStorageThumbUrl({ ...data })
        .then(res => {
          this.imageResult = res.data
        })
        .then(() => {
          getStorageThumbInfo(this.imageResult['url_prefix'], this.imageResult['source'])
            .then(res => {
              this.imageResultInfo = `大小: ${util.bytesFormatter(res.data.size)} `
              this.imageResultInfo += `宽: ${res.data.width} PX `
              this.imageResultInfo += `高: ${res.data.height} PX`
            })
        })
        .finally(() => {
          this.imageLoading = false
        })
    }, 300),
    // 编辑样式
    updata(index) {
      this.currentIndex = index
      const data = this.currentTableData[index]

      let scale = {}
      // eslint-disable-next-line no-unused-vars
      for (const key in data.scale) {
        if (!data.scale.hasOwnProperty(key)) {
          continue
        }

        scale[key] = {}
        // eslint-disable-next-line no-unused-vars
        for (const item in data.scale[key]) {
          if (!data.scale[key].hasOwnProperty(item)) {
            continue
          }

          const temp = data.scale[key][item]
          if (item === 'size' || item === 'crop') {
            scale[key][item] = { width: temp[0], height: temp[1] }

            if (data.resize === 'proportion' && item === 'size') {
              this.slider[key] = temp[0]
              scale[key][item] = { width: 0, height: 0 }
            }
          } else {
            scale[key][item] = temp
          }
        }
      }

      // 表单数据
      this.form = {
        ...data,
        status: data.status.toString(),
        scale: {}
      }

      // 规格数据
      this.scale = {
        ...scale
      }

      // 其他数据
      this.scaleTab = 'Pc'
      this.imageUrl = ''
      this.imageResult = {}
      this.imageInfo = ''
      this.imageResultInfo = ''
      this.imageLoading = false
      this.uploadModule = ''
      this.quality = data.quality

      if (!this.uploadTable.length) {
        getUploadModule()
          .then(res => {
            this.uploadTable = res.data
            this.uploadTable.unshift({ name: '使用系统默认', module: '' })
          })
      }

      // 处理el-select项不存在的bug
      if (!this.platformTable.hasOwnProperty(this.form.platform)) {
        this.form.platform = undefined
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>
  .proportion {
    padding: 0 8px;
  }
  .size-input {
    width: 82%;
  }
  .image {
    text-align: center;
  }
  .image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .image-info {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 5px;
    line-height: 15px;
  }
  .button {
    margin-right: 10px;
    float: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
