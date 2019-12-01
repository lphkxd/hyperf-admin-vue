<template>
  <cs-container :is-back-to-top="true">
    <page-main
      :table-data="table"
      :loading="loading"
      :tpl-code.sync="tplCode"/>
  </cs-container>
</template>

<script>
import { getNoticeTplList } from '@/api/notice/template'

export default {
  name: 'setting-notice-template',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      table: [],
      loading: true,
      tplCode: 'sms'
    }
  },
  watch: {
    tplCode: {
      handler(val) {
        this.loading = true
        getNoticeTplList(val)
          .then(res => {
            this.table = res.data || []
          })
          .finally(() => {
            this.loading = false
          })
      },
      immediate: true
    }
  }
}
</script>
