<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="cs-text-center clearfix">
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
                ref="typeSelect"
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

            <el-row :gutter="20" v-loading="typeLoading">
              <el-col :span="13">
                <el-form-item label="商品规格">
                  <div v-if="!currentForm.spec_config.length" style="padding-top: 5px;">
                    <p class="empty-data">暂无数据</p>
                    <el-divider/>
                  </div>

                  <draggable
                    v-else
                    :list="currentForm.spec_config"
                    :component-data="{props: {value: this.activeSpec}}"
                    tag="el-collapse"
                    handle=".spec-handle">
                    <el-collapse-item
                      v-for="(item, parent) in currentForm.spec_config"
                      :key="item.spec_id"
                      :name="item.spec_id"
                      class="action">
                      <template slot="title">
                        <i class="el-icon-s-grid icon-move cs-pr-10 spec-handle"/>
                        <div class="spec-more" @click="$event.stopPropagation()">
                          <template v-if="!activeSpecMore[parent]">
                            <el-checkbox
                              v-model="item.check_all"
                              :indeterminate="item.is_indeterminate"
                              @change="(value) => handleCheckAllChange(value, parent)">
                              {{item.name}}
                            </el-checkbox>

                            <div class="active" @click="setSpecMoreActive(true, parent)">
                              <i class="el-input__icon el-icon-d-arrow-right"
                                 style="color: #909399; font-size: 12px;"/>
                            </div>
                          </template>

                          <template v-else>
                            <el-input
                              v-model="item.name"
                              @keyup.enter.space.native="$event.stopPropagation()"
                              @change="confirmSpecName(parent)"
                              size="mini">
                              <el-select v-model="item.spec_type" slot="prepend" class="type-select">
                                <el-option label="文字" :value="0"/>
                                <el-option label="图片" :value="1"/>
                                <el-option label="颜色" :value="2"/>
                              </el-select>

                              <el-popconfirm
                                title="确定要执行删除操作吗?"
                                @onConfirm="delSpec(parent)"
                                placement="top"
                                slot="suffix">
                                <i slot="reference" class="el-input__icon el-icon-close"/>
                              </el-popconfirm>

                              <el-button
                                @click="setSpecMoreActive(false, parent)"
                                icon="el-icon-d-arrow-left"
                                slot="append">
                              </el-button>
                            </el-input>
                          </template>
                        </div>
                      </template>

                      <el-checkbox-group
                        v-model="item.check_list"
                        @change="(value) => handleCheckedCitiesChange(value, parent)"
                        style="position: relative;">
                        <draggable
                          :list="item.spec_item"
                          handle=".item-spec-handle">
                          <div
                            v-for="(value, key) in item.spec_item"
                            class="spec-item"
                            :key="key">
                            <el-checkbox :label="value.spec_item_id" class="spec-check"/>

                            <div
                              v-if="item.spec_type === 1"
                              class="spec-type">
                              <el-popover
                                placement="top"
                                trigger="hover"
                                :close-delay="50"
                                :disabled="!value.image.length">
                                <cs-photo
                                  v-if="value.image.length > 0"
                                  v-model="value.image"
                                  :width="80"
                                  :height="80">
                                </cs-photo>

                                <el-avatar
                                  class="cs-cp spec-position"
                                  slot="reference"
                                  shape="square"
                                  @click.native="setSpecImage(parent, key, value.image)"
                                  :src="value.image[0] | getPreviewUrl('goods_image_x80')"
                                  :size="27">
                                  <img src="image/system/image.png" alt=""/>
                                </el-avatar>
                              </el-popover>
                            </div>

                            <div
                              v-if="item.spec_type === 2"
                              class="spec-type">
                              <el-color-picker
                                v-model="value.color"
                                class="spec-position"
                                size="mini">
                              </el-color-picker>
                            </div>

                            <el-tag
                              class="cs-cm item-spec-handle"
                              type="info"
                              size="medium"
                              title="双击编辑"
                              :effect="item.spec_index !== 1 || value.is_contact !== 1 ? 'light' : 'plain'"
                              @dblclick.native="dialogSpecItemName(value.item_name, 'set', parent, key)"
                              @close="delSpecItem(parent, key)"
                              closable>{{value.item_name}}</el-tag>
                          </div>
                        </draggable>
                      </el-checkbox-group>

                      <el-button-group class="spec-item active" style="padding-bottom: 14px;">
                        <el-button
                          @click="dialogSpecItemName(null, 'add', parent, null)"
                          title="添加规格项"
                          icon="el-icon-plus"
                          size="mini"/>

                        <el-button
                          @click="importSpecItem(parent)"
                          title="导入规格项"
                          icon="el-icon-takeaway-box"
                          size="mini"/>
                      </el-button-group>
                    </el-collapse-item>
                  </draggable>

                  <div v-if="currentForm.goods_type_id">
                    <el-input
                      v-if="inputSpecVisible"
                      v-model="inputSpecValue"
                      class="spec-add-input"
                      ref="addSpecInput"
                      size="small"
                      @keyup.enter.native="addSpec"
                      @blur="addSpec">
                    </el-input>

                    <el-button
                      v-else
                      class="spec-add-button cs-mt"
                      icon="el-icon-plus"
                      size="mini"
                      @click="showSpecInput">新增规格</el-button>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="商品属性">
                  <div v-if="!currentForm.attr_config.length" style="padding-top: 5px;">
                    <p class="empty-data">暂无数据</p>
                    <el-divider/>
                  </div>

                  <draggable
                    v-else
                    :list="currentForm.attr_config"
                    :component-data="{props: {value: this.activeAttr}}"
                    tag="el-collapse"
                    handle=".attr-handle">
                    <el-collapse-item
                      v-for="(item, parent) in currentForm.attr_config"
                      :key="item.goods_attribute_id"
                      :name="item.goods_attribute_id">
                      <template slot="title">
                        <i class="el-icon-s-grid icon-move cs-pr-10 attr-handle"/>
                        <span>{{item.attr_name}}</span>
                      </template>

                      <draggable
                        :list="item.get_attribute"
                        tag="form"
                        class="el-form el-form--label-left"
                        handle=".item-attr-handle">
                        <div
                          v-for="(value, key) in item.get_attribute"
                          :key="value.goods_attribute_id"
                          class="el-form-item attr-form">
                          <label class="el-form-item__label attr-label">
                            <i class="el-icon-s-grid icon-move cs-pr-10 item-attr-handle"/>
                            <span :title="value.attr_name">{{value.attr_name}}</span>
                          </label>
                          <div class="el-form-item__content attr-content">
                            <el-select
                              v-if="value.attr_input_type !== 0"
                              v-model="value.result"
                              :multiple-limit="inputType[value.attr_input_type].type"
                              :placeholder=inputType[value.attr_input_type].value
                              style="width: 100%;"
                              size="small"
                              value=""
                              filterable
                              allow-create
                              default-first-option
                              multiple
                              clearable>
                              <el-option
                                v-for="(attr, index) in value.attr_values"
                                :key="index"
                                :value="attr"/>
                            </el-select>

                            <div v-else>
                              <el-input
                                v-model="value.result"
                                type="textarea"
                                :placeholder=inputType[value.attr_input_type].value
                                style="width: 90%;"
                                size="small"
                                autosize>
                              </el-input>

                              <i @click="setAttrDefaultValue(parent, key)"
                                 class="el-icon-copy-document attr-default"
                                 title="设为默认值"/>
                            </div>
                          </div>
                        </div>
                      </draggable>
                    </el-collapse-item>
                  </draggable>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="规格列表">
              <div v-if="!currentForm.spec_combo.length" style="padding-top: 5px;">
                <p class="empty-data">暂无数据</p>
                <el-divider/>
              </div>

              <el-table
                v-else
                :data="currentForm.spec_combo"
                :highlight-current-row="true"
                :border="true">
                <el-table-column
                  v-for="(value, key) in specTable.header"
                  :key="key"
                  :label="value">
                </el-table-column>
              </el-table>
            </el-form-item>
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
                    <i class="el-icon-plus"/>
                  </div>
                </template>
              </cs-photo>

              <el-button
                @click="handleStorage(getAttachmentFileList, [0, 2], 'photo')"
                icon="el-icon-finished"
                size="small">资源选择</el-button>

              <el-button
                @click="handleUpload(getAttachmentFileList, 'photo', 'upload')"
                icon="el-icon-upload2"
                size="small">上传图片</el-button>

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
                @click="handleStorage(getVideoFileList, [2, 3], 'video')"
                icon="el-icon-finished"
                size="small">资源选择</el-button>

              <el-button
                @click="handleUpload(getVideoFileList, 'video', 'upload')"
                icon="el-icon-upload2"
                size="small">上传视频</el-button>

              <el-button
                v-if="currentForm.video.url"
                icon="el-icon-delete"
                @click="delVideoFile"
                size="small">删除</el-button>

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
      :limit="uploadConfig.limit"
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

    <page-spec
      ref="importSpec"
      @confirm="importSpecData"/>

    <el-dialog
      title="规格图片"
      width="665px"
      :visible.sync="specImageVisible"
      :append-to-body="true"
      :close-on-click-modal="false">
      <cs-photo
        v-model="specImage"
        style="margin-top: -25px;">
        <template slot="upload">
          <div v-if="!specImage.length" class="empty-data">暂无规格图</div>
        </template>
      </cs-photo>

      <div slot="footer" class="dialog-footer">
        <div class="cs-fl">
          <el-button
            @click="handleStorage(getSpecImageList, [0, 2], 'photo')"
            icon="el-icon-finished"
            size="small">资源选择</el-button>

          <el-button
            @click="handleUpload(getSpecImageList, 'photo', 'upload')"
            icon="el-icon-upload2"
            size="small">上传图片</el-button>
        </div>

        <el-button
          @click.native="specImageVisible = false"
          size="small">取消</el-button>

        <el-button
          @click.native="confirmSpecImage"
          type="primary"
          size="small">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="`${specName.type === 'set' ? '编辑' : '添加'}规格项`"
      :visible.sync="specName.visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="500px">
      <el-form @submit.native.prevent>
        <el-form-item>
          <el-input
            v-if="specName.type === 'set'"
            v-model="specName.value"
            placeholder="请输入规格项名称"
            @keyup.enter.native="confirmSpecItemName"
            ref="specNameInput">
          </el-input>

          <el-input
            v-if="specName.type === 'add'"
            v-model="specName.value"
            placeholder="请输入规格项名称，一行一个"
            type="textarea"
            :rows="5"
            ref="specNameInput">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="specName.visible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          @click="confirmSpecItemName"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import { debounce } from 'lodash'
