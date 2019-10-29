<template>
  <div class="cs-p">
    <el-form :inline="true" size="small">
      <el-form-item v-if="tabPane !== 'delete'">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <cs-icon name="plus"/>
          新增商品
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'stock'">
        <el-button
          :disabled="loading"
          @click="handleStatus(null, 1)">
          <cs-icon name="level-up"/>
          上架
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'sale'">
        <el-button
          :disabled="loading"
          @click="handleStatus(null, 0)">
          <cs-icon name="level-down"/>
          下架
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="thumbs-o-up"/>
            推荐
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleRecommend(null, 1)">设为推荐</el-dropdown-item>
            <el-dropdown-item @click.native="handleRecommend(null, 0)">取消推荐</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="star-o"/>
            新品
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleNew(null, 1)">设为新品</el-dropdown-item>
            <el-dropdown-item @click.native="handleNew(null, 0)">取消新品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="sun-o"/>
            热卖
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleHot(null, 1)">设为热卖</el-dropdown-item>
            <el-dropdown-item @click.native="handleHot(null, 0)">取消热卖</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleDelete(null, true)">
            <cs-icon name="trash-o"/>
            {{tabPane === 'delete' ? '彻底删除' : '删除'}}
          </el-button>

          <el-button
            v-if="tabPane === 'delete'"
            :disabled="loading"
            @click="handleDelete(null, false)">
            <cs-icon name="reply"/>
            恢复
          </el-button>
        </el-button-group>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-tabs
      v-model="tabPane"
      v-loading="loading"
      :before-leave="handleBefore"
      class="tab-box">
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="index">

        <el-table
          v-if="index === tabPane"
          :data="currentTableData"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column type="selection" width="35"/>

          <el-table-column
            v-if="tabPane === 'delete'"
            label="来源"
            align="center"
            width="80">
            <template slot-scope="scope">
              <span>{{scope.row.status ? '出售中' : '已下架'}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="商品"
            prop="goods_id"
            sortable="custom"
            min-width="380">
            <template slot-scope="scope">
              <div class="goods-summary cs-mb-5">
                <span class="cs-mr">商品货号：{{scope.row.goods_code}}</span>
                <span>创建日期：{{scope.row.create_time}}</span>
              </div>

              <el-image
                class="goods-image"
                @click="handleView(scope.row.goods_id)"
                :src="scope.row.attachment | getPreviewUrl"
                fit="contain"
                lazy/>

              <div class="goods-info cs-ml">
                <p class="action">
                  <span
                    @click="handleView(scope.row.goods_id)"
                    :title="scope.row.name"
                    class="link">{{scope.row.name}}</span>

                    <cs-icon
                      v-if="tabPane !== 'delete'"
                      class="goods-edit active"
                      @click.native="setGoodsName(scope.$index)"
                      name="pencil"/>
                </p>

                <p class="action">
                  <span
                    :title="scope.row.product_name"
                    class="son">{{scope.row.product_name}}</span>

                  <cs-icon
                    v-if="tabPane !== 'delete'"
                    class="goods-edit active"
                    @click.native="setGoodsProduct(scope.$index)"
                    name="pencil"/>
                </p>

                <p>
                  <u v-for="(item, index) in goodsTab" :key="index">
                    <el-tag
                      v-if="scope.row[index]"
                      :type="item.type"
                      :disable-transitions="true"
                      class="cs-mr-10"
                      effect="dark"
                      size="mini">
                      {{item.name}}
                    </el-tag>
                  </u>
                </p>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="价格"
            prop="shop_price"
            sortable="custom">
            <template slot-scope="scope">
              <div class="action">
                <span class="goods-shop-price">{{scope.row.shop_price | getNumber}}</span>
                <cs-icon
                  v-if="tabPane !== 'delete'"
                  class="goods-edit active"
                  @click.native="setGoodsPriceOrStore(scope.$index)"
                  name="pencil"/>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="库存"
            prop="store_qty"
            sortable="custom">
            <template slot-scope="scope">
              <div class="action">
                <span>{{scope.row.store_qty}}</span>
                <cs-icon
                  v-if="tabPane !== 'delete'"
                  class="goods-edit active"
                  @click.native="setGoodsPriceOrStore(scope.$index)"
                  name="pencil"/>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="总销量"
            prop="sales_sum"
            sortable="custom">
          </el-table-column>

          <el-table-column
            label="排序值"
            prop="sort"
            align="center"
            sortable="custom"
            min-width="110">
            <template slot-scope="scope">
              <el-input-number
                v-if="tabPane !== 'delete'"
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
            label="操作"
            align="center"
            min-width="140">
            <template slot-scope="scope">
              <el-button
                v-if="tabPane !== 'delete'"
                @click="handleEdit(scope.row.goods_id)"
                size="small"
                type="text">编辑</el-button>

              <el-button
                v-if="tabPane !== 'delete'"
                @click="handleCopy(scope.row.goods_id)"
                size="small"
                type="text">复制</el-button>

              <el-button
                v-if="tabPane !== 'delete'"
                @click="handleStatus(scope.$index, Number(!scope.row.status))"
                size="small"
                type="text">{{scope.row.status ? '下架' : '上架'}}</el-button>

              <el-button
                @click="handleDelete(scope.$index, true)"
                size="small"
                type="text">{{tabPane === 'delete' ? '彻底删除' : '删除'}}</el-button>

              <el-button
                v-if="tabPane === 'delete'"
                @click="handleDelete(scope.$index, false)"
                size="small"
                type="text">恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="商品名称"
      :visible.sync="nameFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="nameForm"
        :rules="rules"
        ref="name"
        label-width="80px"
        @submit.native.prevent>
        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="nameForm.name"
            placeholder="请输入商品名称"
            @keyup.enter.native="handleSetName"
            maxlength="200"
            show-word-limit
            ref="nameInput"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="nameFormVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="dialogLoading"
          @click="handleSetName"
          size="small">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="商品促销名"
      :visible.sync="productFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="productForm"
        :rules="rules"
        ref="product"
        label-width="80px"
        @submit.native.prevent>
        <el-form-item
          label="促销名"
          prop="product_name">
          <el-input
            v-model="productForm.product_name"
            placeholder="请输入商品促销名"
            @keyup.enter.native="handleSetProduct"
            maxlength="100"
            show-word-limit
            ref="productInput"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="productFormVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="dialogLoading"
          @click="handleSetProduct"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import {
  copyGoodsItem,
  delGoodsList, setGoodsItem, setGoodsSort,
  setHotGoodsList,
  setNewGoodsList,
  setRecommendGoodsList,
  setShelvesGoodsList
} from '@/api/goods/goods'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    tabsConfig: {
      default: () => {}
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      tabPane: 'sale',
      tabList: { 'sale': '出售中', 'stock': '已下架', 'delete': '回收站' },
      goodsTab: {
        'is_postage': {
          'type': '',
          'name': '包邮'
        },
        'is_recommend': {
          'type': 'success',
          'name': '推荐'
        },
        'is_new': {
          'type': 'danger',
          'name': '新品'
        },
        'is_hot': {
          'type': 'warning',
          'name': '热卖'
        }
      },
      dialogLoading: false,
      nameForm: {},
      nameFormVisible: false,
      productForm: {},
      productFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ],
        product_name: [
          {
            required: true,
            message: '商品促销名不能为空',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {
    getPreviewUrl(val) {
      if (Array.isArray(val) && val.length > 0) {
        if (val[0]['source']) {
          return util.getImageCodeUrl(val[0]['source'], 'goods_image_x80')
        }
      }

      return ''
    },
    getNumber(val) {
      return util.getNumber(val)
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
        this.multipleSelection = []
      },
      immediate: true
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
          idList.push(value.goods_id)
        })
      } else {
        idList.push(this.currentTableData[val].goods_id)
      }

      return idList
    },
    // 点击切换标签
    handleBefore(activeName) {
      let config = { status: 1, is_delete: 0 }
      switch (activeName) {
        case 'stock':
          config.status = 0
          break

        case 'delete':
          config.is_delete = 1
          break
      }

      this.$emit('tabs', config)
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
    // 打开商品预览
    handleView(goods_id) {
      this.$router.push({
        name: 'goods-admin-view',
        params: { goods_id }
      })
    },
    // 批量设置上下架状态
    handleStatus(val, status) {
      let goods_id = this._getIdList(val)
      if (goods_id.length === 0) {
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
          setShelvesGoodsList(goods_id, status)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (goods_id.indexOf(this.currentTableData[i].goods_id) !== -1) {
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
    // 批量设置是否推荐
    handleRecommend(val, isRecommend) {
      let goods_id = this._getIdList(val)
      if (goods_id.length === 0) {
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
          setRecommendGoodsList(goods_id, isRecommend)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (goods_id.indexOf(value.goods_id) !== -1) {
                  this.$set(this.currentTableData, index, {
                    ...value,
                    is_recommend: isRecommend
                  })
                }
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量设置是否新品
    handleNew(val, isNew) {
      let goods_id = this._getIdList(val)
      if (goods_id.length === 0) {
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
          setNewGoodsList(goods_id, isNew)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (goods_id.indexOf(value.goods_id) !== -1) {
                  this.$set(this.currentTableData, index, {
                    ...value,
                    is_new: isNew
                  })
                }
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量设置是否热卖
    handleHot(val, isHot) {
      let goods_id = this._getIdList(val)
      if (goods_id.length === 0) {
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
          setHotGoodsList(goods_id, isHot)
            .then(() => {
              this.currentTableData.forEach((value, index) => {
                if (goods_id.indexOf(value.goods_id) !== -1) {
                  this.$set(this.currentTableData, index, {
                    ...value,
                    is_hot: isHot
                  })
                }
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除或恢复
    handleDelete(val, isDelete) {
      let goods_id = this._getIdList(val)
      if (goods_id.length === 0) {
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
          let status = null
          switch (this.tabPane) {
            case 'sale':
            case 'stock':
              status = 1
              break

            case 'delete':
              status = isDelete ? 2 : 0
              break
          }

          delGoodsList(goods_id, status)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (goods_id.indexOf(this.currentTableData[i].goods_id) !== -1) {
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
    // 设置排序值
    handleSort(index) {
      setGoodsSort(
        this.currentTableData[index].goods_id,
        this.currentTableData[index].sort
      )
    },
    // 复制一个商品
    handleCopy(goods_id) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          copyGoodsItem(goods_id)
            .then(res => {
              this.currentTableData.unshift({
                ...res.data,
                sales_sum: 0,
                comment_sum: 0
              })

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 修改商品名称对话框
    setGoodsName(val) {
      const data = this.currentTableData[val]
      this.nameForm = {
        goods_id: data.goods_id,
        name: data.name,
        index: val
      }

      this.$nextTick(() => {
        this.$refs.name.clearValidate()
        this.$refs.nameInput.select()
      })

      this.dialogLoading = false
      this.nameFormVisible = true
    },
    // 请求修改商品名称
    handleSetName() {
      this.$refs.name.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          const index = this.nameForm.index

          setGoodsItem({ ...this.nameForm })
            .then(() => {
              this.currentTableData[index].name = this.nameForm.name
              this.nameFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 修改商品促销名
    setGoodsProduct(val) {
      const data = this.currentTableData[val]
      this.productForm = {
        goods_id: data.goods_id,
        product_name: data.product_name,
        index: val
      }

      this.$nextTick(() => {
        this.$refs.product.clearValidate()
        this.$refs.productInput.select()
      })

      this.dialogLoading = false
      this.productFormVisible = true
    },
    // 请求修改商品促销名
    handleSetProduct() {
      this.$refs.product.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          const index = this.productForm.index

          setGoodsItem({ ...this.productForm })
            .then(() => {
              this.currentTableData[index].product_name = this.productForm.product_name
              this.productFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 修改商品价格或库存
    setGoodsPriceOrStore(index) {
    },
    // 新增商品
    handleCreate() {
      this.$router.push({
        name: 'goods-admin-create'
      })
    },
    // 编辑商品
    handleEdit(key) {
      this.$router.push({
        name: 'goods-admin-update',
        params: {
          goods_id: key
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
  .el-table /deep/ td {
    background-color: #ffffff !important;
  }
  .goods-summary {
    color: $color-text-placehoder;
    font-size: 13px;
  }
  .goods-shop-price {
    color: $color-danger;
  }
  .goods-image {
    float: left;
    width: 80px;
    height: 80px;
    &:hover {
      cursor: pointer;
    }
  }
  .goods-info {
    float: left;
    width: 70%;
    .son {
      color: $color-text-sub;
      font-size: 13px;
    }
    p {
      margin: 0;
      .link {
        &:hover {
          cursor: pointer;
          color: $color-primary;
          text-decoration: underline;
        }
      }
    }
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: inline;
  }
  .goods-edit {
    padding-left: 5px;
    font-size: 13px;
    color: $color-info;
    &:hover {
      cursor: pointer;
      color: $color-primary;
    }
  }
</style>
