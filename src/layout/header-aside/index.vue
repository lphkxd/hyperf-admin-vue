<template>
  <div
    class="cs-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="cs-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="cs-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="cs-theme-header"
        :style="{
          opacity: this.searchActive ? 0.3 : 1
        }"
        flex-box="0">
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}">
          <a target="blank" href="//www.careyshop.cn/">
            <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
            <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
          </a>
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside">
          <cs-icon name="bars"/>
        </div>
        <cs-menu-header/>
        <!-- 顶栏右侧 -->
        <div class="cs-header-right">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <cs-header-error-log v-if="$env === 'development'"/>
          <cs-header-search @click="handleSearchClick"/>
          <cs-header-fullscreen/>
          <cs-header-theme/>
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
            opacity: this.searchActive ? 0.3 : 1
          }">
          <cs-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="cs-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-show="searchActive" class="cs-theme-container-main-layer" flex="dir:top">
              <cs-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-show="!searchActive" class="cs-theme-container-main-layer" flex="dir:top">
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'cs-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    'cs-menu-side': () => import('./components/menu-side'),
    'cs-menu-header': () => import('./components/menu-header'),
    'cs-tabs': () => import('./components/tabs'),
    'cs-header-fullscreen': () => import('./components/header-fullscreen'),
    'cs-header-search': () => import('./components/header-search'),
    'cs-header-theme': () => import('./components/header-theme'),
    'cs-header-user': () => import('./components/header-user'),
    'cs-header-error-log': () => import('./components/header-error-log')
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
    ...mapState('careyshop', {
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('careyshop', {
      keepAlive: 'page/keepAlive',
      themeActiveSetting: 'theme/activeSetting'
    }),
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
    ...mapMutations({
      menuAsideCollapseToggle: 'careyshop/menu/asideCollapseToggle'
    }),
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
.logo-group {
  img {
    border: none
  }
}
</style>
