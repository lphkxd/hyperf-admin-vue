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
          新增区域
        </el-button>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @selection-change="handleSelectionChange"
      stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="所辖区域">
              <el-tag
                v-for="item in props.row.region"
                :key="item.region_id"
                effect="plain"
                type="info"
                class="cs-mr-10">
                {{item.name}}
              </el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        prop="name"
        min-width="150">
      </el-table-column>

      <el-table-column label="运费" align="center">
        <el-table-column
          label="首重运费"
          prop="first_weight_price">
        </el-table-column>

        <el-table-column
          label="续重运费"
          prop="second_weight_price">
        </el-table-column>

        <el-table-column
          label="首件运费"
          prop="first_item_price">
        </el-table-column>

        <el-table-column
          label="续件运费"
          prop="second_item_price">
        </el-table-column>

        <el-table-column
          label="首体积运费"
          prop="first_volume_price">
        </el-table-column>

        <el-table-column
          label="续体积运费"
          prop="second_volume_price">
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="140">
        <template
          v-if="scope.row.delivery_area_id"
          slot-scope="scope">
          <el-button
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>

          <el-button
            @click="handleArea(scope.$index)"
            size="small"
            type="text">区域管理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHelpRouter } from '@/api/index/help'

export default {
  components: {
    'csRegion': () => import('@/components/cs-region')
  },
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
      multipleSelection: [],
      helpContent: ''
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      }
    }
  },
  methods: {
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand >>> label {
    width: auto;
    color: #99a9bf;
  }
</style>
