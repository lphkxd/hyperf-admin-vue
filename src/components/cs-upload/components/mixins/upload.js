import { getUploadToken } from '@/api/upload/upload'

export default {
  data() {
    return {
      token: {}
    }
  },
  mounted() {
    getUploadToken()
      .then(res => {
        this.token = res.data
      })
  },
  methods: {
  }
}
