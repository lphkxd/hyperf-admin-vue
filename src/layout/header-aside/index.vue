<template>
  <div
    class="cs-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="cs-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="cs-layout-header-aside-content" flex="dir:top">
      <div>
        <el-alert
          v-if="isExperience"
          title="为了实现较好的用户体验，建议您使用 Chrome 或 Firefox 游览器。"
          style="border-radius: 0;"
          type="warning"
          effect="dark"
          center
          show-icon>
        </el-alert>
      </div>
      <!-- 顶栏 -->
      <div
        class="cs-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <a target="blank" href="//www.careyshop.cn/">
            <img v-if="asideCollapse" :src="`${$publicPath}image/theme/${themeActiveSetting.name}/logo/icon-only.png`" alt="">
            <img v-else :src="`${$publicPath}image/theme/${themeActiveSetting.name}/logo/all.png`" alt="">
          </a>
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <cs-icon name="bars"/>
        </div>
        <cs-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="cs-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <cs-header-log v-if="$env === 'development'"/>
          <cs-header-search @click="handleSearchClick"/>
          <cs-header-fullscreen/>
          <cs-header-theme/>
          <cs-header-size/>
          <cs-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="cs-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="cs-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <cs-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="cs-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="cs-theme-container-main-layer" flex>
              <cs-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="cs-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="cs-theme-container-main-header" flex-box="0">
                <cs-tabs/>
              </div>
              <!-- 页面 -->
              <div class="cs-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import csMenuSide from './components/menu-side'
import csMenuHeader from './components/menu-header'
import csTabs from './components/tabs'
import csHeaderFullscreen from './components/header-fullscreen'
import csHeaderSearch from './components/header-search'
import csHeaderSize from './components/header-size'
import csHeaderTheme from './components/header-theme'
import csHeaderUser from './components/header-user'
import csHeaderLog from './components/header-log'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'cs-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    csMenuSide,
    csMenuHeader,
    csTabs,
    csHeaderFullscreen,
    csHeaderSearch,
    csHeaderSize,
    csHeaderTheme,
    csHeaderUser,
    csHeaderLog
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      // 操作体验提醒
      isExperience: false
    }
  },
  computed: {
    ...mapState('careyshop', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      uaData: state => state.ua.data
    }),
    ...mapGetters('careyshop', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$publicPath}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  created() {
    const { engine } = this.uaData
    if (engine.name && engine.name.toLowerCase() === 'trident') {
      this.isExperience = true
    }
  },
  methods: {
    ...mapActions('careyshop/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.logo-group {
  img {
    border: none
  }
}
</style>
