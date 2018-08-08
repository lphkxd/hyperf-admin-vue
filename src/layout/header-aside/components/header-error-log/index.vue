<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="tooltipContent"
      placement="bottom">
      <el-button
        class="cs-ml-0 cs-mr btn-text can-hover"
        type="text"
        @click="handleClick">
        <el-badge
          v-if="logLength > 0"
          :max="99"
          :value="logErrorLength"
          :is-dot="logErrorLength === 0">
          <cs-icon
            :name="logErrorLength === 0 ? 'dot-circle-o' : 'bug'"
            style="font-size: 20px"/>
        </el-badge>
        <cs-icon
          v-else
          name="dot-circle-o"
          style="font-size: 20px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      :title="tooltipContent"
      :fullscreen="true"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <div class="cs-mb-10">
        <el-button type="danger" size="mini" @click="handleLogClean">
          <cs-icon name="trash-o"/>
          清空
        </el-button>
      </div>

      <cs-error-log/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'logLength',
      'logErrorLength'
    ]),
    tooltipContent() {
      return this.logLength === 0
        ? '没有日志或异常'
        : `${this.logLength} 条日志${this.logErrorLength > 0
          ? ` | 包含 ${this.logErrorLength} 个异常`
          : ''}`
    }
  },
  methods: {
    ...mapMutations([
      'logClean'
    ]),
    handleClick() {
      if (this.logLength > 0) {
        this.dialogVisible = true
      }
    },
    handleLogClean() {
      this.dialogVisible = false
      this.logClean()
    }
  }
}
</script>
