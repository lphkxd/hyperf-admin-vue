<template>
  <el-dialog
    title="资源选取"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="769px">

    <!-- 搜索框开始 -->
    <el-form :model="form" style="margin-top: -25px;" size="small" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <el-button-group>
              <el-button
                @click="allCheckBox">
                <cs-icon name="check-square-o"/>
                全选
              </el-button>

              <el-button
                @click="reverseCheckBox">
                <cs-icon name="minus-square-o"/>
                反选
              </el-button>

              <el-button
                @click="cancelCheckBox">
                <cs-icon name="square-o"/>
                取消
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="输入资源名称进行搜索"
              @keyup.enter.native="handleSearch()"
              :clearable="true"
              size="small">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 面包屑开始 -->
    <el-breadcrumb class="breadcrumb cs-mb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <a style="cursor: pointer;" @click="switchDirectory(0)">资源管理</a>
      </el-breadcrumb-item>

      <el-breadcrumb-item
        v-for="item in naviData"
        :key="item.storage_id">
        <a style="cursor: pointer;" @click="switchDirectory(item.storage_id)">{{item.name}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 资源列表开始 -->
    <el-checkbox-group v-model="checkList">
      <ul class="storage-list" v-loading="loading">
        <li v-for="(item, index) in currentTableData" :key="index">
          <dl>
            <dt>
              <div class="picture cs-m-5">
                <el-checkbox v-if="item.type !== 2" :label="item.storage_id" class="check">&nbsp;</el-checkbox>
                <el-image fit="fill" :src="item | getImageThumb" @click.native="handleOpen(index)" lazy/>
              </div>
              <el-tooltip placement="top" :enterable="false" :open-delay="300">
                <div slot="content">
                  <span>名称：{{item.name}}</span><br/>
                  <span>日期：{{item.create_time}}</span><br/>
                  <span v-if="item.type === 0">尺寸：{{`${item.pixel['width']},${item.pixel['height']}`}}</span>
                  <span v-else>类型：<cs-icon :name="item.type | getFileTypeIocn"/></span>
                </div>
                <span class="storage-name cs-ml-5">{{item.name}}</span>
              </el-tooltip>
            </dt>
          </dl>
        </li>
      </ul>
    </el-checkbox-group>

    <!-- 翻页开始 -->
    <page-footer
      style="margin: 0; padding: 20px 0 0 0;"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>

    <!-- 确认,取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="visible = false"
        size="small">取消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
        size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import storage from '@/views/system/storage/storage/components/mixins'
import { getStorageNavi, getStorageList } from '@/api/upload/storage'

export default {
  name: 'cs-storage',
  mixins: [storage],
  components: {
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  props: {
    // 确认按钮事件
    confirm: {
      type: Function
    }
  },
  data() {
    return {
      visible: false,
      loading: true,
      naviData: [],
      checkList: [],
      currentTableData: [],
      isCheckDirectory: false,
      storageType: [],
      form: {
        name: '',
        storage_id: 0,
        order_type: 'desc',
        order_field: 'storage_id'
      },
      page: {
        current: 1,
        size: 48,
        total: 0
      }
    }
  },
  watch: {
    'form.storage_id': {
      handler(val) {
        getStorageNavi(val)
          .then(res => {
            this.naviData = res.data
          })
      }
    }
  },
  methods: {
    handleStorageDlg() {
      this.visible = true
      this.handleSubmit()
    },
    switchDirectory(val) {
      this.form.name = null
      this.form.storage_id = val || 0
      this.handleSubmit()
    },
    handleOpen(key) {
      if (this.currentTableData[key].type === 2) {
        this.switchDirectory(this.currentTableData[key].storage_id)
      }
    },
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    handleSubmit() {
      this.checkList = []
      this.loading = true

      getStorageList({
        ...this.form,
        type: this.storageType,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data['total_result']
          this.currentTableData = res.data['total_result'] > 0 ? res.data['items'] : []
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleConfirm() {
      let data = []
      // eslint-disable-next-line no-unused-vars
      for (const value of this.currentTableData) {
        if (this.checkList.indexOf(value.storage_id) !== -1) {
          data.push(value)
        }
      }

      this.visible = false
      this.$emit('confirm', data)
    },
    handleSearch() {
      this.page.current = 1
      this.form.storage_id = 0
      this.handleSubmit()
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    background-color: #fff;
    border: 1px solid $color-border-1;
    padding: 10px !important;
  }
  .storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 1px 0 0 1px;
    background-color: #fff;
  }
  .storage-list li {
    float: left;
    opacity: 1;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 0 1px 1px 0;
  }
  .storage-list>li:hover {
    background-color: $color-bg;
  }
  .storage-list li dl dt .picture {
    border: none;
  }
  .storage-list li dl dt .covers .el-image,
  .storage-list li dl dt .picture .el-image {
    background-color: #F5F7FA;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 80px;
    height: 80px;
    overflow: hidden;
    cursor: pointer;
  }
  .storage-list li:after {
    content: "";
    height: 100%;
  }
  .storage-list li:after,
  .storage-list li span {
    display: inline-block;
    vertical-align: middle;
  }
  .storage-list li span {
    line-height: normal;
    color: $color-text-sub;
    transition: color .15s linear;
  }
  .storage-list .storage-name {
    color: $color-text-main;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    font-size: 12px;
    width: 80px;
    height: 20px;
  }
  .check {
    position: absolute;
    margin: 0 0 0 2px;
    width: 78px;
    height: 80px;
    z-index: 9;
  }
  .el-image /deep/ .el-image__inner {
    width: auto;
    height: auto;
    max-width: 80px;
    max-height: 80px;
  }
</style>
