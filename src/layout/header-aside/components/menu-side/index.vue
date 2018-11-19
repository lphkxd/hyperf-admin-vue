<template>
  <div class="cs-layout-header-aside-menu-side">
    <el-menu
      :collapse="asideCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      :default-active="active"
      ref="menu"
      @select="handleMenuSelect">
      <template v-for="(menu, menuIndex) in menuAside">
        <cs-layout-header-aside-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
        <cs-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>
      </template>
    </el-menu>
    <div v-if="menuAside.length === 0 && !asideCollapse" class="cs-layout-header-aside-menu-empty" flex="dir:top main:center cross:center">
      <cs-icon name="inbox"/>
      <span>暂无侧栏菜单</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import menuMixin from '../mixin/menu'
import csLayoutMainMenuItem from '../components/menu-item'
import csLayoutMainMenuSub from '../components/menu-sub'
import BScroll from 'better-scroll'

export default {
  name: 'cs-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  components: {
    'cs-layout-header-aside-menu-item': csLayoutMainMenuItem,
    'cs-layout-header-aside-menu-sub': csLayoutMainMenuSub
  },
  data() {
    return {
      active: '',
      asideHeight: 300,
      menuAside: [],
      BS: null
    }
  },
  computed: {
    ...mapState('careyshop/menu', [
      'aside',
      'asideCollapse'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse(val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route.matched': {
      handler(val) {
        const _side = this.aside.filter(menu => menu.path === val[0].path)
        this.menuAside = _side.length === 1 ? _side[0].children : []

        this.active = val[val.length - 1].path
        this.$nextTick(() => {
          if (this.aside.length > 0 && this.$refs.menu) {
            this.$refs.menu.activeIndex = this.active
          }
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.scrollInit()
  },
  beforeDestroy() {
    this.scrollDestroy()
  },
  methods: {
    ...mapMutations('careyshop/menu', [
      'asideSet'
    ]),
    scrollInit() {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy() {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
</script>
