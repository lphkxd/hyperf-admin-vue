<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item>
        <el-radio-group v-model="form.is_read" :disabled="loading">
          <el-radio-button :label="null">全部</el-radio-button>
          <el-radio-button label="0">未读</el-radio-button>
          <el-radio-button label="1">已读</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            标记已读
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            全部已读
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            批量删除
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            全部删除
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="$emit('submit')">
            刷新
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-tabs
      v-model="tabPane"
      v-loading="loading"
      type="border-card"
      style="box-shadow: 0 0;">
      <el-tab-pane
        v-for="(item, index) in typeData"
        :key="index"
        :label="item | getTabPaneName(unreadData)"
        :name="index.toString()">

        <el-table
          v-if="index.toString() === tabPane"
          :data="currentTableData"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">

          <el-table-column type="selection" width="55"/>

          <el-table-column
            align="center"
            width="20">
            <template slot-scope="scope">
              <el-badge class="message-badge" :is-dot="!scope.row.is_read" type="primary"/>
            </template>
          </el-table-column>

          <el-table-column
            label="标题"
            prop="title">
            <template slot-scope="scope">
              <span
                @click="openMessage"
                :class="`message-title ${scope.row.is_read ? 'read' : ''}`">
                {{scope.row.title}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="类型"
            prop="type"
            sortable="custom"
            width="200">
            <template slot-scope="scope">
              {{typeList[scope.row.type]}}
            </template>
          </el-table-column>

          <el-table-column
            label="日期"
            prop="create_time"
            sortable="custom"
            align="center"
            width="200">
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMessageType } from '@/api/public'

export default {
  created() {
    getMessageType()
      .then(res => {
        this.typeList = res
      })
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    unreadData: {
      default: () => {}
    },
    typeData: {
      default: () => []
    }
  },
  data() {
    return {
      tabPane: 0,
      typeList: {},
      currentTableData: [],
      multipleSelection: [],
      form: {
        type: null,
        is_read: null
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    },
    form: {
      handler(val) {
        this.form = val
        this.$emit('submit', true)
      },
      deep: true
    },
    tabPane: {
      handler(index) {
        if (!this.typeData.hasOwnProperty(index)) {
          return
        }

        const tabType = this.typeData[index]
        this.form.type = tabType.value !== 'total' ? tabType.value : null
      }
    }
  },
  filters: {
    getTabPaneName(value, unread) {
      if (!unread.hasOwnProperty(value.value) || unread[value.value] <= 0) {
        return value.name
      }

      return value.name + `(${unread[value.value]})`
    }
  },
  methods: {
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

      if (column) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 打开消息
    openMessage() {
      console.log('okok')
    }
  }
}
</script>

<style lang="scss" scoped>
  .message-badge {
    display: inline-flex;
  }
  .message-title {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    &.read {
      color: $color-text-sub;
    }
  }
</style>
