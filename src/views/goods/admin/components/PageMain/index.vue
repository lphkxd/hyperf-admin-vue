<template>
  <div class="cs-p">
    <el-form :inline="true" size="small">
      <el-form-item v-if="tabPane !== 'delete'">
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="plus"/>
          新增商品
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'stock'">
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="level-up"/>
          上架
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'sale'">
        <el-button
          :disabled="loading"
          @click="() => {}">
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
            <el-dropdown-item>设为推荐</el-dropdown-item>
            <el-dropdown-item>取消推荐</el-dropdown-item>
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
            <el-dropdown-item>设为新品</el-dropdown-item>
            <el-dropdown-item>取消新品</el-dropdown-item>
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
            <el-dropdown-item>设为热卖</el-dropdown-item>
            <el-dropdown-item>取消热卖</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="trash-o"/>
            {{tabPane === 'delete' ? '彻底删除' : '删除'}}
          </el-button>

          <el-button
            v-if="tabPane === 'delete'"
            :disabled="loading"
            @click="() => {}">
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
            label="商品"
            prop="goods_id"
            sortable="custom"
            min-width="300">
            <template slot-scope="scope">
              <el-image
                class="goods-image cs-ml-10"
                @click="handleView(scope.row.goods_id)"
                :src="scope.row.attachment | getPreviewUrl"
                fit="contain"
                lazy/>

              <div class="goods-info cs-ml">
                <p>
                  <span
                    @click="handleView(scope.row.goods_id)"
                    class="link">{{scope.row.name}}</span>
                </p>

                <p><span class="son">{{scope.row.product_name}}</span></p>
                <p><span class="son">{{scope.row.goods_code}}</span></p>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import util from '@/utils/util'

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
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .link {
        &:hover {
          cursor: pointer;
          color: $color-primary;
          text-decoration: underline;
        }
      }
    }
  }
</style>
