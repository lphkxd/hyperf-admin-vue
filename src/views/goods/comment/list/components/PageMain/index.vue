<template>
  <div class="cs-p">
    <el-table
      v-loading="loading"
      :data="currentTableData">
      <el-table-column
        label="商品信息"
        min-width="380">
        <template slot-scope="scope">
          <el-image
            class="goods-image cs-ml-10"
            @click="handleView(scope.row.get_order_goods.goods_id)"
            :src="scope.row.get_order_goods.goods_image | getPreviewUrl('goods_image_x80')"
            fit="contain"
            lazy/>

          <div class="goods-info cs-ml">
            <p>
              <span
                @click="handleView(scope.row.get_order_goods.goods_id)"
                :title="scope.row.get_order_goods.goods_name"
                class="link">{{scope.row.get_order_goods.goods_name}}</span>
            </p>
            <p>
              <span
                :title="scope.row.get_order_goods.key_value"
                class="comment-son">{{scope.row.get_order_goods.key_value}}</span>
            </p>
            <p>
              <el-tag
                :type="statusMap[scope.row.status].type"
                effect="plain"
                size="mini">
                {{statusMap[scope.row.status].text}}
              </el-tag>

              <el-tag
                size="mini"
                :type="topMap[scope.row.is_top].type"
                style="margin: 0 10px;"
                :style="auth.top || auth.remove_top ? 'cursor: pointer;' : ''"
                :effect="auth.top || auth.remove_top ? 'light' : 'plain'"
                @click.native="handleTop(scope.$index)">
                {{topMap[scope.row.is_top].text}}
              </el-tag>

              <el-tag
                size="mini"
                :type="showMap[scope.row.is_show].type"
                :style="auth.show || auth.hide ? 'cursor: pointer;' : ''"
                :effect="auth.show || auth.hide ? 'light' : 'plain'"
                @click.native="handleShow(scope.$index)">
                {{showMap[scope.row.is_show].text}}
              </el-tag>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="商品评价"
        min-width="300">
        <template slot-scope="scope">
          <div class="goods-comment">
            <p>[主评] <span class="comment-son">{{scope.row.create_time}}</span></p>
            <p>
              <span
                @click="openCommentDetail(scope.row.goods_comment_id)"
                :class="{link: auth.detail}">{{scope.row.content}}</span>
            </p>
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
            <p>[追评] <span class="comment-son">{{scope.row.get_addition.create_time}}</span></p>
            <p>
              <span
                @click="openCommentDetail(scope.row.goods_comment_id)"
                :class="{link: auth.detail}">{{scope.row.get_addition.content}}</span>
            </p>
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
        width="220">
        <template slot-scope="scope">
          <div class="goods_user">
            <p>
              <span>{{scope.row.get_user.username}}</span>
              <el-image
                v-if="scope.row.get_user.level_icon"
                class="level-icon"
                :src="scope.row.get_user.level_icon"
                fit="fill">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </p>
            <p><span class="comment-son">{{scope.row.order_no}}</span></p>
            <el-rate
              v-model="scope.row.score"
              :disabled="true"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.status && auth.ignore"
            @click="handleIgnore(scope.$index)"
            size="small"
            type="text">忽略</el-button>

          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.$index)"
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
import {
  delGoodsCommentItem,
  setGoodsCommentShow,
  setGoodsCommentStatus,
  setGoodsCommentTop
} from '@/api/goods/comment'

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
      auth: {
        ignore: false,
        show: false,
        hide: false,
        top: false,
        remove_top: false,
        del: false,
        detail: false
      },
      srcList: [],
      statusMap: {
        0: {
          text: '待处理',
          type: 'warning'
        },
        1: {
          text: '已处理',
          type: 'success'
        }
      },
      topMap: {
        0: {
          text: '普通',
          type: 'info'
        },
        1: {
          text: '置顶',
          type: 'warning'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
      showMap: {
        0: {
          text: '隐藏',
          type: 'danger'
        },
        1: {
          text: '显示',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      }
    }
  },
  filters: {
    getPreviewUrl(val, code) {
      if (val && val.source) {
        return util.getImageCodeUrl(val.source, code)
      }

      return ''
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
      this.auth.ignore = this.$has('/goods/opinion/comment/ignore')
      this.auth.show = this.$has('/goods/opinion/comment/show')
      this.auth.hide = this.$has('/goods/opinion/comment/hide')
      this.auth.top = this.$has('/goods/opinion/comment/top')
      this.auth.remove_top = this.$has('/goods/opinion/comment/remove_top')
      this.auth.del = this.$has('/goods/opinion/comment/del')
      this.auth.detail = this.$has('/goods/opinion/comment/detail')
    },
    // 设置大图预览列表及顺序
    setImageSrcList(srcList, index) {
      this.srcList = util.setImageSrcList(srcList, index)
    },
    // 忽略评论
    handleIgnore(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setGoodsCommentStatus([this.currentTableData[index].goods_comment_id], 1)
            .then(() => {
              this.currentTableData[index].status = 1
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 删除评论
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delGoodsCommentItem(this.currentTableData[index].goods_comment_id)
            .then(() => {
              this.currentTableData.splice(index, 1)
              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 打开评论详细
    openCommentDetail(comment_id) {
      if (!this.auth.detail) {
        return
      }

      this.$router.push({
        name: 'goods-opinion-comment-detail',
        params: {
          goods_comment_id: comment_id
        }
      })
    },
    // 设置是否置顶
    handleTop(index) {
      const data = this.currentTableData[index]
      const oldTop = data.is_top
      const newTop = oldTop ? 0 : 1

      if (oldTop > 1) {
        return
      }

      if (newTop === 0 && !this.auth.remove_top) {
        return
      }

      if (newTop === 1 && !this.auth.top) {
        return
      }

      data.is_top = 2
      setGoodsCommentTop([data.goods_comment_id], newTop)
        .then(() => {
          data.is_top = newTop
          this.$message.success('操作成功')
        })
        .catch(() => {
          data.is_top = oldTop
        })
    },
    // 设置是否显示
    handleShow(index) {
      const data = this.currentTableData[index]
      const oldShow = data.is_show
      const newShow = oldShow ? 0 : 1

      if (oldShow > 1) {
        return
      }

      if (newShow === 0 && !this.auth.hide) {
        return
      }

      if (newShow === 1 && !this.auth.show) {
        return
      }

      data.is_show = 2
      setGoodsCommentShow([data.goods_comment_id], newShow)
        .then(() => {
          data.is_show = newShow
          this.$message.success('操作成功')
        })
        .catch(() => {
          data.is_show = oldShow
        })
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
  .comment-son {
    color: $color-text-sub;
    font-size: 13px;
  }
  .goods-comment {
    margin: 10px 0;
    p {
      margin: 0;
      line-height: 1.3;
      .link {
        &:hover {
          cursor: pointer;
          color: $color-primary;
          text-decoration: underline;
        }
      }
    }
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
  .goods_user p {
    margin: 0;
  }
  .level-icon {
    margin-left: 5px;
    line-height: 0;
    vertical-align: text-bottom;
  }
</style>
