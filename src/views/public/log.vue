<template>
  <cs-container>
    <div class="cs-p">
      <el-table :data="log" :highlight-current-row="true">
        <!-- 时间 -->
        <el-table-column
          prop="time"
          label="Time"
          min-width="140">
        </el-table-column>
        <!-- 信息 -->
        <el-table-column
          prop="message"
          label="Message"
          min-width="200">
        </el-table-column>
        <!-- 触发页面 -->
        <el-table-column
          label="Url"
          min-width="200">
          <template slot-scope="scope">
            {{get(scope.row, 'meta.url')}}
          </template>
        </el-table-column>
        <!-- 触发组件 -->
        <el-table-column
          label="Tag"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <el-tag
              v-if="get(scope.row, 'meta.instance.$vnode.componentOptions.tag')"
              type="info"
              effect="plain"
              size="mini">
              &#60;{{get(scope.row, 'meta.instance.$vnode.componentOptions.tag')}}&gt;
            </el-tag>
          </template>
        </el-table-column>
        <!-- 查看详情 -->
        <el-table-column
          fixed="right"
          align="center"
          label="More"
          width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-more"
              size="mini"
              @click="handleShowMore(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template slot="footer">
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        @click="handleClean">Clean {{log.length}} log data</el-button>
    </template>
  </cs-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'log',
  computed: {
    ...mapState('careyshop/log', [
      'log'
    ])
  },
  methods: {
    get,
    handleShowMore(log) {
      // 打印一条日志的所有信息到控制台
      this.$log.capsule('CareyShop', 'handleShowMore', 'primary')
      console.group(log.message)
      console.log('time: ', log.time)
      console.log('type: ', log.type)
      console.log(log.meta)
      console.groupEnd()
    },
    // 清空日志
    handleClean() {
      this.$store.commit('careyshop/log/clean')
    }
  }
}
</script>
