import BScroll from 'better-scroll'

export default {
  props: {
    // 滚动优化的选项
    betterScrollOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      BS: null
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
      // 初始化 bs
      this.BS = new BScroll(this.$refs.wrapper, Object.assign({
        mouseWheel: true,
        click: true,
        preventDefault: false,
        scrollbar: {
          fade: true,
          interactive: false
        }
      }, this.betterScrollOptions))
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
