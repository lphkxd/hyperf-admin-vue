import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import BScroll from 'better-scroll'
import { elMenuItem, elSubmenu } from '../libs/util.menu'

export default {
  name: 'cs-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render(createElement) {
    return createElement('div', {
      attrs: { class: 'cs-layout-header-aside-menu-side' }
    }, [
      createElement('el-menu', {
        props: { collapse: this.asideCollapse, uniqueOpened: true, defaultActive: this.active, defaultOpeneds: this.openeds },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.menuAside.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu))),
      ...this.menuAside.length === 0 && !this.asideCollapse ? [
        createElement('div', {
          attrs: { class: 'cs-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' }
        }, [
          createElement('cs-icon', {
            props: { name: 'inbox' }
          }),
          createElement('span', {
          }, '暂无侧栏菜单')
        ])
      ] : []
    ])
  },
  data() {
    return {
      active: '',
      asideHeight: 300,
      menuAside: [],
      openeds: [],
      matched: null,
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
    asideCollapse() {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 改变侧边菜单栏
    '$route': {
      handler({ matched, fullPath }) {
        // 路由父级发生变化时菜单数据将发生改变
        const pathRoute = matched[0].path ? matched[0].path : matched[1].path
        if (matched.length > 0 && pathRoute !== this.matched) {
          const _side = this.aside.find(menu => menu.path === pathRoute)
          this.menuAside = _side && _side.children ? _side.children : []
          this.matched = pathRoute
        }

        // 切换菜单时调整被激活菜单
        const path = fullPath.slice(0, fullPath.lastIndexOf('/'))
        const openeds = this.menuAside.findIndex(menu => menu.path === path)
        this.openeds = openeds !== -1 ? [path] : []

        this.active = fullPath
        this.$nextTick(() => {
          if (this.aside.length > 0 && this.$refs.menu) {
            this.$refs.menu.activeIndex = fullPath
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
        click: true
        // 如果你愿意可以打开显示滚动条
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
