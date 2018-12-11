import { getArticleItem } from '@/api/article/article'

export default {
  props: {
    article_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {
    resetArticleData() {
      this.article = {}
    },
    getArticleData(article_id) {
      return new Promise((resolve, reject) => {
        this.resetArticleData()
        getArticleItem(article_id)
          .then(res => {
            this.article = res.data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
