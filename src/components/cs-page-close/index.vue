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
      <el-dropdown split-button @click="handleControlBtnClick" @command="handleControlItemClick">
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
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeName: 'first'
      }
    },
    computed: {
      ...mapState({
        pageOpenedList: state => state.careyshop.pageOpenedList,
        pageCurrent: state => state.careyshop.pageCurrent
      })
    },
    methods: {
      /**
       * @description 接收点击关闭控制上选项的事件
       */
      handleControlItemClick(command) {
        switch (command) {
          case 'left':
            this.closeAllTagLeft()
            break
          case 'right':
            this.closeAllTagRight()
            break
          case 'other':
            this.closeAllTagOther()
            break
          case 'all':
            this.closeAllTag()
            break
          default:
            console.log('无效指令')
            break
        }
      },
      /**
       * @description 接收点击关闭控制上按钮的事件
       */
      handleControlBtnClick() {
        // 关闭所有
        this.closeAllTag()
      },
      /**
       * @description 接收点击 tab 标签的事件
       */
      handleClick(tab, event) {
        const page = this.pageOpenedList.find(page => page.name === tab.name)
        if (page) {
          this.$router.push({
            name: page.name,
            params: page.argu,
            query: page.query
          })
        }
      },
      /**
       * @description 点击 tab 上的删除按钮后首先触发这里
       */
      handleTabsEdit(tagName, action) {
        if (action === 'remove') {
          // 首页的删除按钮已经隐藏 因此这里不用判断是 index
          this.closeTag(tagName)
        }
      },
      /**
       * @description 关闭左侧的 tag
       */
      closeAllTagLeft() {
        this.$store.commit('tagCloseLeft')
      },
      /**
       * @description 关闭右侧的 tag
       */
      closeAllTagRight() {
        this.$store.commit('tagCloseRight')
      },
      /**
       * @description 关闭其它的 tag
       */
      closeAllTagOther() {
        this.$store.commit('tagCloseOther')
      },
      /**
       * @description 关闭全部的 tag
       */
      closeAllTag() {
        this.$store.commit('tagCloseAll')
        this.$router.push({
          name: 'index'
        })
      },
      /**
       * @description 关闭一个指定的 tag
       */
      closeTag(tagName) {
        // 下个新的页面
        let newPage = this.pageOpenedList[0]
        // 如果关闭的页面就是当前显示的页面
        if (this.pageCurrent === tagName) {
          // 去找一个新的页面
          let len = this.pageOpenedList.length
          for (let i = 1; i < len; i++) {
            if (this.pageOpenedList[i].name === tagName) {
              if (i < len - 1) {
                newPage = this.pageOpenedList[i + 1]
              } else {
                newPage = this.pageOpenedList[i - 1]
              }
              break
            }
          }
        } else {
          // 关闭的页面不是当前的页面
          // 这里暂时不需要做什么
        }
        this.$store.commit('tagClose', tagName)
        if (this.pageCurrent === tagName) {
          this.linkTo(newPage)
        }
      },
      /**
       * @description 跳转到新的页面
       */
      linkTo({ name = '', argu = {}, query = {}}) {
        let routerObj = {
          name,
          params: argu,
          query
        }
        this.$router.push(routerObj)
      }
    }
  }
</script>
