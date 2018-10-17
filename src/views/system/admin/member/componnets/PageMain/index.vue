<template>
  <div>
    <el-form
      :inline="true"
      size="mini">
      <el-button-group>
        <el-button
          size="mini"
          @click="() => {}">
          <cs-icon name="plus"/>
          新增
        </el-button>

        <el-button
          size="mini"
          @click="() => {}">
          <cs-icon name="check"/>
          启用
        </el-button>

        <el-button
          size="mini"
          @click="() => {}">
          <cs-icon name="times"/>
          禁用
        </el-button>

        <el-button
          size="mini"
          @click="() => {}">
          <cs-icon name="trash-o"/>
          删除
        </el-button>
      </el-button-group>

      <el-form-item style="float: right">
        <el-button
          circle
          @click="() =>{}">
          <cs-icon name="refresh"/>
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
}
</script>
