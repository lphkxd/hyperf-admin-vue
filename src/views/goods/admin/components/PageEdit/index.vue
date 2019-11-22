<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>{{stateMap[state]}}</span>
      </div>

      <el-form
        ref="form"
        :model="currentForm"
        label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础设置" name="basic">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="currentForm.name"
                placeholder="请输入商品名称"
                maxlength="200"
                show-word-limit
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="短名称"
              prop="short_name">
              <el-input
                v-model="currentForm.short_name"
                placeholder="可输入商品短名称，适用于移动端显示"
                maxlength="50"
                show-word-limit
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="促销语"
              prop="product_name">
              <el-input
                v-model="currentForm.product_name"
                placeholder="可输入商品促销语"
                maxlength="100"
                show-word-limit
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="分类"
              prop="goods_category_id">
              <el-cascader
                v-model="currentForm.goods_category_id"
                placeholder="请选择商品分类，试试搜索：分类"
                :options="catData"
                :props="cascaderProps"
                style="width: 100%;"
                filterable
                clearable>
              </el-cascader>
            </el-form-item>

            <el-form-item
              label="品牌"
              prop="brand_id">
              <el-select
                v-model="currentForm.brand_id"
                placeholder="可选择商品品牌，试试搜索：品牌"
                style="width: 320px;"
                filterable
                clearable
                value="">
                <el-option
                  v-for="item in brandData"
                  :key="item.brand_id"
                  :label="item.name"
                  :value="item.brand_id">
                  <span class="brand-name">{{item.name}}</span>
                  <span class="brand-category">{{item.category_name}}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="货号"
              prop="goods_code">
              <el-input
                v-model="currentForm.goods_code"
                placeholder="可输入商品货号，为空系统将自动生成"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="SPU"
              prop="goods_spu">
              <el-input
                v-model="currentForm.goods_spu"
                placeholder="可输入商品SPU"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="SKU"
              prop="goods_sku">
              <el-input
                v-model="currentForm.goods_sku"
                placeholder="可输入商品SKU"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="条码"
              prop="bar_code">
              <el-input
                v-model="currentForm.bar_code"
                placeholder="可输入商品条码"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="计量单位"
              prop="unit">
              <el-input
                v-model="currentForm.unit"
                placeholder="可输入商品计量单位，例如：件、个"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="计量方式"
              prop="measure_type">
              <el-radio-group v-model="currentForm.measure_type">
                <el-radio :label="0">重量</el-radio>
                <el-radio :label="1">计件</el-radio>
                <el-radio :label="2">体积</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="商品计量"
              prop="measure">
              <el-input-number
                v-model="currentForm.measure"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>

            <el-form-item
              label="实际库存"
              prop="store_qty">
              <el-input-number
                v-model="currentForm.store_qty"
                controls-position="right"
                :min="0"/>

              <div class="help-block">
                <span>多规格商品将自动求和所有规格的库存做为实际库存</span>
              </div>
            </el-form-item>

            <el-form-item
              label="排序值"
              prop="sort">
              <el-input-number
                v-model="currentForm.sort"
                controls-position="right"
                :min="0"
                :max="255"/>

              <div class="help-block">
                <span>排序值将影响商品排列的顺序，数值越小越靠前</span>
              </div>
            </el-form-item>

            <el-form-item
              label="上架状态"
              prop="status">
              <el-radio-group v-model="currentForm.status">
                <el-radio :label="1">出售中</el-radio>
                <el-radio :label="0">已下架</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否推荐"
              prop="is_recommend">
              <el-radio-group v-model="currentForm.is_recommend">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否新品"
              prop="is_new">
              <el-radio-group v-model="currentForm.is_new">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否热卖"
              prop="is_hot">
              <el-radio-group v-model="currentForm.is_hot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-divider content-position="left">购买信息</el-divider>

            <el-form-item
              label="市场价"
              prop="market_price">
              <el-input-number
                v-model="currentForm.market_price"
                controls-position="right"
                :precision="2"
                :min="0"/>
            </el-form-item>

            <el-form-item
              label="本店价"
              prop="shop_price">
              <el-input-number
                v-model="currentForm.shop_price"
                controls-position="right"
                :precision="2"
                :min="0"/>

              <div class="help-block">
                <span>多规格商品按实际规格中的本店价计算</span>
              </div>
            </el-form-item>

            <el-form-item
              label="最少起订"
              prop="least_sum">
              <el-input-number
                v-model="currentForm.least_sum"
                controls-position="right"
                :min="0"/>

              <div class="help-block">
                <span>该商品最低的起订量，0为不限制</span>
              </div>
            </el-form-item>

            <el-form-item
              label="限购数量"
              prop="purchase_sum">
              <el-input-number
                v-model="currentForm.purchase_sum"
                controls-position="right"
                :min="0"/>

              <div class="help-block">
                <span>同个账号下最多限购该商品的数量，0为不限制</span>
              </div>
            </el-form-item>

            <el-form-item
              label="是否包邮"
              prop="is_postage">
              <el-radio-group v-model="currentForm.is_postage">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="规格属性" name="type">
            <el-form-item
              label="商品模型"
              prop="goods_type_id">
              <el-select
                v-model="currentForm.goods_type_id"
                placeholder="请选择商品模型，试试搜索：手机"
                style="width: 320px;"
                @change="selectGoodsType"
                filterable
                value="">
                <el-option
                  v-for="item in typeData"
                  :key="item.goods_type_id"
                  :label="item.type_name"
                  :value="item.goods_type_id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-row :gutter="10">
              <el-col :span="11">
                <el-form-item label="商品规格">
                  <el-table></el-table>
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="商品属性">
                  <el-table
                    :data="attrData"
                    row-key="goods_attribute_id"
                    :show-header="false"
                    :tree-props="{children: 'get_attribute'}"
                    default-expand-all>

                    <el-table-column
                      label="属性名称"
                      width="200"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <cs-icon class="attr-icon-move cs-pr-5" name="align-justify"/>
                        <span>{{scope.row.attr_name}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="属性值">
                      <template slot-scope="scope">
                        <div v-if="scope.row.parent_id">
                          <el-select
                            v-if="scope.row.attr_input_type !== 0"
                            v-model="typeTemp.attr[scope.row.goods_attribute_id]"
                            :multiple-limit="scope.row.attr_input_type === 2 ? 0 : 1"
                            placeholder="请选择"
                            style="width: 100%;"
                            size="small"
                            value=""
                            filterable
                            allow-create
                            default-first-option
                            multiple
                            clearable>
                            <el-option
                              v-for="(item, index) in scope.row.attr_values"
                              :key="index"
                              :value="item"/>
                          </el-select>

                          <el-input
                            v-else
                            v-model="typeTemp.attr[scope.row.goods_attribute_id]"
                            type="textarea"
                            placeholder="请输入内容"
                            size="small"
                            autosize>
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>

                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="媒体设置" name="photo">
            <el-form-item
              label="商品相册"
              prop="attachment">
              <cs-photo v-model="currentForm.attachment">
                <template slot="upload">
                  <div
                    v-if="!currentForm.attachment.length"
                    tabindex="0"
                    style="margin-bottom: 8px;"
                    class="el-upload el-upload--picture-card"
                    @click="handleUpload(getAttachmentFileList, 'photo', 'upload')">
                    <cs-icon name="image"/>
                  </div>
                </template>
              </cs-photo>

              <el-button
                @click="handleStorage(getAttachmentFileList, [0, 2])"
                size="small">
                <cs-icon name="inbox"/>
                资源选择
              </el-button>

              <el-button
                @click="handleUpload(getAttachmentFileList, 'photo', 'upload')"
                size="small">
                <cs-icon name="upload"/>
                上传图片
              </el-button>

              <div class="help-block">
                <span>第一张图片将作为商品主图，拖动可调整图片位置，建议图片尺寸800x800</span>
              </div>
            </el-form-item>

            <el-form-item
              label="视频上传"
              prop="video">
              <cs-video
                ref="goodsVideo"
                class="input-video"
                :mime="currentForm.video.mime"
                :src="currentForm.video.url"
                :poster="currentForm.video.cover">
              </cs-video>

              <el-button
                @click="handleStorage(getVideoFileList, [2, 3])"
                size="small">
                <cs-icon name="inbox"/>
                资源选择
              </el-button>

              <el-button
                @click="handleUpload(getVideoFileList, 'video', 'upload')"
                size="small">
                <cs-icon name="upload"/>
                上传视频
              </el-button>

              <el-button
                v-if="currentForm.video.url"
                @click="delVideoFile"
                size="small">
                <cs-icon name="trash"/>
                删除
              </el-button>

              <div class="help-block">
                <span>推荐使用mp4格式的视频，同时也支持ogg、webm等格式的视频</span>
              </div>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品详情" name="detail">
            <el-form-item
              label="关键词"
              prop="keywords">
              <el-input
                v-model="currentForm.keywords"
                placeholder="可输入商品关键词，有利于SEO搜索"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="页面描述"
              prop="description">
              <el-input
                v-model="currentForm.description"
                placeholder="可输入商品简单描述，有利于SEO搜索"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="详情描述"
              prop="content">
              <cs-tinymce
                ref="tinymce"
                v-model="currentForm.content"
                code="inside_content"
                :height="450"/>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="积分结算" name="integral">
            <el-form-item
              label="结算方式"
              prop="integral_type">
              <el-radio-group v-model="currentForm.integral_type">
                <el-radio :label="0">按百分比</el-radio>
                <el-radio :label="1">按固定值</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="赠送分值"
              prop="give_integral">
              <el-input-number
                v-model="currentForm.give_integral"
                :precision="currentForm.integral_type ? 0 : 2"
                :max="currentForm.integral_type ? undefined : 100"
                :min="0"
                controls-position="right"/>

              <div class="help-block">
                <span v-if="currentForm.integral_type">按赠送分值设定的值固定赠送积分，赠送分值需大于等于0</span>
                <span v-else>按实际支付金额百分比赠送，赠送分值的范围是0 ~ 100</span>
              </div>
            </el-form-item>

            <el-form-item
              label="可抵扣额"
              prop="is_integral">
              <el-input-number
                v-model="currentForm.is_integral"
                :min="0"
                controls-position="right"/>

              <div class="help-block">
                <span>商品最多允许抵扣多少积分，0为不可使用</span>
              </div>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <cs-storage
      ref="storage"
      style="display: none"
      @confirm="storageCallback">
    </cs-storage>

    <cs-upload
      style="display: none"
      ref="upload"
      type="slot"
      :multiple="uploadConfig.multiple"
      :accept="uploadConfig.accept"
      :limit="uploadConfig.limit"
      @confirm="uploadCallback">
    </cs-upload>
  </div>
</template>

<script>
// import util from '@/utils/util'
// import { mapActions } from 'vuex'
// import draggable from 'vuedraggable'
import { getGoodsAttributeList } from '@/api/goods/attribute'
import { getGoodsSpecList } from '@/api/goods/spec'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage'),
    'csTinymce': () => import('@/components/cs-tinymce'),
    'csVideo': () => import('@/components/cs-video'),
    'csPhoto': () => import('@/components/cs-photo')
  },
  props: {
    loading: {
      default: true
    },
    confirmLoading: {
      default: false
    },
    catData: {
      default: () => []
    },
    brandData: {
      default: () => []
    },
    typeData: {
      default: () => []
    },
    state: {
      type: String,
      required: true,
      default: 'create'
    }
  },
  data() {
    return {
      activeName: 'basic',
      stateMap: {
        create: '新增商品',
        update: '编辑商品'
      },
      storageCallback: '',
      uploadCallback: '',
      uploadConfig: {},
      cascaderProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      currentForm: {
        goods_category_id: undefined,
        name: '',
        short_name: '',
        product_name: '',
        goods_code: '',
        goods_spu: '',
        goods_sku: '',
        bar_code: '',
        brand_id: undefined,
        store_qty: 0,
        market_price: 0,
        shop_price: 0,
        integral_type: 0,
        give_integral: 0,
        is_integral: 0,
        least_sum: 0,
        purchase_sum: 0,
        keywords: '',
        description: '',
        content: '',
        attachment: [],
        video: {},
        unit: '',
        is_recommend: 0,
        is_new: 0,
        is_hot: 0,
        goods_type_id: undefined,
        sort: 50,
        status: 1,
        goods_attr_item: [],
        goods_spec_item: [],
        spec_image: [],
        is_postage: 0,
        measure: 0,
        measure_type: 0
      },
      rules: {
      },
      attrData: [],
      specData: [],
      typeTemp: {
        attr: {},
        spec: {}
      }
    }
  },
  methods: {
    // 确认新增或修改
    handleConfirm() {
      console.log(this.currentForm)
      console.log(this.attrData)
    },
    // 打开资源选择框
    handleStorage(callback, type = []) {
      this.storageCallback = callback
      this.$refs.storage.handleStorageDlg(type)
    },
    // 打开上传对话框
    handleUpload(callback, type, source) {
      if (type === 'video') {
        this.uploadConfig = {
          accept: 'video/*',
          multiple: false,
          limit: 1
        }
      }

      if (type === 'photo') {
        this.uploadConfig = {
          accept: 'image/*',
          multiple: true,
          limit: 0
        }
      }

      this.uploadCallback = callback
      this.$refs.upload.handleUploadDlg(source)
    },
    // 筛选过滤选择的资源
    getFileList(files, source) {
      if (!source) {
        return files
      }

      let fileList = []
      for (const value of files) {
        if (value.status !== 'success') {
          continue
        }

        const response = value.response
        if (!response || response.status !== 200) {
          continue
        }

        if (response.data) {
          fileList.push(response.data[0])
        }
      }

      return fileList
    },
    // 获取视频选择资源
    getVideoFileList(files, source) {
      if (!files.length) {
        return
      }

      const fileList = this.getFileList(files, source)

      // eslint-disable-next-line no-unused-vars
      for (const value of fileList) {
        if (value.type === 3) {
          this.currentForm.video = {
            url: value.url,
            mime: value.mime,
            cover: value.cover
          }

          this.$refs.goodsVideo.setSources(this.currentForm.video)
          break
        }
      }
    },
    // 清除视频资源
    delVideoFile() {
      this.currentForm.video = {}
      this.$refs.goodsVideo.delSources()
    },
    // 获取商品相册资源
    getAttachmentFileList(files, source) {
      if (!files.length) {
        return
      }

      const fileList = this.getFileList(files, source)
      fileList.forEach(value => {
        this.currentForm.attachment.push({
          name: value.name,
          source: value.url,
          url: '//' + value.url
        })
      })
    },
    // 切换商品属性
    selectGoodsType(value) {
      // this.typeTemp = {
      //   attr: {},
      //   spec: {}
      // }

      this.currentForm.goods_attr_item = []
      this.currentForm.goods_spec_item = []
      this.currentForm.spec_image = []

      Promise.all([
        getGoodsAttributeList(value),
        getGoodsSpecList(value)
      ])
        .then(res => {
          this.attrData = res[0].data.length > 0 ? res[0].data : []
          this.specData = res[1].data.length > 0 ? res[1].data : []
        })
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .brand-name {
    float: left;
  }
  .brand-category {
    float: right;
    color: #8492a6;
    font-size: 12px;
    padding-right: 15px;
  }
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }
  .input-video {
    width: 350px;
    margin-bottom: 10px;
  }
  .help-block {
    color: #909399;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
  .attr-icon-move {
    color: #C0C4CC;
    cursor: move;
  }
</style>
