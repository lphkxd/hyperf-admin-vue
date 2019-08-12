<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="box-card-header">
      </div>
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
            message: '评价内容不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {
    getPreviewUrl(val, code = '') {
      return util.getImageCodeUrl(val, code)
    }
  },
  watch: {
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
</style>
