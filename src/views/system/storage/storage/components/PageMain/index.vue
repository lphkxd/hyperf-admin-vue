<template>
  <div class="cs-p">
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
            <cs-icon name="check-square-o"/>
            全选
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="minus-square-o"/>
            反选
          </el-button>

          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="square-o"/>
            取消
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

    <el-breadcrumb class="breadcrumb cs-mb" separator-class="el-icon-arrow-right">
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
            <div class="picture cs-m-15">
              <a>
                <div v-if="item.type === 2" class="folder">
                  <img src="http://careyshop.oruei.com/api/v1/storage/method/get.storage.thumb/code/storage_lists?url=careyshop.oruei.com/uploads/files/20190328/5eaff12abe23396740e365ea85539406.png?type=careyshop" alt="">
                </div>
              </a>
            </div>
            <span class="storage-name cs-ml-10" :title="item.name">{{item.name}}</span>
            <cs-icon class="edit-name" name="edit"/>
          </dt>
          <dd class="cs-ml-10">
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
import storage from '../mixins'

export default {
  mixins: [storage],
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
    width: 204px;
    height: 300px;
    font-size: 13px;
    opacity: 1;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 0 1px 1px 0;
  }
  .storage-list>li:hover {
     background-color: $color-bg;
  }
  .storage-list li dl dt .picture {
    width: 172px;
    height: 172px;
    border: solid 1px #FAFAFA;
  }
  .storage-list li dl dt .covers a,
  .storage-list li dl dt .picture a {
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 172px;
    height: 172px;
    overflow: hidden;
    cursor: pointer;
  }
  .storage-list li dl dt .covers a img,
  .storage-list li dl dt .picture a img {
    max-width: 172px;
    max-height: 172px;
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
  .storage-list .storage-name {
    color: $color-text-main;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width:171px;
  }
  .storage-list .edit-name {
    color: $color-text-sub;
  }
  .storage-list .folder {
    padding-top: 10px;
    border: 1px dashed #BBB;
    margin-left: 3px;
    background-image: url(http://localhost:8080/image/storage/new_folder.png);
    background-repeat: no-repeat;
  }
</style>
