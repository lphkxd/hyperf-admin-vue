<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.del">
        <el-button
          :disabled="loading"
          @click="handleDelete(null)">
          <cs-icon name="trash-o"/>
          批量删除
        </el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="商品咨询"
        min-width="550">
        <template slot-scope="scope">
          <div class="goods-consult">
            <el-image
              class="goods-image"
              @click="handleView(scope.row.get_goods.goods_id)"
              :src="scope.row.get_goods.attachment | getPreviewUrl"
              fit="contain"
              lazy/>

            <div class="goods-info cs-ml">
              <span
                @click="handleView(scope.row.get_goods.goods_id)"
                :title="scope.row.get_goods.name"
                class="link">{{scope.row.get_goods.name}}</span>
              <div class="consult-content">
                <p>
                  <el-tag
                    :type="statusMap[scope.row.status].type"
                    effect="plain"
                    size="mini">
                    {{statusMap[scope.row.status].text}}
                  </el-tag>

                  <span
                    @click="openConsultDetail(scope.row.goods_consult_id)"
                    :class="{title: auth.detail}"
                    :title="scope.row.content"
                    class="cs-pl-5">{{scope.row.content}}</span>
                </p>
                <p>{{scope.row.create_time}}</p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="130">
        <template slot-scope="scope">
          <div class="user-info">
            <p>
              <span>{{scope.row.get_user.username || '游客'}}</span>
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

            <p>{{typeList[scope.row.type]}}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            v-if="auth.show || auth.hide"
            @click="handleShow(scope.$index)"
            size="small"
            type="text">{{scope.row.is_show ? '隐藏' : '显示'}}</el-button>

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
import { delGoodsConsultList, setGoodsConsultShow } from '@/api/goods/consult'

export default {
  props: {
    loading: {
      default: false
    },
    typeList: {
      default: () => {}
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {
        show: false,
        hide: false,
        del: false,
        detail: false
      },
      statusMap: {
        0: {
          text: '待回复',
          type: 'warning'
        },
        1: {
          text: '已回复',
          type: 'success'
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
      },
      immediate: true
    }
  },
  activated() {
    this.updateChange({
      name: 'goods-opinion-consult',
      source: this.currentTableData,
      key: 'goods_consult_id'
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
      this.auth.show = this.$has('/goods/opinion/consult/show')
      this.auth.hide = this.$has('/goods/opinion/consult/hide')
      this.auth.del = this.$has('/goods/opinion/consult/del')
      this.auth.detail = this.$has('/goods/opinion/consult/detail')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.goods_consult_id)
        })
      } else {
        idList.push(this.currentTableData[val].goods_consult_id)
      }

      return idList
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量设置显示
    handleShow(val, is_show = 0, confirm = false) {
      let goods_consult_id = this._getIdList(val)
      if (goods_consult_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setShow(goods_consult_id, is_show, vm) {
        setGoodsConsultShow(goods_consult_id, is_show)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (goods_consult_id.indexOf(value.goods_consult_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  is_show
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newShow = oldData.is_show ? 0 : 1

        if (oldData.is_show > 1) {
          return
        }

        // 禁用权限检测
        if (newShow === 0 && !this.auth.show) {
          return
        }

        // 启用权限检测
        if (newShow === 1 && !this.auth.hide) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, is_show: 2 })
        setShow(goods_consult_id, newShow, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setShow(goods_consult_id, is_show, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let goods_consult_id = this._getIdList(val)
      if (goods_consult_id.length === 0) {
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
          delGoodsConsultList(goods_consult_id)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (goods_consult_id.indexOf(this.currentTableData[i].goods_consult_id) !== -1) {
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
    // 打开咨询明细
    openConsultDetail(consult_id) {
      if (!this.auth.detail) {
        return
      }

      this.$router.push({
        name: 'goods-opinion-consult-detail',
        params: {
          goods_consult_id: consult_id
        }
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
  .goods-consult {
    height: 80px;
    margin: 10px 0;
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
    width: 80%;
    .link {
      &:hover {
        cursor: pointer;
        color: $color-primary;
        text-decoration: underline;
      }
    }
  }
  .consult-content {
    color: $color-text-sub;
    font-size: 13px;
  }
  .consult-content p {
    margin: 10px 0 0 0;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .title {
      &:hover {
        cursor: pointer;
        color: $color-primary;
        text-decoration: underline;
      }
    }
  }
  .user-info p {
    line-height: 1.3;
  }
  .level-icon {
    margin-left: 5px;
    line-height: 0;
    vertical-align: text-bottom;
  }
</style>
