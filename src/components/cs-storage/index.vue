<template>
  <el-dialog
    title="资源选取"
    :visible.sync="visible"
    :append-to-body="true"
    width="692px">

    <!-- 搜索框开始 -->
    <el-form :model="form" style="margin-top: -25px;" size="small">
      <el-row :gutter="20">
        <el-col :span="9">
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

        <el-col :span="15">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="输入资源名称进行搜索"
              size="small"
              clearable>
              <el-button slot="append" icon="el-icon-search" @click="handleSubmit"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 面包屑开始 -->
    <el-breadcrumb class="breadcrumb cs-mb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <a @click="switchDirectory(0)">资源管理</a>
      </el-breadcrumb-item>

      <el-breadcrumb-item
        v-for="item in naviData"
        :key="item.storage_id">
        <a @click="switchDirectory(item.storage_id)">{{item.name}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 资源列表开始 -->
    <el-checkbox-group v-model="checkList">
      <ul class="storage-list">
        <li v-for="(item, index) in currentTableData" :key="index">
          <dl>
            <dt>
              <div class="picture cs-m-5">
                <el-checkbox v-if="item.type !== 2" :label="item.storage_id" class="check">&nbsp;</el-checkbox>
                <el-tooltip placement="bottom" :enterable="false" :open-delay="500">
                  <div slot="content">
                    <span>资源名称：{{item.name}}</span><br/>
                    <span>创建日期：{{item.create_time}}</span><br/>
                    <span v-if="item.type === 0">原图尺寸：{{`${item.pixel['width']},${item.pixel['height']}`}}</span>
                    <span v-else>文件类型：<cs-icon :name="item.type === 1 ? 'file-o' : 'folder-o'"/></span>
                  </div>
                  <a @click="handleOpen(index)"><img :src="item | getImageThumb" alt=""></a>
                </el-tooltip>
              </div>
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
      naviData: [],
      checkList: [],
      currentTableData: [],
      isCheckDirectory: false,
      form: {
        name: '',
        storage_id: 0,
        order_type: 'desc',
        order_field: 'storage_id'
      },
      page: {
        current: 1,
        size: 100,
        total: 0
      }
    }
  },
  watch: {
    'form.storage_id': {
      handler(val) {
        getStorageNavi(val).then(res => { this.naviData = res.data })
      }
    }
  },
  methods: {
    handleStorageDlg() {
      this.visible = true
      if (!this.currentTableData.length) {
        this.handleSubmit()
      }
    },
    switchDirectory(val) {
      this.form.storage_id = val || 0
      this.handleSubmit()
    },
    handleOpen(key) {
      const storage = this.currentTableData[key]
      if (storage.type === 2) {
        this.switchDirectory(storage.storage_id)
        return
      }

      const pos = this.checkList.indexOf(storage.storage_id)
      if (pos === -1) {
        this.checkList.push(storage.storage_id)
      } else {
        this.checkList.splice(pos, 1)
      }
    },
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    handleSubmit() {
      getStorageList({
        ...this.form,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.checkList = []
          this.page.total = res.data['total_result']
          this.currentTableData = res.data['total_result'] > 0 ? res.data['items'] : []
        })
    },
    handleConfirm() {
      let data = []
      for (const value of this.currentTableData) {
        if (this.checkList.indexOf(value.storage_id) !== -1) {
          data.push(value)
        }
      }

      this.checkList = []
      this.visible = false
      this.$emit('confirm', data)
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
  .storage-list>li:hover .more {
    display: inline-block;
  }
  .storage-list li dl dt .picture {
    border: solid 1px #fafafa;
  }
  .storage-list li dl dt .covers a,
  .storage-list li dl dt .picture a {
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 80px;
    height: 80px;
    overflow: hidden;
    cursor: pointer;
  }
  .storage-list li dl dt .covers a img,
  .storage-list li dl dt .picture a img {
    max-width: 80px;
    max-height: 80px;
    vertical-align: middle;
    border: 0;
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
  .check {
    position: absolute;
    margin-left: 2px;
  }
</style>
