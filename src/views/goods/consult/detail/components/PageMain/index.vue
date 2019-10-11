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
            <span
              @click="handleView(tableData.get_goods.goods_id)"
              class="goods-link">{{tableData.get_goods.name}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">创建日期：</span>
            <span>{{tableData.create_time}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <span class="text-explode">编号：</span>
            <span>{{tableData.goods_consult_id}}</span>
          </el-col>

          <el-col :span="9">
            <span class="text-explode">类型：</span>
            <span>{{tableData.type !== null ? typeList[tableData.type] : ''}}</span>
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
        <el-timeline-item
          v-for="(item, index) in tableData.get_answer"
          :key="index"
          :timestamp="item.create_time"
          :type="item.is_client ? 'primary' : 'danger'"
          placement="top">
          <el-card shadow="never">
            <div class="user-icon">
              <el-avatar
                v-if="item.is_client && tableData.get_user.head_pic"
                size="medium"
                :src="tableData.get_user.head_pic | getPreviewUrl">
                <img src="image/avatar/user.png" alt=""/>
              </el-avatar>

              <el-avatar
                v-else-if="item.is_client"
                size="medium"
                src="image/avatar/user.png">
              </el-avatar>

              <el-avatar
                v-else size="medium"
                src="image/avatar/admin.png">
              </el-avatar>
            </div>

            <div class="problem">
              <div class="consult-content cs-pb-10">{{item.content}}</div>
              <div class="user-name">
                <span v-if="item.is_client">{{tableData.get_user.username || '游客'}}</span>
                <span v-else>客服人员</span>
                <el-image
                  v-if="item.is_client && tableData.get_user.level_icon"
                  class="level-icon"
                  :src="tableData.get_user.level_icon"
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

      <el-form
        v-has="'/goods/opinion/consult/detail'"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="68px">
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            placeholder="请输入回复内容"
            type="textarea"
            :autosize="{minRows: 5}"
            :show-word-limit="true"
            maxlength="200"/>

          <el-button
            class="cs-mt-10"
            type="primary"
            :loading="submitLoading"
            @click="handleFormSubmit"
            size="small">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import util from '@/utils/util'
import { replyGoodsConsultItem } from '@/api/goods/consult'

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
      form: {},
      formBuffer: [],
      rules: {
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
      typeList: {
        0: '商品咨询',
        1: '支付',
        2: '配送',
        3: '售后'
      },
      statusMap: {
        0: {
          text: '待回复',
          type: 'warning'
        },
        1: {
          text: '已回复',
          type: 'success'
        }
      },
      submitLoading: false
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'head_pic') : ''
    }
  },
  watch: {
    'tableData.goods_consult_id': {
      handler(val) {
        if (val > 0) {
          if (this.formBuffer.hasOwnProperty(val)) {
            this.form = this.formBuffer[val]
          } else {
            this.formBuffer[val] = { content: undefined }
            this.form = this.formBuffer[val]
          }

          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
        }
      }
    }
  },
  methods: {
    handleFormSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const consult_id = this.tableData.goods_consult_id

          replyGoodsConsultItem(consult_id, this.form.content)
            .then(res => {
              this.form.content = null
              this.$emit('reply', consult_id, res.data)
              this.$message.success('操作成功')
            })
            .finally(() => {
              this.submitLoading = false
            })
        }
      })
    },
    // 打开商品预览
    handleView(goods_id) {
      this.$router.push({
        name: 'goods-admin-view',
        params: { goods_id }
      })
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
  .goods-link:hover {
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
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
</style>
