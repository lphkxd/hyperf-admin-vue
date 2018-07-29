<template>
  <div
    class="cs-layout-main-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: isGrayMode}">
    <!-- 半透明遮罩 -->
    <div class="cs-layout-main-mask"></div>
    <!-- 主体内容 -->
    <div class="cs-layout-main-content">
      <!-- 顶栏 -->
      <div class="cs-theme-header">
        <div class="logo-group" :style="{width: collapse ? asideWidthCollapse : asideWidth}">
          <img v-if="collapse" :src="`${$assetsPublicPath}static/image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$assetsPublicPath}static/image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <div class="toggle-aside-btn" @click="collapse = !collapse">
          <cs-icon name="bars"/>
        </div>
        <cs-layout-main-menu-header/>
        <!-- 顶栏右侧 -->
        <div class="cs-header-right">
          <cs-layout-main-header-full-screen/>
          <cs-layout-main-header-theme/>
          <cs-layout-main-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="cs-theme-container">
        <!-- 主体 侧边栏 -->
        <div ref="aside" class="cs-theme-container-aside" :style="{width: collapse ? asideWidthCollapse : asideWidth}">
          <cs-layout-main-menu-side :collapse="collapse"/>
        </div>
        <!-- 主体 -->
        <div class="cs-theme-container-main">
          <div class="cs-theme-container-main-header">
            <cs-page-close/>
          </div>
          <div class="cs-theme-container-main-body">
            <transition name="fade-transverse">
              <keep-alive>
                <router-view v-if="alive"/>
              </keep-alive>
            </transition>
            <transition name="fade-transverse">
              <router-view v-if="!alive"/>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'cs-layout-main',
    components: {
      'cs-layout-main-menu-side': () => import('./components/-menu-side'),
      'cs-layout-main-menu-header': () => import('./components/-menu-header'),
      'cs-layout-main-header-full-screen': () => import('./components/-full-screen'),
      'cs-layout-main-header-theme': () => import('./components/-theme'),
      'cs-layout-main-header-user': () => import('./components/-user')
    },
    data() {
      return {
        collapse: false,
        // [侧边栏宽度] 正常状态
        asideWidth: '200px',
        // [侧边栏宽度] 折叠状态
        asideWidthCollapse: '65px'
      }
    },
    computed: {
      ...mapState({
        isGrayMode: state => state.careyshop.isGrayMode
      }),
      ...mapGetters([
        'themeActiveSetting'
      ]),
      styleLayoutMainGroup() {
        return {
          ...this.themeActiveSetting.backgroundImage ? {
            backgroundImage: `url('${this.$assetsPublicPath}${this.themeActiveSetting.backgroundImage}')`
          } : {}
        }
      },
      alive() {
        if (this.$route.meta) {
          if (this.$route.meta.alive) {
            return true
          }
        }
        return false
      }
    }
  }
</script>

<style lang="scss">
  // 注册主题
  @import '~@/assets/style/theme/register.scss';
</style>
