<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.show || auth.hide">
        <el-button-group>
          <el-button
            v-if="auth.show"
            :disabled="loading"
            @click="handleShow(null, 1, true)">
            <cs-icon name="eye"/>
            显示
          </el-button>

          <el-button
            v-if="auth.hide"
            :disabled="loading"
            @click="handleShow(null, 0, true)">
            <cs-icon name="eye-slash"/>
            隐藏
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
      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="商品咨询"
        min-width="550">
        <template slot-scope="scope">
          <el-image
            class="goods-image"
            :src="scope.row.get_goods.attachment | getPreviewUrl"
            lazy/>

          <div class="goods-info">
            <div><span>{{scope.row.get_goods.name}}</span></div>
            <div class="consult-content">
              <p>{{scope.row.content}}</p>
              <p>{{scope.row.create_time}}</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        align="center"
        sortable="custom"
        width="100">
        <template slot-scope="scope">
          <el-tag
            :type="statusMap[scope.row.status].type"
            size="mini">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="前台"
        prop="is_show"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="showMap[scope.row.is_show].type"
            :style="auth.show || auth.hide ? 'cursor: pointer;' : ''"
            @click.native="handleShow(scope.$index)">
            {{showMap[scope.row.is_show].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="auth.detail"
            @click="openConsultDetail(scope.row.goods_consult_id)"
            size="small"
            type="text">明细</el-button>

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
        detail: true
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
    getPreviewUrl(val) {
      if (Array.isArray(val) && val.length > 0) {
        return util.getImageCodeUrl(val[0]['source'], 'goods_image_x80')
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

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 打开咨询明细
    openConsultDetail(consult_id) {
      this.$router.push({
        name: 'goods-opinion-consult-detail',
        params: {
          goods_consult_id: consult_id
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-table >>> td {
    background-color: #ffffff !important;
  }
  .goods-image {
    float: left;
    width: 80px;
    height: 80px;
  }
  .goods-info {
    float: left;
    width: 80%;
    margin-left: 20px;
  }
  .consult-content {
    color: #909399;
    font-size: 13px;
  }
  .consult-content p {
    margin: 10px 0 10px 0;
    line-height: 1.3;
  }
</style>
