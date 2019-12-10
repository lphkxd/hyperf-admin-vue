<template>
  <el-dialog
    title="规格项导入"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @open="getSpecAll"
    width="700px">

    <el-row class="tac">
      <el-col :span="8">
        <el-menu
          class="el-card"
          @select="handleSelect"
          unique-opened>
          <el-submenu
            v-for="(value, key) in specList"
            :key="key"
            :index="key">
            <template slot="title">
              <span>{{value.name}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item
                v-for="item in value.item"
                :key="item.spec_id"
                :index="`${item.spec_id}`">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="16">
        <el-card
          class="box-card"
          shadow="never">
          <div slot="header" class="clearfix">
            <span>全选</span>
            <span class="cs-fr">操作按钮</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button
        @click="dialogVisible = false"
        size="small">取消</el-button>

      <el-button
        type="primary"
        @click="() => {}"
        size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getGoodsSpecAll } from '@/api/goods/spec'

export default {
  data() {
    return {
      specList: [],
      dialogVisible: false
    }
  },
  methods: {
    handleVisible() {
      this.dialogVisible = true
    },
    getSpecAll() {
      if (this.specList.length <= 0) {
        this.specList = []
        getGoodsSpecAll()
          .then(res => {
            this.specList = res.data || []
          })
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .tac >>> .el-card{
    border-radius: 0;
  }
  .box-card {
    height: 300px;
    margin-left: -1px;
  }
</style>
