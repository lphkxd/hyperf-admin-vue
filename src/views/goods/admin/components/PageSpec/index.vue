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
        <el-menu unique-opened>
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
                :index="`${key}-${item.spec_id}`">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="16">
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
    }
  }
}
</script>
