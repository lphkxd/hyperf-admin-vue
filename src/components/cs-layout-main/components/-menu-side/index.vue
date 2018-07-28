<template>
  <div class="cs-layout-main-menu-side">
    <el-menu
      :collapse="collapse"
      :unique-opened="true"
      :default-active="active"
      ref="menu"
      @select="handleMenuSelect">
      <template v-for="(menu, menuIndex) in menus">
        <cs-layout-main-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
        <cs-layout-main-menu-sub v-else :menu="menu" :key="menuIndex"/>
      </template>
    </el-menu>
    <div v-if="menus.length === 0 && !collapse" class="menu-empty">
      <cs-icon name="hdd-o"/>
      <span>当前目录没有菜单</span>
    </div>
  </div>
</template>

<script>
  import { side } from '@/menu/index'
  import menuMixin from '../mixin/menu'

  // 组件
  import csLayoutMainMenuItem from '../-menu-item/index'
  import csLayoutMainMenuSub from '../-menu-sub/index'
  
  // 插件
  import BScroll from 'better-scroll'

  export default {
    name: 'cs-layout-main-menu-side',
    mixins: [
      menuMixin
    ],
    components: {
      'cs-layout-main-menu-item': csLayoutMainMenuItem,
      'cs-layout-main-menu-sub': csLayoutMainMenuSub
    },
    props: {
      collapse: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        menus: [],
        active: '',
        asideHeight: 300,
        BS: null
      }
    },
    watch: {
      // 折叠和展开菜单的时候销毁 better scroll
      collapse(val) {
        this.scrollDestroy()
        setTimeout(() => {
          this.scrollInit()
        }, 500)
      },
      '$route.matched': {
        handler(val) {
          const path = val[0].path
          const _side = side.filter(menu => menu.path === path)
          this.menus = _side.length > 0 ? _side[0].children : []
          this.active = val[val.length - 1].path
          this.$nextTick(() => {
            if (this.menus.length > 0) {
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
      scrollInit() {
        this.BS = new BScroll(this.$el, {
          mouseWheel: true,
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      },
      scrollDestroy() {
        if (this.BS) {
          this.BS.destroy()
        }
      }
    }
  }
</script>
