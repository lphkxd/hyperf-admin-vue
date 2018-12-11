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
    getArticleData(article_id) {
      return new Promise((resolve, reject) => {
        this.article = {}
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
