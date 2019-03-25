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

    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/system/storage/storage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <ul class="storage-list">
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
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
    loading: {
      default: false
    }
  },
  data() {
    return {
      helpContent: ''
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
    padding: 15px !important;
  }

  .storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid $color-border-1;
    border-radius: 4px;
    background-color: #fff;
  }
  .storage-list li {
    float: left;
    width: 204.5px;
    height: 250px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    text-align: center;
    /*<!--border-right: 1px solid $color-border-2;-->*/
    /*<!--border-bottom: 1px solid $color-border-2;-->*/
    /*<!--margin-right: -1px;-->*/
    /*<!--margin-bottom: -1px;-->*/
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

  .storage-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: $color-text-normal;
    transition: color .15s linear
  }

  .storage-list li .storage-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em
  }

  .storage-list li:hover i,
  .storage-list li:hover span {
    color: $color-primary;
    cursor: pointer;
  }
</style>