import { getGoodsSpecList } from '@/api/goods/spec'
import { getGoodsAttributeList } from '@/api/goods/attribute'
import { getGoodsAttrConfig, getGoodsSpecConfig } from '@/api/goods/goods'

export default {
  components: {
    'PageSpec': () => import('../PageSpec'),
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage'),
    'csTinymce': () => import('@/components/cs-tinymce'),
    'csVideo': () => import('@/components/cs-video'),
    'csPhoto': () => import('@/components/cs-photo'),
    'draggable': () => import('vuedraggable')
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
      inputType: [
        { value: '请输入自定义内容', type: 1 },
        { value: '仅单选或自定义输入', type: 1 },
        { value: '可多选或自定义输入', type: 2 }
      ],
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
        goods_id: undefined,
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
        attr_config: [],
        spec_config: [],
        spec_combo: [],
        is_postage: 0,
        measure: 0,
        measure_type: 0
      },
      rules: {},
      inputSpecValue: '',
      inputSpecVisible: false,
      typeLoading: false,
      activeAttr: [],
      activeSpec: [],
      activeSpecMore: {},
      specTable: [],
      specImage: [],
      specImageKey: {},
      specImageVisible: false,
      specName: {
        value: '',
        type: '',
        visible: false,
        parent: null,
        key: null
      }
    }
  },
  created() {
    // 解决Firefox下拖拽结束后会新开搜索窗口
    document.body.ondrop = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  filters: {
    getPreviewUrl(val, code) {
      if (val) {
        if (val.source || val) {
          return util.getImageCodeUrl(val.source || val, code)
        }
      }

      return ''
    }
  },
  watch: {
    'currentForm.spec_config': {
      handler(val) {
        this._handleSpecItemData(val)
      },
      deep: true
    }
  },
  methods: {
    // 确认新增或修改
    handleConfirm() {
      console.log(this.currentForm)
    },
    // 打开资源选择框
    handleStorage(callback, type = [], source = '') {
      this.storageCallback = callback
      this.uploadConfig.limit = source === 'photo' ? 0 : 1

      this.$nextTick(() => {
        this.$refs.storage.handleStorageDlg(type)
      })
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
      this.$nextTick(() => {
        this.$refs.upload.handleUploadDlg(source)
      })
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
      for (const value of fileList) {
        if (value.type === 3) {
          this.currentForm.video = {
            url: value.url,
            mime: value.mime,
            cover: value.cover
          }

          this.$nextTick(() => {
            this.$refs.goodsVideo.setSources(this.currentForm.video)
          })

          break
        }
      }
    },
    // 清除视频资源
    delVideoFile() {
      this.currentForm.video = {}
      this.$nextTick(() => {
        this.$refs.goodsVideo.delSources()
      })
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
      this.$nextTick(() => {
        this.$refs.typeSelect.blur()
      })

      this.typeLoading = true
      this.activeSpecMore = {}

      let request = []
      let isReadOldData = false
      if (this.state !== 'create' && this.currentForm.goods_category_id === value) {
        this.$confirm('检测到您选择了该商品的原商品模型，是否加载原数据？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        })
          .then(() => {
            isReadOldData = true
          })
          .catch(() => {
            isReadOldData = false
          })
      }

      if (!isReadOldData) {
        request = [
          getGoodsAttributeList(value),
          getGoodsSpecList(value)
        ]
      } else {
        request = [
          getGoodsAttrConfig(this.currentForm.goods_id),
          getGoodsSpecConfig(this.currentForm.goods_id, 1)
        ]
      }

      Promise.all(request)
        .then(res => {
          this.activeAttr = res[0].data['attr_key'] || []
          this.activeSpec = res[1].data['spec_key'] || []
          this.currentForm.attr_config = res[0].data['attr_config'] || []
          this.currentForm.spec_combo = res[1].data['spec_combo'] || []
          this.currentForm.spec_config = res[1].data['spec_config'] || []
        })
        .finally(() => {
          this.typeLoading = false
        })
    },
    // 设置商品属性为默认值
    setAttrDefaultValue(parent, key) {
      let data = this.currentForm.attr_config[parent]['get_attribute'][key]
      if (!data || !data.attr_values[0]) {
        this.$message.info('该属性项不存在默认值')
        return
      }

      this.$set(data, 'result', data.attr_values[0])
    },
    showSpecInput() {
      this.inputSpecValue = ''
      this.inputSpecVisible = true

      this.$nextTick(() => {
        this.$refs.addSpecInput.focus()
      })
    },
    // 新增规格
    addSpec() {
      if (this.inputSpecValue) {
        const specId = -util.randomLenNum(6)
        this.currentForm.spec_config.push({
          spec_id: specId,
          goods_type_id: 0,
          name: this.inputSpecValue,
          spec_index: 0,
          spec_type: 0,
          sort: 50,
          spec_item: [],
          check_list: []
        })

        this.activeSpec.push(specId)
      }

      this.inputSpecVisible = false
      this.inputSpecValue = ''
    },
    // 删除规格
    delSpec(key) {
      this.currentForm.spec_config.splice(key, 1)
    },
    // 编辑规格项图片
    setSpecImage(parent, key, image) {
      this.specImage = [...image]
      this.specImageKey = { parent, key }
      this.specImageVisible = true
    },
    // 获取规格项图片
    getSpecImageList(files, source) {
      if (!files.length) {
        return
      }

      const fileList = this.getFileList(files, source)
      fileList.forEach(value => {
        this.specImage.push({
          name: value.name,
          source: value.url,
          url: '//' + value.url
        })
      })
    },
    // 完成规格图片编辑
    confirmSpecImage() {
      const { parent, key } = this.specImageKey
      let data = this.currentForm.spec_config[parent]['spec_item'][key]

      this.$set(data, 'image', this.specImage)
      this.specImageVisible = false
    },
    // 删除规格项
    delSpecItem(parent, key) {
      let data = this.currentForm.spec_config[parent]
      let pos = data.check_list.indexOf(data.spec_item[key].spec_item_id)

      pos !== -1 && data.check_list.splice(pos, 1)
      data.spec_item.splice(key, 1)
      this.handleCheckedCitiesChange(data.check_list, parent)
    },
    // 规格名称编辑确认
    confirmSpecName(parent) {
      let data = this.currentForm.spec_config
      this.$set(data, parent, {
        ...data[parent],
        goods_type_id: 0,
        spec_index: 0,
        spec_id: -util.randomLenNum(6)
      })
    },
    // 规格更多操作
    setSpecMoreActive(is_active, parent) {
      this.$set(this.activeSpecMore, parent, is_active)
    },
    // 显示规格项名称编辑对话框
    dialogSpecItemName(value, type, parent, key) {
      this.specName = { value, type, parent, key, visible: true }
      this.$nextTick(() => {
        this.$refs.specNameInput.select()
      })
    },
    // 规格项确认添加或编辑
    confirmSpecItemName() {
      if (!this.specName.value) {
        this.specName.visible = false
        return
      }

      const { parent, key } = this.specName
      let data = this.currentForm.spec_config[parent]

      if (this.specName.type === 'add') {
        const specList = this.specName.value.trim().split('\n')
        specList.forEach(value => {
          data.spec_item.push({
            spec_item_id: -util.randomLenNum(6),
            item_name: value,
            is_contact: 0,
            sort: 50,
            image: [],
            color: ''
          })
        })

        this.handleCheckedCitiesChange(data.check_list, parent)
      }

      if (this.specName.type === 'set') {
        if (data.spec_item[key].item_name !== this.specName.value) {
          this.$set(data.spec_item, key, {
            ...data.spec_item[key],
            is_contact: 0,
            item_name: this.specName.value,
            spec_item_id: -util.randomLenNum(6)
          })
        }
      }

      this.specName.visible = false
    },
    // 打开模型导入规格项对话框
    importSpecItem(parent) {
      this.specName = { parent }
      this.$nextTick(() => {
        this.$refs.importSpec.handleVisible()
      })
    },
    // 确认从模型中导入规格项
    importSpecData(value) {
      if (value.spec_item) {
        const { parent } = this.specName
        let data = this.currentForm.spec_config[parent]

        value.spec_item.forEach(item => {
          const isContact = data.spec_id === value.spec_id ? 1 : 0
          data['spec_item'].push({
            ...item,
            is_contact: isContact,
            spec_item_id: isContact !== 1 ? -util.randomLenNum(6) : item.spec_item_id
          })
        })

        this.handleCheckedCitiesChange(data.check_list, parent)
      }
    },
    // 规格全部选中或取消
    handleCheckAllChange(value, parent) {
      let data = this.currentForm.spec_config[parent]
      const itemId = data.spec_item.map(item => {
        return item.spec_item_id
      })

      this.$set(data, 'check_list', value ? itemId : [])
      this.$set(data, 'is_indeterminate', false)
    },
    // 项发生变化
    handleCheckedCitiesChange(value, parent) {
      let checked = value.length
      let data = this.currentForm.spec_config[parent]

      this.$set(data, 'check_all', checked === data.spec_item.length)
      this.$set(data, 'is_indeterminate', checked > 0 && checked < data.spec_item.length)
    },
    // 设置规格列表
    _handleSpecItemData: debounce(function(val) {
      // 索引 头部 组合
      let treeTable = { index: {}, header: [], compose: [] }

      val.forEach(value => {
        let node = { key: [], item: [], name: value.name }
        value.spec_item.forEach(item => {
          if (value.check_list.includes(item.spec_item_id)) {
            node.key.push(item.spec_item_id)
            node.item.push(item.item_name)

            treeTable.index[item.spec_item_id] = {
              'specName': value.name,
              'itemName': item.item_name
            }
          }
        })

        if (node.item.length > 0) {
          treeTable.compose.push(node.key)
          treeTable.header.push(value.name)
        }
      })

      // 根据键值获取规格值
      const getKeyValue = function(keyName) {
        // eslint-disable-next-line no-unused-vars
        let name = ''
        keyName.forEach(key => {
          if (treeTable.index.hasOwnProperty(key)) {
            let idx = treeTable.index[key]
            name += ` ${idx.specName}:${idx.itemName}`
          }
        })

        return name.trim()
      }

      // 获取笛卡尔积结果并生成列表数据
      let newCombo = []
      let oldCombo = {}
      let combine = util.descartes(treeTable.compose)

      this.currentForm.spec_combo.forEach(combo => {
        let key = combo['key_name'].sort().join('_')
        oldCombo[key] = combo
      })

      combine.forEach(combo => {
        let temp
        let key = [...combo].sort().join('_')

        if (oldCombo.hasOwnProperty(key)) {
          temp = {
            price: oldCombo[key].price,
            store_qty: oldCombo[key].store_qty,
            bar_code: oldCombo[key].bar_code,
            goods_sku: oldCombo[key].goods_sku
          }
        } else {
          temp = {
            price: 0,
            store_qty: 0,
            bar_code: '',
            goods_sku: ''
          }
        }

        // 补齐name和value
        temp.key_name = combo
        temp.key_value = getKeyValue([...combo])

        newCombo.push(temp)
      })

      this.specTable = treeTable
      this.$set(this.currentForm, 'spec_combo', newCombo)
      console.log(this.specTable, newCombo)
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
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
    border: 1px solid $color-border-1;
  }
  .input-video {
    width: 350px;
    margin-bottom: 10px;
  }
  .help-block {
    color: $color-info;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
  .empty-data {
    @extend %flex-center-row;
    color: $color-info;
    height: 156px;
  }
  .icon-move {
    color: $color-text-placehoder;
    cursor: move;
  }
  .attr-form {
    padding-left: 15px;
    margin-bottom: 10px;
  }
  .attr-label {
    width: 30%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .attr-content {
    margin-left: 30%;
    line-height: 34px;
  }
  .attr-default {
    color: $color-text-placehoder;
    cursor: pointer;
    float: right;
    padding: 12px 5px;
  }
  .el-collapse /deep/ .el-collapse-item__header {
    font-size: 14px;
  }
  .el-collapse /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }
  .sortable-ghost {
    opacity: 0;
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: inline;
  }
  .spec-add-button {
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .spec-add-input {
    margin-top: 16px;
    width: 90px;
  }
  .spec-action {
    color: $color-primary;
    padding-right: 10px;
    font-size: 12px;
  }
  .spec-item {
    float: left;
    padding: 0 0 15px 24px;
  }
  .spec-type {
    display: inline;
    padding-right: 31px;
  }
  .spec-position {
    position: absolute;
    overflow: hidden;
  }
  .spec-more {
    .type-select {
      width: 75px;
    }
    .el-input-group {
      vertical-align: middle;
    }
    /deep/ .el-input-group__prepend {
      background-color: #FFFFFF;
    }
  }
  .spec-check {
    width: 16px;
    /deep/ .el-checkbox__label{
      display: none;
    }
  }
</style>
