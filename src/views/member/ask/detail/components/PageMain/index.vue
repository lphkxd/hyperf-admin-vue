<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="box-card-header">
        <el-row class="cs-mb-10">
          <el-col :span="18">
            <span class="text-explode">标题：</span>
            <span>{{tableData.title}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">日期：</span>
            <span>{{tableData.ask_time}}</span>
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
          :timestamp="item.type === 1 ? item.ask_time : item.answer_time"
          :type="item.type === 1 ? 'primary' : 'danger'"
          placement="top">
          <el-card shadow="never">
            <div>
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

              <div>
                <p>{{item.type === 1 ? item.ask : item.answer}}</p>
                <p class="user-time">{{item.type === 1 ? tableData.get_user.username : '客服人员'}}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-form
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
            show-word-limit
            maxlength="200"/>

          <el-button
            class="cs-mt-10"
            type="primary"
            @click="handleFormSubmit"
            size="small">提交</el-button>
        </el-form-item>
      </el-form>
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
          text: '待回答',
          type: 'warning'
        },
        1: {
          text: '已回答',
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

          if (this.$refs.form) {
            this.$nextTick(() => {
              this.$refs.form.clearValidate()
            })
          }
        }
      }
    }
  },
  methods: {
    handleFormSubmit() {
      console.log('okok')
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
    width: 50px;
    height: 50px;
    float: left;
  }
  .user-time {
    color: #909399;
    font-size: 13px;
  }
</style>
