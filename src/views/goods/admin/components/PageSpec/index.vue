<template>
  <el-dialog
    title="导入规格项"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @open="getSpecAll"
    width="700px">

    <el-row class="tac" style="margin-top: -25px;">
      <el-col :span="8">
        <el-menu
          class="el-card"
          @select="handleSelect"
          unique-opened>
          <el-submenu
            v-for="(value, key) in specList"
            :key="key"
            :index="key.toString()">
            <template slot="title">
              <span>{{value.name}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item
                v-for="(item, index) in value.item"
                :key="index"
                :index="`${key}-${index}`">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="16">
        <el-card
          class="box-card"
          shadow="never">
          <div slot="header" class="clearfix">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              style="padding-top: 1px;"
              @change="handleCheckAllChange">全选</el-checkbox>

            <span class="cs-fr">{{specItem.spec_type | getSpecType}}</span>
          </div>

          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="(value, index) in specItem.spec_item"
              :key="value.spec_item_id"
              :label="index.toString()" >
              {{value.item_name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button
        @click="dialogVisible = false"
        size="small">取消</el-button>

      <el-button
        type="primary"
        @click="handleConfirm"
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
      specItem: {},
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
      dialogVisible: false
    }
  },
  filters: {
    getSpecType(type) {
      const typeMap = { 0: '文字', 1: '图片', 2: '颜色' }
      if (typeMap.hasOwnProperty(type)) {
        return typeMap[type]
      }

      return ''
    }
  },
  methods: {
    handleVisible() {
      this.checkAll = false
      this.isIndeterminate = false
      this.checkedCities = []
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
    handleSelect(key) {
      this.checkAll = false
      this.isIndeterminate = false
      this.checkedCities = []

      const idx = key.split('-')
      this.specItem = this.specList[idx[0]]['item'][idx[1]]
    },
    handleCheckAllChange(val) {
      if (!this.specItem.spec_item) {
        return
      }

      this.checkedCities = val ? Object.keys(this.specItem.spec_item) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      let specItemCount = this.specItem.spec_item.length

      this.checkAll = checkedCount === specItemCount
      this.isIndeterminate = checkedCount > 0 && checkedCount < specItemCount
    },
    handleConfirm() {
      if (this.checkedCities.length > 0) {
        let specItem = []
        this.checkedCities.forEach(value => {
          if (this.specItem.spec_item.hasOwnProperty(value)) {
            specItem.push(this.specItem.spec_item[value])
          }
        })

        let data = { ...this.specItem, spec_item: specItem }
        this.$emit('confirm', data)
      }

      this.dialogVisible = false
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
    height: 400px;
    margin-left: -1px;
  }
</style>
