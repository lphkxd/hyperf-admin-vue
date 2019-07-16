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
      @sort-change="sortChange"
      stripe>

      <el-table-column type="selection" width="55"/>

      <el-table-column
        label="编号"
        prop="goods_attribute_id"
        sortable="custom"
        width="160">
      </el-table-column>

      <el-table-column
        label="名称"
        prop="attr_name"
        sortable="custom">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    typeData: {
      default: () => []
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
