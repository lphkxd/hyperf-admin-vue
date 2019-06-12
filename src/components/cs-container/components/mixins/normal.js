import { throttle } from 'lodash'

// 生成滚动事件的 handler
function handleMaker(wait) {
  return throttle(e => {
    this.$emit('scroll', {
      x: e.target.scrollLeft,
      y: e.target.scrollTop
    })
  }, wait)
}

export default {
  data() {
    return {
      handleScroll: null
    }
  },
  methods: {
    // 增加滚动事件监听
    addScrollListener() {
      // mounted 生命周期内调用这个方法的时候会进入这里的判断
      if (typeof this.handleScroll !== 'function') {
        this.handleScroll = handleMaker.call(this, 300)
      }

      // 添加监听
      this.$refs.body.addEventListener('scroll', this.handleScroll)
    },
    // 移除滚动事件监听
    removeScrollListener() {
      this.$refs.body.removeEventListener('scroll', this.handleScroll)
    },
    // scrollTo
    scrollTo(x = 0, y = 0) {
      const body = this.$refs.body
      if (typeof body.scrollTo === 'function') {
        body.scrollTo(x, y)
      } else {
        body.scrollLeft = x
        body.scrollTop = y
      }
    },
    // 返回顶部
    backToTop() {
      const smoothscroll = () => {
        const body = this.$refs.body
        const currentScroll = body.scrollTop

        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)

          if (typeof body.scrollTo === 'function') {
            body.scrollTo(0, currentScroll - (currentScroll / 5))
          } else {
            body.scrollTop = currentScroll - (currentScroll / 5)
          }
        }
      }

      smoothscroll()
    }
  }
}
