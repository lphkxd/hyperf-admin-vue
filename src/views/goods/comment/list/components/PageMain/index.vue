<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="currentTableData">
      <el-table-column
        label="商品评价"
        width="400">
        <template slot-scope="scope">
          <div class="goods-comment">
            <p>[主评] <span>{{scope.row.create_time}}</span></p>
            <p>{{scope.row.content}}</p>
            <el-image
              v-for="(item, index) in scope.row.image"
              :key="index"
              class="comment_thumb cs-mr-5"
              :src="item['source'] | getPreviewUrl('comment_thumb_x40')"
              fit="cover"
              lazy/>
          </div>

          <div class="goods-comment" v-if="scope.row.get_addition">
            <p>[追评] <span>{{scope.row.get_addition.create_time}}</span></p>
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
      auth: {}
    }
  },
  filters: {
    getPreviewUrl(val, code) {
      return util.getImageCodeUrl(val, code)
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
  }
  .goods-comment {
    margin-bottom: 10px;
  }
  .goods-comment p {
    margin: 0 0 8px 0;
    line-height: 1.3;
    span {
      color: $color-text-sub;
      font-size: 13px;
    }
  }
</style>
