import BScroll from 'better-scroll'

export default {
  props: {
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
      this.BS = new BScroll(this.$refs.wrapper, Object.assign({
        mouseWheel: true,
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
