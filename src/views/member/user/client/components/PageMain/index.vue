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
          新增账号
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="check"/>
            启用
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="close"/>
            禁用
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
      :data="currentTableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      stripe>

      <el-table-column type="selection" width="55"/>

      <el-table-column
        label="账号"
        prop="username"
        sortable="custom"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.head_pic"
            width="150"
            placement="right"
            trigger="hover">
            <div class="popover-image">
              <el-image
                :src="scope.row.head_pic | getPreviewUrl"
                @click.native="$preview(scope.row.head_pic)"/>
            </div>
            <cs-icon slot="reference" name="user-circle"/>
          </el-popover>
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column
        label="昵称"
        prop="nickname"
        sortable="custom"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="手机号"
        prop="mobile"
        sortable="custom"
        min-width="100">
      </el-table-column>

      <el-table-column
        label="账号等级"
        prop="user_level_id"
        sortable="custom"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.get_user_level.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="性别"
        prop="sex"
        align="center"
        width="50">
        <template slot-scope="scope">
          {{sexMap[scope.row.sex]}}
        </template>
      </el-table-column>

      <el-table-column
        label="登陆IP"
        prop="last_ip"
        width="150">
      </el-table-column>

      <el-table-column
        label="最后登陆"
        prop="last_login"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        sortable="custom"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type"
            style="cursor: pointer;"
            @click.native="switchStatus(scope.$index)">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="() => {}"
            type="text">编辑</el-button>

          <el-button
            size="small"
            @click="() => {}"
            type="text">删除</el-button>

          <el-button
            size="small"
            @click="() => {}"
            type="text">更多操作</el-button>
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
    group: {
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
      auth: {},
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑账号',
        create: '新增账号'
      },
      statusMap: {
        0: {
          text: '禁用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
      sexMap: {
        0: '保密',
        1: '男',
        2: '女'
      },
      form: {
      },
      rules: {
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
    getPreviewUrl(val) {
      return util.getImageCodeUrl(val, 'head_pic')
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
    _getClientIdList(val) {
      let clients = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          clients.push(value.user_id)
        })
      } else {
        clients.push(this.currentTableData[val].user_id)
      }

      return clients
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
</style>
