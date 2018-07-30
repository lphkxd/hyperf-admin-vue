<template>
  <div class="cs-page-close-control-group">
    <div class="cs-page-close-control-content">
      <div class="cs-page-close-control-content-inner">
        <el-tabs
          class="cs-page-close-control"
          :value="pageCurrent"
          type="card"
          :closable="true"
          @tab-click="handleClick"
          @edit="handleTabsEdit">
          <el-tab-pane
            v-for="(page, index) in pageOpenedList"
            :key="index"
            :label="page.meta.title || '未命名'"
            :name="page.name">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="cs-page-close-control-btn">
      <el-dropdown
        split-button
        @click="handleControlBtnClick"
        @command="handleControlItemClick">
        <cs-icon name="times-circle"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left">
            <cs-icon name="arrow-left" class="cs-mr-10"/>
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <cs-icon name="arrow-right" class="cs-mr-10"/>
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <cs-icon name="times" class="cs-mr-10"/>
            关闭其它
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <cs-icon name="times-circle" class="cs-mr-10"/>
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      pageOpenedList: state => state.careyshop.pageOpenedList,
      pageCurrent: state => state.careyshop.pageCurrent
    })
  },
  methods: {
    ...mapMutations([
      'tagCloseLeft',
      'tagCloseRight',
      'tagCloseOther',
      'tagCloseAll'
    ]),
    /**
     * @description 接收点击关闭控制上选项的事件
     */
    handleControlItemClick(command) {
      switch (command) {
        case 'left':
          this.tagCloseLeft()
          break
        case 'right':
          this.tagCloseRight()
          break
        case 'other':
          this.tagCloseOther()
          break
        case 'all':
          this.tagCloseAll(this)
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击关闭控制上按钮的事件
     */
    handleControlBtnClick() {
      this.tagCloseAll(this)
    },
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick(tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.pageOpenedList.find(page => page.name === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
     */
    handleTabsEdit(tagName, action) {
      if (action === 'remove') {
        this.$store.commit('tagClose', {
          tagName,
          vm: this
        })
      }
    }
  }
}
</script>
