<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="box-card-header">
        <el-row class="cs-mb-10">
          <el-col :span="18">
            <span class="text-explode">主题：</span>
            <span>{{tableData.title}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">创建日期：</span>
            <span>{{tableData.create_time}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <span class="text-explode">编号：</span>
            <span>{{tableData.ask_id}}</span>
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
          v-for="(item, index) in tableData.get_items"
          :key="index"
          :timestamp="item.create_time"
          :type="item.type === 1 ? 'primary' : 'danger'"
          placement="top">
          <el-card shadow="never">
            <div class="user-icon">
              <el-avatar
                v-if="item.type === 1"
                size="medium"
                :src="tableData.get_user.head_pic | getPreviewUrl">
                <img src="image/avatar/user.png" alt=""/>
              </el-avatar>

              <el-avatar
                v-else size="medium"
                src="image/avatar/admin.png">
              </el-avatar>
            </div>

            <div class="problem">
              <div class="ask-content cs-pb-10">{{item.type === 1 ? item.ask : item.answer}}</div>
              <div class="user-name">
                <span>{{item.type === 1 ? tableData.get_user.username : '客服人员'}}</span>
                <el-image
                  v-if="item.type === 1 && tableData.get_user.level_icon"
                  class="level-icon"
                  :src="tableData.get_user.level_icon">
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
        v-has="'/member/ask/list/detail'"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="68px">
        <el-form-item prop="answer">
          <el-input
            v-model="form.answer"
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
import { replyAskItem } from '@/api/user/ask'

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
        answer: undefined
      },
      formBuffer: [],
      rules: {
        answer: [
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
        0: '咨询',
        1: '售后',
        2: '投诉',
        3: '求购'
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
      return util.getImageCodeUrl(val, 'head_pic')
    }
  },
  watch: {
    'tableData.ask_id': {
      handler(val) {
        if (val > 0) {
          if (this.formBuffer.hasOwnProperty(val)) {
            this.form = this.formBuffer[val]
          } else {
            this.formBuffer[val] = { answer: undefined }
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
          const ask_id = this.tableData.ask_id

          replyAskItem(ask_id, this.form.answer)
            .then(res => {
              this.form.answer = null
              this.$emit('reply', ask_id, res.data)
              this.$message.success('操作成功')
            })
            .finally(() => {
              this.submitLoading = false
            })
        }
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
  .ask-content {
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
