<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="plus"/>
            新增目录
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="upload"/>
            上传
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="arrows"/>
            移动
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="trash-o"/>
            删除
          </el-button>
        </el-button-group>
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

    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{path: '/system/storage/storage'}">
        首页
      </el-breadcrumb-item>

      <el-breadcrumb-item
        v-for="item in naviData"
        :key="item.storage_id">
        <a>{{item.name}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <ul class="storage-list">
      <li v-for="(item, index) in currentTableData" :key="index">
        <dl>
          <dt>
            <div class="picture cs-ml-15"></div>
          </dt>
          <dd>
            <p>
              <span>创建日期: {{item.create_time}}</span>
            </p>
            <p v-if="item.type === 0">
              <span>原图尺寸: {{`${item.pixel['width']},${item.pixel['height']}`}}</span>
            </p>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHelpRouter } from '@/api/index/help'

export default {
  props: {
    tableData: {
      default: () => []
    },
    naviData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      currentTableData: [],
      helpContent: ''
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
  methods: {
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    background-color: #fff;
    border: 1px solid $color-border-1;
    border-radius: 4px;
    padding: 10px !important;
    margin-bottom: 20px;
  }
  .storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid $color-border-1;
    background-color: #fff;
  }
  .storage-list li {
    float: left;
    width: 204px;
    height: 300px;
    font-size: 13px;
    text-align: center;
    opacity: 1;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 0 1px 1px 1px;
    margin-right: -1px;
  }
  .storage-list li .picture {
    width: 172px;
    height: 172px;
    border: solid 1px #FAFAFA;
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
</style>
