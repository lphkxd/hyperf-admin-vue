export default {
  methods: {
    // 增加滚动事件监听
    addScrollListener() {
      this.$refs.body.addEventListener('scroll', this.handleScroll)
    },
    // 移除滚动事件监听
    removeScrollListener() {
      this.$refs.body.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      const { scrollLeft, scrollTop } = this.$refs.body
      this.$emit('scroll', {
        x: scrollLeft,
        y: scrollTop
      })
    },
    // 外部调用的方法 返回顶部
    backToTop() {
      const body = this.$refs.body
      if (typeof body.scrollTo === 'function') {
        body.scrollTo(body.scrollLeft, 0)
      } else {
        body.scrollTop = 0
      }
    }
  }
}
