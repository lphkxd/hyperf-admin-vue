<template>
  <div
    class="cs-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: isGrayMode}">
    <!-- 半透明遮罩 -->
    <div class="cs-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="cs-layout-header-aside-content">
      <!-- 顶栏 -->
      <div class="cs-theme-header">
        <div class="logo-group" :style="{width: isMenuAsideCollapse ? asideWidthCollapse : asideWidth}">
          <img v-if="isMenuAsideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside">
          <cs-icon name="bars"/>
        </div>
        <cs-menu-header/>
        <!-- 顶栏右侧 -->
        <div class="cs-header-right">
          <cs-header-fullscreen/>
          <cs-header-theme/>
          <cs-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="cs-theme-container">
        <!-- 主体 侧边栏 -->
        <div
          ref="aside"
          class="cs-theme-container-aside"
          :style="{width: isMenuAsideCollapse ? asideWidthCollapse : asideWidth}">
          <cs-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="cs-theme-container-main">
          <div class="cs-theme-container-main-header">
            <cs-tabs/>
          </div>
          <div class="cs-theme-container-main-body">
            <transition name="fade-transverse">
              <keep-alive :include="keepAliveInclude">
                <router-view/>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import menuSide from './components/menu-side'
import menuHeader from './components/menu-header'
import tabs from './components/tabs'
import headerFullscreen from './components/header-fullscreen'
import headerTheme from './components/header-theme'
import headerUser from './components/header-user'

export default {
  name: 'cs-layout-header-aside',
  components: {
    'cs-menu-side': menuSide,
    'cs-menu-header': menuHeader,
    'cs-tabs': tabs,
    'cs-header-fullscreen': headerFullscreen,
    'cs-header-theme': headerTheme,
    'cs-header-user': headerUser
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState({
      isGrayMode: state => state.careyshop.isGrayMode,
      pageOpenedList: state => state.careyshop.pageOpenedList,
      isMenuAsideCollapse: state => state.careyshop.isMenuAsideCollapse
    }),
    ...mapGetters([
      'themeActiveSetting',
      'keepAliveInclude'
    ]),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  methods: {
    ...mapMutations([
      'menuAsideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.menuAsideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
