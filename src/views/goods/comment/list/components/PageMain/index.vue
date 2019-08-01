<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="currentTableData">
      <el-table-column
        label="商品评价"
        min-width="450">
        <template slot-scope="scope">
          <div class="goods-comment">
            <p>[主评] <span class="time">{{scope.row.create_time}}</span></p>
            <p>{{scope.row.content}}</p>
            <div style="line-height: 0;">
              <el-image
                v-for="(item, index) in scope.row.image"
                :key="index"
                class="comment_thumb"
                :src="item | getPreviewUrl('comment_thumb_x40')"
                :preview-src-list="srcList"
                :lazy="true"
                fit="cover"
                @click.stop="setImageSrcList(scope.row.image, index)"/>
            </div>
          </div>

          <div class="goods-comment" v-if="scope.row.get_addition">
            <p>[追评] <span class="time">{{scope.row.get_addition.create_time}}</span></p>
            <p>{{scope.row.get_addition.content}}</p>
            <div style="line-height: 0;">
              <el-image
                v-for="(item, index) in scope.row.get_addition.image"
                :key="index"
                class="comment_thumb"
                :src="item | getPreviewUrl('comment_thumb_x40')"
                :preview-src-list="srcList"
                :lazy="true"
                fit="cover"
                @click.stop="setImageSrcList(scope.row.get_addition.image, index)"/>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="商品信息"
        min-width="300">
        <template slot-scope="scope">
          <div>
            <el-image
              class="goods-image"
              :src="scope.row.get_order_goods.goods_image | getPreviewUrl('goods_image_x80')"
              fit="contain"
              lazy/>

            <div class="goods-info">
              <p>{{scope.row.get_order_goods.goods_name}}</p>
              <p>{{scope.row.get_order_goods.key_value}}</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            @click="() => {scope.row}"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from '@/utils/util'
import { mapActions } from 'vuex'

export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      auth: {},
      srcList: []
    }
  },
  filters: {
    getPreviewUrl(val, code) {
      if (val && val.source) {
        return util.getImageCodeUrl(val.source, code)
      }

      return null
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
  activated() {
    this.updateChange({
      name: 'goods-opinion-comment',
      source: this.currentTableData,
      key: 'goods_comment_id'
    })
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    ...mapActions('careyshop/update', [
      'updateChange'
    ]),
    // 验证权限
    _validationAuth() {
    },
    // 设置大图预览列表及顺序
    setImageSrcList(srcList, index) {
      if (!Array.isArray(srcList) || !srcList.length) {
        this.srcList = []
        return
      }

      const before = srcList.slice(index)
      const image = before.concat(srcList.slice(0, index))

      this.srcList = []
      image.forEach(value => {
        this.srcList.push(value['url'])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table /deep/ td {
    background-color: #ffffff !important;
  }
  .comment_thumb {
    width: 40px;
    height: 40px;
    margin: 5px 5px 0 0;
  }
  .comment_thumb /deep/ img {
    cursor: pointer;
  }
  .comment_thumb /deep/ .el-image__error {
    text-align: center;
    line-height: 1.4;
  }
  .goods-comment {
    margin: 10px 0;
    p {
      margin: 0;
      line-height: 1.3;
    }
    .time {
      color: $color-text-sub;
      font-size: 13px;
    }
  }
  .goods-image {
    width: 80px;
    height: 80px;
  }
  .goods-info {
  }
</style>
