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

      <el-form-item v-if="auth.read || auth.read_all">
        <el-button-group>
          <el-button
            v-if="auth.read"
            :disabled="loading"
            @click="handleRead">
            标记已读
          </el-button>

          <el-button
            v-if="auth.read_all"
            :disabled="loading"
            @click="handleReadAll">
            全部已读
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item v-if="auth.del || auth.del_all">
        <el-button-group>
          <el-button
            v-if="auth.del"
            :disabled="loading"
            @click="handleDelete">
            批量删除
          </el-button>

          <el-button
            v-if="auth.del_all"
            :disabled="loading"
            @click="handleDeleteAll">
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
      class="tab-box">
      <el-tab-pane
        v-for="(item, index) in typeData"
        :key="index"
        :label="item | getTabPaneName(unreadData)"
        :name="index.toString()">

        <el-table
          v-if="index.toString() === tabPane"
          :data="currentTableData"
          :highlight-current-row="true"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column type="selection" width="30"/>

          <el-table-column
            align="center"
            width="20">
            <template slot-scope="scope">
              <el-badge v-if="!scope.row.is_read" class="message-badge" is-dot type="primary"/>
            </template>
          </el-table-column>

          <el-table-column
            label="标题"
            prop="title">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.url" placement="top" :content="`外部链接：${scope.row.url}`">
                <cs-icon name="link"/>
              </el-tooltip>
              <span
                @click="openMessage(scope.$index)"
                :class="`message-title ${scope.row.is_read ? 'read' : ''}`">
                {{scope.row.title}}
              </span>
              <el-badge v-if="scope.row.is_top" value="Top"/>
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
import {
  setMessageUserRead,
  setMessageUserAllread,
  delMessageUserList,
  delMessageUserAll,
  getMessageUserItem
} from '@/api/message/message'
import { getMessageType } from '@/api/public'

export default {
  created() {
    getMessageType()
      .then(res => {
        this.typeList = res || {}
      })
      .then(() => {
        this._validationAuth()
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
      },
      auth: {
        read: false,
        read_all: false,
        del: false,
        del_all: false
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
        this.multipleSelection = []
      },
      immediate: true
    },
    'form.is_read': {
      handler(val) {
        this.form.is_read = val
        this.$emit('submit', true)
      }
    },
    tabPane: {
      handler(index) {
        if (!this.typeData.hasOwnProperty(index)) {
          return
        }

        const tabType = this.typeData[index]
        this.form.type = tabType.value !== 'total' ? tabType.value : null
        this.$emit('submit', true, true)
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
    // 验证权限
    _validationAuth() {
      this.auth.read = this.$has('/system/message/user/read')
      this.auth.read_all = this.$has('/system/message/user/read_all')
      this.auth.del = this.$has('/system/message/user/del')
      this.auth.del_all = this.$has('/system/message/user/del_all')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.message_id)
        })
      } else {
        idList.push(this.currentTableData[val].message_id)
      }

      return idList
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
    // 将本地消息设为已读
    setMessageRead(index) {
      const { type } = this.currentTableData[index]
      this.currentTableData[index].is_read = 1
      this.$emit('minus', type, 1)
    },
    // 打开消息
    openMessage(index) {
      let message = this.currentTableData[index]
      if (!message.is_read) {
        this.setMessageRead(index)
      }

      if (message.url) {
        getMessageUserItem(message.message_id)
        this.$open(message.url)
        return
      }

      this.$router.push({
        name: 'system-message-user-view',
        params: {
          message_id: message.message_id
        }
      })
    },
    // 标记已读
    handleRead() {
      let messageId = this._getIdList(null)
      if (messageId.length === 0) {
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
          setMessageUserRead(messageId)
            .then(() => {
              this.$emit('submit')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 全部已读
    handleReadAll() {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setMessageUserAllread()
            .then(() => {
              this.$emit('submit')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete() {
      let messageId = this._getIdList(null)
      if (messageId.length === 0) {
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
          delMessageUserList(messageId)
            .then(() => {
              this.$emit('submit', true)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 全部删除
    handleDeleteAll() {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delMessageUserAll()
            .then(() => {
              this.$emit('submit', true)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .message-badge {
    display: inline-flex;
  }
  .message-title:hover {
    color: $color-primary;
    cursor: pointer;
    text-decoration: underline;
  }
  .read {
    color: $color-text-placehoder;
  }
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
</style>
