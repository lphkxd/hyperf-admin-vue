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
        label-width="130px"
        style="margin-top: -25px;">

        <el-row :gutter="20">
          <el-col :span="14">
            <cs-line title="基础"></cs-line>

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

            <cs-line title="图片"></cs-line>

            <template v-if="!form.style">
              <el-form-item
                label="缩放方式"
                prop="resize">
                <el-select
                  v-model="form.resize"
                  placeholder="请选择"
                  style="width: 100%;"
                  value="">
                  <el-option label="不使用缩略" value=""/>
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
                      <el-col :span="4">
                        <span>
                          缩略
                          <el-tooltip :content="scaleHelp.help" placement="top">
                           <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
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
                                v-model="scale.pc.size.high"
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
                      <el-col :span="4">
                        <span>
                          裁剪
                          <el-tooltip :content="scaleHelp.help" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
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
                              v-model="scale.pc.crop.high"
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
                      <el-col :span="4">
                        <span>
                          顺序
                          <el-tooltip :content="scaleHelp.order" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
                        <el-radio-group v-model="scale.pc.order">
                          <el-radio :label="true">先缩后裁</el-radio>
                          <el-radio :label="false">先裁后缩</el-radio>
                        </el-radio-group>
                      </el-col>
                    </el-row>
                  </el-tab-pane>

                  <el-tab-pane label="Mobile" name="Mobile">
                    <el-row :gutter="5">
                      <el-col :span="4">
                        <span>
                          缩略
                          <el-tooltip :content="scaleHelp.help" placement="top">
                           <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
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
                                v-model="scale.mobile.size.high"
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
                      <el-col :span="4">
                        <span>
                          裁剪
                          <el-tooltip :content="scaleHelp.help" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
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
                              v-model="scale.mobile.crop.high"
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
                      <el-col :span="4">
                        <span>
                          顺序
                          <el-tooltip :content="scaleHelp.order" placement="top">
                            <cs-icon name="question"/>
                          </el-tooltip>
                        </span>
                      </el-col>

                      <el-col :span="20">
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
              <el-form-item>
                <el-alert
                  title="启用第三方样式后本地样式将失效"
                  type="warning"
                  :closable="false"
                  center>
                </el-alert>
              </el-form-item>
            </template>

            <cs-line title="高级"></cs-line>

            <el-form-item
              label="第三方样式"
              prop="style">
              <el-input
                v-model="form.style"
                placeholder="可输入第三方样式"
                type="textarea"
                :rows="2"/>
            </el-form-item>

            <cs-line title="设置"></cs-line>

            <el-form-item
              label="状态"
              prop="status">
              <el-switch
                v-model="form.status"
                active-value="1"
                inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-card :body-style="{padding: '0px'}" shadow="never">
              <el-alert
                title="原始图片"
                :closable="false"
                style="border-radius: 0"
                center>
              </el-alert>

              <a
                v-if="imageUrl"
                :href="`//${imageUrl}`"
                target="_blank">
                <img :src="`//${imageUrl}`" class="image" title="点击查看原图" alt="">
              </a>

              <div style="display: none">
                <cs-upload
                  ref="upload"
                  type="slot"
                  accept="image/*"
                  :limit="1"
                  :multiple="false"
                  :module-name="uploadModule"
                  @confirm="getUploadFileList"/>
              </div>

              <div style="padding: 10px;">
                <div class="bottom clearfix">
                  <span class="image-info">{{imageInfo}}</span>
                </div>
                <el-button type="text" class="button" @click="$refs.upload.handleUploadDlg()">上传原图</el-button>
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
                :title="`效果预览 ${form.style || !form.resize ? '' : scaleTab}`"
                :closable="false"
                style="border-radius: 0"
                center>
              </el-alert>

              <a
                v-if="imageUrl"
                :href="imageResult['url_prefix']"
                target="_blank">
                <img :src="imageResult['url_prefix']" class="image" title="点击查看原图" id="image" alt="">
              </a>

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
          @click="handleCreate"
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
import { getUploadModule } from '@/api/upload/upload'
import { getStorageThumbUrl, getStorageThumbInfo } from '@/api/upload/storage'
import util from '@/utils/util'

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
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      helpContent: '暂无帮助内容',
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
          size: { width: 0, high: 0 },
          crop: { width: 0, high: 0 },
          order: true
        },
        mobile: {
          slider: 0,
          size: { width: 0, high: 0 },
          crop: { width: 0, high: 0 },
          order: true
        }
      },
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
        platform: 'all',
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
          size: { width: 0, high: 0 },
          crop: { width: 0, high: 0 },
          order: true
        },
        mobile: {
          slider: 0,
          size: { width: 0, high: 0 },
          crop: { width: 0, high: 0 },
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
    // 请求创建样式
    handleCreate() {
    },
    getUploadFileList(files) {
      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      const data = response.data[0]
      this.imageUrl = data.url
      this.imageInfo = `大小: ${util.bytesFormatter(data.size)} `
      this.imageInfo += `宽: ${data['pixel']['width']} PX `
      this.imageInfo += `高: ${data['pixel']['height']} PX`
    },
    getThumbUrl() {
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
            data.size = [scale.slider]
          } else {
            data[value] = [scale[value]['width'], scale[value]['high']]
          }
        })
      }

      this.imageLoading = true
      getStorageThumbUrl(data)
        .then(res => {
          this.imageResult = res.data
        })
        .then(() => {
          getStorageThumbInfo(this.imageResult.url, this.imageResult.source)
            .then(res => {
              this.imageResultInfo = `大小: ${util.bytesFormatter(res.data.size)} `
              this.imageResultInfo += `宽: ${res.data.width} PX `
              this.imageResultInfo += `高: ${res.data.height} PX`
            })
        })
        .finally(() => {
          this.imageLoading = false
        })
    }
  }
}
</script>

<style scoped>
  .proportion {
    padding: 0 12px;
  }
  .size-input {
    width: 82%;
  }
  .image {
    max-width: 100%;
    margin: 0 auto;
    display: block;
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
