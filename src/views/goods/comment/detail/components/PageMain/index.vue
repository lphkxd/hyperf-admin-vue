<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="box-card-header">
        <el-row class="cs-mb-10">
          <el-col :span="18">
            <span class="text-explode">关联商品：</span>
            <span>{{tableData.get_order_goods.goods_name}}</span>
          </el-col>

          <el-col :span="6">
            <el-rate
              v-model="tableData.score"
              :disabled="true"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <span class="text-explode">规格：</span>
            <span>{{tableData.get_order_goods.key_value}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">订单号：</span>
            <span>{{tableData.order_no}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">状态：</span>
            <el-tag
              v-if="tableData.status !== null"
              :type="statusMap[tableData.status].type"
              effect="plain"
              size="mini">
              {{statusMap[tableData.status].text}}
            </el-tag>
          </el-col>
        </el-row>
      </div>

      <el-timeline>
        <!-- 主评 -->
        <el-timeline-item
          :timestamp="tableData.create_time"
          type="primary"
          placement="top">
          <el-card shadow="never">
            <div class="user-icon">
              <el-avatar
                size="medium"
                :src="tableData.get_user.head_pic | getPreviewUrl('head_pic')">
                <img src="image/avatar/user.png" alt=""/>
              </el-avatar>
            </div>

            <div class="problem">
              <div class="consult-content cs-pb-10">[主评] {{tableData.content}}</div>
              <div style="line-height: 0;">
                <el-image
                  v-for="(item, index) in tableData.image"
                  :key="index"
                  class="comment_thumb"
                  :src="item | getPreviewUrl('comment_thumb_x40')"
                  :preview-src-list="srcList"
                  :lazy="true"
                  fit="cover"
                  @click.stop="setImageSrcList(tableData.image, index)"/>
              </div>
              <div class="user-name">
                <span>{{tableData.get_user.username}}</span>
                <el-image
                  v-if="tableData.get_user.level_icon"
                  :src="tableData.get_user.level_icon"
                  class="level-icon"
                  fit="fill">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
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
      form: {
        goods_comment_id: undefined,
        content: undefined
      },
      formBuffer: [],
      srcList: [],
      rules: {
        goods_comment_id: [
          {
            required: true,
            message: '评价编号不能为空',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '回复内容不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ]
      },
      statusMap: {
        0: {
          text: '待处理',
          type: 'warning'
        },
        1: {
          text: '已处理',
          type: 'success'
        }
      }
    }
  },
  filters: {
    getPreviewUrl(val, code) {
      if (val) {
        return util.getImageCodeUrl(val.source || val, code)
      }

      return null
    }
  },
  watch: {
  },
  methods: {
    // 设置大图预览列表及顺序
    setImageSrcList(srcList, index) {
      this.srcList = util.setImageSrcList(srcList, index)
    }
  }
}
</script>

<style scoped>
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }
  .box-card-header {
    font-size: 14px;
    color: #606266;
  }
  .text-explode {
    color: #909399;
  }
  .user-icon {
    float: left;
    width: 36px;
  }
  .user-name {
    color: #909399;
    font-size: 13px;
  }
  .problem {
    float: left;
    width: 90%;
    margin: 0 0 20px 20px;
  }
  .consult-content {
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
    *white-space: pre;
  }
  .level-icon {
    margin-left: 5px;
    line-height: 0;
    vertical-align: text-bottom;
  }
  .comment_thumb {
    width: 40px;
    height: 40px;
    margin: 0 5px 10px 0;
  }
  .comment_thumb >>> img {
    cursor: pointer;
  }
  .comment_thumb >>> .el-image__error {
    text-align: center;
    line-height: 1.4;
  }
</style>
