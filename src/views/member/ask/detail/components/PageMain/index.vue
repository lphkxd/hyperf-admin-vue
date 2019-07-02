<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="box-card-header">
        <el-row class="cs-mb-10">
          <el-col :span="18">
            <span class="text-explode">问答标题：</span>
            <span>{{tableData.title}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">类型：</span>
            <span>{{tableData.type !== null ? typeList[tableData.type] : ''}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <span class="text-explode">问答编号：</span>
            <span>{{tableData.ask_id}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">提交账号：</span>
            <span>{{tableData.get_user.username}}</span>
          </el-col>

          <el-col :span="6">
            <span class="text-explode">创建日期：</span>
            <span>{{tableData.ask_time}}</span>
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
          timestamp="2018/4/12 20:46"
          placement="top"
          type="primary">
          <el-card shadow="never">
            <div>
              <div class="user-icon">
                <el-avatar size="medium" src="https://empty">
                  <img src="image/avatar/user.png" alt=""/>
                </el-avatar>
              </div>

              <div>
                <p>更新 Github 模板</p>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>

        <el-timeline-item
          timestamp="2018/4/12 20:46"
          placement="top"
          type="primary">
          <el-card shadow="never">
            <div>
              <div class="user-icon">
                <el-avatar size="medium" src="image/avatar/admin.png">
                </el-avatar>
              </div>

              <div>
                <p>更新 Github 模板</p>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
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
      }
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
</style>
