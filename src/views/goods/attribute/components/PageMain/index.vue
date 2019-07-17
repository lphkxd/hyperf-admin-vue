<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="plus"/>
          新增主属性
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="ban"/>
            不检索
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="bookmark-o"/>
            关键字
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="circle-o-notch"/>
            范围
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="loading"
          @click="() => {}">
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
      v-loading="loading"
      :data="currentTableData"
      row-key="goods_attribute_id"
      :tree-props="{children: 'get_attribute'}"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">

      <el-table-column type="selection" width="35"/>

      <el-table-column
        label="编号"
        prop="goods_attribute_id"
        sortable="custom"
        width="130">
      </el-table-column>

      <el-table-column
        width="35"
        align="right">
        <template slot-scope="scope">
          <cs-icon
            v-if="scope.row.is_important"
            class="important"
            name="star"/>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        prop="attr_name"
        sortable="custom"
        min-width="140">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.icon"
            width="150"
            placement="top"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.icon | getPreviewUrl"
                @click.native="$preview(scope.row.icon)"/>
            </div>
            <cs-icon class="cs-mr-5" slot="reference" name="image"/>
          </el-popover>

          <el-tooltip
            v-if="scope.row.description"
            :content="`描述：${scope.row.description}`"
            placement="top">
            <span>{{scope.row.attr_name}}</span>
          </el-tooltip>

          <span v-else>{{scope.row.attr_name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="所属模型"
        prop="goods_type_id"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
        <template slot-scope="scope">
          {{typeData[scope.row.goods_type_id]}}
        </template>
      </el-table-column>

      <el-table-column
        label="检索方式"
        width="100">
        <template slot-scope="scope">
          {{indexMap[scope.row.attr_index]}}
        </template>
      </el-table-column>

      <el-table-column
        label="录入方式"
        width="100">
        <template slot-scope="scope">
          {{inputMap[scope.row.attr_input_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="可选值"
        :show-overflow-tooltip="true"
        min-width="160">
        <template slot-scope="scope">
          {{scope.row.attr_values | getAttrValue}}
        </template>
      </el-table-column>

      <el-table-column
        label="排序值"
        prop="sort"
        sortable="custom"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-input-number
            v-if="auth.sort"
            v-model="scope.row.sort"
            style="width: 88px;"
            size="mini"
            controls-position="right"
            :min="0"
            :max="255"
            @change="() => {}">
          </el-input-number>
          <span v-else>
            {{scope.row.sort}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="160">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.parent_id"
            @click="() => {}"
            size="small"
            type="text">新增子属性</el-button>

          <el-button
            v-if="scope.row.parent_id"
            @click="() => {}"
            size="small"
            type="text">{{importantMap[scope.row.is_important]}}</el-button>

          <el-button
            @click="() => {}"
            size="small"
            type="text">编辑</el-button>

          <el-button
            @click="() => {}"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  props: {
    loading: {
      default: false
    },
    typeData: {
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
        sort: true
      },
      indexMap: {
        0: '不检索',
        1: '关键字',
        2: '范围'
      },
      inputMap: {
        0: '手工填写',
        1: '单选',
        2: '多选'
      },
      importantMap: {
        0: '设为核心',
        1: '取消核心'
      }
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
  filters: {
    getAttrValue(value) {
      if (value) {
        return value.join(',')
      }
    },
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val, 'goods_attribute')
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.goods_attribute_id)
        })
      } else {
        idList.push(this.currentTableData[val].goods_attribute_id)
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
    }
  }
}
</script>

<style scoped>
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
  .important {
    color: #E6A23C;
  }
</style>
